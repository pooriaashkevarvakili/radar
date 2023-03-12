<template>
	<accommodationBox
		:details-open="detailsOpen"
		:images="hotelDetails.HotelImage"
		:accommodation-name="hotelDetails.NameFa"
		:accommodation-type="hotelDetails.HotelType"
		:accommodation-rate-level="hotelDetails.RateLevel"
		:accommodation-comments-count="hotelDetails.CommentsCount"
		:accommodation-average-rate="hotelDetails.AverageRate"
		:accommodation-important-place="hotelDetails.ImportantPlace"
		:accommodation-address="hotelDetails.AddressSummary"
		:price-loader="priceLoader"
		:accommodation-seller="hotelDetails.Seller"
		:accommodation-min-price="hotelMinPrice"
		:accommodation-cheaper-seller="hotelDetails.CheaperSeller"
		:error="error"
		:duration="duration"
		:accommodation-detail="hotelDetails.details"
		:accommodation-ammenities="hotelDetails.HotelAmenities"
		:accommodation-comments="hotelDetails.details && hotelDetails.details.Comments && hotelDetails.details.Comments && hotelDetails.details.Comments.Items ? hotelDetails.details.Comments.Items : []"
		:comments-total-page="hotelDetails.details && hotelDetails.details.Comments && hotelDetails.details.Comments && hotelDetails.details.Comments.TotalPages ? hotelDetails.details.Comments.TotalPages : 1"
		:accommodation-cheaper-sellers="hotelDetails.CheaperSellers"
		:accommodation-id="hotelId"
		:show-tab="showTab"
		:city-name-fa="cityNameFa"
		:sellers-count="hotelDetails.SellersCount"
		:city-name="cityName"
		@setGoals="setGoals"
		@toggleDetails="toggleDetails"
		@setTab="setTab"
		@loadMoreComments="loadMoreComments"
	>
		<template slot="sellers">
			<seller-list
				:duration="1"
				:room-types="hotelDetails.roomPrices"
				:capacity-array="capacityArray"
				:error="error"
				:error-text="errorText"
			/>
		</template>
		<template v-slot:name>
			{{ (hotelDetails && hotelDetails.HotelType && hotelDetails.HotelType.Name ? hotelDetails.HotelType.Name : '') + ' ' + hotelDetails.NameFa }}
		</template>
		<template v-slot:show-sellers>
			<div class="seller-info-mobile d-none">
				<div class="rooms-list mt-auto" @click.stop="toggleDetails(4)">
					فروشندگان
					<font-awesome-icon class="mr-1 fa-style" :icon="['fas', 'chevron-left']" />
				</div>
			</div>
		</template>
		<template v-slot:show-sellers-desktop>
			<div class="seller-info-mobile mt-auto">
				<div class="rooms-list mt-auto mb-3" @click.stop="toggleDetails(4)">
					لیست فروشندگان
				</div>
			</div>
		</template>
	</accommodationBox>
</template>

<script>
import { faChevronLeft, faChevronRight, faStar, faChevronDown, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import SellerList from '~/components/hotel/SellerList.vue';
import HotelStore from '~/store/Hotel';
import accommodationBox from '~/components/accommodationBox.vue';
library.add(faChevronRight, faChevronLeft, faStar, faChevronDown, faMapMarkerAlt);
const VueScrollTo = require('vue-scrollto');
export default {
	name: 'Hotel',
	components: {
		SellerList,
		accommodationBox
	},
	props: {
		hotel: {
			type: Object,
			default() {
				return {};
			}
		},
		hotelId: {
			type: Number,
			default: 0
		},
		duration: {
			type: Number,
			default: 0
		},
		cityId: {
			type: Number,
			default: 0
		},
		inDate: {
			type: String,
			default: ''
		},
		outDate: {
			type: String,
			default: ''
		},
		setMeta: Boolean,
		cityName: {
			type: String,
			default: ''
		},
		hotelData: {
			type: Object,
			default() {
				return {};
			}
		},
		cityNameFa: {
			type: String,
			default() {
				return '';
			}
		},
		presellRooms: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data: function () {
		return {
			detailsOpen: false,
			capacityArray: [],
			showTab: 1,
			error: false,
			showHotelDetails: false,
			errorText: ''
		};
	},
	computed: {
		pricePerNight() {
			return this.duration > 1 ? this.hotelDetails.MinPrice / this.duration : this.hotelDetails.MinPrice;
		},
		hotelSeller: function () {
			return !(this.hotelDetails.roomPrices && this.hotelDetails.roomPrices.length === 0);
		},
		hotelMinPrice: function () {
			let hotelMinPrice = 'نامشخص';
			if (this.hotelDetails.CheaperSeller && this.hotelDetails.CheaperSeller.TotalPrice != null) {
				hotelMinPrice = this.formatMoney(this.hotelDetails.CheaperSeller.TotalPrice);
			}
			return hotelMinPrice;
		},
		sortPresellRooms() {
			if (this.presellRooms.length) {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				return this.presellRooms.sort(function (a, b) {
					const result = (a.Price.PriceToPay > b.Price.PriceToPay) ? 1 : 0;
					return result;
				});
			}
			return null;
		},
		hotelDetails() {
			return this.$store.state.Hotel.cityHotels.find(hotel => hotel.Id === this.hotelId);
		},
		priceLoader() {
			return this.hotelDetails.roomPrices;
		}
	},
	watch: {
		detailsOpen: function (val) {
			if (val === true) {
				this.toggleBodyClass('addClass', 'body-overflow');
			} else {
				this.toggleBodyClass('removeClass', 'body-overflow');
			}
		},
		$route: function (to, from) {
			if (from.hash === `#hotel${this.hotelId}` && to.hash !== `#hotel${this.hotelId}`) {
				this.detailsOpen = false;
			}
		}
	},
	mounted: function () {
		if (this.showHotelDetails != null) {
			this.detailsOpen = false;
		}
	},
	methods: {
		toggleBodyClass(addRemoveClass, className) {
			const el = document.body;
			if (addRemoveClass === 'addClass') {
				el.classList.add(className);
			} else {
				el.classList.remove(className);
			}
		},
		setTab(val) {
			this.showTab = val;
		},
		toggleDetails: function (tab, id, onSuccess, onError) {
			if (window.innerWidth < 768 && tab != null) {
				this.$router.push({ path: this.$route.fullPath, hash: `#hotel${this.hotelId}` });
			} else if (window.innerWidth < 768 && tab == null && this.$route.hash === `#hotel${this.hotelId}`) {
				this.$router.go(-1);
			}
			if (tab == null) {
				const prevOpen = this.detailsOpen;
				this.detailsOpen = !prevOpen;
				if (window.innerWidth > 768) {
					VueScrollTo.scrollTo('#hotel' + this.hotelId, 1000, { offset: -100 });
				}
			} else if (tab === this.showTab && this.detailsOpen) {
				this.detailsOpen = false;
				if (window.innerWidth > 768) {
					VueScrollTo.scrollTo('#hotel' + this.hotelId, 1000, { offset: -100 });
				}
			} else {
				this.detailsOpen = true;
				this.showTab = 4;
				if (window.innerWidth > 768) {
					VueScrollTo.scrollTo('#hotel' + this.hotelId, 1000, { offset: 0 });
				}
			}
			if (this.presellRooms.length) {
				this.hotelDetails = this.hotel;
				this.priceLoader = false;
				this.hotelDetails.RoomTypes = this.presellRooms;
			} else if (this.hotelDetails.details === null) {
				this.$ga.event('Hotels', 'Detail');
				const that = this;
				HotelStore.of(this.$store).getHotelMetaAndPrice({ hotelId: that.hotelId, cityName: that.cityName, hotelName: that.hotelDetails.NameEn, checkInDate: that.inDate, checkOutDate: that.outDate });
			}
		},
		setGoals() {
			this.$ga.event('Hotels', 'Redirect-card');
		},
		loadMoreComments(pageNumber) {
			HotelStore.of(this.$store).loadMoreHotelComments({ hotelId: this.hotelId, cityName: this.cityName, hotelName: this.hotelDetails.NameEn, page: pageNumber, size: 6 });
		}
	}
};
</script>
<style scoped>
@media only screen and (max-width: 768px) {
	.rooms-list {
		width: 83px;
		height: 34px;
	}
}
</style>
