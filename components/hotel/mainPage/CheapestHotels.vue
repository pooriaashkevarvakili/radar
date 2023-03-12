<template>
	<div class="container">
		<div class="d-flex align-items-center main-title">
			<h2 class="main-page__title">
				ارزان‌ترین هتل‌ها در مقاصد محبوب
			</h2>
			<div class="main-page__line" />
		</div>
		<div class="main-view">
			<div class="tab">
				<ul class="navbar-tab">
					<li v-for="(destination, index) in topDestinationsResult" :key="index" :class="{ 'active': tabId == index }" @click="changeTab(destination.CityId, destination.CityNameEn, destination.CityNameFa, index)">
						<div class="title">
							<h5 class="city">
								{{ destination.CityNameFa }}
							</h5><div class="min-price">
								از <strong>{{ convertMoney(destination.Hotels[0].MinPrice) }}</strong> هزار تومان
							</div>
						</div><font-awesome-icon :icon="['fas', 'chevron-left']" class="arrow-left-tab fa-style" :class="{ 'arrow-left-tab-white': tabId == index }" />
					</li>
				</ul>
				<div v-if="currentHotelsData != []" class="content-tab">
					<div class="first-box">
						<label><font-awesome-icon :icon="['fas', 'user']" class="user fa-style" /><span>اتاق یک تخته</span></label>
						<ul>
							<li v-for="(hotel, index) in cheapestSingleBed.slice(0, 8)" v-show="hotel.SingleBedRoom" :key="index">
								<a v-if="hotel.SingleBedRoom" :href="'/' + cityName + '/' + hotel.NameEn" target="_blank" rel="noreferrer">
									<div>
										<span class="hotel">{{ hotel.NameFa }}</span><span class="price">+ <span>{{ convertMoney(hotel.SingleBedRoom.Price.TotalPrice) }}</span> ت </span>
									</div>
								</a>
							</li>
							<li class="more">
								<a :href="'/' + cityName" target="_blank" rel="noreferrer">
										<span>سایر هتل های {{ cityNameFa }}</span><font-awesome-icon :icon="['fas', 'arrow-left']" class="arrow-left fa-style" />
								</a>
							</li>
						</ul>
					</div>
					<div class="second-box">
						<label><font-awesome-icon :icon="['fas', 'user-friends']" class="user-friends fa-style" /><span>اتاق دو تخته</span></label>
						<ul>
							<li v-for="(hotel, index) in cheapestDoublebed.slice(0, 8)" v-show="hotel.DoubleBedRoom" :key="index">
								<a v-if="hotel.DoubleBedRoom" :href="'/' + cityName + '/' + hotel.NameEn" target="_blank" rel="noreferrer">
									<div>
										<span v-if="hotel.DoubleBedRoom" class="hotel">{{ hotel.NameFa }}</span><span class="price">+ <span>{{ convertMoney(hotel.DoubleBedRoom.Price.TotalPrice) }}</span> ت </span>
									</div>
								</a>
							</li>
							<li class="more">
								<a :href="'/' + cityName" target="_blank" rel="noreferrer">
										<span>سایر هتل های {{ cityNameFa }}</span><font-awesome-icon :icon="['fas', 'arrow-left']" class="arrow-left fa-style" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="image-box">
				<a href="https://Radar361.com/covid19-report" target="_blank" rel="noreferrer"><img src="~assets/images/Report-Radar361.png" alt="report-radar"></a>
				<a href="https://twitter.com/radar361" target="_blank" rel="noreferrer"><img class="last-img" src="~assets/images/banner-twitter-radar361.png" alt="twitter-banner"></a>
			</div>
		</div>
		<div class="mobile-view">
			<div class="tab">
				<div class="d-flex header">
					<p class="title">
						ارزان‌ترین هتل‌ها در مقاصد محبوب
					</p>
					<div class="capacity">
						<span>
							<font-awesome-icon :class="{ 'active-icon': listId == 1 }" :icon="['fas', 'user-friends']" class="user fa-style" @click="listId = 1" />
						</span>
						<span>
							<font-awesome-icon :class="{ 'active-icon': listId == 2 }" :icon="['fas', 'user']" class="user fa-style" @click="listId = 2" />
						</span>
					</div>
				</div>
				<ul class="navbar-tab">
					<li v-for="(destination, index) in topDestinationsResult" :key="index" :class="{ 'active-tab-mobile': tabId == index }" @click="changeTab(destination.CityId, destination.CityNameEn, destination.CityNameFa, index)">
						<div class="box">
							{{ destination.CityNameFa }}  <span class="city-price">{{ convertMoney(destination.Hotels[0].MinPrice) }}</span>
						</div>
					</li>
				</ul>
				<div v-if="listId == 2">
					<div v-for="(hotel, index) in cheapestSingleBed" :key="index" class="content-tab">
						<a :href="'/' + cityName + '/' + hotel.NameEn" class="box" target="_blank" rel="noreferrer">
							<span class="hotel-name">{{ hotel.NameFa }}</span><span v-if="hotel.SingleBedRoom" class="price"><span>{{ convertMoney(hotel.SingleBedRoom.Price.TotalPrice) }}+ ت</span></span>
						</a>
					</div>
				</div>
				<div v-if="listId == 1">
					<div v-for="(hotel, index) in cheapestDoublebed" :key="index" class="content-tab" rel="noreferrer">
						<a :href="'/' + cityName + '/' + hotel.NameEn" class="box" target="_blank" rel="noreferrer">
							<span class="hotel-name">{{ hotel.NameFa }}</span><span v-if="hotel.DoubleBedRoom" class="price"><span>{{ convertMoney(hotel.DoubleBedRoom.Price.TotalPrice) }}+ ت</span></span>
						</a>
					</div>
				</div>
				<a :href="'/' + cityName">
					<span class="more"><span>سایر هتل های {{ cityNameFa }}</span><font-awesome-icon :icon="['fas', 'arrow-left']" class="arrow-left fa-style" /></span>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
import { faChevronLeft, faUser, faUserFriends, faArrowLeft, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { mapGetters } from 'vuex';
library.add(faChevronLeft, faUser, faUserFriends, faArrowLeft, faChevronDown, faChevronUp);
export default {
	data() {
		return {
			tabId: 0,
			listId: 1,
			cityName: null,
			cityNameFa: null,
			currentHotelsData: [],
			cheapestSingleBed: [],
			cheapestDoublebed: []
		};
	},
	computed: {
		...mapGetters('Hotel', [
			'topDestinationsResult'
		])
	},

	watch: {
		topDestinationsResult: function (newVal, oldVal) {
			if (oldVal.length === 0) {
				this.fillDifferentRoomsList();
			}
		}
	},
	mounted() {
		this.fillDifferentRoomsList();
	},
	methods: {
		changeTab: function (id, cityName, cityNameFa, index) {
			this.cityName = cityName;
			this.cityNameFa = cityNameFa;
			this.tabId = index;
			this.currentHotelsData = this.topDestinationsResult && this.topDestinationsResult.filter(res => res.CityId === id)[0].Hotels || [];
			this.cheapestSingleBed = this.topDestinationsResult && this.topDestinationsResult.filter(res => res.CityId === id)[0].cheapestSingleBed || [];
			this.cheapestDoublebed = this.topDestinationsResult && this.topDestinationsResult.filter(res => res.CityId === id)[0].cheapestDoubleBed || [];
		},
		convertMoney: function (x, type) {
			const str = x && x.toString();
			return str && str.slice(0, -3);
		},
		fillDifferentRoomsList() {
			this.cityName = this.topDestinationsResult && this.topDestinationsResult[0] && this.topDestinationsResult[0].CityNameEn;
			this.cityNameFa = this.topDestinationsResult && this.topDestinationsResult[0] && this.topDestinationsResult[0].CityNameFa;
			this.currentHotelsData = this.topDestinationsResult && this.topDestinationsResult[0] && this.topDestinationsResult[0].Hotels || [];
			this.cheapestSingleBed = this.topDestinationsResult && this.topDestinationsResult[0] && this.topDestinationsResult[0].cheapestSingleBed || [];
			this.cheapestDoublebed = this.topDestinationsResult && this.topDestinationsResult[0] && this.topDestinationsResult[0].cheapestDoubleBed || [];
		}
	}
};
</script>
<style scoped>
	::v-deep .main-view .tab .navbar-tab li .arrow-left-tab {
		position: absolute;
		top: 20px;
		left: 20px;
		color: #EB384D;
	}
	::v-deep .arrow-left-tab-white {
		color: #fff!important;
	}
	.active-icon {
		color: #EB384D!important;
	}
	.main-view {
		display: inline-flex;
		justify-content: center;
	}
	.mobile-view {
		display: none;
		margin: 25px 0;
	}
	.main-view .tab {
		height: 385px;
		display: -webkit-inline-box;
		display: -moz-inline-box;
		width: 80%;
		margin-bottom: 51px;
	}
	.main-view a {
		width: 30%;
	}
	.image-box a img {
		border-radius: 10px
	}
	.main-view .image-box .last-img {
		margin-top: 21px;
	}
	.main-view .tab .navbar-tab {
		display: block;
		list-style: none;
		padding: 0;
	}
	.main-view .tab .navbar-tab li:first-child {
		border-radius: 0px 10px 0px 0px;
	}
	.main-view .tab .navbar-tab li {
		position: relative;
		width: 270px;
		height: 55px;
		background: none;
		border-top: 1px solid #D1D1D1;
		border-left: 1px solid #D1D1D1;
		border-right: 1px solid #D1D1D1;
		color: #444444;
		padding-top: 16px;
		text-align: right;
		padding-right: 18px;
		cursor: pointer;
	}
	.main-view .tab .navbar-tab li:last-child {
		border-bottom: 1px solid #D1D1D1;
		border-radius: 0 0 10px 0px;
	}
	.main-view .tab .navbar-tab li .city {
		font-weight: 600;
		font-size: 15px;
		line-height: 23px;
		text-align: right;
	}
	.main-view .tab .navbar-tab li .min-price {
		position: absolute;
		top: 16px;;
		right: 140px;
		font-style: normal;
		font-weight: 500;
		font-size: 13px;
		line-height: 20px;
	}
	.active {
		background-color: #EB384D!important;
		color: #fff!important;
	}
	.main-view .tab .content {
		height: 100%;
		display: block;
	}
	.main-view .tab .content-tab {
		padding: 30px 36px;
		display: inline-flex;
		background: #FFFFFF;
		border: 1px solid #D1D1D1;
		border-right: none;
		box-sizing: border-box;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		height: 100%;
	}
	.main-view .tab .content-tab .first-box  {
		text-align: right;
		border-left: 2px solid #FAFAFA;
		position: relative;
	}
	.main-view .tab .content-tab .first-box .more  {
		font-weight: bold;
		font-size: 12px;
		line-height: 19px;
		text-align: right;
		color: #FFCD4F;
		position: absolute;
		bottom: 0;
		width: 210px;
	}
	.main-view .tab .content-tab .first-box .more span  {
		color: #FFCD4F;
		font-weight: bold;
		font-size: 12px;
		margin: 0;
		line-height: 0;
	}
	.main-view .tab .content-tab .first-box .more .arrow-left {
		position: absolute;
		font-size: 13px;
		top: 2px;
		left: 0;
	}
	.main-view .tab .content-tab label {
		margin-bottom: 23px;
	}
	.main-view .tab .content-tab label span {
		margin-right: 10px;
		font-weight: bold;
		font-size: 16px;
		line-height: 25px;
		text-align: right;
		color: #444444;
	}
	.main-view .tab .content-tab .first-box label .user {
		color: #FFCD4F;
		font-size: 13px;
	}
	.main-view .tab .content-tab .second-box label .user-friends {
		color: #EB384D;
		font-size: 13px;
	}
	.main-view .tab .content-tab ul {
		list-style: none;
		width: 210px;
		padding: 0;
		margin-bottom: 9px;
	}
	.main-view .tab .content-tab .first-box ul {
		margin-left: 35px;
	}
	.main-view .tab .content-tab  ul li {
		margin-bottom: 9px;
		position: relative;
		height: 20px;
	}
	.main-view .tab .content-tab ul li:first-child .hotel {
		font-size: 13px;
		font-weight: 600!important;
		color: #666666;
	}
	.main-view .tab .content-tab ul li .hotel {
		font-size: 13px;
		line-height: 15px;
		text-align: right;
		position: absolute;
		right: 0;
		font-weight: 300;
		color: #888888;
	}
	.main-view .tab .content-tab ul li .price {
		font-style: normal;
		font-weight: 600;
		font-size: 13px;
		line-height: 20px;
		color: #666666;
		position: absolute;
		left: 0;
	}
	.main-view .tab .content-tab .second-box  {
		text-align: right;
		padding-right: 35px;
		position: relative;
	}

	.main-view .tab .content-tab .second-box .more {
		font-weight: bold;
		font-size: 12px;
		line-height: 19px;
		text-align: right;
		color: #FF4C67;
		position: absolute;
		bottom: 0;
		width: 210px;
	}
	.main-view .tab .content-tab .second-box .more span {
		color: #FF4C67;
		font-weight: bold;
		font-size: 12px;
		text-align: right;
		margin: 0;
	}
	.main-view .tab .content-tab .second-box .more .arrow-left {
		position: absolute;
		font-size: 13px;
		top: 2px;
		left: 0;
	}
	.fa-style{
		height: 1rem;
	}
	.active-tab-mobile {
		font-style: normal;
		font-weight: 600!important;
		color: #EB384D!important;
	}
	.active-tab-mobile::after {
		content: ' ';
		width: 100%;
		height: 3px;
		background-color: #EB384D;
		display: block;
		position: relative;
		bottom: -14px;
	}
	.mobile-view .header {
		position: relative;
	}
	.mobile-view .header .title {
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 25px;
		text-align: right;
		color: #1D1D1D;
	}
	.mobile-view .header .capacity {
		position: absolute;
		left: 0;
		top: 0px
	}
	.mobile-view .header .capacity .user {
		font-style: normal;
		font-weight: 900;
		font-size: 18px;
		line-height: 18px;
		text-align: right;
		color: #E0E0E0;
	}
	.mobile-view .tab ul {
		list-style: none;
		padding: 0;
		width: 100%;
		overflow: auto;
		padding-bottom: 14.13px;
		border-bottom: 1px solid #D1D1D1;
		display: inline-flex;
	}
	.mobile-view .tab ul li {
		margin-left: 21px;
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 23px;
		color: #BDBDBD;
	}
	.mobile-view .tab ul li .box {
		min-width: 100%;
		width: 100%;
		display: inline-flex;
	}
	.mobile-view .tab li .navbar-tab {
		position: relative;
		width: 100%;
		height: 65px;
		background: none;
		border: 1px solid #D1D1D1;
		border-bottom: 0;
		color: #444444;
		padding-top: 16px;
		text-align: right;
		padding-right: 18px;
		cursor: pointer;
	}
	.mobile-view .tab .navbar-tab li .box .city-price {
		margin-right: 5px;
	}
	.mobile-view .tab li:last-child  .navbar-tab{
		border-radius: 0 0 10px 10px;
		border-bottom: 1px solid #D1D1D1;
	}
	.mobile-view .tab .navbar-tab li .arrow-left-tab {
		position: absolute;
		top: 23px;
		left: 25px;
		color: #FF4C67;
		font-size: 20px;
	}
	.mobile-view .tab li .navbar-tab .city {
		position: absolute;
		top: 17px;
		right: 23px;
		font-weight: 700;
	}
	.mobile-view .tab li .navbar-tab .min-price {
		position: absolute;
		top: 20px;
		left: 54px;
		font-size: 16px;
	}
	.mobile-view .tab .content-tab {
		position: relative;
	}
	.mobile-view .tab .content-tab .box  {
		height: 35px;
		display: inline-flex;
	}
	.mobile-view .tab .content-tab .box .hotel-name {
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 35px;
		text-align: right;
		color: #4F4F4F;
		position: absolute;
		right: 0;
	}
	.mobile-view .tab .content-tab .box .price {
		font-style: normal;
		font-weight: 600;
		font-size: 15px;
		line-height: 35px;
		color: #EB384D;
		position: absolute;
		left: 0;
	}
	.mobile-view .tab .more {
		font-weight: 600;
		font-size: 15px;
		line-height: 23px;
		text-align: right;
		color: #EB384D;
		margin-top: 12px;
		width: 100%;
	}
	.mobile-view .tab .more .arrow-left {
		margin-right: 10px;
		line-height: 12px;
		position: relative;
		top: 3px;
	}
	.mobile-view .arrow-up {
		font-weight: 900;
		font-size: 20px;
		line-height: 20px;
		color: #777777;
		position: absolute;
		left: 20px;
		top: 12px;
	}
	.mobile-view .arrow-down {
		font-weight: 900;
		font-size: 20px;
		line-height: 20px;
		color: #777777;
		position: absolute;
		left: 20px;
		top: 12px;
	}
	.main-title {
		margin: 42px 0;
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
		width: calc(100% - 300px);
		margin-right: 13px;
	}
	@media (max-width: 768px) {
		.main-view {
			display: none;
		}
		.mobile-view {
			display: block;
			padding: 0 20px;
			max-height: 440px;
			overflow: hidden;
		}
		.main-title {
			display: none!important;
		}
		.capacity span {
			width: 40px;
			height: 40px;
			display: inline-flex;
			justify-content: center;
			align-items: center;
		}
		.capacity span:hover, .capacity span:active {
			background: #F2F2F2;
			border-radius: 50%;
		}
	}
</style>
