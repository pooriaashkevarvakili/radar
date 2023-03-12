<template>
	<div>
		<accommodation-page refs="resort" :meta="resortDetail.Meta" :city="$route.params.city"
			:accommodation-name="$route.params.resort" :comments="resortDetail.Comments"
			:city-name-fa="searchedCity.ProvinceName" :nearest-places="[]"
			:rate-level="resortDetail.Meta && resortDetail.Meta.AverageRate ? resortDetail.Meta.AverageRate : 0"
			:images="resortDetail.Images" :hotel-type="{ Name: '' }"
			:name-fa="resortDetail.Meta && resortDetail.Meta.NameFa ? resortDetail.Meta.NameFa : ''" :address="''"
			:cheaper-seller="resortDetail.Price" button-title="رزرو"
			:description="resortDetail.Meta && resortDetail.Meta.Description ? resortDetail.Meta.Description : ''"
			:check-in-hour="resortDetail.CheckInTime" :check-out-hour="resortDetail.CheckOutTime"
			@reserveButtonClick="reserveButtonClick" :commentsTotalPage="1"
			:footer="resortDetail.Meta && resortDetail.Meta.Footer ? resortDetail.Meta.Footer : ''">
			<template slot="breadcrumb">
				<div class="hotel-route">
					<nuxt-link to="/">
						صفحه‌ی اصلی
					</nuxt-link>
					<svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.919922 4.14062C0.773438 4.28711 0.773438 4.49219 0.919922 4.63867L4.34766 8.03711C4.49414 8.18359 4.72852 8.18359 4.8457 8.03711L5.05078 7.83203C5.19727 7.68555 5.19727 7.48047 5.05078 7.33398L2.0625 4.375L5.08008 1.44531C5.19727 1.29883 5.19727 1.09375 5.08008 0.947266L4.8457 0.742188C4.72852 0.595703 4.49414 0.595703 4.34766 0.742188L0.919922 4.14062Z"
							fill="#BDBDBD" />
					</svg>
					<nuxt-link to="/resort">
						اقامتگاه
					</nuxt-link>
					<svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.919922 4.14062C0.773438 4.28711 0.773438 4.49219 0.919922 4.63867L4.34766 8.03711C4.49414 8.18359 4.72852 8.18359 4.8457 8.03711L5.05078 7.83203C5.19727 7.68555 5.19727 7.48047 5.05078 7.33398L2.0625 4.375L5.08008 1.44531C5.19727 1.29883 5.19727 1.09375 5.08008 0.947266L4.8457 0.742188C4.72852 0.595703 4.49414 0.595703 4.34766 0.742188L0.919922 4.14062Z"
							fill="#BDBDBD" />
					</svg>
					<nuxt-link
						:to="searchedCity.ProvinceName ? '/resort/' + searchedCity.ProvinceName : ' /resort/' + searchedCity.NameEn">
						استان {{ searchedCity.ProvinceName ? searchedCity.ProvinceName : '' }}
					</nuxt-link>
					<svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.919922 4.14062C0.773438 4.28711 0.773438 4.49219 0.919922 4.63867L4.34766 8.03711C4.49414 8.18359 4.72852 8.18359 4.8457 8.03711L5.05078 7.83203C5.19727 7.68555 5.19727 7.48047 5.05078 7.33398L2.0625 4.375L5.08008 1.44531C5.19727 1.29883 5.19727 1.09375 5.08008 0.947266L4.8457 0.742188C4.72852 0.595703 4.49414 0.595703 4.34766 0.742188L0.919922 4.14062Z"
							fill="#BDBDBD" />
					</svg>
					<span class="broadcrumb-hotel-name"> {{ resortDetail && resortDetail.Meta && resortDetail.Meta.NameFa }}
					</span>
				</div>
			</template>
			<template slot="search">
				<resort-search ref="SearchHotel" :check-in-date="checkInDate" :check-out-date="checkOutDate"
					:city-hotel-list="cityList" hotel-title="جستجوی مقصد (شهر/استان)" :home-search="false"
					@searchResort="searchResort" />
			</template>
			<template slot="desktop-seller">
				<div class="container">
					<div id="seller" class="single-hotel-seller-tab">
						<div class="price-calendar-title text-right">
							<span>
								<svg width="24" height="19" viewBox="0 0 24 19" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M23.0156 9.1875L20.75 7.3125V3.5625C20.75 3.40625 20.5938 3.25 20.4375 3.25H19.1875C18.9922 3.28906 18.875 3.40625 18.875 3.5625V5.78906L13.3672 1.25781C13.0547 0.984375 12.4297 0.789062 12 0.789062C11.5312 0.789062 10.9062 0.984375 10.5938 1.25781L0.945312 9.1875C0.828125 9.30469 0.75 9.5 0.75 9.65625C0.75 9.77344 0.789062 9.96875 0.867188 10.0469L1.29688 10.5547C1.375 10.6719 1.60938 10.75 1.76562 10.75C1.88281 10.75 2.07812 10.7109 2.15625 10.6328L3.25 9.73438V17C3.25 17.7031 3.79688 18.25 4.5 18.25H9.5C10.1641 18.25 10.7109 17.7031 10.75 17V12.9375H13.25V17C13.25 17.7031 13.7969 18.25 14.5 18.25H19.5C20.1641 18.25 20.7109 17.7031 20.75 17.0391V9.73438L21.8047 10.6328C21.8828 10.7109 22.0781 10.7891 22.1953 10.7891C22.3516 10.7891 22.5859 10.6719 22.7031 10.5547L23.0938 10.0469C23.1719 9.96875 23.25 9.77344 23.25 9.65625C23.25 9.5 23.1328 9.30469 23.0156 9.1875ZM18.8359 16.375H15.125V12.3125C15.0859 11.6484 14.5391 11.1016 13.875 11.0625H10.125C9.42188 11.1016 8.875 11.6484 8.875 12.3125V16.375H5.125V8.21094L12 2.54688L18.875 8.21094L18.8359 16.375Z"
										fill="#EB384D" />
								</svg>
							</span>
							تقویم قیمتی
						</div>
					</div>
					<div class="price-calendar date-picker">
						<hotel-date-picker ref="datepicker" :price-calendar="true" :single-hotel="true"
							:start-date="checkInDate" :end-date="checkOutDate" title=" تاریخ">
							<template #default="{ item }">
								<span>{{ formatDateAndPrice(item) }}</span>
							</template>
							<template v-slot:price-calendar>
								<div class="d-flex price-calendar-footer justify-content-between align-items-center">
									<span>قیمت رزرو: {{ formatMoney(allDaysPrices) }} تومان</span>
									<button @click="reserveButtonClick">
										رزرو
									</button>
								</div>
							</template>
						</hotel-date-picker>
					</div>
				</div>
			</template>
			<template slot="seller">
				<div id="seller" class="single-hotel-seller-tab">
					<div class="single-hotel-seller-tab-title text-right">
						تقویم قیمتی
					</div>
					<div class="price-calendar  date-picker">
						<hotel-date-picker ref="datepicker" :price-calendar="true" :single-hotel="true"
							:start-date="checkInDate" :end-date="checkOutDate" title=" تاریخ" :month-count="1">
							<template #default="{ item }">
								<span>{{ formatDateAndPrice(item) }}</span>
							</template>
							<template v-slot:price-calendar>
								<div class="d-flex price-calendar-footer justify-content-between align-items-center">
									<button @click="reserveButtonClick">
										رزرو
									</button>
								</div>
							</template>
						</hotel-date-picker>
					</div>
				</div>
			</template>
		</accommodation-page>
	</div>
</template>

<script>
import VCalendar from 'v-calendar';
import { typedMapGetters } from 'vuex-module-accessor';
import Axios from 'axios';
import AccommodationPage from '~/components/accommodationPage.vue';
import ResortSearch from '~/components/resort/resortSearch';
import ResortStore from '~/store/Resort';
import HotelDatePicker from '~/components/hotel/hotelDatePicker';
const moment = require('moment-jalaali');
export default {
	components: {
		AccommodationPage,
		ResortSearch,
		HotelDatePicker
	},
	async asyncData({ params, error, route }) {
		try {
			await Axios.get(process.env.VUE_APP_HOTEL_BASE + '/api/residence/meta?id=' + route.params.resort);
		} catch (err) {
			error({ statusCode: 404, message: 'چنین صفحه ای وجود ندارد!' });
		}
	},
	data() {
		return {
			minDate: new VCalendar.JDate(new VCalendar.JDate().setHours(0, 0, 0, 0)),
			calendar: VCalendar.Dates.JalaliDate,
			dates: {
				start: null,
				end: null
			}

		};
	},
	computed: {
		...typedMapGetters(ResortStore, {
			pricePerDate: ResortStore => ResortStore.pricePerDate
		}),
		checkInDate() {
			return this.$route.query.checkInDate ? moment(this.$route.query.checkInDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
		},
		checkOutDate() {
			return this.$route.query.checkOutDate ? moment(this.$route.query.checkOutDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD') : moment().add(1, 'day').format('YYYY-MM-DD');
		},
		resortDetail() {
			return ResortStore.of(this.$store).state.singleResort;
		},
		cityList() {
			return ResortStore.of(this.$store).state.defaultCities;
		},
		searchedCity() {
			return ResortStore.of(this.$store).state.searchedCityInUrl;
		},
		allDaysPrices() {
			const that = this;
			let startIndex;
			let endIndex;
			let price = 0;
			const selectedDate = Object.keys(this.pricePerDate).filter(i => new Date(i) >= new Date(this.start) && new Date(i) < new Date(this.end));
			selectedDate.map((i) => { price += this.pricePerDate[i].Price; });
			return price;
		},
		start() {
			return moment(new Date(this.$refs.datepicker.$refs.datepicker.dates.start.getGregorianDate())).format('YYYY-MM-DD');
		},
		end() {
			return moment(new Date(this.$refs.datepicker.$refs.datepicker.dates.end.getGregorianDate())).format('YYYY-MM-DD');
		},
		similarResorts() {
			return ResortStore.of(this.$store).state.similarResorts;
		}
	},
	watch: {
		'$route.query': function (newVal, oldVal) {
			if (newVal.checkInDate !== oldVal.checkInDate || newVal.checkOutDate !== oldVal.checkOutDate) {
				ResortStore.of(this.$store).getSingleResortDetail({ resortId: this.$route.params.resort, checkInDate: this.checkInDate, checkOutDate: this.checkOutDate });
			}
		}
	},
	beforeMount() {
		ResortStore.of(this.$store).getSingleResortDetail({ resortId: this.$route.params.resort, checkInDate: this.checkInDate, checkOutDate: this.checkOutDate });
	},
	mounted() {
		ResortStore.of(this.$store).getPricePerDate({ resortId: this.$route.params.resort, checkInDate: moment().format('YYYY-MM-DD'), checkOutDate: moment().add(20, 'day').format('YYYY-MM-DD') });
	},
	methods: {
		searchResort(id, CheckInDate, CheckOutDate, capacity) {
			this.$router.push({ path: '/resort/' + id, query: { checkInDate: CheckInDate, checkOutDate: CheckOutDate, capacity } });
		},
		reserveButtonClick() {
			window.open(this.resortDetail.Price.Seller.URL, '_blank');
		},
		formatDateAndPrice(item) {
			const date = this.pricePerDate[moment(new Date(item.day.dateTime)).format('YYYY-MM-DD')];
			if (date) {
				return date.Price / 1000;
			}
		},
		reserve() {
			const start = new Date(this.$refs.datepicker.$refs.datepicker.dates.start.getGregorianDate());
			const end = new Date(this.$refs.datepicker.$refs.datepicker.dates.end.getGregorianDate());
			this.$router.push({ path: '/resort/singleResort/' + this.resortDetail.Meta.Id, query: { checkInDate: moment(start).format('jYYYY-jMM-jDD'), checkOutDate: moment(end).format('jYYYY-jMM-jDD') } });
		}
	}
};
</script>
<style scoped>
::v-deep .price-calendar .c-day {
	width: 62px;
	height: 58px;
}

::v-deep .price-calendar .start,
::v-deep .price-calendar .end {
	border-radius: 0px !important;
}

::v-deep .price-calendar {
	width: 100% !important;
	height: unset !important;
}

::v-deep .price-calendar .dates-wrapper {
	height: 58px !important;
	width: 430px
}

::v-deep .price-calendar .c-pane-container {
	padding: 50px 90px !important
}

.price-calendar-footer {
	border-top: 1px solid #E6E6E6;
	padding-top: 20px;
	padding-bottom: 60px;
	padding-right: 90px;
	padding-left: 90px
}

::v-deep .price-calendar .hotel-datepicker {
	height: unset !important
}

::v-deep .price-calendar .date {
	width: 100%;
	position: relative;
}

::v-deep .price-calendar .c-pane:last-child:not(:first-child):before {
	height: calc(100% - 230px);
}

.price-calendar-footer button {
	width: 300px;
	height: 50px;
	background: #EB384D;
	border-radius: 5px;
	border: none;
	color: white;
	font-size: 13px;
}

.price-calendar-footer button:focus {
	border: none;
	outline: none
}

.price-calendar-footer span {
	font-size: 20px;
	line-height: 25px;
}

.price-calendar-title {
	color: #333333;
	font-weight: 500;
	font-size: 19px;
	margin-bottom: 20px
}

.price-calendar-title span {
	margin-left: 15px
}

@media only screen and (max-width: 768px) {
	::v-deep .price-calendar .date {
		position: relative;
	}

	::v-deep .price-calendar .dates-wrapper {
		display: none !important
	}

	::v-deep .price-calendar .c-pane-container {
		padding: 0px
	}

	::v-deep .price-calendar .c-pane-container {
		padding: 0px !important
	}

	::v-deep .price-calendar .c-day {
		max-width: 54px;
		height: 50px !important
	}

	::v-deep .price-calendar .date {
		border: 0px !important;
	}

	::v-deep .price-calendar .c-arrow-layout {
		display: block !important
	}

	::v-deep .price-calendar .c-arrow-layout svg {
		color: black !important;
		background: none !important
	}

	::v-deep .price-calendar .days-name {
		top: 45px;
		position: absolute;
		background: none;
		border: none;
	}

	::v-deep .price-calendar .c-header {
		margin-bottom: 25px
	}

	.price-calendar-footer {
		padding: 0px 11px;
		margin-top: 8px
	}

	.price-calendar-footer button {
		width: 100%
	}

}
</style>
