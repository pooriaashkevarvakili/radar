<template>
	<div v-show="filteredSpecialOffer.length" class="wrapper">
		<div class="container">
			<div class="d-flex align-items-center">
				<h3 class="main-page__title">
					پیشنهاد ویژه برای شما
				</h3>
				<div class="main-page__line" />
			</div>
			<div class="hooper-wrapper">
				<hooper ref="carousel" :settings="hooperSettings">
					<slide v-for="(hotel, i) in filteredSpecialOffer" :key="i">
						<div class="card-wrapper">
							<div class="card hotel-card">
								<div class="card-img-top" alt="hotel image" :style="[hotel.HotelImage ? {'background-image': 'linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), linear-gradient(180deg, rgba(0, 0, 0, 0) 49.48%, rgba(0, 0, 0, 0.5) 84.37%), url(' + hotel.HotelImage + ')'} : {'background-image': 'linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), linear-gradient(rgba(0, 0, 0, 0) 49.48%, rgba(0, 0, 0, 0.5) 84.37%)'} ]" />
								<div class="hotel-card-header">
									<div class="text-right mb-1 hotel-stars">
										<img v-for="(star, i) in hotel.HotelType.Stars" :key="i" src="~assets/images/star.png" alt="star">
									</div>
									<h4 class="hotel-card-header__name">
										هتل {{ hotel.HotelNameFa }}
									</h4>
								</div>
								<div class="card-rate d-flex justify-content-between align-items-center">
									<span>{{ hotel.RoomTypeName }}</span>
									<span v-if="hotel.CommentAvg">{{ hotel.CommentAvg ? +hotel.CommentAvg.toFixed(1) : '' }}/۱۰</span>
								</div>
								<div class="hotel-card__body">
									<div class="d-flex justify-content-between hotel-website">
										<span class="hotel-website__url">{{ hotel.Sellers[0] ? hotel.Sellers[0].Name: '' }}</span>
										<div class="hotel-website__price">
											<img src="~assets/images/hotelCheck.png" alt="check-image">
											<span style="color: #EB384D;">{{ hotel.Sellers[0] ? formatMoney(hotel.Sellers[0].Price): '' }} ریال</span>
										</div>
									</div>
									<div class="hotel-card__body-horizontal-line" />
									<div v-for="(seller, i) in hotel.Sellers.length ? hotel.Sellers.slice(1, 3): 0" :key="i">
										<div class="d-flex justify-content-between hotel-card__seller">
											<span>{{ seller.Name }}</span>
											<span>{{ formatMoney(seller.Price) }} ریال</span>
										</div>
										<div v-if="hotel.Sellers.length > 1" class="hotel-card__body-horizontal-line" />
									</div>
									<div class="hotel-card__reserve d-flex justify-content-between align-items-center">
										<span v-if="hotel.Sellers && hotel.Sellers.length > 3">و  {{ hotel.Sellers.length - 3 }} فروشنده دیگر</span>
										<nuxt-link :to="hotel.CityNameEn + '/' + hotel.HotelNameEn">
											فروشندگان
											<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M0.492188 5.14062C0.345703 5.28711 0.345703 5.49219 0.492188 5.63867L4.79883 9.97461C4.91602 10.1211 5.15039 10.1211 5.29688 9.97461L5.85352 9.38867C6 9.24219 6 9.03711 5.85352 8.89062L2.39648 5.375L5.85352 1.88867C6 1.74219 6 1.50781 5.85352 1.39062L5.29688 0.804688C5.15039 0.658203 4.91602 0.658203 4.79883 0.804688L0.492188 5.14062Z" fill="white" />
											</svg>
										</nuxt-link>
									</div>
								</div>
							</div>
						</div>
					</slide>
					<hooper-navigation slot="hooper-addons" />
				</hooper>
			</div>
		</div>
	</div>
</template>
<script>
import {
	Hooper,
	Slide,
	Navigation as HooperNavigation
} from 'hooper';
import 'hooper/dist/hooper.css';
import { mapState } from 'vuex';
export default {
	name: 'RecommendedHotel',
	components: {
		Hooper,
		Slide,
		HooperNavigation
	},
	data() {
		return {
			hooperSettings: {
				itemsToShow: 1,
				rtl: true,
				infiniteScroll: !!(this.filteredSpecialOffer && this.filteredSpecialOffer.Hotels && this.filteredSpecialOffer.Hotels.length > 4),
				trimWhiteSpace: true,
				breakpoints: {
					1100: {
						itemsToShow: 4
					},
					767: {
						itemsToShow: 3
					},
					550: {
						itemsToShow: 2
					},
					300: {
						centerMode: false,
						itemsToShow: 1.3
					}
				}
			}
		};
	},
	computed: {
		...mapState('Hotel', [
			'specialOffer'
		]),
		filteredSpecialOffer() {
			const arr = this.specialOffer.filter(i => i.Sellers.length > 2);
			if (this.$refs.carousel && arr.length === 1) {
				this.$refs.carousel.settings.breakpoints[300].centerMode = true;
				this.$refs.carousel.update();
			}
			return arr;
		}
	}
};
</script>
<style scoped>
::v-deep .hooper-wrapper .hooper:focus {
    outline: none !important;
}
::v-deep .hooper-wrapper .hooper-prev {
    right: -50px !important;
}
::v-deep .hooper-wrapper .hooper-next {
    left: -50px !important;
    right: auto
}
::v-deep .hooper-wrapper .hooper-next,.hooper-wrapper .hooper-prev {
    border: 1px solid #D1D1D1 !important;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    padding: 0px !important;
}
::v-deep .hooper-wrapper .icon-arrowLeft, .hooper-wrapper .icon-arrowRight {
    fill: #FF4C67;
    display: block;
    margin: 0 auto !important;
    width: 40px;
    height: 40px;
}
::v-deep .hooper-wrapper  .icon-arrowRight {
    position: relative !important;
    top: -3px !important;
    right: 2px !important;
}
::v-deep .hooper-wrapper .icon-arrowLeft {
    position: relative !important;
    top: -3px !important;
    right: 5px !important;
}
@media screen and (max-width: 1240px) {
    ::v-deep .hooper-wrapper .hooper-prev {
        right: -40px
    }
    ::v-deep .hooper-wrapper  .hooper-next {
        left: -40px !important
    }
}
::v-deep .hooper-wrapper .hooper-next:focus, ::v-deep .hooper-wrapper .hooper-prev:focus {
    outline: none;
}
::v-deep .hooper-wrapper .hooper-list:focus {
    outline: none;
}
.hotel-card {
    border-radius: 10px !important;
}
.wrapper {
    background: #F5F5F5;
    padding-top: 30px
}
.hooper-wrapper {
    margin-top: 20px;
}
.main-page__title {
    font-size: 20px;
    line-height: 23px;
    text-align: right;
    color: #222222;
    margin: 0px !important;
    font-weight: 600;
}
.main-page__line {
    height: 3px;
    background: #F0F0F0;
    width: calc(100% - 200px);
    margin-right: 14px;
}
.hotel-card-header__name {
    font-weight: 600;
    font-size: 18px;
    line-height: 19px;
    text-align: right;
    color: #FFFFFF;
}
.hotel-card-header {
    position: relative;
    top: -65px;
    margin-bottom: -63px;
    margin-right: 10px;
}
.card-img-top {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    height: 180px;
    background-size: cover;
    background-repeat: no-repeat;
}
.card {
    border: none
}
.hotel-stars {
    height: 24px;
}
.card-rate {
    height: 30px;
    background: #EB384D;
    color: white;
    padding: 0px 11px
}
.card-rate span:first-child {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.card-rate span:last-child {
    font-size: 14px
}
.hotel-card__body {
    background: #FFFFFF;
    border: 1px solid #D1D1D1;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 0px;
    padding: 6.5px 10px;
    height: 177px;
}
.hotel-website__url {
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    text-align: right;
    color: #444444;
}
.hotel-website__price {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #444444;
}
.hotel-card__body-horizontal-line {
    background: #ECECEC;
    height: 1px;
    width: 100%;
    margin: 10px 0px;
}
.hotel-card__seller {
    font-size: 12px;
    line-height: 19px;
    color: #888888;
}
.hotel-card__reserve span {
    font-size: 11px;
    text-align: right;
    color: #4F4F4F;
}
.hotel-card__reserve a {
    background: #EB384D;
    border-radius: 20px;
    color: white !important;
    padding: 7px 10px;
    font-weight: 600;
    font-size: 13px;
}
.card-wrapper{
    padding: 8px;
    min-width: 265px
}
.hooper-wrapper .hooper {
    height: auto !important;
    min-height: 400px
}
.icon {
    color: white;
    display: block;
    margin: 0;
}
@media screen and (max-width: 550px) {
    .hotel-card {
        width: 350px;
    }
    .card-img-top {
        height: 220px;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .card-wrapper {
        display: flex;
        justify-content: center;
    }
    .hotel-card__body {
        height: 200px
    }
}
@media only screen and (max-width: 768px) {
    .hooper-wrapper .hooper-navigation {
        display: none !important;
    }
}
@media only screen and (min-width: 768px) and (max-width: 1100px) {
    .hooper-wrapper{
        width: 90%;
        margin: 0 auto;
    }
}
@media only screen and (max-width: 600px) {
    .main-page__line {
        display: none;
    }
    .hooper-wrapper {
        margin-top: 10px;
    }
    .card-rate {
        height: 37px !important
    }
    .card-rate span:first-child {
        font-size: 15px
    }
    .card-rate span:last-child{
        font-size: 18px;
    }
    .hotel-card-header__name {
        font-size: 22px;
        font-weight: 500;
    }
    .hotel-stars img {
        width: 18px
    }
    .hotel-website__price, .hotel-website__url {
        font-size: 18px;
        font-weight: 200;

    }
    .hotel-website {
        padding: 3px 0px;
    }
    .hotel-card__seller {
        font-size: 16px;
        padding: 3px 0px;
    }
    .hotel-card__reserve a{
        font-size: 17px;
    }
    .hotel-card__reserve {
        line-height: 28px;
    }
    .hotel-card__reserve img {
        width: 15px
    }
    .main-page__title {
        font-size: 20px;
        line-height: 23px;
        text-align: right;
        color: #222222;
        margin: 0px !important;
        font-weight: 600;
    }

}
</style>
