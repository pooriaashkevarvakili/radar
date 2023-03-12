<template>
	<div class="hotel-image-component w-100">
		<div class="d-flex flex-wrap d-desktop">
			<div v-for="(image, index) in showAllImages? images : (images ? images.slice(0,11) : []) " :key="index" class="hotel-images">
				<img :src="image['URL210x128'] || image.URL" :alt="image.Caption? image.Caption : `رزرو ${hotelType + ' ' + hotelNameFa + ' ' + cityNameFa}`">
			</div>
			<div v-if="!showAllImages && images && images.length > 12" class="hotel-images">
				<a target="_blank" rel="noreferrer" :href="'/' + cityName + '/' + hotelName" class="show-more-image" :style="{'background': `linear-gradient(0deg, rgba(21, 26, 27, 0.8), rgba(21, 26, 27, 0.8)), url(${images[11].URL})`}">
					نمایش همه {{ imagesCount || images.length }} تصویر
				</a>
			</div>
		</div>
		<div class="d-none d-mobile">
			<div>
				<hooper
					ref="slider"
					group="group1"
					class="big-slider"
					:center-mode="true"
					:wheel-control="false"
					:short-drag="false"
					:infinite-scroll="true"
					:items-to-show="1"
					:rtl="true"
					@slide="onSlide"
				>
					<slide v-for="(image, index) in images " :key="index">
						<div
							:style="{'background-image': 'url(' + image.URL770 + ')'}"
							class="slider-background d-flex w-100 h-100"
						/>
					</slide>
					<hooper-navigation slot="hooper-addons" />
					<hooper-pagination slot="hooper-addons" mode="fraction" />
				</hooper>
			</div>
			<div class="mobile-image-list">
				<div class="d-flex flex-wrap" style="direction: rtl">
					<div v-for="(image, index) in images" :key="index" class="mobile-image-list__item" @click="$refs.slider.slideTo(index)">
						<image-loader :image="image" :index="index" :current-slide="currentSlide" />
					</div>
				</div>
			</div>
		</div>
        <div v-if="images && images.length === 0" class="no-image">
            برای این اقامتگاه تصویری ثبت نشده است
        </div>
	</div>
</template>

<script>
import ImageLoader from '~/components/hotel/ImageLoader';
/* eslint-disable */
// attention please fix this component
import {
	Hooper,
	Slide,
	Pagination as HooperPagination,
	Navigation as HooperNavigation

} from 'hooper';
import 'hooper/dist/hooper.css';
export default {
	components: {
		Hooper,
		Slide,
		HooperNavigation,
        HooperPagination,
        ImageLoader
	},
	props: {
		images: Array,
		singleHotel: Boolean,
        hotelName: String,
        cityNameFa: String,
        hotelType: String,
        hotelNameFa: String,
        imagesCount: Number
	},
	data: function () {
		return {
			showAllImages: false,
			currentImage: 0,
			currentSlide: 0,
			showAllSingleHotelImage: false
		};
	},
    computed: {
        cityName() {
			return this.$route.params.origin;
		}
    },
	methods: {
		onSlide(index) {
			this.currentSlide = index.currentSlide;
		},
		setImageNumber(index) {
			this.currentImage = index;
        },
	}
};
</script>
<style scoped>
.no-image {
    padding: 20px;
    text-align: center;
}
::v-deep .hotel-image-component .hooper {
    height: 260px !important;
}
::v-deep .hotel-image-component .hooper-next {
    margin-left: 10px;
    right: auto;
    left: 0;
}
::v-deep .hotel-image-component .hooper-prev {
    margin-right: 10px;
    left: auto;
    right: 0;
}
::v-deep .hotel-image-component .hooper-prev, .hotel-image-component .hooper-next {
    padding: 0;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    width: 35px !important;
    height: 35px !important;
    outline: none;
}
::v-deep .hotel-image-component .icon-arrowRight, .hotel-image-component .icon-arrowLeft {
    fill: white !important;
    top:0px !important;
    left: 5px;
    width: 24px !important;
    height: 24px !important;
}
::v-deep .hotel-image-component .hooper-pagination {
    direction: ltr;
    color: white;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    width: 65px;
    height: 35px;
    position: relative;
    margin: 0px;
    top: -50px;
    right: calc(100% - 52px);
    display: flex !important;
    justify-content: center;
    align-items: center;
}
::v-deep .hooper-next, ::v-deep .hooper-prev {
    background: rgba(0,0,0,.8);
    border-radius: 50%;
    width: 35px!important;
    height: 35px!important;
    color: white;
    border-color: transparent;
    display: flex;
    justify-content: center;
    padding: 0px;
    align-items: center;
}
::v-deep .hooper-prev svg, ::v-deep .hooper-next svg {
    fill: #fff!important;
}
::v-deep .hooper-prev {
    margin-right: 20px;
}
::v-deep .hooper-next {
    margin-left: 20px;
}
::v-deep .hooper-pagination {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    color: white;
    left: 0px;
    padding: 5px 15px;
    bottom: 10px;
    width: fit-content;
}
.hotel-image-component {
    padding: 0px 15px;
}
.hotel-image-component .hotel-images {
    width: 25%;
    padding: 3.5px 3.5px;
    height: 135px
}
.hotel-image-component .hotel-images img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
    background-color: #bbb;
}
.show-more-image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    font-weight: 600;
    font-size: 15px;
    line-height: 23px;
    color: #F4F4F4 !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
@media (max-width: 767.98px) {
  .d-mobile {
    display: block !important
  }
  .d-desktop {
    display: none !important
  }
  .hotel-image-component {
      padding: 0px
  }
}

.hotel-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  /* position: absolute; */
  top: 0px;
  right: 0px;
}
.slider-image img {
  object-fit: cover;
  background-position: center;
  width: 100%;
  background-size: cover;
  height: 100%;
}
.mobile-image-slider {
    width: 100%;
    height: 260px;
    position: relative;
}
.slider-background {
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: gainsboro;
}
.mobile-slider-number {
    margin-top: auto;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: 15px;
    text-align: left;
    color: white;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    width: 65px;
    height: 35px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mobile-image-list {
    direction: ltr;
    padding: 0px 6px 0px 10px;
    margin: 13px 7px;
    height: calc(100vh - 400px);
    overflow: auto;
}
.mobile-image-list__item {
    width: 20%;
    padding: 3px;
}
::-webkit-scrollbar {
  width: 3.5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #E7E7E7;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1D1D1D;
  border-radius: 5px;
}


</style>
