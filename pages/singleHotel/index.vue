<template>
	<div>
		<accommodation-page
			:meta="Meta"
			:city="city"
			:accommodation-name="hotelName"
			:comments="hotelComments"
			:comments-count="totalCommentsCount"
			:city-name-fa="cityNameFa[0].label"
			:nearest-places="Meta.NearByPlaces"
			:rate-level="Meta && Meta.CommentDetails ? Meta.CommentDetails.AverageRate : 0"
			:images="Meta.Images"
			:name-fa="Meta.NameFa"
			:address="Meta.Address"
			:cheaper-seller="roomPrice.CheaperSeller"
			button-title="فروشندگان"
			:frequently-asked-questions="Meta.FrequentlyAskedQuestions"
			:footer="Meta.Footer"
			:loading="loading"
			:hotel-type="Meta.Type"
			:price-loader="priceLoader"
			:description="Meta && Meta.MoreInfo ? Meta.MoreInfo : ''"
			:similar-hotels="similarHotels"
			:comments-total-page="totalCommentsPage"
			@loadMoreComments="loadMoreComments"
		>
			<template slot="schema">
				<hotel-page-schema v-show="false" :hotel-meta="Meta" :city="city" :city-name-fa="cityNameFa[0]" :room-price="roomPrice" />
			</template>
			<template slot="breadcrumb">
				<div class="hotel-route">
					<nuxt-link to="/">
						صفحه‌ی اصلی
					</nuxt-link>
					<svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.919922 4.14062C0.773438 4.28711 0.773438 4.49219 0.919922 4.63867L4.34766 8.03711C4.49414 8.18359 4.72852 8.18359 4.8457 8.03711L5.05078 7.83203C5.19727 7.68555 5.19727 7.48047 5.05078 7.33398L2.0625 4.375L5.08008 1.44531C5.19727 1.29883 5.19727 1.09375 5.08008 0.947266L4.8457 0.742188C4.72852 0.595703 4.49414 0.595703 4.34766 0.742188L0.919922 4.14062Z" fill="#BDBDBD" />
					</svg>
					<nuxt-link to="/">
						هتل
					</nuxt-link>
					<svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.919922 4.14062C0.773438 4.28711 0.773438 4.49219 0.919922 4.63867L4.34766 8.03711C4.49414 8.18359 4.72852 8.18359 4.8457 8.03711L5.05078 7.83203C5.19727 7.68555 5.19727 7.48047 5.05078 7.33398L2.0625 4.375L5.08008 1.44531C5.19727 1.29883 5.19727 1.09375 5.08008 0.947266L4.8457 0.742188C4.72852 0.595703 4.49414 0.595703 4.34766 0.742188L0.919922 4.14062Z" fill="#BDBDBD" />
					</svg>
					<nuxt-link :to="cityNameFa && cityNameFa[0] ? `/${cityNameFa[0].id}` : '' ">
						هتل‌های {{ cityNameFa && cityNameFa[0] ? cityNameFa[0].label : '' }}
					</nuxt-link>
					<svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.919922 4.14062C0.773438 4.28711 0.773438 4.49219 0.919922 4.63867L4.34766 8.03711C4.49414 8.18359 4.72852 8.18359 4.8457 8.03711L5.05078 7.83203C5.19727 7.68555 5.19727 7.48047 5.05078 7.33398L2.0625 4.375L5.08008 1.44531C5.19727 1.29883 5.19727 1.09375 5.08008 0.947266L4.8457 0.742188C4.72852 0.595703 4.49414 0.595703 4.34766 0.742188L0.919922 4.14062Z" fill="#BDBDBD" />
					</svg>
					<span class="broadcrumb-hotel-name"> هتل {{ Meta.NameFa }} {{ cityNameFa && cityNameFa[0] ? cityNameFa[0].label : '' }}  </span>
				</div>
			</template>
			<template slot="search">
				<hotel-search
					ref="HotelSearch"
					:check-in-date="CheckInDate"
					:check-out-date="CheckOutDate"
					:city-hotel-list="CityHotelList"
					hotel-title="جستجوی مقصد (هتل/شهر)"
					@searchHotels="searchHotels"
				/>
			</template>
			<template slot="desktop-seller">
				<div id="desktopSellers" class="custom-container single-hotel-rooms">
					<div class="single-hotel-rooms__title mb-4">
						<svg
							class="ml-3"
							width="23"
							height="19"
							viewBox="0 0 23 19"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M22.5156 9.1875L20.25 7.3125V3.5625C20.25 3.40625 20.0938 3.25 19.9375 3.25H18.6875C18.4922 3.28906 18.375 3.40625 18.375 3.5625V5.78906L12.8672 1.25781C12.5547 0.984375 11.9297 0.789062 11.5 0.789062C11.0312 0.789062 10.4062 0.984375 10.0938 1.25781L0.445312 9.1875C0.328125 9.30469 0.25 9.5 0.25 9.65625C0.25 9.77344 0.289062 9.96875 0.367188 10.0469L0.796875 10.5547C0.875 10.6719 1.10938 10.75 1.26562 10.75C1.38281 10.75 1.57812 10.7109 1.65625 10.6328L2.75 9.73438V17C2.75 17.7031 3.29688 18.25 4 18.25H9C9.66406 18.25 10.2109 17.7031 10.25 17V12.9375H12.75V17C12.75 17.7031 13.2969 18.25 14 18.25H19C19.6641 18.25 20.2109 17.7031 20.25 17.0391V9.73438L21.3047 10.6328C21.3828 10.7109 21.5781 10.7891 21.6953 10.7891C21.8516 10.7891 22.0859 10.6719 22.2031 10.5547L22.5938 10.0469C22.6719 9.96875 22.75 9.77344 22.75 9.65625C22.75 9.5 22.6328 9.30469 22.5156 9.1875ZM18.3359 16.375H14.625V12.3125C14.5859 11.6484 14.0391 11.1016 13.375 11.0625H9.625C8.92188 11.1016 8.375 11.6484 8.375 12.3125V16.375H4.625V8.21094L11.5 2.54688L18.375 8.21094L18.3359 16.375Z" fill="#EB384D" />
						</svg>
						<span>مقایسه و رزرو اتاق</span>
					</div>
					<div class="date-picker">
						<hotel-date-picker
							ref="datepickerDesktop"
							:single-hotel="true"
							:start-date="CheckInDate"
							:end-date="CheckOutDate"
							title=" تاریخ"
							@searchForRoom="searchForRoom('datepickerDesktop')"
						/>
					</div>
					<div>
						<single-hotel-skeleton v-if="priceLoader" />
						<div v-else>
							<div v-for="(roomGroup, i) in roomPrice.RoomTypes" :key="i" class="single-hotel-rooms__group">
								<div class="d-flex justify-content-between single-hotel-rooms__group__title">
									<div class="room-title">
										<span>{{ roomGroup.Name ? roomGroup.Name : '' }}</span>
									</div>
									<div class="room-group-capacity d-flex h-100 align-items-center">
										<div class="room-group-capacity__item h-100  d-flex align-items-center mx-1">
											{{ roomGroup.Capacity }}
											<svg
												class="mx-1"
												width="10"
												height="15"
												viewBox="0 0 15 15"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M9.29492 7.375L13.9219 2.79297L14.8652 1.84961C15 1.71484 15 1.49023 14.8652 1.31055L13.877 0.322266C13.6973 0.1875 13.4727 0.1875 13.3379 0.322266L7.8125 5.89258L2.24219 0.322266C2.10742 0.1875 1.88281 0.1875 1.70312 0.322266L0.714844 1.31055C0.580078 1.49023 0.580078 1.71484 0.714844 1.84961L6.28516 7.375L0.714844 12.9453C0.580078 13.0801 0.580078 13.3047 0.714844 13.4844L1.70312 14.4727C1.88281 14.6074 2.10742 14.6074 2.24219 14.4727L7.8125 8.90234L12.3945 13.5293L13.3379 14.4727C13.4727 14.6074 13.6973 14.6074 13.877 14.4727L14.8652 13.4844C15 13.3047 15 13.0801 14.8652 12.9453L9.29492 7.375Z" fill="#1D1D1D" />
											</svg>
											<svg
												class="mr-1"
												width="15"
												height="18"
												viewBox="0 0 15 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M10.5176 10.2188C9.55469 10.2188 9.12305 10.75 7.5625 10.75C5.96875 10.75 5.53711 10.2188 4.57422 10.2188C2.11719 10.2188 0.125 12.2441 0.125 14.7012V15.5312C0.125 16.4277 0.822266 17.125 1.71875 17.125H13.4062C14.2695 17.125 15 16.4277 15 15.5312V14.7012C15 12.2441 12.9746 10.2188 10.5176 10.2188ZM13.4062 15.5312H1.71875V14.7012C1.71875 13.1074 2.98047 11.8125 4.57422 11.8125C5.07227 11.8125 5.83594 12.3438 7.5625 12.3438C9.25586 12.3438 10.0195 11.8125 10.5176 11.8125C12.1113 11.8125 13.4062 13.1074 13.4062 14.7012V15.5312ZM7.5625 9.6875C10.1855 9.6875 12.3438 7.5625 12.3438 4.90625C12.3438 2.2832 10.1855 0.125 7.5625 0.125C4.90625 0.125 2.78125 2.2832 2.78125 4.90625C2.78125 7.5625 4.90625 9.6875 7.5625 9.6875ZM7.5625 1.71875C9.28906 1.71875 10.75 3.17969 10.75 4.90625C10.75 6.66602 9.28906 8.09375 7.5625 8.09375C5.80273 8.09375 4.375 6.66602 4.375 4.90625C4.375 3.17969 5.80273 1.71875 7.5625 1.71875Z" fill="#656565" />
											</svg>
										</div>
									</div>
								</div>
								<div v-for="(seller, sellerIndex) in roomGroup.Sellers" :key="sellerIndex" class="d-flex flex-column single-hotel-rooms__item justify-content-center" :class="{'first-seller': sellerIndex == 0}">
									<div class="d-flex justify-content-between align-items-center" style="height: 60px">
										<div class="single-hotel-rooms__item-provider-name">
											{{ seller.ProviderRoomName }}
										</div>
										<div class="single-hotel-rooms__item-dining-service">
											<svg
												v-show="seller.DiningServiceLevel.Code"
												width="12"
												height="9"
												viewBox="0 0 12 9"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M10.1953 0.46875L4.03125 6.63281L1.78125 4.35938C1.66406 4.26562 1.47656 4.26562 1.38281 4.35938L0.703125 5.03906C0.609375 5.13281 0.609375 5.32031 0.703125 5.4375L3.84375 8.55469C3.96094 8.67188 4.125 8.67188 4.24219 8.55469L11.2734 1.52344C11.3672 1.42969 11.3672 1.24219 11.2734 1.125L10.5938 0.46875C10.5 0.351562 10.3125 0.351562 10.1953 0.46875Z" fill="#1899A7" />
											</svg>
											<span v-show="seller.DiningServiceLevel.Code">{{ seller.DiningServiceLevel.Title }}</span>
										</div>
										<div class="single-hotel-rooms__item-provider-provider-logo d-flex justify-content-center">
											<img v-if="seller && seller.Provider && seller.Provider.Logo" :src="seller.Provider.Logo" alt="provider">
										</div>
										<div class="single-hotel-rooms__item-provider-price">
											<svg
												v-if="sellerIndex == 0"
												style="margin-left: 15px"
												width="17"
												height="18"
												viewBox="0 0 17 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M17 8.625C17 7.39648 16.2031 6.33398 15.0742 5.90234C15.5723 4.83984 15.373 3.51172 14.5098 2.61523C13.6133 1.75195 12.2852 1.55273 11.2227 2.05078C10.791 0.921875 9.72852 0.125 8.5 0.125C7.23828 0.125 6.17578 0.921875 5.74414 2.05078C4.68164 1.55273 3.35352 1.75195 2.49023 2.61523C1.59375 3.51172 1.39453 4.83984 1.89258 5.90234C0.763672 6.33398 0 7.39648 0 8.625C0 9.88672 0.763672 10.9492 1.89258 11.3809C1.39453 12.4434 1.59375 13.7715 2.49023 14.6348C3.35352 15.5312 4.68164 15.7305 5.74414 15.2324C6.17578 16.3613 7.23828 17.125 8.5 17.125C9.72852 17.125 10.791 16.3613 11.2227 15.2324C12.3184 15.7305 13.6133 15.5312 14.5098 14.6348C15.373 13.7715 15.5723 12.4434 15.0742 11.3809C16.2031 10.9492 17 9.88672 17 8.625ZM12.1855 7.16406L7.83594 11.4805C7.66992 11.6465 7.4375 11.6133 7.30469 11.4805L4.78125 8.95703C4.64844 8.82422 4.64844 8.5918 4.78125 8.42578L5.64453 7.5625C5.81055 7.42969 6.04297 7.42969 6.17578 7.5957L7.57031 8.99023L10.791 5.80273C10.957 5.63672 11.1895 5.63672 11.3223 5.80273L12.1855 6.66602C12.3184 6.79883 12.3184 7.03125 12.1855 7.16406Z" fill="#EB384D" />
											</svg>
											{{ formatMoney(seller.TotalPrice) }} تومان
										</div>
										<button class="single-hotel-rooms__item-other-day" @click="collapseRoomPrice(sellerIndex, i)">
											<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M4.37891 5.26562C4.51562 5.40234 4.70703 5.40234 4.84375 5.26562L8.89062 1.24609C9.02734 1.13672 9.02734 0.917969 8.89062 0.78125L8.34375 0.261719C8.23438 0.125 8.01562 0.125 7.87891 0.261719L4.625 3.48828L1.34375 0.261719C1.20703 0.125 1.01562 0.125 0.878906 0.261719L0.332031 0.78125C0.195312 0.917969 0.195312 1.13672 0.332031 1.24609L4.37891 5.26562Z" fill="#606060" />
											</svg>
											قیمت شب های دیگر
										</button>

										<button class="single-hotel-rooms__item-reserve-btn" @click="openProviderLink(seller.Provider.WebSite)">
											رزرو
											<svg
												class="mt-1 mr-2"
												width="14"
												height="14"
												viewBox="0 0 14 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M7.58398 13.7617L8.16992 13.2051C8.31641 13.0586 8.31641 12.8242 8.16992 12.707L3.62891 8.13672H13.6484C13.8242 8.13672 14 7.99023 14 7.78516V6.96484C14 6.78906 13.8242 6.61328 13.6484 6.61328H3.62891L8.16992 2.07227C8.31641 1.95508 8.31641 1.7207 8.16992 1.57422L7.58398 1.01758C7.4668 0.871094 7.23242 0.871094 7.08594 1.01758L0.962891 7.14062C0.816406 7.28711 0.816406 7.49219 0.962891 7.63867L7.08594 13.7617C7.23242 13.9082 7.4668 13.9082 7.58398 13.7617Z" fill="#606060" />
											</svg>
										</button>
									</div>
									<hotel-price-calendar v-if="seller.PriceCalendar.length" class="price-calendar-list" :class="[roomPriceShowState.findIndex(x => x.index === sellerIndex && x.Name === i) > -1 ? 'active-price-calendar-list' : '' ]" :price-calendar="seller.PriceCalendar" />
								</div>
							</div>
						</div>
						<div v-if="roomPrice.RoomTypes && roomPrice.RoomTypes.length < 1 && !priceLoader">
							<p class="single-hotel-nearbyPlace__title text-right ">
								این هتل در تاریخ مورد نظر شما قیمت ندارد!
							</p>
						</div>
					</div>
				</div>
			</template>
			<template slot="seller">
				<div id="seller" class="single-hotel-seller-tab">
					<div class="single-hotel-seller-tab-title text-right">
						فروشندگان
					</div>
					<div class="date-picker">
						<hotel-date-picker
							ref="datepicker"
							:single-hotel="true"
							:start-date="CheckInDate"
							:end-date="CheckOutDate"
							title=" تاریخ"
							@searchForRoom="searchForRoom('datepicker')"
						/>
					</div>
					<single-hotel-skeleton v-if="priceLoader" />
					<seller-list
						v-else
						:room-types="roomPrice.RoomTypes"
						:duration="searchedDuration"
					/>
					<div v-if="roomPrice.RoomTypes && roomPrice.RoomTypes.length < 1 && !priceLoader">
						<p class="text-right">
							این هتل در تاریخ مورد نظر شما قیمت ندارد!
						</p>
					</div>
				</div>
			</template>
			<div slot="commets-detail" class="w-50 ml-3">
				<span v-for="(detail, i) in ( Meta && Meta.CommentDetails && Meta.CommentDetails.Details ? Meta.CommentDetails.Details :[])" :key="i" class="cheapest-seller-mobile"> {{ detail.Provider }} ({{ detail.AverageRate }}/۱۰)</span>
			</div>
		</accommodation-page>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Axios from 'axios';
import searchDates from '@/mixins/searchDates';
import AccommodationPage from '~/components/accommodationPage.vue';
import HotelSearch from '~/components/hotel/HotelSearch.vue';
import 'hooper/dist/hooper.css';
import SingleHotelSkeleton from '~/components/hotel/singleHotel/singleHotelSkeleton';
import hotelPageSchema from '~/schemas/hotelPage';
import HotelDatePicker from '~/components/hotel/hotelDatePicker';
import HotelStore from '~/store/Hotel';
library.add(faChevronRight, faChevronLeft, faStar);
const moment = require('moment-jalaali');
export default {
	components: {
		HotelPriceCalendar: () => import('~/components/hotel/HotelPriceCalendar'),
		SellerList: () => import('~/components/hotel/SellerList'),
		HotelSearch,
		SingleHotelSkeleton,
		hotelPageSchema,
		HotelDatePicker,
		AccommodationPage
	},
	mixins: [searchDates],
	async asyncData ({ params, error, payload, store, redirect }) {
		if (params.hotel.startsWith('tag')) {
			redirect('/' + params.origin.toLowerCase());
		} else {
			try {
				await HotelStore.of(store).getSingleHotelMeta({ hotelName: encodeURIComponent(params.hotel), cityName: encodeURIComponent(params.origin) });
			} catch (err) {
				if (err.message == 404) {
					error({ statusCode: 404, message: 'چنین صفحه ای وجود ندارد!' });
				} else {
					error({ statusCode: 500, message: 'مشکلی در سرور به وجود آمده است.' });
				}
			}
		}
	},
	data () {
		return {
			loading: false,
			roomPrice: {},
			commentsToShow: 5,
			roomPriceShowState: [],
			detailsOpen: false,
			CityHotelList: this.$store.state.Hotel.cities.concat(this.$store.state.Hotel.hotelNameList),
			priceLoader: true,
			page: 1
		};
	},
	async fetch ({ store }) {
		const payload = { ResidenceCity:1 };
		await HotelStore.of(store).loadCities(payload);
		await HotelStore.of(store).loadHotelNameList();
	},
	computed: {
		...mapState('Hotel', ['similarHotels']),
		city () {
			return this.$route.params.origin ? this.$route.params.origin.toLowerCase() : '';
		},
		hotelName () {
			return this.$route.params.hotel ? this.$route.params.hotel.toLowerCase() : '';
		},
		cityNameFa () {
			const cityList = this.$store.state.Hotel.cities[0].list.concat(this.$store.state.Hotel.cities[1].list);
			return cityList.filter(item => item.id.toLowerCase() === this.city);
		},
		searchedDuration () {
			return moment(this.$route.query.CheckOutDate, 'jYYY-jMM-jDD').diff(moment(this.$route.query.CheckInDate, 'jYYY-jMM-jDD')) / 1000 / 3600 / 24;
		},
		totalCommentsPage () {
			return HotelStore.of(this.$store).state.totalCommentsPage;
		},
		hotelComments () {
			return HotelStore.of(this.$store).state.hotelComments;
		},
		totalCommentsCount () {
			return HotelStore.of(this.$store).state.totalCommentsCount;
		},
		Meta () {
			return HotelStore.of(this.$store).state.singleHotelMeta;
		}
	},
	watch: {
		detailsOpen (val) {
			if (val === true) {
				this.toggleBodyClass('addClass', 'body-overflow');
			} else {
				this.toggleBodyClass('removeClass', 'body-overflow');
			}
		},
		'$route.query' (newVal, oldVal) {
			if (newVal.CheckInDate !== oldVal.CheckInDate || newVal.CheckOutDate !== oldVal.CheckOutDate) {
				this.getHotelPrice();
				setTimeout(() => { this.loading = false; }, 1500);
			}
		}
	},
	updated () {
		if (localStorage.dateChanged === true) {
			document.getElementById('seller').scrollIntoView();
		}
	},
	destroyed () {
		if (localStorage.dateChanged) {
			localStorage.dateChanged = false;
		}
	},
	mounted () {
		this.getHotelPrice();
		HotelStore.of(this.$store).getSimilarHotels({ hotelName: this.hotelName, cityName: this.city, checkInDate: this.CheckInDate, checkOutDate: this.CheckOutDate });
		HotelStore.of(this.$store).getSingleHotelComments({ hotel: this.hotelName, city: this.city, page: 1, size: 6 });
		this.page += 1;
		HotelStore.of(this.$store).getSingleHotelImages({ hotelName: this.hotelName, cityName: this.city, size: -1, page: 1 });
	},

	methods: {
		toggleBodyClass (addRemoveClass, className) {
			const el = document.body;
			if (addRemoveClass === 'addClass') {
				el.classList.add(className);
			} else {
				el.classList.remove(className);
			}
		},
		searchForRoom (selectedDatePicker) {
			const that = this;
			const start = this.$refs[selectedDatePicker].$refs.datepicker.dates.start.getFullYear() + '-' + this.pad(this.$refs[selectedDatePicker].$refs.datepicker.dates.start.getMonth() + 1) + '-' + that.pad(this.$refs[selectedDatePicker].$refs.datepicker.dates.start.getDate());
			const end = this.$refs[selectedDatePicker].$refs.datepicker.dates.end.getFullYear() + '-' + this.pad(this.$refs[selectedDatePicker].$refs.datepicker.dates.end.getMonth() + 1) + '-' + that.pad(this.$refs[selectedDatePicker].$refs.datepicker.dates.end.getDate());
			if ((this.$route.query.CheckInDate && start !== this.$route.query.CheckInDate) || (this.$route.query.CheckOutDate && end !== this.$route.query.CheckOutDate)) {
				this.loading = true;
				this.$router.push({ path: '/' + this.city + '/' + this.Meta.NameEn, query: { CheckInDate: start, CheckOutDate: end } }, undefined, () => { localStorage.dateChanged = true; });
			}
		},
		onSlide (index) {
			this.currentSlide = index.currentSlide;
		},
		getHotelPrice () {
			HotelStore.of(this.$store).getSingleHotelRoomPrice({ cityName: this.city, hotelName: this.Meta.NameEn, CheckInDate: this.CheckInDate, CheckOutDate: this.CheckOutDate, capacity: this.$route.query.capacity }).then((res) => {
				this.priceLoader = false;
				this.roomPrice = this.$store.state.Hotel.singleHotelRoomPrice;
			});
		},
		collapseRoomPrice (index, Name) {
			if (this.roomPriceShowState.some(e => e.Name === Name && e.index === index)) {
				const item = this.roomPriceShowState.findIndex(x => x.index === index && x.Name === Name);
				this.roomPriceShowState.splice(item, 1);
			} else {
				this.roomPriceShowState.push({ index, Name });
			}
		},
		openMobileDetails (id) {
			this.detailsOpen = true;
			this.showTab = id;
		},
		searchHotels (id, CheckInDate, CheckOutDate, capacity) {
			localStorage.dateChanged = false;
			if (this.$route.query.CheckInDate === CheckInDate && this.$route.query.CheckOutDate === CheckOutDate && this.$route.params.origin + '/' + this.$route.params.hotel === id && this.$route.query.capacity === capacity) {
				this.$router.go({ path: '/' + id, query: { CheckInDate: moment(CheckInDate.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD'), CheckOutDate: moment(CheckOutDate.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD'), capacity : capacity } });
			} else {
				this.$router.push({ path: '/' + id, query: { CheckInDate: moment(CheckInDate.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD'), CheckOutDate: moment(CheckOutDate.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD'), capacity: capacity } });
			}
		},
		backToPreviousPage () {
			this.$router.go(-1);
		},
		openProviderLink (link) {
			this.$ga.event('Hotels', 'Reserve');
			window.open(link, '_blank');
		},
		loadMoreComments (page) {
			HotelStore.of(this.$store).getSingleHotelComments({ hotel: this.hotelName, city: this.city, page, size: 6 });
		}
	},
	head () {
		return {
			link: [
				{
					rel: 'canonical',
					href: 'https://radar361.com/' + this.city + '/' + this.Meta.NameEn
				}
			],
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.Meta.Description
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: this.Meta.Keyword
				},
				{
					hid: 'og:title',
					property: 'og:title',
					content: this.Meta.LandingTitle ? this.Meta.LandingTitle : 'رزرو ' + this.Meta.HotelType.Name + ' ' + (this.Meta.HotelType.Stars != null ? this.Meta.HotelType.Stars + ' ' + 'ستاره' : '') + this.Meta.NameFa + ' ' + (this.cityNameFa && this.cityNameFa[0] ? this.cityNameFa[0].label : '') + ' | رادار ۳۶۱'
				},
				{
					hid: 'og:description',
					property: 'og:description',
					content: this.Meta.Description
				},
				{
					property: 'og:url',
					content: 'https://radar361.com/' + this.city + '/' + this.Meta.NameEn
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
					content: this.Meta.Images.length && this.Meta.Images[0] ? this.Meta.Images[0].URL : 'https://radar361.com/Radar361.png'
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
					content: this.Meta.Images.length && this.Meta.Images[0] ? this.Meta.Images[0].URL : 'http://radar361.com/Radar361.png'
				},
				{
					name: 'twitter:url',
					content: 'https://radar361.com/' + this.city + '/' + this.Meta.NameEn
				},
				{
					name: 'twitter:title',
					content: this.Meta.LandingTitle ? this.Meta.LandingTitle : 'رزرو ' + this.Meta.HotelType.Name + ' ' + (this.Meta.HotelType.Stars != null ? this.Meta.HotelType.Stars + ' ' + 'ستاره' : '') + this.Meta.NameFa + ' ' + (this.cityNameFa && this.cityNameFa[0] ? this.cityNameFa[0].label : '') + ' | رادار ۳۶۱'
				},
				{
					name: 'twitter:description',
					content: this.Meta.Description
				}
			],
			title: this.Meta.LandingTitle ? this.Meta.LandingTitle : 'رزرو ' + this.Meta.HotelType.Name + ' ' + (this.Meta.HotelType.Stars != null ? this.Meta.HotelType.Stars + ' ' + 'ستاره' : '') + this.Meta.NameFa + ' ' + (this.cityNameFa && this.cityNameFa[0] ? this.cityNameFa[0].label : '') + ' | رادار ۳۶۱'
		};
	}
};
</script>
