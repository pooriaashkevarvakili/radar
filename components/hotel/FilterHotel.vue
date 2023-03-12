<template>
	<div id="box-filter" :class="{ 'box-filter-open': filtersOpen }">
		<div v-if="loaded" class="flight-box-result-text">
			<img src="~assets/images/search-result-icon.svg" alt="search-result"><span>{{ shownCount }} نتیجه برای جستجوی شما پیدا شد.</span>
		</div>
		<div v-else class="mt-3 flight-box-result-text result-count-placeholder" />
		<div class="filter-title filter-title-mobile d-none align-items-center">
			<img src="~assets/images/right-arrow.svg" alt="right-arrow" @click="close">
			<div class="filter-tiltle-apply-filter">
				اعمال فیتر
			</div>
			<div class="filter-tiltle-clear-history mr-auto" @click="clearHotelFilters">
				پاک‌سازی
			</div>
			<div v-if="loaded" class="w-100">
				<a v-if="filterAdUrl" :href="filterAdUrl" target="_blank" class="w-100">
					<img class="ad-banner w-100" :src="`https://blog.radar361.com/ads/hotels/${$route.params.origin}/right.png`">
				</a>
				<nuxt-link v-else to="/contactUs" class="w-100">
					<img class="ad-banner" src="~assets/images/advertise/small-ad.svg" alt="advertise">
				</nuxt-link>
			</div>
			<div v-else class="filter-ad-banner-skeleton" />
		</div>
		<div v-if="loaded" class="filters">
			<div class="filter-container">
				<div id="filter-title" class="d-flex justify-content-between first-filter-title">
					<label>هزینه</label>
					<img src="~assets/images/angle-down.svg" alt="angle-down">
				</div>
				<div class="box">
					<div class="capacity">
						<div :class="{ 'item-active': capacityItem == 1 }" class="item first-item" @click="capacityItem = 0, setCapacity(1)">
							<img src="~assets/images/user-icon.svg" alt="user"><span v-if="capacityItem == 1">یک نفر</span>
						</div>
						<div :class="{ 'item-active': capacityItem == 2 }" class="item second-item" @click="capacityItem = 2, setCapacity(2)">
							<img src="~assets/images/two-user-icon.svg" alt="user"><span v-if="capacityItem == 2">دو نفر</span>
						</div>
						<div :class="{ 'item-active': capacityItem == 'all' }" class="item third-item" @click="capacityItem = 'all', setCapacity('all')">
							<img src="~assets/images/users-icon.svg" alt="user"><span v-if="capacityItem == 'all'">همه</span>
						</div>
					</div>
					<div class="histogarm-slider">
						<div class="d-flex align-items-end flex-row-reverse histogram-wrapper">
							<div
								v-for="(i, index) in hotelCountArray"
								:key="index"
								class="histogram"
								:class="{'active-bar': i.start >= sliderValue[0] && i.end <= sliderValue[1]}"
								:style="{ 'height': `calc((100% / ${maximumHotels== 0 ? 1 : maximumHotels}) * ${i.count})`}"
							/>
						</div>
						<div v-if="maxPrice && minPrice" class="range-slider">
							<div class="rage-slider-shadow">
								<div class="first-dot" /><div class="second-dot" />
							</div>
							<vue-slider v-model="sliderValue" :min="metaMinPrice" :max="metaMaxPrice" :tooltip="'none'" />
						</div>
						<div v-if="sliderValue[1] && sliderValue[0]" class="row justify-content-between price mb-0">
							<div id="max-price">
								{{ formatMoney(sliderValue[1]) }} ت
							</div>
							<div id="min-price">
								{{ formatMoney(sliderValue[0]) }} ت
							</div>
						</div>
					</div>
					<div class="select-duration-box">
						<div :class="{ 'item-active': activeDuration == 1 }" class="item first-item" @click="durationFilter(duration)">
							کل اقامت
						</div>
						<div :class="{ 'item-active': activeDuration == 2 } " class="item second-item" @click="durationFilter(1)">
							هر شب اقامت
						</div>
					</div>
				</div>
			</div>
			<filter-box
				filter-title="نوع اقامتگاه"
				:filter-length="hotelTypes && hotelTypes.length"
				:filter-options="hotelTypes"
				:selected-filter-oprtion="selectedTypes"
				@setSelectedFilter="setSelectedTypes"
			>
				<template v-slot="{ options }">
					<div class=" airlines-name">
						{{ options.Title ? options.Title : options.FullTitle }}
						<span v-for="(img, i) in options.Stars" :key="i"><img src="~/assets/images/star.png" alt="star"></span>
					</div>
				</template>
			</filter-box>
			<filter-box
				filter-title="امکانات"
				:filter-length="amenities && amenities.length"
				:filter-options="amenities"
				:selected-filter-oprtion="selectedAminities"
				@setSelectedFilter="setSelectedAminities"
			/>
			<filter-box
				filter-title="امتیاز"
				:filter-length="hotelScore && hotelScore.length"
				:filter-options="hotelScore"
				:selected-filter-oprtion="selectedScores"
				@setSelectedFilter="setSelectedScores"
			/>
			<div class="apply-filters">
				<button @click="applyHotel">
					اعمال فیلترها
				</button>
			</div>
		</div>
		<div v-else class="d-flex flex-column">
			<div class="filter-skeleton" />
			<div class="filter-skeleton" />
			<div class="filter-skeleton" />
			<div class="filter-skeleton" />
		</div>
		<nuxt-link v-if="loaded" to="/contactUs">
			<img class="ad-banner" src="~assets/images/advertise/small-ad.svg" alt="advertise">
		</nuxt-link>
		<div v-else class="filter-ad-banner-skeleton" />
	</div>
</template>

<script>
import { faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { mapMutations, mapGetters } from 'vuex';
import Axios from 'axios';
import HotelStore from '~/store/Hotel';
import filterBox from '~/components/filter';
library.add(faTimes, faChevronDown, faChevronUp);
const VueScrollTo = require('vue-scrollto');
export default {
	name: 'FilterHotel',
	components: { filterBox },
	props: {
		origin: {
			type: String,
			default: ''
		},
		amenities: {
			type: Array,
			default: function () {
				return [];
			}
		},
		maxPrice: {
			type: Number,
			default: 0
		},
		minPrice: {
			type: Number,
			default: 0
		},
		hotelStar: {
			type: String,
			default: ''
		},
		shownCount: {
			type: Number,
			default: 0
		},
		duration: {
			type: Number,
			default: 1
		},
		loaded: Boolean
	},
	data: function () {
		return {
			capacityItem: 1,
			durationItem: 0,
			minHotelPrice: 0,
			maxHotelPrice: 1000000,
			minHotelPriceFiltered: 0,
			maxHotelPriceFiltered: Math.max(),
			hotelOptionsCountLimit: 6,
			hotelTypeCountLimit: 3,
			hotelScore: [
				{
					Name: 'محشر',
					max: 10,
					min: 9,
					label: 'بالای ۹ امتیاز'
				},
				{
					Name: 'فوق العاده',
					max: 9,
					min: 8,
					label: '۸ تا ۹ امتیاز'
				},
				{
					Name: 'پسندیدنی',
					max: 8,
					min: 6,
					label: '۶ تا ۸ امتیاز'
				},
				{
					Name: 'معمولی',
					max: 6,
					min: 4,
					label: '۴ تا ۶ امتیاز'
				},
				{
					Name: 'ضعیف',
					max: 4,
					min: 0,
					label: 'پایین ۴ امتیاز'
				}
			],
			disabled: true,
			filtersOpen: false,
			activeDuration: 1,
			selectedTypes: [],
			selectedAminities: [],
			selectedScores: [],
			filterAdUrl: ''
		};
	},
	computed: {
		...mapGetters('Hotel', ['hotelCountArray']),
		sliderValue: {
			get() {
				return [this.$store.state.Hotel.selectedMinPrice, this.$store.state.Hotel.selectedMaxPrice];
			},
			set(value) {
				const payload = [value[0], value[1]];
				HotelStore.of(this.$store).selectedPricesFilter(payload);
				this.scrollToTop();
				this.filterHotels();
			}
		},
		maximumHotels() {
			return this.hotelCountArray.length && this.hotelCountArray.reduce((prev, curr) => prev.count > curr.count ? prev : curr).count;
		},
		hotelTypes() {
			return HotelStore.of(this.$store).state.metaData.Types;
		},
		metaMinPrice() {
			return HotelStore.of(this.$store).state.minPrice;
		},
		metaMaxPrice() {
			return HotelStore.of(this.$store).state.maxPrice;
		}
	},
	watch: {
		hotelTypes: function (val) {
			if (this.$route.query.Types && val) {
				const Types = this.$route.query.Types.split(',');
				const arr = Types.map((i) => { return this.hotelTypes && this.hotelTypes.find(j => j.NameEn === i); });
				this.setSelectedTypes(arr);
			}
		},
		amenities: function (val) {
			if (this.$route.query.Aminities && val) {
				const amenities = this.$route.query.Aminities.split(',');
				const arr = amenities.map((i) => { return this.amenities && this.amenities.find(j => j.Name === i); });
				this.setSelectedAminities(arr);
			}
		},
		'$route.query': function (newQuery) {
			this.capacityItem = newQuery.capacity;
		},
		filtersOpen: function (newVal, oldVal) {
			// go to top of hotel's list after filter closed
			if (newVal === false && oldVal === true) {
				if (window && window.innerWidth < 768) {
					VueScrollTo.scrollTo('body', 300);
				}
			}
			// prevent body scrolling when filter modal opened
			if (newVal === true) {
				this.toggleBodyClass('addClass', 'body-overflow');
			} else {
				this.toggleBodyClass('removeClass', 'body-overflow');
			}
		},
		$route: function (to, from) {
			if (from.hash === '#filter' && to.hash === '') {
				this.filtersOpen = false;
			}
		}
	},
	mounted: function () {
		this.capacityItem = this.$route.query.capacity;
		this.$nextTick(() => {
			if (this.$route.query.Scores && this.hotelScore && this.hotelScore.length) {
				const Scores = this.$route.query.Scores.split(',');
				const arr = Scores.map((i) => { return this.hotelScore && this.hotelScore.find(j => j.Name === i); });
				this.setSelectedScores(arr);
			}
			if (this.$route.query.selectedMinPrice && this.$route.query.selectedMaxPrice) {
				const prices = [parseInt(this.$route.query.selectedMinPrice), parseInt(this.$route.query.selectedMaxPrice)];
				HotelStore.of(this.$store).selectedPricesFilter(prices);
			} else {
				HotelStore.of(this.$store).selectedPricesFilter([this.metaMinPrice, this.metaMaxPrice]);
			}
		});
		Axios.get(`https://blog.radar361.com/ads/hotels/${this.$route.params.origin}/right.txt`).then((res) => {
			this.filterAdUrl = res.data;
		});
	},
	methods: {
		setSelectedTypes(val) {
			this.selectedTypes = val;
			HotelStore.of(this.$store).selectedTypesFilter(val.map((item) => { return item.NameEn; }));
			HotelStore.of(this.$store).filterHotels();
		},
		setSelectedAminities(val) {
			this.selectedAminities = val;
			HotelStore.of(this.$store).selectedAminitiesFilter(val.map((item) => { return item.Name; }));
			HotelStore.of(this.$store).filterHotels();
		},
		setSelectedScores(val) {
			this.selectedScores = val;
			HotelStore.of(this.$store).selectedScoresFilter(val);
			HotelStore.of(this.$store).filterHotels();
		},
		...mapMutations('Hotel', ['setUpdatePriceSlider', 'setDuration']),
		filterHotels() {
			HotelStore.of(this.$store).filterHotels();
		},
		clearHotelFilters: function () {
			this.setSelectedScores([]);
			this.setSelectedAminities([]);
			this.setSelectedTypes([]);
		},
		close: function () {
			this.$emit('close');
			this.$router.go(-1);
		},
		applyHotel: function () {
			this.filtersOpen = false;
			this.$router.go(-1);
		},
		setCapacity: function (val) {
			this.$router.replace({ query: { capacity: val } });
		},
		durationFilter(val) {
			if (val === 1) {
				this.activeDuration = 2;
				const payload = [this.minPrice / this.duration, this.maxPrice / this.duration];
				this.setUpdatePriceSlider(payload);
				this.minHotelPriceFiltered = payload[0];
				this.maxHotelPriceFiltered = payload[1];
				this.setDuration(this.duration);
			} else {
				this.activeDuration = 1;
				const payload = [this.minPrice, this.maxPrice];
				this.setUpdatePriceSlider(payload);
				this.minHotelPriceFiltered = this.minPrice;
				this.maxHotelPriceFiltered = this.maxPrice;
				this.setDuration(1);
			}
		},
		filterButtonClicked(id) {
			this.$router.push({ path: this.$route.fullPath, hash: '#filter' });
			if (this.$refs.id) {
				this.$refs.id.scrollIntoView(true);
			}
		},
		scrollToTop() {
			if (window && window.innerWidth > 768) {
				VueScrollTo.scrollTo('body', 1000, { offset: 200 });
			}
		},
		toggleBodyClass(addRemoveClass, className) {
			const el = document.body;
			if (addRemoveClass === 'addClass') {
				el.classList.add(className);
			} else {
				el.classList.remove(className);
			}
		}
	}
};

</script>
<style scoped>
@import url('~/assets/css/filters.css');
.filter-tiltle-clear-history {
    width: 105px;
    height: 35px;
    margin-left: 0;
    background: #f4f4f4;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
    line-height: 23px;
    color: #eb384d;
    padding: 5px 10px;
    text-align: center;
	display: inline-block
}
@media (max-width: 767.98px) {
    #box-filter {
        background: white;
        display: none;
        position: fixed;
        top: 0px;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 1002;
        overflow: auto;
        border-radius: 0;
		padding-bottom: 0px
    }
	.filter-title-mobile {
		display: block !important;
		padding: 6px 15px;
		height: 66px;
	}
	.apply-filters {
		display: block;
		padding-top: 12px;
	}
	.flight-box-result-text {
		display: none
	}
}
</style>
