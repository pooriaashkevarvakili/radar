<template>
	<div id="airplanepage">
		<div v-if="mobileSearchBox" class="mobile-flight-search">
			<div class="mobile-flight-search__body">
				<div class="mobile-flight-search__header d-flex justify-content-center align-items-center">
					<img src="~/assets/images/white-close.svg" alt="white-close" @click="mobileSearchBox = false">
					<img src="~/assets/images/radar-logo-white.svg" alt="radar-logo">
				</div>
				<search
					ref="search"
					:meta-origin="metaOrigin"
					:meta-destination="metaDestination"
					:default-date="date"
					:show-reverse="false"
					:disable="true"
					:disabled="true"
					:show-currency="false"
					:city-list="cities"
					:home-search="true"
					@searchFlights="searchFlights"
				/>
			</div>
		</div>

		<inner-page-header @openSearchBox="mobileSearchBox = true">
			<template v-slot:content>
				<div class="mobile-header__title" @click="mobileSearchBox = true">
					<div class="mobile-header__title-name">
						هواپیما {{ metaOrigin }} به {{ metaDestination }}
					</div>
					<div class="mobile-header__title-date">
						{{ calcDate(date) }}
					</div>
				</div>
			</template>
		</inner-page-header>
		<div v-if="showMenu" class="d-flex flex-column align-items-baseline menu">
			<nuxt-link to="/">
				<svg
					class="menu-icon"
					width="33"
					height="30"
					viewBox="0 0 33 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M31.8683 4.60057C32.3203 4.60057 32.7723 4.20506 32.7723 3.69655V1.88851C32.7723 1.43651 32.3203 0.984497 31.8683 0.984497H1.1317C0.623186 0.984497 0.227678 1.43651 0.227678 1.88851V3.69655C0.227678 4.20506 0.623186 4.60057 1.1317 4.60057H1.97921V26.297H1.1317C0.623186 26.297 0.227678 26.749 0.227678 27.201V29.0091C0.227678 29.5176 0.623186 29.9131 1.1317 29.9131H14.692V25.393C14.692 24.941 15.0875 24.489 15.596 24.489H17.404C17.856 24.489 18.308 24.941 18.308 25.393V29.9131H31.8683C32.3203 29.9131 32.7723 29.5176 32.7723 29.0091V27.201C32.7723 26.749 32.3203 26.297 31.8683 26.297H30.9643V4.60057H31.8683ZM14.692 7.14312C14.692 6.80411 15.031 6.4086 15.37 6.4086H17.5735C17.9125 6.4086 18.308 6.80411 18.308 7.14312V9.34666C18.308 9.68567 17.9125 10.0247 17.5735 10.0247H15.37C15.031 10.0247 14.692 9.68567 14.692 9.34666V7.14312ZM14.692 12.5672C14.692 12.2282 15.031 11.8327 15.37 11.8327H17.5735C17.9125 11.8327 18.308 12.2282 18.308 12.5672V14.7708C18.308 15.1098 17.9125 15.4488 17.5735 15.4488H15.37C15.031 15.4488 14.692 15.1098 14.692 14.7708V12.5672ZM7.45982 7.14312C7.45982 6.80411 7.79883 6.4086 8.13783 6.4086H10.3414C10.6804 6.4086 11.0759 6.80411 11.0759 7.14312V9.34666C11.0759 9.68567 10.6804 10.0247 10.3414 10.0247H8.13783C7.79883 10.0247 7.45982 9.68567 7.45982 9.34666V7.14312ZM10.3414 15.4488H8.13783C7.79883 15.4488 7.45982 15.1098 7.45982 14.7708V12.5672C7.45982 12.2282 7.79883 11.8327 8.13783 11.8327H10.3414C10.6804 11.8327 11.0759 12.2282 11.0759 12.5672V14.7708C11.0759 15.1098 10.6804 15.4488 10.3414 15.4488ZM11.0759 22.6809C11.0759 19.6864 13.4489 17.2568 16.5 17.2568C19.4946 17.2568 21.9241 19.6864 21.9241 22.6809H11.0759ZM25.5402 14.7708C25.5402 15.1098 25.1447 15.4488 24.8057 15.4488H22.6021C22.2631 15.4488 21.9241 15.1098 21.9241 14.7708V12.5672C21.9241 12.2282 22.2631 11.8327 22.6021 11.8327H24.8057C25.1447 11.8327 25.5402 12.2282 25.5402 12.5672V14.7708ZM25.5402 9.34666C25.5402 9.68567 25.1447 10.0247 24.8057 10.0247H22.6021C22.2631 10.0247 21.9241 9.68567 21.9241 9.34666V7.14312C21.9241 6.80411 22.2631 6.4086 22.6021 6.4086H24.8057C25.1447 6.4086 25.5402 6.80411 25.5402 7.14312V9.34666Z" fill="#B2B2B2" />
				</svg>
				هتل
			</nuxt-link>
			<nuxt-link to="/flights">
				<svg
					class="menu-icon"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0.743174 16.2133C0.658846 16.1287 0.574518 15.951 0.481757 15.7818C0.397429 15.4348 0.481757 15.0964 0.650413 14.8341C0.91183 14.5718 1.24914 14.3179 1.76354 14.1487C2.10929 14.0641 2.53936 13.9795 3.05376 13.8864C3.99823 13.8018 4.94271 13.8864 5.37278 13.8864H5.45711L9.83373 9.06331L2.04072 5.5997L1.25757 6.39793C0.996158 6.66024 0.481757 6.66024 0.228773 6.39793C-0.0326435 6.13563 -0.116972 5.61947 0.228773 5.36563L3.14652 2.43794C3.49227 2.09102 4.00667 1.92179 4.52107 2.00641L6.663 2.42948L8.03755 1.05026C8.29896 0.787949 8.81336 0.787949 9.06635 1.05026C9.32776 1.31256 9.41209 1.82872 9.06635 2.08256L8.38329 2.68333L10.7023 3.11487L12.1612 1.73564C12.3298 1.56641 12.5724 1.56641 12.6756 1.56641C12.9011 1.5664 13.0411 1.6594 13.19 1.82872C13.4562 2.13153 13.5357 2.60717 13.19 2.86102L12.5069 3.46179L15.256 3.97794H15.4247C18.3424 0.534104 21.4373 -0.328971 23.1491 0.102566C23.3178 0.187182 23.4949 0.271797 23.6635 0.364873C23.8322 0.534104 23.9249 0.711796 23.9249 0.881026C24.2707 2.60717 23.4949 5.70409 20.0627 8.63177V8.71639L20.5771 11.4748L21.2602 10.7895C21.5216 10.5272 22.036 10.5272 22.289 10.7895C22.5504 11.0518 22.6347 11.5679 22.289 11.8218L20.8301 13.2856L21.2602 15.6125L21.9432 14.9271C22.2047 14.6648 22.7191 14.6648 22.972 14.9271C23.225 15.1894 23.3178 15.7056 22.972 15.9594L21.5975 17.3387L22.0276 19.4964C22.1119 20.0125 21.9432 20.5287 21.5975 20.8756L18.6797 23.8033C18.4183 24.0656 17.9039 24.0656 17.6509 23.8033C17.3895 23.541 17.3281 23.0936 17.6509 22.771L20.5687 19.8433L18.5111 8.98716C18.4268 8.38639 18.5954 7.87024 19.0255 7.52332C22.289 4.68025 22.4576 2.26871 22.4576 1.58333V1.49872H22.3733C21.6903 1.49872 19.2869 1.66795 16.4535 4.94255C16.1077 5.37409 15.509 5.54332 14.9103 5.45871L4.17532 3.37717L3.06219 4.57871L10.9637 8.02254C11.1324 8.10716 11.2251 8.19178 11.3095 8.28485C11.7395 8.71639 11.7395 9.40177 11.3938 9.83331L6.50278 15.1725C6.24136 15.4348 5.90405 15.5194 5.5583 15.5194C5.21256 15.5194 4.26809 15.4348 3.23928 15.4348C3.07063 15.4348 2.97787 15.4348 2.80921 15.5194H2.54779L6.24136 17.4148C6.32569 17.4994 6.41002 17.4994 6.50278 17.5841C6.5871 17.6687 6.67143 17.7533 6.67143 17.8464L8.56038 21.5525L8.64471 21.2056C8.64471 21.0364 8.64471 20.9433 8.72904 20.774C8.81336 19.8264 8.72904 18.8787 8.64471 18.4471C8.64471 18.1002 8.72904 17.7617 8.99045 17.4994L14.3115 12.5918C14.7416 12.1602 15.4247 12.2448 15.8548 12.6764C15.9391 12.761 16.0234 12.9387 16.1162 13.1079L17.7437 17.5841C17.828 17.7533 17.8492 17.9752 17.7437 18.1848C17.6467 18.3776 17.5186 18.4643 17.3136 18.5317C17.019 18.6286 16.7634 18.5818 16.5088 18.4048C16.3901 18.3223 16.2764 18.1002 16.2764 18.1002L14.9018 14.2248L10.1795 18.5317V18.6164C10.2638 19.0479 10.2638 19.9956 10.1795 20.9433C10.1795 21.4594 10.0951 21.891 9.91806 22.2379C9.7494 22.754 9.57232 23.101 9.235 23.3548C8.97359 23.6171 8.63628 23.7017 8.29053 23.524C8.12187 23.4394 7.94479 23.3548 7.86046 23.2617C7.77613 23.2617 7.77613 23.1771 7.6918 23.0925L5.45711 18.701L0.996158 16.3741C0.91183 16.2979 0.827502 16.2979 0.743174 16.2133Z" fill="#B2B2B2" />
				</svg>هواپیما
			</nuxt-link>
		</div>
		<search
			ref="search"
			class="desktop-search"
			:meta-origin="metaOrigin"
			:meta-destination="metaDestination"
			:default-date="date"
			:show-reverse="false"
			:disable="true"
			:disabled="true"
			:show-currency="false"
			:city-list="cities"
			@searchFlights="searchFlights"
		/>
		<div class="custom-container">
			<div class="row justify-content-between w-100">
				<filters
					ref="filters"
					origin="تهران"
					:airlines="Airlines"
					:aircraft-types="AircraftTypes"
					:cabin-classes="CabinClasses"
					:stops="meta.Stops"
					:loaded="loaded"
					@apply="applyFilter"
				/>
				<div class="box-carts">
					<div class="box-price-calendar">
						<price-calendar ref="priceCalendar" :origin="$route.params.origin" :destination="$route.params.destination" :default-date="new Date(date)" />
					</div>
					<div class="w-100 share-row">
						<div id="box-result d-flex">
							<flight-sort
								v-if="loaded && flights.length > 0"
								:loaded="loaded && flights.length > 0"
								:flight-sort-option="sortOptionSelected"
								:show-share="true"
								:total-count="flights.length"
								:shown-count="filteredFlights != null ? Math.min(flightsCountLimit, filteredFlights.length) : 0"
								@flightSelecetdSort="selectedSort"
							/>
						</div>
					</div>
					<flight-sort
						v-if="loaded && flights.length > 0"
						:loaded="loaded && flights.length > 0"
						class="share-mobile"
						:flight-sort-option="sortOptionSelected"
						:show-share="true"
						:total-count="flights.length"
						:shown-count="filteredFlights != null ? Math.min(flightsCountLimit, filteredFlights.length) : 0"
						@flightSelecetdSort="selectedSort"
					/>
					<div v-if="loaded" class="w-100">
						<a v-if="topAdUrl" :href="topAdUrl" target="_blank" class="w-100">
							<img class="ad-banner w-100" :src="`https://blog.radar361.com/ads/flights/${$route.params.origin + '-' + $route.params.destination}/top.png`">
							<img class="mobile-ad-banner d-none w-100" :src="`https://blog.radar361.com/ads/flights/${$route.params.origin + '-' + $route.params.destination}/top.png`">
						</a>
						<nuxt-link v-else to="/contactUs" class="w-100">
							<img class="ad-banner" src="~assets/images/advertise/large-ad.svg">
							<img class="mobile-ad-banner d-none" src="~assets/images/advertise/mobile-ad.svg">
						</nuxt-link>
					</div>
					<div v-else class="list-ad-banner-skeleton" />
					<div v-if="!loaded" class="d-flex flex-column w-100 flight-skelton">
						<flight-skelton v-for="i in 4" :key="i" />
					</div>
					<div v-show="flights != null && loaded" class="flights w-100">
						<flight
							v-for="(flight, index) in filteredFlights != null ? filteredFlights : []"
							:key="index"
							ref="flight"
							:flight="flight"
							:value="flight"
						/>
					</div>
					<div v-if="flights != null && flights.length == 0 && meta.ActiveRoute && loaded" class="d-flex flex-column">
						<img id="no-result" src="~assets/images/noresult.svg" alt="No Result">
						<div id="no-result-for-day">
							برای این روز نتیجه‌ای پیدا نشد!
						</div>
						<div id="go-another-day">
							با رفتن به روزهای دیگه می‌تونید به انتظار این سفر پایان بدید.
						</div>
					</div>
					<div v-show="meta != null && !meta.ActiveRoute">
						<div id="still-no-way">
							این مسیر هنوز راه‌اندازی نشده!
						</div>
						<div id="go-another-day">
							مسیر انتخابی شما، در سازمان هواپیمایی کشوری تعریف نشده است.
						</div>
						<a id="choose-another-way" href="#header-border-bottom" @click="$refs.search.editSearchFocus()">انتخاب سایر مسیرها</a>
					</div>
					<div v-show="timeOut">
						<div id="go-another-day">
							خطایی در بارگیری رخ داد، لطفا مجددا تلاش فرمایید!
						</div>
					</div>
					<div v-show="flights != null && flights.length > 0 && getShownFlights() == 0">
						<img id="no-result" src="~assets/images/noresult.svg" alt="No Result">
						<div id="no-result-for-day">
							برای این روز نتیجه‌ای پیدا نشد!
						</div>
						<div id="go-another-day">
							با رفتن به روزهای دیگه و یا تغییر فیلترها می‌تونید به انتظار این سفر پایان بدید.
						</div>
						<button class="error-btn mx-auto" @click="clearFilters">
							پاک‌سازی فیلترها
						</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="flights.length > 0 && loaded" class="mobile-filter d-none w-100">
			<span class="selected-filter" @click="filterButtonClicked">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13.3652 0.125H1.60938C1.05078 0.125 0.771484 0.785156 1.17773 1.16602L5.875 5.86328V11.0938C5.875 11.2969 5.95117 11.5 6.12891 11.6016L8.16016 13.0234C8.56641 13.3027 9.125 13.0234 9.125 12.5156V5.86328L13.7969 1.16602C14.2031 0.785156 13.9238 0.125 13.3652 0.125Z" fill="white" />
				</svg>
				فیلتر ها
			</span>
		</div>
		<div v-if="showTimeoutModal" class="timeout-modal">
			<div class="modal-container d-flex flex-column justify-content-start align-items-center">
				<img src="~assets/images/red-timer.svg" alt="timer" class="timer-img">
				<div class="timeout-modal__title">
					زمان زیادی گذشت!
				</div>
				<div class="timeout-modal__subtitle tac">
					از آخرین جستجوی شما مدتی گذشته و ممکنه اطلاعات تغییرکرده باشه. دوباره جستجو کنم؟
				</div>
				<div class="timeout-modal__buttons d-flex w-100 justify-content-center">
					<button class="btn" @click="test">
						ماندن در صفحه
					</button>
					<button class="btn" @click="closeTimeOutModal">
						<font-awesome-icon class="text-white ml-2 fa-style" :icon="['fas', 'sync']" />
						به روز رسانی
					</button>
				</div>
			</div>
		</div>
		<flight-footer v-if="!$route.query.date" :origin="metaOrigin" :destination="metaDestination" />
		<faq v-if="flightFaq && flightFaq.length && !$route.query.date" :title="'سوالات متداول شما درباره بلیط هواپیما ' + metaOrigin + ' ' + metaDestination" :faq="flightFaq" />
	</div>
</template>
<script>
import VCalendar from 'v-calendar';
import Axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import { faPen, faSync } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Search from '~/components/flight/FlightSearch.vue';
import FlightSort from '~/components/flight/FlightSort';
import PriceCalendar from '~/components/flight/PriceCalendar.vue';
import Flight from '~/components/flight/Flight.vue';
import Filters from '~/components/flight/FilterFlight.vue';
import flightSkelton from '~/components/flight/flightSkeleton';
import FlightFooter from '~/components/flight/flightFooter';
import Faq from '~/components/faq';
import InnerPageHeader from '~/components/layouts/InnerPageHedear';
const moment = require('moment-jalaali');
library.add(faPen, faSync);
export default {
	name: 'Flights',
	components: {
		PriceCalendar,
		Flight,
		Filters,
		Search,
		FlightSort,
		flightSkelton,
		FlightFooter,
		Faq,
		InnerPageHeader
	},
	async asyncData({ store, params, error, payload }) {
		await store.dispatch('Flight/loadCities');
		const allCities = store.state.Flight.cities[0].list.concat(store.state.Flight.cities[1].list);
		const origin = allCities.filter((item) => {
			return item.CityCode === params.origin;
		});
		const destination = allCities.filter((item) => {
			return item.CityCode === params.destination;
		});
		if (origin.length && destination.length) {
			return {
				Meta: {
					title: `بهترین قیمت بلیط هواپیما ${origin[0].label} به ${destination[0].label} - رادار361`,
					description: `هوشمند و بدون واسطه ارزان ترین پروازها و تامین کنندگان ${origin[0].label} به ${destination[0].label} را بررسی و ارزان ترین بلیط هواپیما را تهیه کنید.`,
					keywords: `بلیط هواپیما  ${origin[0].label} به ${destination[0].label} , قیمت ${origin[0].label} به ${destination[0].label} ,  ${origin[0].label} به ${destination[0].label}`
				},
				metaOrigin: origin[0].label,
				metaDestination: destination[0].label
			};
		}
	},
	data: function () {
		return {
			timeOut: false,
			meta: {
				Stops: {
					Direct: true,
					Indirect: true
				},
				ActiveRoute: true
			},
			flightsCountLimit: 10,
			monthes: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
			sortOptionSelected: '',
			dayNames: [
				{ en: 'Sat', fa: 'شنبه' },
				{ en: 'Sun', fa: 'یکشنبه' },
				{ en: 'Mon', fa: 'دوشنبه' },
				{ en: 'Tue', fa: 'سه شنبه' },
				{ en: 'Wed', fa: 'چهارشنبه' },
				{ en: 'Thu', fa: 'پنجشنبه' },
				{ en: 'Fri', fa: 'جمعه' }
			],
			showMenu: false,
			mobileSearchBox: false,
			showTimeoutModal: false,
			interval: 0,
			topAdUrl: ''
		};
	},
	computed: {
		...mapState('Flight', [
			'flights',
			'filteredFlights',
			'AircraftTypes',
			'Airlines',
			'CabinClasses',
			'metaData',
			'loaded',
			'cities',
			'flightFaq'
		]),
		date: function () {
			if (this.$route.query.date !== undefined) {
				return moment(this.$route.query.date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
			} else {
				return moment().format('YYYY-MM-DD');
			}
		}
	},
	watch: {
		'$route.query': function (newParams, oldParams) {
			if (!newParams.date) {
				newParams.date = new Date();
			}
			if (newParams.date !== oldParams.date) {
				this.search();
			}
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
	mounted: function () {
		this.search();
		this.$root.$emit('tabChanged', 'Flight');
		this.interval = window.setInterval(() => {
			this.showTimeoutModal = true;
		}, 600000);
		Axios.get(`https://blog.radar361.com/ads/flights/${this.$route.params.origin + '-' + this.$route.params.destination}/top.txt`).then((res) => {
			this.topAdUrl = res.data;
		});
	},
	methods: {
		...mapMutations('Flight', ['setSortFlight']),
		selectedSort: function (type, order) {
			this.sortOptionSelected = type;
			this.setSortFlight({ type, order });
		},
		calcDate: function (date) {
			const jalaliDate = new VCalendar.JDate(new Date(date));
			let dayName;
			this.dayNames.filter((day) => {
				if (day.en === jalaliDate.getGregorianDate().toString().split(' ')[0]) {
					dayName = day.fa;
				}
			});
			return `${dayName} 
            ${jalaliDate.getDate()}
            ${this.monthes[jalaliDate.getMonth()]}
            `;
		},
		search: function () {
			this.timeOut = false;
			const payload = { origin: this.$route.params.origin, destination: this.$route.params.destination, date: this.date };
			this.$store.dispatch('Flight/flightSearch', payload);
		},
		clearFilters: function () {
			this.$refs.filters.clearFilters();
		},
		searchFlights: function (originId, destinationId, date) {
			this.clearFilters();
			this.$router.push({ path: '/flights/' + originId + '-' + destinationId, query: { date: moment(date.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD') } });
			this.mobileSearchBox = false;
		},
		getShownFlights: function () {
			if (!this.filteredFlights) { return 0; }

			let count = 0;
			for (let i = 0; i < this.filteredFlights.length; i++) {
				if (!this.filteredFlights[i].filtered) { count++; }
			}

			return count;
		},
		applyFilter: function (filters) {
			this.$store.dispatch('filterFlights');
		},
		closeTimeOutModal() {
			this.search();
			this.showTimeoutModal = false;
		},
		test() {
			if (this.interval) {
				clearInterval(this.interval);
			}
			this.showTimeoutModal = false;
		},
		filterButtonClicked() {
			this.$refs.filters.filterButtonClicked();
		}
	},
	head() {
		return {
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'بهترین قیمت خرید بلیط پرواز ' + this.metaOrigin + ' ' + this.metaDestination + '،' + ' چارتر و سیستمی. مقایسه و پیداکردن کمترین قیمت رزرو آنلاین بلیط هواپیما از میان فروشندگان مختلف. خرید بلیط هواپیمای' + ' ' + this.metaOrigin + ' ' + this.metaDestination + ' ، ارزان‌ترین قیمت بلیط ' +
					this.metaOrigin + ' ' + this.metaDestination + ' .جستجو و مقایسه از بین فروشندگان مختلف با رادار 361 '
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: this.Meta ? this.Meta.keywords : 'بلیط هواپیما ارزان, بلیط هواپیما, قیمت بلیط هواپیما, بلیط ارزان, پرواز ارزان'
				},
				{
					itemprop: 'name',
					title: 'بلیط هواپیما ' + this.metaOrigin + ' ' + this.metaDestination + ' | خرید ارزان‌ترین پرواز' + this.metaOrigin + ' به ' + this.metaDestination + ' | رادار۳۶۱'
				},
				{
					hid: 'og:title',
					property: 'og:title',
					title: 'بلیط هواپیما ' + this.metaOrigin + ' ' + this.metaDestination + ' | خرید ارزان‌ترین پرواز' + this.metaOrigin + ' به ' + this.metaDestination + ' | رادار۳۶۱'
				},
				{
					hid: 'og:description',
					property: 'og:description',
					content: 'بهترین قیمت خرید بلیط پرواز ' + this.metaOrigin + ' ' + this.metaDestination + '،' + ' چارتر و سیستمی. مقایسه و پیداکردن کمترین قیمت رزرو آنلاین بلیط هواپیما از میان فروشندگان مختلف. خرید بلیط هواپیمای' + ' ' + this.metaOrigin + ' ' + this.metaDestination + ' ، ارزان‌ترین قیمت بلیط ' +
					this.metaOrigin + ' ' + this.metaDestination + ' .جستجو و مقایسه از بین فروشندگان مختلف با رادار 361 '
				},
				{
					property: 'og:url',
					content: 'https://radar361.com/flights/' + this.$route.params.origin + '-' + this.$route.params.destination
				},
				{
					property: 'og:site_name',
					content: 'radar361'
				},
				{
					property: 'og:type',
					content: 'website'
				},
				{
					name: 'twitter:card',
					content: 'summary'
				},
				{
					name: 'twitter:site',
					content: '@radar361'
				},
				{
					itemprop: 'image',
					content: 'https://radar361.com/Radar361.png'
				},
				{
					property: 'og:image',
					content: 'https://radar361.com/Radar361.png'
				},
				{
					property: 'og:image:width',
					content: '400'
				},
				{
					property: 'og:image:height',
					content: '300'
				},
				{
					name: 'twitter:image:src',
					content: 'https://radar361.com/Radar361.png'
				},
				{
					name: 'twitter:url',
					content: 'https://radar361.com/flights/' + this.$route.params.origin + '-' + this.$route.params.destination
				},
				{
					name: 'twitter:title',
					title: 'بلیط هواپیما ' + this.metaOrigin + ' ' + this.metaDestination + ' | خرید ارزان‌ترین پرواز' + this.metaOrigin + ' به ' + this.metaDestination + ' | رادار۳۶۱'
				},
				{
					name: 'twitter:description',
					content: this.Meta ? this.Meta.description : 'هوشمند و بدون واسطه ارزان ترین پروازها و تامین کنندگان را بررسی و ارزان ترین بلیط هواپیما را تهییه کنید.'
				}

			],
			title: 'بلیط هواپیما ' + this.metaOrigin + ' ' + this.metaDestination + ' | خرید ارزان‌ترین پرواز' + this.metaOrigin + ' به ' + this.metaDestination + ' | رادار۳۶۱'
		};
	}
};
</script>
<style scoped>
.box-carts {
    margin: unset !important;
}
.mobile-filter {
	position: fixed;
	bottom: 0px;
	right: 0px;
	z-index: 2;
	max-width: 100%;
	height: 70px;
	filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.15));
	overflow-x: auto;
	align-items: center;
}
.selected-filter {
	background: #15BBCC;
	color: white;
	border: none !important;
	padding: 9px 15px;
	margin: 0px 2.5px;
	border-radius: 5px;
	display: inline-block;
	min-width: fit-content;
	font-size: 15px;
	font-weight: 600
}
@media only screen and (min-width: 767.98px) {
    .box-price-calendar {
        width: 100%
    }
}
@media (max-width: 767.98px) {
	.modal-container {
		height: unset !important
	}
    .box-price-calendar {
        float: none;
        width: calc(100% + 10px);
    }
    .desktop-search {
        display: none !important
    }
	.mobile-filter {
		display: flex !important;
		justify-content: center;
	}
}
@media (max-width: 991.98px) and (min-width: 767px) {
    .box-carts {
        width: calc(100% - 300px) !important;
    }
}
.more-result-btn {
	background: #EB384D;
	color: white;
	border-radius: 50px;
	padding: 10px 28px;
}
.mobile-flight-search {
	background-color: rgba(0,0,0,.5);
	position: fixed;
    width: 100%;
    height: 100%;
    z-index: 10;
}
.mobile-flight-search__header {
	height: 72px;
	width: 100%;
	background: #EB384D;
	padding: 0px 24px;
	margin-bottom: 17px
}
.mobile-flight-search__header img:last-child {
    flex: 1;
    transform: translateX(15px);
    max-width: 150px;
    margin: 0 auto;
}
.mobile-flight-search__header img:first-child {
	z-index: 2
}
::v-deep .mobile-flight-search .search-btn {
	background-color: #EB384D !important
}
::v-deep .mobile-flight-search #search-box {
	margin: 0 0 24px 0!important;
}
.timeout-modal {
	position: fixed;
	background: rgba(28, 28, 28, 0.6);
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	z-index: 10000000;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2em;
}
.modal-container {
	background: #FFFFFF;
	border-radius: 10px;
	position: relative;
	max-width: 420px;
	padding: 20px 33px 24px 33px;
}
.timeout-modal__title {
	font-weight: 600;
	font-size: 20px;
	line-height: 31px;
	color: #1899A7;
	text-align: center;
	margin-top: 18px;
	margin-bottom: 20px
}
.timeout-modal__subtitle {
	font-weight: 300;
	font-size: 15px;
	line-height: 26px;
	color: #1D1D1D;
	text-align: center;
	margin-bottom: 17px
}
.timeout-modal__buttons button{
	width: 140px;
	text-align: center;
	height: 42px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 14px;
	cursor: pointer;
	margin-top: 0px !important
}
.timeout-modal__buttons button:first-child {
	border: 1px solid #EB384D;
	border-radius: 21px;
	color: #EB384D;
	margin-left: 10px
}
.timeout-modal__buttons button:last-child {
	border-radius: 21px;
	color: white;
	background-color: #EB384D;
}
.error-btn {
  position: relative;
  border-radius: 20px;
  border: 1px solid #EB384D;
  height: 34px;
  font-weight: 600;
  font-size: 15px;
  line-height: 23px;
  letter-spacing: -0.03em;
  color: #EB384D;
  outline: none;
  background: none;
  margin-top: 10px;
  display: flex;
  padding: 0px 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px
}
.error-btn img {
  margin-left: 10px;
}
.ad-banner {
	border: 1px solid #CCCCCC;
    border-radius: 5px;
	height: 81.81px;
	object-fit: cover
}
@media only screen and (max-width: 768px) {
	.ad-banner {
		display: none;
	}
	.mobile-ad-banner {
		display: block !important;
		border: 1px solid #ccc;
    	border-radius: 5px;
		height: unset;
	}
	.mobile-flight-search__body {
		background: white
	}
	::v-deep .mobile-flight-search__body .home-page .home-page__container {
		box-shadow: none
	}
}
</style>
