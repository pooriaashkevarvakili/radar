
<template>
	<div class="radar-info">
		<div class="boxes">
			<div class="content">
				<img src="~assets/images/comments-info.svg" alt="comment">
				<p ref="number" class="number d-flex justify-content-center">
					<span>{{ formatNumber(radarInfo.CommentsCount) }}</span>
				</p>
				<h6 class="desc">
					نظرات جمع‌آوری شده توسط رادار ۳۶۱
				</h6>
			</div>
			<div class="content">
				<img src="~assets/images/options-info.svg" alt="comment">
				<p class="number d-flex justify-content-center mb-0">
					<span>{{ formatNumber(radarInfo.HotelsCount) }}</span>
				</p>
				<h6 class="desc">
					تعداد هتل‌های مورد بررسی در رادار ۳۶۱
				</h6>
			</div>
			<div class="content">
				<img src="~assets/images/saved-info.svg" alt="comment">
				<p class="number align-items-baseline">
					<span>{{ formatMoney(radarInfo.SavedMoney) }}</span>
					<span class="toman">تومان</span>
				</p>
				<h6 class="desc">
					تخمین صرفه‌جویی توسط کاربران در رادار ۳۶۱
				</h6>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	computed: {
		...mapState('Hotel', ['radarInfo'])
	},
	methods: {
		formatNumber: function (num) {
			return num && num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
	}
};
</script>
<style scoped>
.radar-info {
	background-color: #fff;
	width: 100%;
	text-align: center;
	border-top: 1px solid #d1d1d1;
	border-bottom: 1px solid #d1d1d1;
	margin-bottom: 30px
}
.boxes {
	display: inline-flex;
	margin-top: 43px;
	margin-bottom: 50px;
}
.boxes .content {
	margin-left: 196px;
	text-align: center;
}
.boxes .content:last-child {
	margin-left: 0;
}
.number {
	font-weight: 700;
    font-size: 30px;
    line-height: 47px;
    text-align: center;
    color: #eb384d;
    margin-top: 9px;
    margin-bottom: 2px;
}
.camma{
	min-width: 10px !important;
	font-weight: bold;
	font-size: 30px;
	line-height: 47px;
	text-align: center;
	color: #eb384d;
	margin-top: 9px;
	margin-bottom: 2px;
}
.digit{
	min-width: 18px !important;
	font-weight: bold;
	font-size: 30px;
	line-height: 47px;
	text-align: center;
	color: #eb384d;
	margin-top: 9px;
	margin-bottom: 2px;
}
.toman{
	margin-right:4px;
	font-style: normal;
	font-weight: normal;
	font-size: 17px;
	line-height: 27px;
	text-align: center;
	color: #828282;
}
.boxes .content .desc {
	font-weight: bold;
	font-size: 13px;
	line-height: 20px;
	text-align: center;
	color: #444444;
}
@media (max-width: 768px) {
	.boxes {
		display: block;
		padding: 45px;
		padding: 35px;
		margin: 0;
	}
	.boxes .content {
		margin-left: 0;
		text-align: center;
		width: 100%;
		margin-bottom: 55px;
	}
}
</style>
