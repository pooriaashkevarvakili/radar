<template>
	<div class="container-fluid">
		<div v-if="hotelDetails && hotelDetails.MoreInfo" class="hotel-description d-none">
			<h2 class="mt-3 about-hotel-tile">
				معرفی هتل
			</h2>
			<div
				class="show-more-info"
				:class="{ 'more-info-extra-height': moreInfo }"
			>
				<div
					style="height: 110px; overflow: hidden"
					:style="[moreInfo ? { height: 'auto' } : {}]"
					:class="{ 'after-text': activeBtnMoreInfo && !moreInfo }"
				>
					<p
						id="more-info"
						ref="aboutHotel"
						class="more-info"
						v-html="hotelDetails.MoreInfo"
					/>
				</div>
				<span
					v-if="activeBtnMoreInfo && !moreInfo"
					class="more-points"
					style="position: relative; float: left; bottom:28px"
					@click="addMoreText"
				>نمایش بیشتر</span>
			</div>
		</div>
		<div class="row mt-3 mx-3">
			<div v-if="hotelDetails && hotelDetails.URL" class="hotel-website my-1 text-right">
				<img src="~/assets/images/globe.png" alt="global">
				وبسایت :
				<span><a
					class="m-0"
					:href=" 'https://' + hotelDetails.URL + '?utm_source=radar361&utm_medium=cpc' "
					rel="nofollow"
					target="_blank"
					style="color: inherit"
				> {{ hotelDetails.URL }}</a>
				</span>
			</div>
			<div v-if="hotelDetails && hotelDetails.PhoneNumber" class="hotel-website my-1">
				<img class="mx-1" src="~/assets/images/green-phone.png" alt="icon"><span>
					<a style=" color: #656565; font-weight: 600" :href="' tel: ' + hotelDetails.PhoneNumber" data-rel="external">
						{{ hotelDetails.PhoneNumber || "نا مشخص" }}
					</a>
				</span>
			</div>
			<div v-if="hotelDetails && hotelDetails.Address" class="hotel-website d-desktop my-1 mr-0">
				<img src="~/assets/images/green-location.png" alt="green location">
				<span>
					{{ hotelDetails.Address }}
				</span>
			</div>
		</div>
		<hr class="d-desktop w-100">
		<!-- mobile map -->
		<div class="d-none d-mobile" style="padding: 0px 10px">
			<div v-if="hotelDetails && hotelDetails.Address" class="hotel-website mb-0 mt-3 mx-0 hotel-webiste__mobile">
				<img src="~/assets/images/green-location.png" alt="green locarion">
				آدرس :
				<span>
					{{ hotelDetails.Address }}
				</span>
			</div>
			<hotel-location
				v-if="(hotelDetails && hotelDetails.Latitude && hotelDetails.Longitude) || ( hotelDetails && hotelDetails.Meta && hotelDetails.Meta.Latitude && hotelDetails.Meta.Longitude)"
				:hotel-details="hotelDetails"
				:show-modal="showModal"
			/>
			<div v-if="hotelDetails && hotelDetails.NearByPlaces" class="mobile-nearByPlace">
				<div class="d-flex justify-content-between">
					<span class="mobile-nearByPlace__title">فاصله تا نقاط مهم</span>
					<div class="nearPlace-sort d-flex">
						<span><font-awesome-icon :icon="['fas', 'running']" class="mt-2 fa-style" /></span>
						<span class="nearPlace-sort__time">زمان</span>
						<span class="nearPlace-sort__distance nearPlace-sort__active">فاصله</span>
					</div>
				</div>
				<div v-if="hotelDetails && hotelDetails.NearByPlaces" class="mobile-important-place d-flex">
					<div class="w-100 d-flex flex-wrap">
						<div v-for="(place, index) in hotelDetails.NearByPlaces" :key="index" class="mobile-important-place__item w-50">
							<span>{{ place.Title }}</span>
							<span> {{ Math.round(place.Distance / 1000) }}km </span>
						</div>
					</div>
				</div>
			</div>
			<div class="mobile-amenity">
				<div class="mobile-amenity__title d-flex justify-content-between">
					<span>امکانات</span>
					<span v-show="!showAllAmenities && amenities && amenities.length > 8" @click="showAllAmenities = true">امکانات بیشتر<span><font-awesome-icon :icon="['fas', 'chevron-down']" class="pt-1 fa-style" /></span></span>
				</div>
				<div class="d-flex flex-wrap justify-content-center">
					<div v-for="(amenity, index) in showAllAmenities ? (amenities) : (amenities && amenities.slice(0,8))" :key="index" class="mobile-amenity__list">
						<div class=" mobile-amenity__items d-flex flex-column align-items-center justify-content-center text-center">
							<img :src="amenity.Icon" class="mobile-amenity__items__img" alt="amenity">
							{{ amenity.Title }}
						</div>
					</div>
				</div>
			</div>
			<hr style="margin-top: 30px; margin-bottom: 10px;">
			<div class="d-flex mobile-feature flex-wrap">
				<div v-for="(category, i) in (hotelDetails && hotelDetails.Categories)" :key="i" class="mobile-feature__item">
					<span>
						{{ category.Name }}
					</span>
				</div>
			</div>
		</div>
		<div class="row d-desktop">
			<div class="col-md-7 d-flex">
				<div v-if="hotelDetails && hotelDetails.NearByPlaces" class="col-7 p-0">
					<h2>فاصله تا نقاط مهم</h2>
					<div class="important-place-list">
						<ul
							v-for="(place, index) in (hotelDetails && hotelDetails.NearByPlaces && hotelDetails.NearByPlaces.slice(0, 4))"
							:key="index"
							class="important-points my-1"
						>
							<li>
								<span class="lead">{{ place.Title }}</span><span class="description">{{ Math.round(place.Distance / 1000) }} کیلومتر</span>
							</li>
						</ul>
						<nuxt-link v-if="hotelDetails && hotelDetails.NearByPlaces && hotelDetails.NearByPlaces.length > 4 " :to="'/' + cityName + '/' + hotelDetails.NameEn" class="desktop-see-more-amenities">
							<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.59375 4.3125H5.9375V0.65625C5.9375 0.453125 5.73438 0.25 5.53125 0.25H4.71875C4.49023 0.25 4.3125 0.453125 4.3125 0.65625V4.3125H0.65625C0.427734 4.3125 0.25 4.51562 0.25 4.71875V5.53125C0.25 5.75977 0.427734 5.9375 0.65625 5.9375H4.3125V9.59375C4.3125 9.82227 4.49023 10 4.71875 10H5.53125C5.73438 10 5.9375 9.82227 5.9375 9.59375V5.9375H9.59375C9.79688 5.9375 10 5.75977 10 5.53125V4.71875C10 4.51562 9.79688 4.3125 9.59375 4.3125Z" fill="#EB384D" />
							</svg>
							مشاهده بیشتر
						</nuxt-link>
					</div>
				</div>
				<hotel-location
					:style="[moreInfo ? { width: '180px' } : {}]"
					:hotel-details="hotelDetails"
					:show-modal="showModal"
					:only-important-place="true"
				/>
			</div>
			<div class="col-md-5">
				<h2>امکانات</h2>
				<ul v-if="hotelDetails && (amenities || amenities)" class="row">
					<div
						v-for="(amenitiesList, index) in !showAllDesktopAmenities ? fragmentedAmenities.slice(0,2) : fragmentedAmenities "
						:key="index"
						class="col-md-6 mx-0 px-0 "
						style=" line-height: 21px;"
					>
						<li v-for="(amenity, key) in amenitiesList" :key="key" class="amenities">
							<img
								src="~/assets/images/checked.png"
								alt="checked"
							>
							<span class="description">{{ amenity.Title || amenity }}</span>
						</li>
					</div>
					<nuxt-link v-if="!showAllDesktopAmenities && amenities.length > 10 " :to="'/' + cityName + '/' + hotelDetails.NameEn" class="desktop-see-more-amenities">
						<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.59375 4.3125H5.9375V0.65625C5.9375 0.453125 5.73438 0.25 5.53125 0.25H4.71875C4.49023 0.25 4.3125 0.453125 4.3125 0.65625V4.3125H0.65625C0.427734 4.3125 0.25 4.51562 0.25 4.71875V5.53125C0.25 5.75977 0.427734 5.9375 0.65625 5.9375H4.3125V9.59375C4.3125 9.82227 4.49023 10 4.71875 10H5.53125C5.73438 10 5.9375 9.82227 5.9375 9.59375V5.9375H9.59375C9.79688 5.9375 10 5.75977 10 5.53125V4.71875C10 4.51562 9.79688 4.3125 9.59375 4.3125Z" fill="#EB384D" />
						</svg>
						مشاهده بیشتر
					</nuxt-link>
					<span v-if="!amenities.length">
						امکاناتی ثبت نشده است
					</span>
				</ul>
				<div v-else-if="presellRooms" class="row">
					<ul>
						<div
							v-for="(amenities, index) in amenities"
							:key="index"
							class="col-md-6 mx-0 px-0 "
							style=" line-height: 21px;"
						>
							<li class="amenities">
								<img
									src="~/assets/images/checked.png"
									alt="checked"
								>
								<span class="description">{{ amenities }}</span>
							</li>
						</div>
					</ul>
				</div>
			</div>
			<hr class="w-100">
			<div class="row px-3">
				<div class="features ">
					<span v-for="(category, i) in (hotelDetails && hotelDetails.Categories)" :key="i">{{
						category.Name
					}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { faGlobe, faRunning, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import HotelLocation from '~/components/hotel/HotelLocation.vue';
library.add(faGlobe, faRunning, faChevronDown);

export default {
	name: 'App',
	components: {
		HotelLocation
	},
	props: {
		hotelDetails: Object,
		presellRooms: Array,
		amenities: Array
	},
	data() {
		return {
			componentKey: 0,
			moreImportantPlaces: false,
			moreInfo: false,
			activeBtnMoreInfo: false,
			showModal: false,
			showAllAmenities: false,
			showAllDesktopAmenities: false

		};
	},
	computed: {
		importantPlaces() {
			return this.hotelDetails.NearByPlaces.slice(
				0,
				this.moreImportantPlaces ? 1000 : 4
			);
		},
		fragmentedAmenities() {
			return this.chunk(this.amenities, 5);
		},
		cityName() {
			return this.$route.params.origin;
		}
	},
	mounted() {
		if (this.$refs.aboutHotel && this.$refs.aboutHotel.clientHeight <= 126) {
			this.activeBtnMoreInfo = false;
		} else {
			this.activeBtnMoreInfo = true;
		}
	},
	methods: {
		showMoreImportantPoint: function () {
			this.moreImportantPlaces = true;
		},
		addMoreText: function () {
			this.moreInfo = true;
		},
		chunk: function (arr, len) {
			const chunks = [];
			let i = 0;
			const n = arr.length;
			while (i < n) {
				chunks.push(arr.slice(i, (i += len)));
			}
			return chunks;
		}
	}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hotel-website {
  padding: 8px 12px;
  background: #F6F6F6;
  border-radius: 10px;
  min-height: 35px;
  font-size: 13px;
  color: #656565;
  margin: 0px 10px
}
@media (max-width: 767.98px) {
  .container-fluid {
	padding: 0px;
  }
  hr {
    border-top-width: 1px !important;
  }
  .d-mobile {
    display: block !important
  }
  .d-desktop {
    display: none !important
  }
  .hotel-description {
    display: block !important
  }
  .information li span {
    color: #4466aa;
  }
  .mobile-view {
    display: block !important;
  }
  .large-view {
    display: none;
  }
}
.large-view {
  height: 90px;
}
.mobile-view {
  display: none;
}
h3 {
  margin: 40px 0 0;
}

h2 {
  color: #333333;
  font-weight: 500;
  font-size: 14px;
  text-align: right
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0;
}

hr {
  border-top: 1px solid #EEEEEE;
}

li span,
li a {
  margin-right: 3px;
  color: #858585;
  font-size: 13px;
}

a {
  color: #42b983;
}

.important-points li {
  margin: 0;
  padding: 0;
  color: #848484;
}

.important-points .lead {
  margin: 0;
}

.more-points {
  font-weight: 600;
  font-size: 12px;
  line-height: 25px;
  color: #EB384D;
  background: white;
}

.more-info {
  text-align: justify;
  overflow: hidden;
  font-size: 12.5px;
  line-height: 27px;
  color: #4D4D4D;
}

.more-info-extra-height {
  height: auto !important;
  overflow: hidden;
}
.after-text {
  position: relative
}
.after-text:after {
  content: "...";
    color: black;
    text-align: justify;
    position: absolute;
    background: white;
    left: 56px;
    top: 82px;
    width: 22px;
}

.more-info-extra-height .after-text:after {
  display: none;
}

.more-points:active p.more-info:after {
  content: " ";
  height: 100%;
}

.features span {
  background: #F7F7F7;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 12px;
  color: #656565;
  margin: 0px 2.5px;
  display: inline-block;
}

.amenities .check {
  margin-right: 0;
}

.amenities img {
  width: 14px;
  height: auto;
}

.amenities .description {
  margin-left: 0px;
}

.rules {
  position: relative;
}

.rules ul {
  display: inline-flex;
}

.rules li {
  margin-top: 0;
}

.rules .description {
  font-size: 12px;
}

.rules .image {
  margin-right: 0;
}

.rules .image img {
  width: 17px;
  height: auto;
}

.img-mobile {
  display: none;
}

.exit-icon {
  position: relative;
  top: -2px;
  margin-right: 28px;
}

.other-rules p {
  color: #848484;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
}

.important-points .description {
  position: relative;
  top: 5px;
  float: left;
}

.amenities {
  margin-bottom: 0;
  line-height: 27px
}

.amenities li {
  margin: 0;
}

@media (max-width: 468px) {
  .rules .description {
    font-size: 11px;
  }

  .information li img path {
    fill: #4466aa;
  }

  .information li span {
    color: #4466aa;
    fill: #4466aa;
  }

  .img-mobile {
    display: inline-block;
  }
  .exit-icon {
    margin-right: 46px;
  }
}
.show-more-info {
  height: 126px;
  overflow: hidden;
}
.important-place-list{
  height: 165px;
  overflow-y: auto;
  padding-left: 14px
}
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #e9f0f2;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #4466aa;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
.about-hotel-title {
  font-weight: 500;
  font-size: 15px;
  line-height: 23px;
  color: #1D1D1D;
}
.hotel-description {
  margin: 0px 20px 0px 27px;
}
.mobile-nearByPlace {
  margin-top: 20px
}
.nearPlace-sort svg {
  color: #808080;
}
.nearPlace-sort__time, .nearPlace-sort__distance {
  font-size: 12px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #808080;
  position: relative
}
.nearPlace-sort__active {
  color: #EB384D;
}
.nearPlace-sort__time {
  margin-right: 5px;
}
.nearPlace-sort__distance {
  margin-right: 10px;
}
.nearPlace-sort__time::after {
  content: '';
  background: #DDDDDD;
  width: 1px;
  height: 20px;
  margin-right: 10px
}
.mobile-nearByPlace__title {
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: right;
  color: #1D1D1D;
  font-weight: 600;
}
.mobile-important-place {
  border: 1px solid #DDDDDD;
  border-radius: 10px;
  margin: 15px 0px 0px;
  padding: 5px 5px;
  max-height: 400px;
  overflow: auto;
}
.mobile-important-place__item {
  padding: 6px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #F2F2F2;
}
.mobile-important-place__item:nth-child(odd) {
  border-left: 1px solid #F2F2F2;;
}
.mobile-important-place__item:nth-child(odd):last-child {
  border-bottom: none
}
.mobile-important-place__item span:first-child{
  font-size: 12px;
  color: #1D1D1D;
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
.mobile-important-place__item span:last-child {
  font-size: 12px;
  color: #979999;
}
.mobile-amenity__title {
  padding: 0px 10px;
}
.mobile-amenity__title span:first-child{
  font-size: 15px;
  line-height: 18px;
  color: #1D1D1D;
  font-weight: 600;
}
.mobile-amenity__title span:last-child {
  font-size: 12px;
  line-height: 14px;
  color: #EB384D;
  font-weight: 600;

}
.mobile-amenity{
  margin: 30px -5px 0px;
  padding: 0px;
}
.mobile-amenity__list {
  width: 25%;
  padding: 5px;

}
.mobile-amenity__items {
  background: #F8FAFA;
  border-radius: 10px;
  height: 80px;
  font-size: 10px;
  color: #1D1D1D;
}
.mobile-feature__item span{
  border: 1px solid #DDDDDD;
  border-radius: 20px;
  font-size: 12px;
  padding: 0px 10px;
  color: #4E4E4E;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 2px;
}
.mobile-amenity__items__img {
  margin-bottom: 12px
}
.hotel-webiste__mobile {
  border-radius: 10px 10px 0px 0px !important;
}
.desktop-see-more-amenities {
  font-size: 13px;
  color: #EB384D !important;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer
}
</style>
