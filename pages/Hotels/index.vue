<template>
	<div id="hotelpage">
		<div v-if="mobileSearchBox" class="mobile-hotel-search">
			<div class="mobile-hotel-search__body">
				<div class="mobile-hotel-search__header d-flex justify-content-center align-items-center">
					<img src="~/assets/images/white-close.svg" alt="white-close" @click="mobileSearchBox = false">
					<img src="~/assets/images/radar-logo-white.svg" alt="radar-logo">
				</div>
				<hotel-search
					ref="HotelSearch"
					:check-in-date="CheckInDate"
					:check-out-date="CheckOutDate"
					:city-hotel-list="CityHotelList"
					class="hotel"
					:home-search="true"
					:hotel-title="'جستجوی مقصد (هتل/شهر)'"
					@searchHotels="searchHotels"
				/>
			</div>
		</div>
		<inner-page-header @openSearchBox="mobileSearchBox = true">
			<template v-slot:content>
				<div class="mobile-header__title-name">
					هتل های {{ Meta.NameFa? Meta.NameFa: '' }}
				</div>
				<div class="mobile-header__title-date">
					{{ capacity }} {{ capacity? 'نفر - ' : '' }}{{ calcDate(CheckInDate) }} تا {{ calcDate(CheckOutDate) }}
				</div>
			</template>
		</inner-page-header>
		<div class="share-mobile">
			<div class="row justify-content-between">
				<hotel-sort
					v-if="!error"
					ref="share"
					:loaded="loaded"
					:sort-option="sortOptionSelected"
					:show-share="true"
					:total-count="filteredHotels.length"
					:shown-count="
						filteredHotels != null
							? filteredHotels.length
							: 0
					"
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
							<nuxt-link :to="'/'+ Meta.NameEn">
								رزرو هتل‌های {{ Meta.NameFa }}
							</nuxt-link>
						</div>
						<div class="city-name">
							<img src="~assets/images/gray-hotel-icon.svg" alt="hotel-icon">
							<h1>هتل‌های {{ Meta.NameFa }}</h1>
						</div>
					</div>
					<hotel-search
						ref="HotelSearch"
						:check-in-date="CheckInDate"
						:check-out-date="CheckOutDate"
						:city-hotel-list="CityHotelList"
						class="hotel"
						hotel-title="جستجوی مقصد (هتل/شهر)"
						@searchHotels="searchHotels"
					/>
				</div>
			</div>
		</div>
		<div class="custom-container">
			<div id="#main-content" class="row justify-content-between">
				<client-only>
					<component
						:is="isDesktop ? 'vue-sticky-sidebar' : 'div'"
						id="sidebar"
						ref="sidebar"
						sticky-class="is-affixed"
						:resize-sensor="true"
					>
						<filter-hotel
							v-if="!error"
							ref="FilterHotel"
							class="sidebar__inner"
							origin="تهران"
							:loaded="loaded"
							:amenities="metaData.Amenities"
							:hotel-types="metaData.Types"
							:max-price="metaData.MaxPrice"
							:min-price="metaData.MinPrice"
							:hotel-star="hotelStar"
							:duration="searchedDuration"
							:shown-count="
								filteredHotels != null
									? filteredHotels.length
									: 0
							"
							@setCapacity="search"
						/>
					</component>
				</client-only>
				<div id="content" class="box-carts">
					<div class="w-100 mobile-search-badge d-none">
						<hotel-search-badge
							v-if="!error"
							:loaded="loaded"
							:shown-count="
								filteredHotels != null
									? filteredHotels.length
									: 0
							"
						/>
					</div>
					<div class="container desktop-search-badge d-block">
						<hotel-search-badge v-if="!error" :loaded="loaded" />
					</div>
					<div class="container share-row">
						<hotel-sort
							v-if="!error"
							ref="share"
							:sort-option="sortOptionSelected"
							:loaded="loaded"
							:show-share="true"
							:total-count="filteredHotels.length"
							:shown-count="
								filteredHotels != null
									? filteredHotels.length
									: 0
							"
							@selectedSort="selectedSort"
						/>
					</div>
					<div v-if="loaded" class="w-100">
						<a v-if="topAdUrl" :href="topAdUrl" target="_blank" class="w-100">
							<img class="ad-banner w-100" :src="`https://blog.radar361.com/ads/hotels/${city}/top.png`">
							<img class="mobile-ad-banner d-none w-100" :src="`https://blog.radar361.com/ads/hotels/${city}/top.png`">
						</a>
						<nuxt-link v-else to="/contactUs" class="w-100">
							<img class="ad-banner" src="~assets/images/advertise/large-ad.svg">
							<img class="mobile-ad-banner d-none" src="~assets/images/advertise/mobile-ad.svg">
						</nuxt-link>
					</div>
					<div v-else class="list-ad-banner-skeleton" />
					<div v-show="(!filter || filter.includes('star-hotels')) && !loaded && !error" class="skeleton-box">
						<skeleton v-for="i in 7" :key="i" />
					</div>

					<div
						v-show="loaded"
						v-infinite-scroll="loadMore"
						class="hotels"
						infinite-scroll-disabled="busy"
						infinite-scroll-distance="limit"
					>
						<hotel
							v-for="hotel in (Meta.HotelType ? [Meta] : list != null
								? list.slice()
								: [])"
							:key="hotel && hotel.Id"
							ref="hotel"
							:hotel-id="hotel.Id"
							:duration="searchedDuration"
							:in-date="CheckInDate"
							:out-date="CheckOutDate"
							:set-meta="mode === 'hotel'"
							:city-name="city"
							:city-name-fa="Meta.NameFa"
						/>
					</div>
					<div v-if="list.length < filteredHotels.length" class="w-100">
						<skeleton v-for="i in 7" :key="i" />
					</div>
					<div v-show="error">
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
					<div
						v-if="filteredHotels != null && filteredHotels.length == 0 && loaded && !filter && !anyFilterApplied && !selectedCategories.length"
						class="d-flex flex-column align-items-center"
						style="margin-bottom: 50px;"
					>
						<img
							id="no-result"
							src="~/assets/images/noresult.svg"
							alt="No Result"
						>
						<div id="no-result-for-day">
							جستجوی رادار نتیجه ای نداشت!
						</div>
					</div>
					<div
						v-if="filteredHotels.length == 0 && loaded && (anyFilterApplied || selectedCategories.length)
						"
						style="margin-bottom: 50px;"
						class="d-flex flex-column align-items-center"
					>
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
						<button class="error-btn mx-auto" @click="clearHotelFilters">
							پاک‌سازی فیلترها
						</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="loaded" class="mobile-filter d-none w-100">
			<span class="selected-filter" @click="openFilterAndScroll('all')">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.3652 0.125H1.60938C1.05078 0.125 0.771484 0.785156 1.17773 1.16602L5.875 5.86328V11.0938C5.875 11.2969 5.95117 11.5 6.12891 11.6016L8.16016 13.0234C8.56641 13.3027 9.125 13.0234 9.125 12.5156V5.86328L13.7969 1.16602C14.2031 0.785156 13.9238 0.125 13.3652 0.125Z" fill="white" />
				</svg>
				فیلتر ها
			</span>
		</div>
		<city-page-schema v-show="false" :city-meta="Meta" :city-hotel-list="filteredHotels" />
		<faq v-if="Meta.FrequentlyAskedQuestions && Meta.FrequentlyAskedQuestions.length && (this.$route.query.CheckInDate == null || this.$route.query.CheckOutDate == null)" :title=" 'سوالات متداول شما درباره رزرو هتل ' + Meta.NameFa" :faq="Meta.FrequentlyAskedQuestions" />
		<cities-description v-if="this.$route.query.CheckInDate == null || this.$route.query.CheckOutDate == null" :footer="Meta.Footer" />
	</div>
</template>
<script>
import Axios from 'axios';
import { mapGetters, mapState, mapMutations } from 'vuex';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Vue from 'vue';
import searchDates from '@/mixins/searchDates';
import HotelSearch from '~/components/hotel/HotelSearch.vue';
import FilterHotel from '~/components/hotel/FilterHotel.vue';
import Hotel from '~/components/hotel/Hotel.vue';
import HotelSort from '~/components/hotel/HotelSort';
import CitiesDescription from '~/components/hotel/CitiesDescription';
import skeleton from '~/components/hotel/skeleton';
import HotelSearchBadge from '~/components/hotel/HotelSearchBadge.vue';
import cityPageSchema from '~/schemas/cityPage';
import HotelStore from '~/store/Hotel';
import Faq from '~/components/faq';
import InnerPageHeader from '~/components/layouts/InnerPageHedear';
let infiniteScroll;
if (process.client) {
	infiniteScroll = require('vue-infinite-scroll');
	Vue.use(infiniteScroll);
}
const moment = require('moment-jalaali');
library.add(faPen);
export default {
	components: {
		FilterHotel,
		HotelSearch,
		Hotel,
		HotelSort,
		CitiesDescription,
		skeleton,
		HotelSearchBadge,
		cityPageSchema,
		Faq,
		InnerPageHeader
	},
	mixins: [searchDates],
	async fetch ({ store }) {
		const payload = { ResidenceCity:1 };
		await HotelStore.of(store).loadCities(payload);
		await HotelStore.of(store).loadHotelNameList();
	},
	async asyncData({ params, error, payload, store }) {
		const uid = Math.random().toString(36).substring(2);
		let meta = [];
		try {
			if (payload) {
				meta = Promise.resolve(payload);
			} else if (!params.hotelType) {
				const res = await Axios.get(process.env.VUE_APP_HOTEL_BASE + `/api/City/meta?cityNameEn=${encodeURIComponent(params.origin)}`);
				meta = res.data.Result;
			} else if (params.hotelType.substring(0, 4) === 'type') {
				const res = await Axios.get(process.env.VUE_APP_HOTEL_BASE + `/api/hotelType/meta?cityNameEn=${params.origin}&HotelTypeNameEn=${params.hotelType.substring(0, params.hotelType.length - 1)}`);
				meta = res.data.Result;
			}
		} catch (err) {
			if (!err.response) {
				error({ statusCode: 500, message: 'Network Error' });
			} else if (err.response.status === 404) {
				error({ statusCode: 404, message: 'چنین صفحه ای وجود ندارد!' });
			} else {
				error({ statusCode: 500, message: 'مشکلی در سرور به وجود آمده است.' });
			}
		};
		return {
			Meta: meta[0],
			uniqueKey: uid
		};
	},
	data: function () {
		return {
			limit: 10,
			busy: false,
			list: [],
			hotelsCountLimit: 10,
			sortOptionSelected: '',
			mode: 'city', // or 'hotel'
			hotelStar: '',
			CityHotelList: this.$store.state.Hotel.cities.concat(this.$store.state.Hotel.hotelNameList),
			dayNames: [
				{ en: 'Sat', fa: 'شنبه' },
				{ en: 'Sun', fa: 'یکشنبه' },
				{ en: 'Mon', fa: 'دوشنبه' },
				{ en: 'Tue', fa: 'سه شنبه' },
				{ en: 'Wed', fa: 'چهارشنبه' },
				{ en: 'Thu', fa: 'پنجشنبه' },
				{ en: 'Fri', fa: 'جمعه' }
			],
			monthNames: [
				'فروردین',
				'اردیبهشت',
				'خرداد',
				'تیر',
				'مرداد',
				'شهریور',
				'مهر',
				'آبان',
				'آذر',
				'دی',
				'بهمن',
				'اسفند'
			],
			showMenu: false,
			filtersStickyOptions: {
				topSpacing: 20,
				bottomSpacing: 0,
				resizeSensor: true, // [1] read above
				stickyClass: 'is-affixed'
			},
			selectedFilterType: 'all',
			mobileSearchBox: false,
			isDesktop: false,
			topAdUrl: ''
		};
	},
	computed: {
		...mapState('Hotel', [
			'error',
			'loaded',
			'metaData',
			'capacity',
			'selectedHoteltype',
			'selectedAmenities',
			'selectedHotelScore',
			'selectedCategories'
		]),
		...mapState('Hotel', {
			filteredHotels: 'cityHotels'
		}),
		...mapGetters('Hotel', [
			'filter'
		]),
		city: function () {
			return this.$route.params.origin ? this.$route.params.origin.toLowerCase() : '';
		},
		anyFilterApplied () {
			return this.selectedAmenities.length || this.selectedHotelScore.length;
		},
		searchedDuration () {
			if (this.$route.query.CheckOutDate && this.$route.query.CheckInDate) {
				return moment(this.$route.query.CheckOutDate, 'jYYY-jMM-jDD').diff(moment(this.$route.query.CheckInDate, 'jYYY-jMM-jDD')) / 1000 / 3600 / 24;
			} else {
				return 1;
			}
		}
	},
	watch: {
		'$route.params': function (newParams, oldParams) {
			if (newParams.origin !== oldParams.origin || newParams.hotel !== oldParams.hotel) {
				this.search();
			}
		},
		'$route.query': function (newQuery, oldQuery) {
			if (newQuery.CheckInDate !== oldQuery.CheckInDate || newQuery.CheckOutDate !== oldQuery.CheckOutDate || newQuery.capacity !== oldQuery.capacity) {
				this.search();
			}
		},
		filteredHotels: function (val) {
			this.list = val.slice(0, Math.max(this.list.length, this.limit));
		},
		searchedDuration: function (val) {
			this.setDuration(val);
		},
		mobileSearchBox (newVal, oldVal) {
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
		}

	},
	beforeMount: function () {
		if (window && window.innerWidth > 768) {
			this.isDesktop = true;
		}
		this.setFilterType(this.$route.params.hotel);
		this.search();
	},
	mounted: function () {
		Axios.get(`https://blog.radar361.com/ads/hotels/${this.city}/top.txt`).then((res) => {
			this.topAdUrl = res.data;
		});
	},
	methods: {
		...mapMutations('Hotel', ['setSortHotel', 'setLoaded', 'setError', 'setFilteredHotel', 'setFilterType', 'setDuration']),
		selectedSort: function (type, order) {
			this.sortOptionSelected = type;
			this.setSortHotel({ type, order });
		},
		tryAgain: function () {
			this.$router.go(this.$route.path);
		},
		search () {
			const that = this;
			that.busy = true;
			let hotelType = '';
			let hotelCategory = '';
			let capacity = '';
			if (this.$route.params.hotelType && this.$route.params.hotelType.substring(0, 4) === 'type') {
				hotelType = this.$route.params.hotelType.substring(0, this.$route.params.hotelType.length - 1);
			}
			if (this.$route.query.capacity) {
				capacity = this.$route.query.capacity;
			}
			if (this.$route.params.hotel && this.$route.params.hotel.substring(0, 3) === 'tag') {
				hotelCategory = this.filter;
			}
			const payload = { cityName: this.city, checkInDate: this.CheckInDate, checkOutDate: this.CheckOutDate, hotelType: hotelType, hotelCategory: hotelCategory, capacity: capacity !== 'all' ? capacity : '' };
			HotelStore.of(this.$store).hotelSearch(payload);
			this.loadMore();
		},
		openFilterAndScroll (id) {
			this.selectedFilterType = id;
			if (this.$refs.FilterHotel) {
				this.$refs.FilterHotel.filtersOpen = true;
				this.$refs.FilterHotel.filterButtonClicked(id);
			}
		},
		clearHotelFilters: function () {
			this.$refs.FilterHotel.clearHotelFilters();
		},
		searchHotels: function (id, CheckInDate, CheckOutDate, capacity) {
			this.mobileSearchBox = false;
			if (this.$route.query.CheckInDate === CheckInDate && this.$route.query.CheckOutDate === CheckOutDate && this.$route.params.origin === id && this.$route.query.capacity === capacity && !this.$route.params.hotel) {
				this.$router.go({ path: '/' + id, query: { CheckInDate: moment(CheckInDate.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD'), CheckOutDate: moment(CheckOutDate.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD'), capacity: capacity } });
			} else {
				this.$refs.FilterHotel.clearHotelFilters();
				this.$router.push({ path: '/' + id, query: { CheckInDate: moment(CheckInDate.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD'), CheckOutDate: moment(CheckOutDate.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD'), capacity: capacity } });
			}
			this.$refs.HotelSearch.searchLoading = false;
		},
		loadMore: function () {
			this.busy = true;
			this.list = this.filteredHotels.slice(0, this.limit + this.list.length);
			this.busy = false;
		},
		calcDate: function (date) {
			moment.loadPersian({ dialect: 'persian-modern' });
			return moment(date, 'YYYY-MM-DD').format('dddd') + ' ' + moment(date).format('jDD') + ' ' + moment(date, 'YYYY-MM-DD').format('jMMMM');
		}

	},
	middleware: 'cityRedirect',
	head () {
		let indexStatus = null;
		if (this.$route.name === 'hotelTypePage') {
			indexStatus = 'noindex, nofollow';
		}
		return {
			link: [
				{
					rel: 'canonical',
					href: 'https://radar361.com/' + this.city + '/' + this.filter
				}
			],
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: indexStatus ?? this.Meta.Description
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: indexStatus ?? this.Meta.Keyword
				},
				{
					hid: 'og:title',
					property: 'og:title',
					content: indexStatus ?? (this.Meta.Title ? this.Meta.Title : this.Meta.LandingTitle)
				},
				{
					itemprop: 'name',
					content: indexStatus ?? (this.Meta.Title ? this.Meta.Title : this.Meta.LandingTitle)
				},
				{
					hid: 'og:description',
					property: 'og:description',
					content: indexStatus ?? this.Meta.Description
				},
				{
					property: 'og:url',
					content: indexStatus ?? 'https://radar361.com/' + this.city
				},
				{
					property: 'og:site_name',
					content: indexStatus ?? 'radar361'
				},
				{
					property: 'og:type',
					content: indexStatus ?? 'website'
				},
				{
					name: 'twitter:card',
					content: indexStatus ?? 'summary'
				},
				{
					name: 'twitter:site',
					content: indexStatus ?? '@radar361'
				},
				{
					itemprop: 'image',
					content: indexStatus ?? 'https://radar361.com/Radar361.png'
				},
				{
					property: 'og:image',
					content: indexStatus ?? 'https://radar361.com/Radar361-cover.png'
				},
				{
					property: 'og:image:width',
					content: indexStatus ?? '400'
				},
				{
					property: 'og:image:height',
					content: indexStatus ?? '300'
				},
				{
					name: 'twitter:image:src',
					content: indexStatus ?? 'https://radar361.com/Radar361.png'
				},
				{
					name: 'twitter:url',
					content: indexStatus ?? 'https://radar361.com/' + this.city
				},
				{
					name: 'twitter:title',
					content: indexStatus ?? 'رادار361 | مقایسه و خرید بلیط هواپیما ارزان'
				},
				{
					name: 'twitter:description',
					content: indexStatus ?? this.Meta.Description
				}
			],
			title: this.Meta.Title ? this.Meta.Title : this.Meta.LandingTitle
		};
	}
};
</script>
<style scoped>
@import url('~/assets/css/residence.css');
::v-deep .inner-wrapper-sticky {
	left: unset !important;
}
::v-deep .sidebar{
    will-change: min-height;
}
::v-deep .sidebar__inner{
	right: 0px;
    transform: translate(0, 0); /* For browsers don't support translate3d. */
    transform: translate3d(0, 0, 0);
    will-change: position, transform;
}
::v-deep .mobile-hotel-search .search-btn {
	background-color: #EB384D !important
}
::v-deep .mobile-hotel-search #search-box {
	margin: 0 0 24px 0!important;
}
.ad-banner {
	border: 1px solid #CCCCCC;
    border-radius: 5px;
	height: 81.81px;
	object-fit: cover;
}
@media only screen and (max-width: 768px) {
	::v-deep .ad-banner {
		display: none;
	}
	.mobile-ad-banner {
		display: block !important;
		border: 1px solid #CCCCCC;
		border-radius: 5px;
		height: unset
	}
}
</style>
