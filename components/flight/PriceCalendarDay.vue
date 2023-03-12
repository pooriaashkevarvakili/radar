<template>
	<div :class="{ calenderDiv: !current, calenderBold: current, 'calendar-passed': calendarPassed }">
		<div v-show="weekend" class="mark-weekend">
			<svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="3.5" cy="3.5" r="2.5" stroke="#EB384D" stroke-width="2" />
			</svg>
		</div>
		<div class="week-name" :class="{ isFriday: dayName === 'جمعه' }" :style="[current? {'color': '#4D4D4D'} : {}]">
			<span class="desktop-day-name">
				{{ dayName }}
			</span>
			<span class="mobile-day-name d-none">
				{{ dayName.substring(0, 1) }}
			</span>
			{{ day }} {{ month }}
		</div>
		<!-- <div class="month-day" v-if="!current">{{ day }}</div> -->
		<div v-if="price != null && price < 1000000 && !loading" class="day-price" :style="[current? {'color': '#1D1D1D'} : {}]">
			{{ price.toFixed(0).toString().slice(0,3) }}
		</div>
		<div v-else-if="price != null && price >= 1000000 && price < 10000000 && !loading" class="day-price" :style="[current? {'color': '#1D1D1D'} : {}]">
			{{ price.toFixed(0).toString().slice(0,4) }}
		</div>
		<div v-else-if="price != null && price >= 10000000 && price < 100000000 && !loading" class="day-price" :style="[current? {'color': '#1D1D1D'} : {}]">
			{{ price.toFixed(0).toString().slice(0,4) }}
		</div>
		<div v-else-if="(typeof price != 'undefined') && !loading" class="mt-2 no-flight">
			<div>پروازی</div>
			<div>موجود نیست</div>
		</div>
		<div v-if="price != null && !loading" class="currency" :style="[current? {'color': '#1D1D1D'} : {}]">
			هزارتومان
		</div>
		<div v-if="loading" class="price-calendar-loader">
			<span class="price-calendar-loader-dot">.</span><span class="price-calendar-loader-dot">.</span><span class="price-calendar-loader-dot">.</span>
		</div>
		<!-- <div class="day-name-active" v-if="current">{{ dayName }}</div>
		<div class="month-day-center" v-if="current">{{ day }}</div> -->
	</div>
</template>

<script>
import VCalendar from 'v-calendar';
const moment = require('moment-jalaali');

export default {
	name: 'PriceCalendarDay',
	props: { date: Date, price: Number, current: Boolean, weekend: Boolean/*, priceLoaded: Boolean */, minPrice: Object, loading: Boolean },
	data: function () {
		return {

		};
	},
	computed: {
		dayName: function () {
			const dayNames = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
			return dayNames[this.date.getDay()];
		},
		day: function () {
			const jdate = new VCalendar.JDate(this.date);
			return jdate.getDate();
		},
		monthNameAndYear: function () {
			const jdate = new VCalendar.JDate(this.date);
			const monthes = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
			return monthes[jdate.getMonth()] + ' ' + jdate.getYear();
		},
		month: function () {
			const jdate = new VCalendar.JDate(this.date);
			const monthes = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
			return monthes[jdate.getMonth()];
		},
		calendarPassed: function () {
			return this.date.getTime() < (new Date()).getTime() - 86400000;
		},
		isMinPrice() {
			return moment(this.date).format('YYYY-MM-DD') === this.minPrice.date;
		}
	}
};
</script>

<style>
.isFriday {
	color: #EB384D !important
}
.mark-weekend {
    position: absolute;
    width: 6px;
    height: 6px;
    top: 3px;
    right: 12px;
}
.week-name {
    font-weight: 300;
    padding-top: 8px;
	font-size: 12px;
	line-height: 14px;
	text-align: center;
	letter-spacing: -0.05em;
	color: #4D4D4D;
}
.month-day {
    font-size: 17px;
    font-weight: 300;
    padding-top: 7px;
}
.day-price {
    font-weight: 300;
    padding-top: 2px;
    letter-spacing: -0.05em;
	font-size: 21px;
	line-height: 25px;
	color: #4D4D4D;
	padding: 5px 0px
}
span.price-calendar-loader-dot {
    font-size: 50px;
    line-height: 6px;
    position: relative;
    animation: moving-dot 1s infinite;
    animation-delay: .33s;
}
span.price-calendar-loader-dot:first-child {
    animation-delay: 0s;
}
span.price-calendar-loader-dot:last-child {
    animation-delay: .66s;
}
.month-day-center {
    font-size: 20px;
    padding: 15px 0px 0px 0px;
    text-align: center;
}
.calendar-passed {
    border-color: #C4C4C4!important;
    color: #C4C4C4!important;
}
@keyframes moving-dot {
    0% {
        top: 0px;
    }
    40% {
        top: -5px;
    }
    90% {
        top: 2px;
    }
    100% {
        top: 0px;
    }
}
@media /*(min-width: 320px) and*/ (max-width: 575.98px) {
	.desktop-day-name {
		display: none
	}
	.mobile-day-name {
		display: inline-block !important
	}
    span.price-calendar-loader-dot {
		font-size: 40px!important;
	}

	.price-calendar-loader {
		margin-top: -6px;
	}
    .month-day-center {
        padding: 8px 0px 0px 0px;
        font-size: 18px;
    }
    .week-name {
        font-size: 12px;
		padding-top: 4px;
    }
    .month-day {
        font-size: 16px;
    }
    .day-price {
        font-size: 21px;
    }
}
.currency {
    font-size: 11px;
    color: #4D4D4D;
}
.no-flight {
	font-size: 13px;
	line-height: 20px;
	text-align: center;
	letter-spacing: -0.05em;
	color: #B3B3B3;
}
.min-price .day-price, .min-price .currency {
	color: #15BBCC;
}
</style>
