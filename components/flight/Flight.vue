<template>
	<div v-show="!filtered" class="flight">
		<div class="flight-card d-flex" :class="{'details-open': showTab}" @click.stop="toggleSellerList(1)">
			<div class="d-flex flight-card__info">
				<div class="d-flex flex-column justify-content-between flight-card__rate" />
				<div class="d-flex flex-column justify-content-end align-items-center">
					<div class="text-center d-none flight-card-mobile-rate">
						{{ flight.Flight.AirlineRatings.Average }}/5
					</div>
					<div class="flight-card__logo" :style="{ 'background-image': `url(${flight.Flight.AirlineLogo})` }" />
					<span class="d-flex flex-column align-items-center">
						<div class="d-flex flight-card__flight-number">
							<span>{{ flight.Flight.AirlineTitle }} </span>
							<span class="d-none d-sm-block pr-1"> -  {{ flight.Flight.FlightNumber }} </span>
						</div>
						<client-only>
							<star-rating
								v-model="flightRating"
								class="mt-auto mb-1"
								:max-rating="5"
								:read-only="true"
								:rtl="true"
								:star-size="12"
								:inactive-color="'#FFF'"
								:border-color="'#FFCD4F'"
								:rounded-corners="true"
								:border-width="3"
								:show-rating="false"
							/>
						</client-only>
					</span>
				</div>
				<div class="flight-card-time d-flex align-items-center position-relative">
					<div class="d-flex flex-column align-items-center">
						<span class="flight-card-time__arrival">{{ flight.Flight.DepartureTime.substr(11, 5) }}</span>
						<span class="flight-card-time__origin">{{ flight.Flight.Origin }}</span>
					</div>
					<div class="d-flex flex-column mb-3">
						<div class="flight-card-aircraft">
							{{ flightDuration }}
						</div>
						<div class="mx-2">
							<img src="~/assets/images/flight-direct.svg" class="airplane-image" alt="airplane image">
							<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4.125 12L8.16797 12L11.8594 18.4336C11.9297 18.6094 12.1758 18.75 12.3516 18.75L14.6367 18.75C15.0234 18.75 15.3047 18.3633 15.1992 18.0117L13.4766 12L17.0625 12L18.6094 14.0039C18.7148 14.1445 18.8555 14.25 19.0313 14.25L20.4375 14.25C20.8242 14.25 21.1055 13.8984 21 13.5469L19.875 9.75L21 5.91797C21.1055 5.56641 20.8242 5.25 20.4375 5.25L19.0313 5.25C18.8555 5.25 18.7148 5.32031 18.6094 5.46094L17.0625 7.5L13.4766 7.5L15.1992 1.45312C15.3047 1.10156 15.0234 0.749999 14.6367 0.749999L12.3516 0.749999C12.1406 0.749999 11.9648 0.855468 11.8594 1.03125L8.16797 7.5L4.125 7.5C2.89453 7.5 0.750001 8.48437 0.750001 9.75C0.750001 10.9805 2.89453 12 4.125 12Z" fill="#828282" />
							</svg>
						</div>

						<div class="flight-card-aircraft">
							{{ flight.Flight.AircraftType !== 'نامشخص' ? flight.Flight.AircraftType : '' }}
						</div>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span class="flight-card-time__arrival">{{ flight.Flight.ArrivalTime.substr(11, 5) }}</span>
						<span class="flight-card-time__origin">{{ flight.Flight.Destination }}</span>
					</div>
					<div class="flight-card-bottom-info w-100 d-flex justify-content-end" @click.stop="toggleSellerList(2)">
						<div class="mx-auto d-flex align-items-center flight-detail-button">
							جزییات پرواز
							<span class="mr-1">
								<font-awesome-icon v-if="showTab === 0" class="mt-1 fa-style" :icon="['fas', 'chevron-down']" />
								<font-awesome-icon v-else class="mt-1 fa-style" :icon="['fas', 'chevron-up']" />
							</span>
						</div>
						<div>
							ظرفیت:
							{{ maxCapacity }} نفر
						</div>
					</div>
				</div>
			</div>
			<div class="flight-card-price mr-auto h-100 d-flex flex-column align-items-center justify-content-center">
				<div class="card-airline-min-price text-center">
					<span> {{ formatMoneyWithoutRounding(minPrice) }} </span>
					<span> تومان </span>
					<span v-if="sellersCount > 1" class="d-block">   {{ flight.Classes.Economy[0].SellerName }} و {{ sellersCount - 1 }} سایت دیگر</span>
					<span v-else class="d-block">{{ flight.Classes.Economy[0].SellerName }}</span>
				</div>
				<div class="sellers d-flex align-items-center justify-content-center" :class="{'open-seller-list': showTab !== 0}" @click.stop="toggleSellerList(1)">
					<span>مشاهده فروشندگان</span>
					<span class="d-none">جزییات و فروشندگان</span>
				</div>
			</div>
		</div>
		<transition name="list">
			<div
				v-show="showTab"
				class="flight-detail"
				:class="{ 'card-max-height': showTab }"
			>
				<div class="mobile-top-info d-flex align-items-center">
					<img src="~/assets/images/arrow-right.png" alt="arrow right" @click="toggleSellerList(0)">
					<div class="d-flex flex-column mobile-top-info__name">
						<span>{{ flight.Flight.AirlineTitle }}</span>
						<span>{{ flight.Flight.Origin + ' به ' + flight.Flight.Destination }} - {{ 'ساعت ' + flight.Flight.DepartureTime.substr(11, 5) }}</span>
					</div>
					<div class="mobile-top-info__price">
						<span>{{ minPrice.toCurrency() }}</span>
						<span>تومان</span>
						<p>{{ flight.Classes.Economy[0].SellerName }}</p>
					</div>
				</div>
				<div v-if="showTab" class="flight-detail-header d-flex">
					<span :class="{'active-header': showTab === 1}" @click="toggleSellerList(1)">لیست فروشندگان</span>
					<span :class="{'active-header': showTab === 2}" @click="toggleSellerList(2)">اطلاعات پرواز</span>
					<div class="flight-detail-header__close-icon">
						<img src="~/assets/images/gray-times.svg" alt="close" @click="toggleSellerList(0)">
					</div>
				</div>
				<flight-seller v-if="showTab === 1" :classes="flight.Classes" />
				<flight-info v-if="showTab === 2" :flight-data="flight.Flight" :flight-duration="flightDuration" />
			</div>
		</transition>
	</div>
</template>

<script>
import { faBell, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Vue from 'vue';
import FlightSeller from '~/components/flight/FlightSeller';
import FlightInfo from '~/components/flight/FlightInfo';
library.add(faBell, faTimes, faChevronDown, faChevronUp);
const moment = require('moment');
let starRating;
if (process.client) {
	starRating = require('vue-star-rating');
	Vue.component('star-rating', starRating.default);
}
export default {
	name: 'Flight',
	components: {
		FlightSeller,
		FlightInfo
	},
	props: {
		flight: {
			type: Object,
			default: function () {
				return {};
			}
		}
	},
	data: function () {
		return {
			currentClass: 'Economy',
			sellers: [],
			filtered: false,
			showTab: 0
		};
	},
	computed: {
		minPrice: function () {
			let minPrice;
			if (this.flight.Classes.Economy.length === 0) {
				minPrice = 'نامشخص';
			} else {
				minPrice = Number.MAX_VALUE;
				for (let i = 0; i < this.flight.Classes.Economy.length; i++) {
					if (this.flight.Classes.Economy[i].Price < minPrice) { minPrice = this.flight.Classes.Economy[i].Price; }
				}
			}
			return minPrice;
		},
		sellersCount() {
			return this.flight.Classes.Economy.length + this.flight.Classes.Business.length;
		},
		flightDuration() {
			let diff = moment(this.flight.Flight.ArrivalTime).diff(moment(this.flight.Flight.DepartureTime), 'milliseconds');
			const hh = Math.floor(diff / 1000 / 60 / 60);
			diff -= hh * 1000 * 60 * 60;
			const mm = Math.floor(diff / 1000 / 60);
			return hh + ' ساعت ' + mm + ' دقیقه';
		},
		flightRating() {
			return this.flight.Flight.AirlineRatings.Average / 2;
		},
		maxCapacity() {
			const Flights = this.flight.Classes.Economy.concat(this.flight.Classes.Business);
			return Math.max.apply(Math, Flights.map(function (o) { return parseFloat(o.Capacity); }));
		}
	},
	watch: {
		currentClass: function () {
			this.sellers = this.flight.Classes[this.currentClass];
		},
		showTab: function (val) {
			if (val === 0) {
				this.toggleBodyClass('removeClass', 'body-overflow');
			} else {
				this.toggleBodyClass('addClass', 'body-overflow');
			}
		},
		$route: function (to, from) {
			if (from.hash === `#flight${this.flight.Flight.FlightNumber}` && to.hash === '') {
				this.showTab = 0;
			}
		}
	},
	mounted: function () {
		this.sellers = this.flight.Classes.Economy;
	},
	methods: {
		toggleSellerList(val) {
			if (window.innerWidth < 768 && val !== 0) {
				this.$router.push({ path: this.$route.fullPath, hash: `#flight${this.flight.Flight.FlightNumber}` });
			}
			if (window.innerWidth < 768 && val === 0 && this.$route.hash === `#flight${this.flight.Flight.FlightNumber}`) {
				this.$router.go(-1);
			}
			if (this.showTab === val) {
				this.showTab = 0;
			} else {
				this.$ga.event('flights', 'Detail');
				this.showTab = val;
			}
		}
	}
};
</script>
<style scoped>
.flight-card {
    width: 100%;
    height: 157px;
    position: relative;
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    border-radius: 10px;
    background: white;
    margin: 10px 0px;
    padding-right: 20px;
    cursor: pointer;
}
.flight-card::before {
    content: ' ';
    width: 20px;
    height: 10px;
    border-radius: 0px 0px 20px 20px;
    background: #F8F8F8;
    border: 1px solid #CCCCCC;
    border-top: none;
    position: absolute;
    left: 220px;
    z-index: 3;
    top: -1px
}
.flight-card::after {
    content: ' ';
    width: 20px;
    height: 10px;
    border-radius: 20px 20px 0px 0px;
    background: #F8F8F8;
    border: 1px solid #CCCCCC;
    border-bottom: none;
    position: absolute;
    left: 220px;
    z-index: 3;
    bottom: -1px
}
.flight-card__rate {
    padding: 20px 0px;
    min-width: 40px
}
.flight-card__rate div{
    background: #F1F9FA;
    height: 27px;
    color: #15BBCC;
    font-weight: 600;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 5px
}
.flight-card__logo {
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    width: 50px;
    min-height: 50px;
    margin: 0px 30px
}
.flight-card__flight-number {
    font-size: 12px;
    color: #828282;
    margin-top: 5px;
    margin-bottom: 15px
}
.flight-card-time__arrival {
    font-weight: 500;
    font-size: 30px;
    color: #1D1D1D;
}
.flight-card-time__origin {
    font-size: 13px;
    color: #828282;
}
.flight-card-aircraft {
    font-weight: 500;
    font-size: 11px;
    color: #828282;
    text-align: center
}
.flight-card-price {
    width: 230px;
    border-right: 1px solid #CCCCCC;
    background: #FAFAFA;
    border-radius: 10px 0px 0px 10px;
}
.sellers {
    width: 130px;
    height: 38px;
    background-color: #EB384D;
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 600;
    border-radius: 100px;
    text-align: center;
    cursor: pointer
}
.card-airline-min-price {
    margin-bottom: 20px
}
.card-airline-min-price span:first-child {
    font-weight: 600;
    font-size: 24px;
    color: #1D1D1D;
}
.card-airline-min-price span:not(:first-child) {
    font-weight: 300;
    font-size: 13px;
    color: #828282;
}
.card-airline-min-price span:last-child {
    font-weight: 500;
}
.flight-card-time{
    margin-right: 40px
}
.flight-detail {
    background: #FFFFFF;
}
.card-max-height {
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    border-radius: 0px 0px 10px 10px;
}
.details-open {
    margin-bottom: 0px;
    border-bottom: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}
.details-open::after {
    display: none
}
.flight-detail-header {
      background-color: #FAFAFA;
    background: #fafafa;
    height: 42px;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid #eee;
    display: flex;
}
.flight-detail-header span {
    padding: 0 9px;
    height: 100%;
    font-size: 13px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #858585;
    font-weight: 500;
    position: relative;
    cursor: pointer;
}
.flight-detail-header span::after {
    content: "";
    background: #eaeaea;
    width: 1px;
    position: absolute;
    height: 30px;
    left: 0;
}
.flight-detail-header__close-icon {
    width: 27px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    margin-left: 12px;
    cursor: pointer
}
.flight-detail-header__close-icon:hover {
    border-radius: 50%;
    background: #EBEBEB;
}
.open-seller-list {
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    border-radius: 20px;
    color: #4E5657;
}
.active-header {
    background: #FFFFFF;
    color: #1899A7 !important;
    font-weight: 600 !important;
    border-bottom: 2px solid #1899A7;
    height: 102% !important;
    margin-top: 2px
}
.flight-card-bottom-info {
    position: absolute;
    bottom: 0px;
    font-size: 11px;
    line-height: 16px;
    color: #4D4D4D;
    left: 0px
}
@media only screen and (max-width: 1200px) {
    .flight-card-time{
        margin-right: 0px
    }
}
@media only screen and (max-width: 1000px) and (min-width: 768px) {
    .flight-card__logo {
        margin: 0px !important;
        width:60px
    }
    .flight-card__rate {
        display: none !important
    }
    .flight-card-price {
        width: 160px
    }
    .flight-card-time__arrival {
        font-size: 20px
    }
}
@media only screen and (max-width: 768px) {
    .card-max-height {
        display: block
    }
    .flight-card__flight-number {
        margin-bottom: 0px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .card-airline-min-price span:not(:first-child) {
        color: #808080 !important;
        font-weight: 300 !important;
    }
    .flight-card-bottom-info {
        display: none !important;
        padding-left: 10px
    }
    ::v-deep .vue-star-rating {
        display: none !important;
    }
    .flight-detail-header span {
        width: 50%;
        text-align: center;
        justify-content: center;
        font-size: 13px;
    }
    .active-header {
        background: unset !important;
        color: #15BBCC !important;
        border-color: #15BBCC !important;
    }
    .flight-detail-header {
        margin-top: 72px;
        background-color: #F5F9FA !important;
        border-bottom-width: 1px;
        margin-bottom: 20px
    }
    .flight-detail-header__close-icon {
        display: none;
    }
    .flight-card-time__arrival {
        font-size: 25px
    }
    .flight-card__logo {
        width: 35px;
        min-height: 35px;
        margin: 5px 0px !important
    }
    .flight-card {
        flex-direction: column !important;
        height: 170px;
        padding: 0px
    }
    .flight-detail {
        background: white;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 1003;
        overflow: auto;
        border-radius: 0px;
        border: none !important
    }
    .flight-card-time{
        margin-right: 0px
    }
    .flight-card__info {
        border-bottom: 4px dotted #F0F4F5;
        height: calc(100% - 67px);
        justify-content: space-between;
        padding-left: 25px;
        padding-right: 15px
    }
    .flight-card::before {
        right: -1px;
        top: 88px;
        height: 20px;
        width: 10px;
        border-radius: 20px 0 0 20px;
        border-right: none;
        border-top: 1px solid #CCCCCC
    }
    .flight-card::after {
        left: -1px;
        top: 88px;
        height: 20px;
        width: 10px;
        border-radius: 0px 20px 20px 0px;
        border-left: none;
        border-bottom: 1px solid #CCCCCC
    }
    .flight-card-price {
        border-right: none;
        width: 100%;
        flex-direction: row !important;
        height: 65px !important;
        justify-content: space-between !important;
        padding: 0px 20px;
        background: unset !important
    }
    .card-airline-min-price {
        margin-bottom: 0px;
        text-align: right !important
    }
    .card-airline-min-price span:first-child {
        font-size: 24px;
        color: #EB384D;
        font-weight: 500 !important;
    }
    .sellers {
        width: 143px;
        height: 36px
    }
    .sellers span:first-child {
        display: none;
    }
    .sellers span:last-child {
        display: block !important;
    }
    .flight-card__rate{
        display: none !important
    }
    .flight-card-mobile-rate {
        display: block !important;
        background: #F1F9FA;
        height: 22px;
        color: #15BBCC;
        font-weight: 500;
        font-size: 14px;
        padding: 2px 6px;
        border-radius: 5px;
        align-self: flex-start;
    }
}
@media screen and (max-width: 400px){
    .airplane-image {
        width: calc(100% - 28px);
    }
    .flight-card-time {
        margin-left: auto;
    }
    .flight-card-aircraft {
        padding-left: 12px;
    }
}
@media screen and (max-width: 360px){
    .flight-card__info {
        padding-right: 5px;
        padding-left: 5px
    }
}
@media (min-width: 767px) {
    .mobile-top-info {
        display: none !important;
    }
}
.mobile-top-info {
    background: #F5F8FA;
    padding: 5px 20px;
    border-bottom: 1px solid #EEEEEE;
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 72px;
}
.mobile-top-info__name span:first-child {
    margin-right: 15px;
    font-weight: 600;
    font-size: 15px;
    color: #1D1D1D;
    text-align: right;
}
.mobile-top-info__name span:last-child {
    font-size: 11px;
    line-height: 18px;
    font-weight: 500;
    text-align: right;
    color: #656565;
    margin-right: 15px;
}
.mobile-top-info__price {
    margin-right: auto;
}
.mobile-top-info__price span:first-child {
    font-weight: 600;
    font-size: 18px;
    color: #1D1D1D;
}
.mobile-top-info__price span {
    font-size: 11px;
    color: #1D1D1D;
}
.mobile-top-info__price p {
    margin-bottom: 0px;
    font-size: 11px;
    color: #656565;
    line-height: 18px;
}
.flight-detail-button {
    cursor: pointer;
}
.list-enter,
.list-leave-to {
  visibility: hidden;
  max-height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: max-height .3s;
}
::v-deep .sr-only {
	left: unset !important
}
</style>
