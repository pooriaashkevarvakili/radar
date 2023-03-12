<template>
	<div v-show="show" class="d-flex flex-wrap price-calendar">
		<div class="price-calender-btn button-prev d-flex align-items-center justify-content-center" @click="prev">
			<font-awesome-layers class="fa-lg">
				<font-awesome-icon :icon="['fas', 'chevron-right']" class="careticonRight fa-style" :class="[(currentDate.getTime() < (new Date()).getTime()) ? 'inactive-btn' : '']" />
			</font-awesome-layers>
		</div>
		<div class="price-days-scroller-container">
			<div ref="scroller" class="price-days-scroller">
				<div ref="container" class="price-days-container" :style="{ 'transform': 'translateX(' + (scroll * normalWidth) + 'px)', 'margin-right': -((lowerBound + 3) * normalWidth + (selectedWidth - containerWidth) / 2) + 'px', 'width': ((10 + upperBound + lowerBound) * normalWidth + selectedWidth) + 'px' }">
					<price-calendar-day
						v-for="i in (7 + lowerBound + upperBound)"
						:key="i"
						ref="day"
						:min-price="minPriceInRange"
						:loading="priceLoader.loading"
						:date="addDays(initialDate, i - 4 - lowerBound)"
						:price="getPrice(addDays(initialDate, i - 4 - lowerBound))"
						:current="currentDate.getTime() == addDays(initialDate, i - 4 - lowerBound).getTime()"
						:weekend="getHoliday(addDays(initialDate, i - 4 - lowerBound))"
						@click.native="currentDate = addDays(initialDate, i - 3 - lowerBound) < new Date() ? currentDate : addDays(initialDate, i - 4 - lowerBound); loadPriceCalendar()"
					/>
					<div class="clear" />
				</div>
			</div>
			<div class="price-days-right-fader" />
			<div class="price-days-left-fader" />
		</div>
		<!-- <div class="min-price-in-range w-100">
			<span class="circle" />
			کمترین قیمت بلیط، سه روز قبل و بعد از روز انتخابی شما
		</div> -->
		<div class="price-calender-btn button-next d-flex align-items-center justify-content-center" style="left: 0px; right: auto;" @click="next">
			<font-awesome-layers class="fa-lg">
				<font-awesome-icon :icon="['fas', 'chevron-left']" class="careticonLeft fa-style" />
			</font-awesome-layers>
		</div>
	</div>
</template>

<script>
import VCalendar from 'v-calendar';
import { faCaretRight, faCaretLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { mapState } from 'vuex';
import PriceCalendarDay from '~/components/flight/PriceCalendarDay';
import PriceLoader from '~/plugins/PriceLoader.js';
const moment = require('moment-jalaali');
library.add(faCaretLeft, faCaretRight, faChevronLeft, faChevronRight);
export default {
	name: 'PriceCalendar',
	components: { PriceCalendarDay },
	props: { origin: String, destination: String, defaultDate: Date },
	data: function () {
		return {
			currentDate: this.defaultDate,
			initialDate: this.defaultDate,
			scroll: 0,
			lowerBound: 0,
			upperBound: 0,
			priceAndHoliday: { },
			maxLoaded: new Date(),
			minLoaded: new Date(),
			selectedWidth: 0,
			normalWidth: 0,
			containerWidth: 0,
			priceLoader: PriceLoader,
			show: false
		};
	},
	computed: {
		...mapState('Flight', ['cities']),
		minPriceInRange() {
			const priceArray = Object.keys(this.priceLoader.priceAndHoliday).map(key => ({ date: key, price: this.priceLoader.priceAndHoliday[key].minPrice }));
			const currentDateIndex = priceArray.findIndex(item => item.date === moment(this.defaultDate).format('YYYY-MM-DD'));
			const arr = priceArray.splice(currentDateIndex - 3, 7);
			if (arr.length) {
				const minPrice = arr.reduce(function (prev, curr) {
					return (prev.price < curr.price) && prev.price != null ? prev : curr;
				});
				return minPrice;
			} return {};
		}
	},
	watch: {
		currentDate: function (newDate, oldDate) {
			if (newDate.getTime() < (new Date()).getTime() - 86400000) {
				this.currentDate = oldDate;
				return;
			}

			const changeInDate = parseInt((newDate.getTime() - oldDate.getTime()) / 86400000);
			this.scroll += changeInDate;
			if (changeInDate < 0) { this.lowerBound -= changeInDate; } else if (changeInDate > 0) { this.upperBound += changeInDate; }

			this.loadPrices(this.addDays(this.initialDate, -this.lowerBound - 2), this.addDays(this.initialDate, this.upperBound + 2));

			// Changing page
			if (changeInDate !== 0) {
				this.$router.push({ path: '/flights/' + this.origin + '-' + this.destination, query: { date: moment(this.currentDate).format('jYYYY-jMM-jDD') } });
				const citiesList = this.cities[0].list.concat(this.cities[1].list);
				const cityInfo = {
					origin: {
						id: this.origin,
						label: citiesList.find(a => a.CityCode === this.origin)
					},
					destination: {
						id: this.destination.id,
						label: citiesList.find(a => a.CityCode === this.destination)
					},
					date: this.getDateString(this.currentDate)
				};
				localStorage.setItem('lastCitySearched', JSON.stringify(cityInfo));
			}
		}
	},
	mounted: function () {
		this.loadPrices(this.addDays(this.initialDate, -5), this.addDays(this.initialDate, 5));

		const that = this;
		window.onresize = function () {
			that.updateWidths();
		};
		this.updateWidths();
	},
	beforeMount: function () {

	},
	methods: {
		loadPriceCalendar() {
			this.loadPrices(this.addDays(this.initialDate, -5), this.addDays(this.initialDate, 5));
		},
		prev: function () {
			this.currentDate = this.currentDate.getTime() < (new Date()).getTime() ? this.currentDate : new Date(this.currentDate.getTime() - 86400000);
			this.$ga.event('send', {
				eventCategory: 'day',
				eventAction: 'prev'
			});
		},
		next: function () {
			this.currentDate = new Date(this.currentDate.getTime() + 86400000);
			this.$ga.event('send', {
				eventCategory: 'day',
				eventAction: 'next'
			});
		},
		loadPrices: function (from, to) {
			this.priceLoader.loadPrices(this.origin, this.destination, from, to);
		},
		addDays: function (date, days) {
			return new Date(date.getTime() + 86400000 * days);
		},
		getDateString: function (param) {
			const date = new VCalendar.JDate(param);
			return date.getFullYear() + '-' + this.pad(date.getMonth() + 1) + '-' + this.pad(date.getDate());
		},
		getPrice: function (date) {
			return this.priceLoader.getPrice(date);
		},
		getHoliday: function (date) {
			return this.priceLoader.getHoliday(date);
		},
		updateWidths: function () {
			this.show = true;
			this.$nextTick(() => {
				for (let i = 0; i < this.$refs.day.length; i++) {
					const el = this.$refs.day[i].$el;
					const style = el.currentStyle || window.getComputedStyle(el);
					const width = el.offsetWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);

					if (el.classList.contains('calenderDiv') && width) {
						this.normalWidth = width;
					}

					if (el.classList.contains('calenderBold') && width) {
						this.selectedWidth = width;
					}
				}

				const style = this.$refs.scroller.currentStyle || window.getComputedStyle(this.$refs.scroller);
				this.containerWidth = this.$refs.scroller.offsetWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);
			});
		},
		setCurrentDate: function (date) {
			this.currentDate = date;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.price-calendar {
	background: white;
	position: relative;
	margin-bottom: 10px
}
.row.price-calendar {
    position: relative;
}
.price-calender-btn {
    /* height: 100%; */
	height: 82px;
    width: 30px;
	background: #FAFAFA;
    /* margin: 38px 0px 0px 22px; */
    position: absolute;
    z-index: 1;
}
.button-prev {
	border: 1px solid #DDDDDD;
	border-radius: 0px 5px  0px 0px;
}
.button-next{
	border: 1px solid #DDDDDD;
	border-radius: 5px 0px  0px 0px;
}
.button-prev, .button-next {
	cursor: pointer;
}
.careticonRight {
    color: #15BBCC;
    font-size: 18px;
    margin: 7px 0px 0px 11px;
}
.price-days-scroller-container {
	width: 100%;
	padding: 0px 67px 0px 67px;
	overflow: hidden;
	position: relative;
	height: 82px;
	border: 1px solid #CCCCCC;
	border-radius: 5px 5px 0px 0px;
}
.price-days-scroller {
	/*overflow: hidden;*/
	margin: auto;
	padding-top: 13px;
	margin-top: -13px;
}
.price-days-container {
	height: 115px;
	transition: transform .5s;
	min-width: 500px;
}
.price-days-right-fader {
	width: 78px;
	position: absolute;
	right: 0;
	height: 100%;
	top: 0;
	z-index: 0;
	/* background: linear-gradient(90deg, rgba(233,240,240,0.2) 0%, rgba(244,248,249,1) 21%); */
}
.price-days-left-fader {
	width: 78px;
	position: absolute;
	left: 0;
	height: 100%;
	top: 0;
	z-index: 0;
	/* background: linear-gradient(90deg, rgba(244,248,249,1) 79%, rgba(233,240,240,0.2) 100%); */
}
.careticonLeft {
	color: #15BBCC;
    font-size: 18px;
    margin: 7px 0px 0px 8px;
}
.calenderDiv {
    height: 82px;
    width: 90px;
    color: #848484;
    text-align: center;
    cursor: pointer;
    position: relative;
    float: right;
    user-select: none;
}
.calenderDiv::before , .calenderBold::before{
	content: '';
    position: absolute;
    height: 80px;
    width: 1px;
    background: #E8E8E8;
    right: 0px;
    top: 0px;
}
.price-days-container .calenderDiv:nth-last-child(2)::after{
	content: '';
    position: absolute;
    height: 80px;
    width: 1px;
    background: #E8E8E8;
    left: 0px;
    top: 0px;
}
@media only screen and (min-width: 767.98px) {
    .calenderDiv, .calenderBold {
        width: 115px !important
    }
}
.calenderBold {
	text-align: center;
    background-color: #FAFAFA;
    cursor: pointer;
    position: relative;
    float: right;
	width: 90px;
	height: 78px;
	color: #1D1D1D !important;
}
@media (min-width: 576px) and (max-width: 767.98px) {
	.price-days-scroller {
        margin-top: 0!important;
    }
}
@media (max-width: 575px) {
	.price-calendar i.fas.fa-caret-right.fa-lg.careticonRight {
		margin: 0 0 0 10px;
		font-size: 16px;
	}
	/* .price-calender-btn.button-prev {
		width: 28px;
		height: 28px;
		top: 65px;
		right: 2px;
	}
	.price-calender-btn.button-next {
		width: 28px;
		height: 28px;
		top: 65px;
	} */
	.price-calender-btn i.fas.fa-caret-left.fa-lg.careticonLeft {
		font-size: 16px;
		margin: 0 0 0 8px;
	}
	.price-days-scroller {
		height: 113px;
	}
	.price-days-right-fader {
		right: -25px!important;
	}
	.price-days-left-fader {
		left: -24px!important;
	}
}
.inactive-btn {
	color: #E0E0E0;
}
.min-price-in-range {
	background: #FAFAFA;
	border-radius: 0px 0px 5px 5px;
	border: 1px solid #CCCCCC;
	border-top: 0px;
	font-weight: 300;
	font-size: 13px;
	line-height: 20px;
	text-align: right;
	color: #656565;
	padding: 10px 0px;
	padding-right: 30px !important;
	display: flex;
	align-items: center
}
.circle {
	width: 10px;
	height: 10px;
	background: #15BBCC;
	border-radius: 50%;
	margin-left: 10px;
	display: inline-block;
}
@media only screen and (max-width: 768px) {
	.min-price-in-range {
		border-radius: 0px !important;
		border: none;
		border-bottom: 1px solid #E6E6E6;
	}
}
</style>
