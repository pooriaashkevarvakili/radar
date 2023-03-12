<template>
	<div id="hotelpage">
		<div v-if="mobileSearchBox" class="mobile-hotel-search">
			<div class="mobile-hotel-search__body">
				<div class="mobile-hotel-search__header d-flex justify-content-center align-items-center">
					<img src="~/assets/images/white-close.svg" alt="white-close" @click="mobileSearchBox = false">
					<img src="~/assets/images/radar-logo-white.svg" alt="radar-logo">
				</div>
				<resort-search
					ref="SearchHotel"
					:check-in-date="checkInDate"
					:check-out-date="checkOutDate"
					:city-hotel-list="cityList"
					hotel-title="جستجوی مقصد (شهر/استان)"
					:home-search="true"
					@searchResort="searchResort"
				/>
			</div>
		</div>
		<inner-page-header @openSearchBox="mobileSearchBox = true">
			<template v-slot:content>
				<div class="mobile-header__title">
					<div class="mobile-header__title-name">
						اقامتگاه های {{ searchedCity.NameFa }}
					</div>
					<div class="mobile-header__title-date">
						{{ duration }} شب
					</div>
				</div>
			</template>
		</inner-page-header>
		<div class="mobile-header d-none">
			<div class="logo-wrapper">
				<button class="menu-button">
					<img src="~/assets/images/menu-white-icon.svg">
				</button>
				<nuxt-link to="/">
					<img src="~/assets/images/radar-logo-white-without-text.svg">
				</nuxt-link>
			</div>
			<div class="mobile-header__title">
				<div class="mobile-header__title-name">
					اقامتگاه های {{ searchedCity.NameFa }}
				</div>
				<div class="mobile-header__title-date">
					2نفر
				</div>
			</div>
			<div class="mr-auto ml-3 text-white">
				<font-awesome-icon :icon="['fas', 'pen']" @click="mobileSearchBox = true" class="fa-style"/>
			</div>
		</div>
		<div class="share-mobile">
			<div class="row justify-content-between">
				<resort-sort
					ref="share"
					:loaded="true"
					:show-share="true"
					:sort-option="sortOptionSelected"
					@selectedSort="selectedSort"
				/>
			</div>
		</div>
		<div class="hotel-search">
			<div class="custom-container">
				<div class="wrapper">
					<div class="hotel-breadcrumb">
						<div class="title">
							<nuxt-link to="/">
								صفحه‌ی اصلی
							</nuxt-link>
							<img src="~assets/images/left-arrow.svg" alt="hotel-icon">
							<nuxt-link :to="'/resort/' + searchedCity.NameEn.toLowerCase()">
								رزرو اقامتگاه های {{ searchedCity.NameFa }}
							</nuxt-link>
						</div>
						<div class="city-name">
							<img src="~assets/images/gray-hotel-icon.svg" alt="hotel-icon">
							<h1>اقامتگاه های {{ searchedCity.NameFa }}</h1>
						</div>
					</div>
					<resort-search
						ref="SearchHotel"
						:check-in-date="checkInDate"
						:check-out-date="checkOutDate"
						:city-hotel-list="cityList"
						hotel-title="جستجوی مقصد (شهر/استان)"
						@searchResort="searchResort"
					/>
				</div>
			</div>
		</div>
		<div class="custom-container w-100">
			<div id="#main-content" class="row justify-content-between">
				<client-only>
					<component
						:is="isDesktop ? 'vue-sticky-sidebar' : 'div'"
						id="sidebar"
						ref="sidebar"
						sticky-class="is-affixed"
						:resize-sensor="true"
					>
						<resort-filter
							ref="filters"
							class="sidebar__inner"
							:duration="duration"
						/>
					</component>
				</client-only>
				<div id="content" class="box-carts">
					<div class="container desktop-search-badge d-block">
						<hotel-search-badge :loaded="true" />
					</div>
					<div class="container share-row">
						<resort-sort
							ref="share"
							:loaded="true"
							:show-share="true"
							:sort-option="sortOptionSelected"
							@selectedSort="selectedSort"
						/>
					</div>
					<div v-if="resortsList.length == 0 && !loading" style="margin-bottom: 50px;" class="d-flex flex-column align-items-center">
						<img
							id="no-result"
							src="~/assets/images/noresult.svg"
							alt="No Result"
						>
						<div id="no-result-for-day">
							نتیجه ای یافت نشد!
						</div>
						<div id="go-another-day">
							با رفتن به روزهای دیگه و یا تغییر فیلترها می‌تونید به انتظار این
							سفر پایان بدید.
						</div>
						<button class="error-btn mx-auto">
							پاک‌سازی فیلترها
						</button>
					</div>
					<div v-if="loading && !error" class="skeleton-box">
						<skeleton v-for="i in 7" :key="i" type="resort" />
					</div>
					<div v-else-if="error" class="w-100">
						<div id="go-another-day">
							<span>خطایی در بارگیری رخ داد، لطفا مجددا تلاش فرمایید!</span>
							<button class="error-btn" @click="tryAgain">
								<img
									src="~/assets/images/reload-icon.svg"
									alt="reload"
								>
								تلاش مجدد
							</button>
						</div>
					</div>
					<div class="w-100">
						<div
							v-infinite-scroll="loadMore"
							infinite-scroll-disabled="busy"
							infinite-scroll-distance="limit"
						>
							<resort v-for="(resort, index) in (list != null ? list : [])" :key="index" :resort-detail="resort" :duration="duration" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!loading" class="mobile-filter d-none w-100" @click="filterButtonClicked">
			<span class="selected-filter">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.3652 0.125H1.60938C1.05078 0.125 0.771484 0.785156 1.17773 1.16602L5.875 5.86328V11.0938C5.875 11.2969 5.95117 11.5 6.12891 11.6016L8.16016 13.0234C8.56641 13.3027 9.125 13.0234 9.125 12.5156V5.86328L13.7969 1.16602C14.2031 0.785156 13.9238 0.125 13.3652 0.125Z" fill="white" />
				</svg>
				فیلتر ها
			</span>
		</div>
	</div>
</template>
<script>
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Vue from 'vue';
import ResortSearch from '~/components/resort/resortSearch';
import ResortFilter from '~/components/resort/resortFilter';
import HotelSearchBadge from '~/components/hotel/HotelSearchBadge';
import ResortSort from '~/components/resort/resortSort';
import skeleton from '~/components/hotel/skeleton';
import ResortStore from '~/store/Resort';
import Resort from '~/components/resort/resort';
import InnerPageHeader from '~/components/layouts/InnerPageHedear';
library.add(faPen);
const moment = require('moment-jalaali');
let infiniteScroll;
if (process.client) {
	infiniteScroll = require('vue-infinite-scroll');
	Vue.use(infiniteScroll);
}
export default {
	components: {
		ResortSearch,
		ResortFilter,
		HotelSearchBadge,
		ResortSort,
		skeleton,
		Resort,
		InnerPageHeader
	},
	async fetch() {
		await ResortStore.of(this.$store).searchForCityInUrl(this.$route.params.city);
	},
	data() {
		return {
			isDesktop: false,
			mobileSearchBox: false,
			sortOptionSelected: 'AverageRate',
			busy: false,
			list: [],
			limit: 10
		};
	},
	computed: {
		checkInDate() {
			return this.$route.query.checkInDate ? moment(this.$route.query.checkInDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
		},
		checkOutDate() {
			return this.$route.query.checkOutDate ? moment(this.$route.query.checkOutDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD') : moment().add(1, 'day').format('YYYY-MM-DD');
		},
		resortsList() {
			return ResortStore.of(this.$store).state.filteredResortsList;
		},
		cityList() {
			return ResortStore.of(this.$store).state.defaultCities;
		},
		loading() {
			return ResortStore.of(this.$store).state.resortLoading;
		},
		error() {
			return ResortStore.of(this.$store).state.error;
		},
		searchedCity() {
			return ResortStore.of(this.$store).state.searchedCityInUrl;
		},
		duration() {
			const m = moment(this.checkInDate, 'YYYY-MM-DD');
			const m2 = moment(this.checkOutDate, 'YYYY-MM-DD');
			return m2.diff(m, 'days');
		}
	},
	watch: {
		'$route.params': function (newParams, oldParams) {
			if (newParams.city !== oldParams.city) {
				this.search();
			}
		},
		'$route.query': function (newVal, oldVal) {
			if (newVal.checkInDate !== oldVal.checkInDate || newVal.checkInDate !== oldVal.checkInDate || newVal.capacity !== oldVal.capacity) {
				this.search();
			}
		},
		resortsList: function (val) {
			this.list = val.slice(0, Math.max(this.list.length, this.limit));
		},
		mobileSearchBox(newVal, oldVal) {
			if (newVal === true) {
				this.toggleBodyClass('addClass', 'body-overflow');
				if (window.innerWidth < 768) {
					this.$router.push({ path: this.$route.fullPath, hash: '#search' });
				}
			} else {
				this.toggleBodyClass('removeClass', 'body-overflow');
			}
		},
		$route: function (to, from) {
			if (from.hash === '#search' && to.hash === '') {
				this.mobileSearchBox = false;
			}
		},
	},
	beforeMount: function () {
		ResortStore.of(this.$store).loadDefaultCities();
		if (window && window.innerWidth > 768) {
			this.isDesktop = true;
		};
	},
	created() {
		this.search();
	},
	methods: {
		selectedSort: function (type, order) {
			this.sortOptionSelected = type;
			ResortStore.of(this.$store).sortResort = { type: type, order: order };
		},
		search() {
			this.busy = true;
			const cityName = this.$route.params.city;
			const checkInDate = moment(this.$route.query.checkInDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
			const checkOutDate = moment(this.$route.query.checkOutDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
			const capacity = this.$route.query.capacity;
			ResortStore.of(this.$store).resortSearch({ cityName, checkInDate, checkOutDate, capacity });
			this.loadMore();
		},
		searchResort(id, CheckInDate, CheckOutDate, capacity) {
			this.$router.push({ path: '/resort/' + id, query: { checkInDate: CheckInDate, checkOutDate: CheckOutDate, capacity } });
		},
		filterButtonClicked() {
			this.$refs.filters.filterButtonClicked();
		},
		tryAgain: function () {
			this.$router.go(this.$route.path);
		},
		loadMore: function () {
			this.busy = true;
			this.list = this.resortsList.slice(0, this.limit + this.list.length);
			this.busy = false;
		}
	}
};
</script>
<style scoped>
@import url('~/assets/css/residence.css');
::v-deep .inner-wrapper-sticky {
	left: unset !important;
}
::v-deep .mobile-hotel-search .search-btn {
	background-color: #EB384D !important
}
::v-deep .mobile-hotel-search #search-box {
	margin: 0 0 24px 0!important;
}

</style>
