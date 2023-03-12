<template>
	<div class="card-wrapper">
		<div class="d-flex flex-column hotel-image-slider card-img-top">
			<single-hotel-image-slider :images="hotel.HotelImages ? hotel.HotelImages : ( hotel.Images ? hotel.Images: [])" :image-index="imageIndex" :name="'small-slider'" />
		</div>
		<div class="hotel-card__body">
			<div class="d-flex justify-content-between" style="margin-top:14px;">
				<span class="hotel_name">{{ hotel.NameFa }}</span>
				<div class="hotel-rate-box">
					<span>{{ hotel.Rate }}/10</span>
				</div>
			</div>
			<div class="d-flex justify-content-start hotel-subtitle align-items-center">
				<div v-if="hotel.HotelType && hotel.HotelType.Stars" class="text-right mb-1 hotel-stars d-flex mt-1">
					<img v-for="(star, i) in hotel.HotelType.Stars" :key="i" src="~assets/images/little-star.svg" alt="star">
				</div>
				<div class="hotel-location">
					<img src="~assets/images/grey-location.svg" alt="location">
					<span>{{ hotel.Address }}</span>
				</div>
			</div>
			<div class="hotel-card__body-horizontal-line" />
			<div class="hotel-card__reserve d-flex justify-content-between align-items-center">
				<div class="d-flex flex-column justify-content-center">
					<div class="hotel-provider-count" v-if="hotel.SellersCount">
						{{ hotel.SellersCount }} فروشنده، هر شب از
					</div>
					<div>
						<span class="hotel-base-price" >{{ formatMoney(hotel.CheaperSeller && hotel.CheaperSeller.TotalPrice ? hotel.CheaperSeller.TotalPrice : hotel.Seller.TotalPrice) }}</span>
						<span class="hotel-base-price-txt">
							<span style="color: #EB384D;">تومان</span> ({{ hotel.CheaperSeller ? hotel.CheaperSeller.SellerName : hotel.Seller.Name }})
						</span>
					</div>
				</div>
				<a :href="cityName ? '/' + cityName + '/' + hotel.NameEn :  '/resort/singleResort/' + hotel.Id" target="_blank" rel="noreferrer">
					فروشندگان
					<svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.492188 5.14062C0.345703 5.28711 0.345703 5.49219 0.492188 5.63867L4.79883 9.97461C4.91602 10.1211 5.15039 10.1211 5.29688 9.97461L5.85352 9.38867C6 9.24219 6 9.03711 5.85352 8.89062L2.39648 5.375L5.85352 1.88867C6 1.74219 6 1.50781 5.85352 1.39062L5.29688 0.804688C5.15039 0.658203 4.91602 0.658203 4.79883 0.804688L0.492188 5.14062Z" fill="white" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
import SingleHotelImageSlider from '~/components/hotel/singleHotel/singleHotelImageSlider';
export default {
	components: {
		SingleHotelImageSlider
	},
	props: {
		hotel: Object,
		cityName: String
	},
	data() {
		return {
			imageIndex: 0
		}
	}
};
</script>
<style scoped>
.card-wrapper{
	margin: 0px;
	border: none !important;
	border-radius: 10px !important;
}
.wrapper {
	background: #F5F5F5;
	padding-top: 30px
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
	height: 220px;
	background-size: cover;
	background-repeat: no-repeat;
}
.hotel_name{
	font-style: normal;
	font-weight: 500;
	font-size: 15px;
	line-height: 23px;
	text-align: right;
	color: #1D1D1D;
}
.hotel-subtitle{
	margin-bottom: 12px;
	height: 18px;
	align-items: baseline;
}
.hotel-card__body {
  padding: 6.5px 10px;
	border-radius: 0 0px 10px 10px !important;
}
.hotel-rate-box{
	background: #F1F9FA;
	border-radius: 5px;
	width: 43px;
	height: 22px;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 22px;
	text-align: center;
	color: #1899A7;
}
.hotel-location{
	margin-right: 6px;
	font-style: normal;
	font-weight: 300;
	font-size: 11px;
	line-height: 17px;
	text-align: right;
	color: #B1B1B1;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
.hotel-card__body-horizontal-line {
	background: #ECECEC;
	height: 1px;
	width: 100%;
	margin: 10px 0px;
}
.hotel-provider-count{
	font-style: normal;
	font-weight: normal;
	font-size: 11px;
	line-height: 17px;
	text-align: right;
	color: #4F4F4F;
}
.hotel-base-price{
	font-style: normal;
	font-weight: 500;
	font-size: 22px !important;
	line-height: 34px;
	color: #EB384D !important;
}
.hotel-base-price-txt{
	font-style: normal;
	font-weight: 300;
	font-size: 11px;
	line-height: 17px;
	text-align: right;
	color: #1D1D1D;
}
</style>
