<template>
	<div class="presell-hotels">
		<div class="mobile-header d-none">
			<div class="logo-wrapper">
				<button class="menu-button">
					<img src="~/assets/images/menu-white-icon.svg" alt="white menu">
				</button>
				<div><img src="~/assets/images/radar-logo-white-without-text.svg" alt="radar logo"></div>
			</div>
			<nuxt-link to="/" class="mobile-header__title">
				<div class="mobile-header__title-name">
					پیش فروش هتل ها
				</div>
			</nuxt-link>
			<div class="mr-auto ml-3 d-flex flex-column" @click="filtersOpen = true">
				<svg
					class="mt-1"
					width="21"
					height="21"
					viewBox="0 0 21 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M19.0859 0.5H2.875C1.19531 0.5 0.335938 2.53125 1.54688 3.70312L7.875 10.0312V16.75C7.875 17.375 8.14844 17.9219 8.61719 18.3125L11.1172 20.1875C12.3281 21.0078 14.125 20.2266 14.125 18.6641V10.0312L20.4141 3.70312C21.625 2.53125 20.7656 0.5 19.0859 0.5ZM12.25 9.25V18.625L9.75 16.75V9.25L2.875 2.375H19.125L12.25 9.25Z" fill="white" />
				</svg>
				<span class="mobile-header__filter-text">فیلتر</span>
			</div>
		</div>
		<div class="search-city">
			<div class="d-flex align-items-center container align-items-center h-100">
				<h1>پیش فروش هتل</h1>
				<div class="select">
					<select v-model="selectedHotel" class="form-control selectHotel">
						<option selected disabled value="">
							لطفا شهر مورد نظر خود را انتخاب کنید
						</option>
						<option value="all">
							همه شهر ها
						</option>
						<option v-for="(item, i) in hotelsCity" :key="i" :value="item">
							{{ item }}
						</option>
					</select>
				</div>
			</div>
		</div>
		<div class="container mt-3 d-flex justify-content-between">
			<div id="box-filter" :class="{ 'box-filter-open': filtersOpen }">
				<div v-if="filtersOpen" class="d-flex filter-mobile-head align-items-center">
					<svg
						width="12"
						height="21"
						viewBox="0 0 12 21"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						@click="filtersOpen = false"
					>
						<path d="M1.57812 0.626953L0.679688 1.48047C0.5 1.70508 0.5 2.06445 0.679688 2.24414L8.81055 10.375L0.679688 18.5508C0.5 18.7305 0.5 19.0898 0.679688 19.3145L1.57812 20.168C1.80273 20.3926 2.11719 20.3926 2.3418 20.168L11.7754 10.7793C11.9551 10.5547 11.9551 10.2402 11.7754 10.0156L2.3418 0.626953C2.11719 0.402344 1.80273 0.402344 1.57812 0.626953Z" fill="#EB384D" />
					</svg>
					<span class="apply-filters" @click="applyFilters()">اعمال فیلتر</span>
					<span class="clear-history" @click="clearFilters()">پاکسازی فیلتر</span>
				</div>
				<div class="filter-container">
					<div id="filter-title" class="d-flex justify-content-between">
						<label>هزینه</label>
						<img src="~assets/images/angle-down.svg" alt="angle-down">
					</div>
					<div v-if="maxPrice && minPrice" class="range-slider px-3">
						<div class="rage-slider-shadow">
							<div class="first-dot" /><div class="second-dot" />
						</div>
						<vue-slider v-model="sliderValue" :min="minPrice" :max="maxPrice" :tooltip="'none'" />
					</div>
					<div class="row justify-content-between price px-3 pt-2 pb-3">
						<div id="max-price">
							{{ sliderValue[1].toString().slice(0, 3) }} ت
						</div>
						<div id="min-price">
							{{ sliderValue[0].toString().slice(0, 3) }} ت
						</div>
					</div>
				</div>
				<div class="filter-container">
					<div id="filter-title" class="d-flex justify-content-between">
						<label>امکانات<div class="counter">{{ hotelAmenities.length }}</div></label>
						<img src="~assets/images/angle-down.svg" alt="angle-down">
					</div>
					<div class="container airlines-container px-4 py-3">
						<div v-for="(amenity, index) in hotelAmenities" :key="index" class="d-flex justify-content-between">
							<div class="d-flex align-items-center mb-2 mt-1">
								<input v-model="filteredAmenities" type="checkbox" :value="amenity">
								<div class="airlines-name">
									{{ amenity.Title }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="filter-container">
					<div id="filter-title" class="d-flex justify-content-between">
						<label>نوع اقامتگاه<div class="counter">{{ hotelType.length }}</div></label>
						<img src="~assets/images/angle-down.svg" alt="angle-down">
					</div>
					<div class="container airlines-container px-4 py-3">
						<div v-for="(type, index) in hotelType" :key="index" class="d-flex justify-content-between">
							<div class="d-flex align-items-center mb-2 mt-1">
								<input v-model="filteredHotelType" type="checkbox" :value="type.Stars">
								<div class=" airlines-name">
									هتل
									<span v-for="(img, i) in type.Stars" :key="i"><img src="~/assets/images/star.png" alt="star"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="hotels-box">
				<div v-if="!loaded" class="skeleton-box">
					<skeleton v-for="i in 7" :key="i" :presell="true" class="w-100" />
				</div>
				<hotel
					v-for="(hotel, index) in selectedHotelList"
					:key="index"
					ref="hotel"
					:hotel="hotel.HotelDetails"
					:presell-rooms="hotel.Rooms"
				/>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import Axios from 'axios';
import {
	Hooper,
	Slide,
	Navigation as HooperNavigation,
	Pagination as HooperPagination
} from 'hooper';
import Hotel from '~/components/hotel/Hotel.vue';
import skeleton from '~/components/hotel/skeleton';
import FilterHotel from '~/components/hotel/FilterHotel.vue';
import 'hooper/dist/hooper.css';
export default {
	name: 'PresellHotels',
	components: {
		Hotel,
		Hooper,
		Slide,
		HooperNavigation,
		HooperPagination,
		skeleton,
		FilterHotel
	},
	data() {
		return {
			presellHotelsList: [],
			selectedHotel: '',
			selectedHotelList: [],
			open: -1,
			loaded: false,
			filteredAmenities: [],
			filteredHotelType: [],
			filtersOpen: false,
			sliderValue: [0, 100000000000]
		};
	},
	computed: {
		hotelsCity() {
			const list = this.presellHotelsList.map(obj => obj.HotelDetails.City.Name);
			return [...new Set(list)];
		},
		hotelType() {
			const list = this.presellHotelsList.map(obj => obj.HotelDetails.HotelType);
			this.filteredHotelType = this.getUnique(list, 'Stars').map(x => x.Stars);
			return this.getUnique(list, 'Stars');
		},
		hotelAmenities() {
			const list = this.presellHotelsList.map(obj => obj.HotelDetails.HotelAmenities);
			const list2 = [].concat.apply([], list);
			return this.getUnique(list2, 'Title'); ;
		},
		minPrices() {
			const list = this.presellHotelsList.map(obj => obj.HotelDetails.MinPrice);
			return [...new Set(list)];
		},
		minPrice() {
			if (this.minPrices.length) {
				return this.minPrices.reduce(function (a, b) {
					return Math.min(a, b);
				});
			}
			return null;
		},
		maxPrice() {
			if (this.minPrices.length) {
				return this.minPrices.reduce(function (a, b) {
					return Math.max(a, b);
				});
			}
			return null;
		}
	},
	watch: {
		selectedHotel: function (val) {
			this.filterPresellHotesl();
		},
		filteredHotelType: function () {
			this.filterPresellHotesl();
		},
		filteredAmenities: function () {
			this.filterPresellHotesl();
		},
		sliderValue: function () {
			this.filterPresellHotesl();
		},
		minPrice: function (val) {
			this.sliderValue[0] = val;
		},
		maxPrice: function (val) {
			this.sliderValue[1] = val;
		}
	},
	mounted() {
		Axios.get(process.env.VUE_APP_HOTEL_BASE + '/api/HotelSearch/PreSell').then((res) => {
			this.presellHotelsList = res.data.Result;
			this.selectedHotelList = res.data.Result;
			this.loaded = true;
		});
	},
	methods: {
		isOpen(i) {
			return this.open == i;
		},
		showRoom(i) {
			if (this.open == i) {
				this.open = -1;
			} else {
				this.open = i;
			}
		},
		compare(a, b) {
			// Use toUpperCase() to ignore character casing
			const bandA = a.Price.PriceToPay;
			const bandB = b.Price.PriceToPay;

			let comparison = 0;
			if (bandA > bandB) {
				comparison = 1;
			} else if (bandA < bandB) {
				comparison = -1;
			}
			return comparison;
		},
		getUnique(arr, comp) {
			const unique = arr.map(e => e[comp])
				.map((e, i, final) => final.indexOf(e) === i && i)
				.filter(e => arr[e]).map(e => arr[e]);
			return unique;
		},
		filterPresellHotesl() {
			const newArray = [];
			for (var i = 0; i < this.presellHotelsList.length; i++) {
				const filtered =
        (this.sliderValue[0] > this.presellHotelsList[i].HotelDetails.MinPrice) ||
				(this.sliderValue[1] < this.presellHotelsList[i].HotelDetails.MinPrice) ||
        (this.presellHotelsList[i] && this.presellHotelsList[i].HotelDetails.HotelType && this.filteredHotelType.indexOf(this.presellHotelsList[i].HotelDetails.HotelType.Stars) == -1) ||
        (this.presellHotelsList[i] && this.filteredAmenities.some(amenity => !this.presellHotelsList[i].HotelDetails.HotelAmenities.includes(amenity)));
				if (!filtered) newArray.push(this.presellHotelsList[i]);
			}
			if (this.selectedHotel && this.selectedHotel != 'all') {
				this.selectedHotelList = newArray.filter(item => this.selectedHotel == item.HotelDetails.City.Name);
			} else {
				this.selectedHotelList = newArray;
			}
		},
		applyFilters() {
			this.filterPresellHotesl();
			this.filtersOpen = false;
		},
		clearFilters() {
			const arr = [];
			const list = this.presellHotelsList.map(obj => obj.HotelDetails.HotelType);
			this.filteredHotelType = this.getUnique(list, 'Stars').map(x => x.Stars);
			this.filteredAmenities = [];
		}
	},
	head() {
		return {
			link: [
				{
					rel: 'canonical',
					href: 'https://radar361.com/presell-hotels'
				}
			],
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'با پیش رزرو هتل خود، برای هر زمانی که قصد اقامت در آن را دارید، از تخفیف‌های استثنائی بهره‌مند شوید.'
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: 'پیش‌ رزرو، هتل، تخفیف، ارزان، رادار361، رزرو'
				}
			],
			title: 'پیش رزرو هتل با بیشترین تخفیف | رادار۳۶۱'
		};
	}
};
</script>

<style scoped>
::v-deep .presell-hotel-hooper .hooper-next svg, ::v-deep .presell-hotel-hooper .hooper-prev svg{
  display: block;
  fill: white;
  width: 40px;
  height: 40px;
}
:v-deep .presell-hotel-hooper .hooper-next, ::v-deep .presell-hotel-hooper .hooper-prev{
  outline: none
}
.hotels-box {
  width: calc(100% - 290px)
}
@media only screen and (max-width: 768px) {
  .search-city h1 {
    display: none
  }
  .hotels-box {
    width: 100%
  }
}
.presell-hotels {
  background: #F1F1F1;
}
.search-city {
  background: #FAFAFA;
  height: 110px
}
.search-city h1 {
  font-weight: 600;
  font-size: 23px;
  width: 200px;
  text-align: right;
  color: #333333;
}
.presell-hotel-hooper {
  width: 285px
}
.hotel-wraaper {
  min-height: 160px;
  background-color: #ffffff;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
    border-radius: 7px;
    cursor: pointer;
    position: relative;
    z-index: 2;
    overflow: hidden;
    margin: 0;
    border: .5px solid #e4e4e4;
}
.hooper-list {
      height: 200px!important;
    border-radius: 10px!important;
}
.hotel_title {
  font-size: 18px;
  font-weight: 600;
}
.devider {
    border-bottom: 1px solid #e8dfdf;
    width: 100%;
}
.label-title {
  font-weight: 600;
}
.selectHotel {
  background: #EEEEEE;
  border-radius: 10px;
  border: none;
  height: 50px;
  outline: none;
  box-shadow: none;
}
.roomsList {
    background-color: #fff!important;
    border-radius: 7px;
    padding-top: 12px;
    padding-bottom: 10px
}
.roomsList-option {
  border: 1px solid #b8c7dc;
  border-radius: 5px;
  margin: 10px 0px;
}
.roomsList-option__header {
  background: #f2f2f2;
  border-bottom: 1px solid #e9f0f2 !important;
  padding: 10px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.font-weight-600 {
  font-weight: 600;
}
.show-room {
  background: #ff536d !important;
  color: #fff !important;
  border: none !important;
}
.roomsList-option__price {
  font-weight: 600;
  font-size: 14px
}
@media only screen and (max-width: 578px) {
  .hotel-wraaper {
    flex-direction: column;
  }
  .presell-hotel-hooper {
    width: 100%
  }
}
.bg-slider {
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.skeleton-loader {
  background: #FFFFFF;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
}
.skeleton-box {
  width: 100% !important;
  margin-top: 10px;
}
</style>

<style scoped>
.box-title {
	z-index: 10000000;
}
.filter-container {
    margin-top: 10px;
    background: #FCFCFC;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
}
.filter-container .box {
	padding: 0 10px;
}
.filters {
    width: 100%;
    margin-top: 22px;
}
#box-filter {
    width: 280px;
    height: 100%;
    text-align: right;
    margin-bottom:30px;
}
.box-filter-open {
    display: block !important;
}
#filter-title {
    font-size: 14px;
    font-weight: 600;
    color: #656565;
    border-bottom: 1px solid #DDDDDD;
    height: 54px;
    display: flex;
    padding: 15px;
}
#filter-title label .counter {
	display: none;
}

input[type=checkbox] {
    cursor: pointer;
    font-size: 19px;
    height: 20px;
    position: relative;
    margin-left: 10px;
	border: 1px solid #656565;
	background: none!important;
	border-radius: 5px;
}
input[type=checkbox]:after {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    content: " ";
    color: #FFFFFF;
    visibility: visible;
    padding: 0px 4px;
    border-radius: 5px;
    background-color: #FFFFFF;
    border: 1px solid #656565;
}
input[type=checkbox]:checked{
	border-radius: 5px!important;
}
input[type=checkbox]:checked:after {
    background-image: url('~assets/images/right-icon.svg')!important;
    background-color: #EB384D!important;
	background-size: cover!important;
    border: 1px solid #EB384D;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    margin: 0;
}

.airlines-name {
    font-size: 13px;
	font-weight: 600;
    padding-right: 5px;
    color: #656565;
    padding-top: 0!important;
    white-space: nowrap;
}

.class-container {
    margin-bottom: 20px;
}
.filter-img-airplane {
    width: 67px;
    margin-right: 109px;
}
.apply-filters {
  font-weight: 600;
  font-size: 17px;
  color: #1D1D1D;
  margin-right: 25px
}
.filter-container .price {
  font-size: 16px;
  color: #808080;
}

@media (max-width: 767.98px) {
	.filter-container {
		border: none;
	}
    .filters {
        margin-bottom: 65px;
        margin-top: 45px;
    }
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
    }
    #slider-range-hotel {
        width: 60%;
    }
    #min-price {
        margin-right: 17%
    }
    #max-price {
        margin-left: 17%;
    }
	.first-title {
	border-top: none!important;
	}
  .range-slider {
    padding: 0 9%;
  }
  .rage-slider-shadow {
    display: none;
  }
	.range-slider {
		padding: 15px;
		height: 46px;
		border-radius: 10px;
		margin: 20px;
		margin-bottom: 0;
		position: relative;
	}
	.vue-slider-rail {
		background: #E0E0E0;
		border-radius: 15px;
		height: 5px;
		transition: background-color 0.3s;
	}
	.rage-slider-shadow {
		display: block;
		width: 100%;
	}
	.rage-slider-shadow .first-dot {
		width: 16px;
		height: 16px;
		background: #E0E0E0;
		border-radius: 100px;
		position: absolute;
		top: 15px;
		left: 15px;
		z-index: 100000;
	}
	.rage-slider-shadow .second-dot {
		width: 16px;
		height: 16px;
		background: #E0E0E0;
		border-radius: 100px;
		position: absolute;
		top: 15px;
		right: 15px;
		z-index: 100000;
	}
	.first-filter-title {
		border-top: none!important;
		margin-bottom: 0!important;
	}
	.filter-container .box {
		padding: 0;
	}
	#filter-title {
		font-size: 14px;
		font-weight: 600;
		color: #656565;
		border-bottom: 1px solid #CCCCCC;
		border-top: 1px solid #CCCCCC;
		height: 66px;
		padding: 0 30px 0 30px;
		background-color: #fff;
		position: relative;
		margin-bottom: 0!important;
	}
	#filter-title label {
		display: inline-flex;
		position: absolute;
		line-height: 30px;
		right: 30px;
		top: 18px;
		font-weight: 600;
		font-size: 14px;
		color: #1D1D1D;
	}
	#filter-title label .counter {
		width: 24px;
		height: 24px;
		background: #15BBCC;
		font-weight: bold;
		font-size: 14px;
		line-height: 22px;
		text-align: center;
		color: #FFFFFF;
		margin-right: 15px;
		border-radius: 100px;
		margin-top: 3px;
		display: block!important;
	}
	#filter-title img{
		position: absolute;
		top: 21px;
		width: 13px;
		height: 25px;
		left: 30px;
	}
	.filter-container {
		margin-top: 0!important;
		background: #FCFCFC;
		border-radius: none!important;
	}
	.filter-container .price, .max-price {
		margin: 0;
	}
	.filter-container .price .min-price {
		margin: 0 !important;
	}

}
@media (min-width: 767px) and (max-width: 991.98px) {
    #box-filter {
        width: 240px
    }
}
.filter-mobile-head {
  height: 72px;
  padding: 0px 20px
}
@media screen and (min-width: 767.98px) {
  .filter-mobile-head {
    display: none !important
  }
}
@media screen and (max-width: 767.98px) {

  .mobile-header {
    display: flex !important;
    background: #F54A5E;
    width: 100%;
    min-height: 72px;
    align-items: center;
  }
  .clear-history {
    right: 120px !important;
    top: 2px !important
  }
}
select {
  appearance: none;
  outline: 0;
  background-image:url("../assets/images/black-arrow-bottom.png") !important;
  background-repeat: no-repeat !important;
  background-position-x: 15px !important;
  background-position-y: 20px !important;
  width: 100%;
  height: 100%;
  color: black;
  cursor: pointer;
  border:1px solid black;
  border-radius:3px;
}
.select {
  width: 100%;
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: .25em;
  padding-bottom:10px;

}

</style>
