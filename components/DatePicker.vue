<template>
	<div v-if="open || priceCalendar" class="date cursor-pointer">
		<div v-if="!priceCalendar" class="datepicker-mobile-header">
			<img src="~assets/images/close-icon.svg" alt="close" @click.stop="closeDatepicker">
			<span @click.stop="closeDatepicker">انتخاب تاریخ</span>
			<slot name="header" />
		</div>
		<ul class="days-name">
			<li>ش</li>
			<li>ی</li>
			<li>د</li>
			<li>س</li>
			<li>چ</li>
			<li>پ</li>
			<li>ج</li>
		</ul>
		<lazy-hydrate never :trigger-hydration="open || priceCalendar">
			<v-date-picker
				v-model="dates"
				:is-inline="true"
				:popover="false"
				:double-month="type === 'hotel' ? true : false"
				nav-visibility="hidden"
				:min-date="minDate"
				:calendar="calendar"
				:attributes="attrs"
				:month-count="monthCount"
				:mode="type === 'hotel' ? 'range' : 'single' "
				:min-duration="1"
				@input="close"
				@dayclick="dayClicked"
				:autoNavigate="false"		
	>
				<div
					slot="day-content"
					slot-scope="scope"
					class="c-day-content"
					:set="dragSelect = scope.attributes.find(a => a.key == 'drag-select')"
					:set2="start = dragSelect && new Date(dragSelect.dates[0].start)"
					:set3="end = dragSelect && new Date(dragSelect.dates[0].end)"
					:set4="currentDate = new Date(scope.day.dateTime)"
					:style="{'opacity' : (scope.attributes.some(a => a.key === 'disabled')) ? '.44' : '' }"
				>
					<span class="d-flex flex-column w-100 h-100 align-items-center justify-content-center single-day" :class="{'start': (start && currentDate.getDate() === start.getDate() && currentDate.getMonth() === start.getMonth()) , 'end': end && currentDate.getDate() === end.getDate() && currentDate.getMonth() === end.getMonth(), 'flight-selected-day': (currentDate.getDate() === ( type === 'flight' ? dates.getGregorianDate().getDate() : false)) && (currentDate.getMonth() === ( type === 'flight' ? dates.getGregorianDate().getMonth() : false))}">
						<span>{{ scope.day.label }}</span>
						<slot :item="scope" />
					</span>
				</div>
			</v-date-picker>
		</lazy-hydrate>
		<div class="more-month" v-if="!priceCalendar"> 
			<button class="btn" @click="addMoreMonths">
				ماه بعد
				<img src="~/assets/images/arrow-bottom.png" alt="arrow">
			</button>
		</div>
		<slot name="footer" />
		<div class="duration-box" v-if="!priceCalendar">
			<slot name="mobile-footer" />
			<button :disabled="!shouldSelectEndDate" @click="closeDatepicker">
				تایید
			</button>
		</div>
	</div>
</template>

<script>
import VCalendar from 'v-calendar';
import { faTimes, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import ClickOutside from 'vue-click-outside';
import LazyHydrate from 'vue-lazy-hydration';
library.add(faTimes, faCalendarDay);

export default {
	name: 'Datepicker',
	components: {
		LazyHydrate
	},
	directives: {
		ClickOutside
	},
	props: {
		type: String,
		startDate: String,
		endDate: String,
		singleHotel: Boolean,
		isHotelSearch: Boolean,
		calendarDate: Object,
		monthCount: Number,
		priceCalendar: Boolean
	},
	data: function () {
		return {
			open: false,
			calendar: VCalendar.Dates.JalaliDate,
			minDate: new VCalendar.JDate(new VCalendar.JDate().setHours(0, 0, 0, 0)),
			attrs: [],
			mobileSize: 768,
			dates: {
				start: null,
				end: null
			},
			shouldSelectEndDate: true
		};
	},
	watch: {
		dates: function (val) {
			this.$emit('setDates', val);
		},
		'dates.start': function (newVal, oldVal) {
			this.$emit('setDates', this.dates);
		},
		'dates.end': function () {
			this.$emit('setDates', this.dates);
		},
		open: function (val) {
			if (val) {
				this.toggleBodyClass('addClass', 'body-overflow');
			} else {
				this.toggleBodyClass('removeClass', 'body-overflow');
			}
		},
		$route: function (to, from) {
			if (from.hash === '#date' && to.hash !== '#date') {
				this.closeDatepicker();
			}
		}

	},
	beforeMount() {
		this.dates = this.calendarDate;
	},
	methods: {
		addMoreMonths() {
			this.$emit('addMoreMonths');
		},
		openDatePicker() {
			this.open = true;
			if (window.innerWidth < this.mobileSize) {
				this.$router.push({ path: this.$route.fullPath, hash: '#date' });
			}
		},
		close() {
			if (window.innerWidth > this.mobileSize && !this.priceCalendar) {
				this.closeDatepicker();
				this.open = false;
			}
		},
		closeDatepicker: function () {
			this.open = false;
			if (window.innerWidth < this.mobileSize) {
				if (this.$route.hash === '#date') {
					// this.$router.go(-1);
				}
			}
		},
		dayClicked(day) {
			if (window.innerWidth < this.mobileSize && this.type === 'hotel') {
				this.shouldSelectEndDate = false;
			}
		},
		focusInput: function () {
			this.$router.push({ path: this.$route.fullPath, hash: '#date' });
			this.open = true;
		}

	}
};
</script>

<style scoped>
.date {
	font-family: IRANSans, sans-serif !important;
	margin-top: 8px;
	box-shadow: 0 0 6px rgb(0 0 0 / 15%);
	border-radius: 7px;
	position: absolute;
    z-index: 10000;
	background: white;
}
.datepicker-mobile-header {
	height: 55px;
	display: flex;
	margin-right: 16px;
    font-weight: 500;
    font-size: 17px;
    color: #1D1D1D;
	padding-right: 10px;
	align-items: center;
	display: none;
}
.datepicker-mobile-header img {
	width: 18px;
	margin-left: 16px
}
@media only screen and (max-width: 768px) {
	.date {
		position: fixed;
		width: 100% !important;
		height: 100%;
		background: white;
		top: 0px;
		left: 0px;
		z-index: 3;
		max-width: unset;
		margin-top: 0px;
		border: none;
		border-radius: 0px !important;
		overflow: scroll;
	}
	.datepicker-mobile-header {
		display: flex;
	}
}
::v-deep .c-day {
	height: 34px;
    min-height: unset !important
}
::v-deep .c-day-content .single-day {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center
}
::v-deep .c-day-content .single-day:hover {
    border: 2px solid #eb384d;
    border-radius: 5px;
	cursor: pointer;
}
::v-deep .c-day-content-wrapper[style*="opacity: 0.4;"] {
    border: none !important;
}
.start {
    background: #EB384D;
	border-radius: 0px 5px 5px 0px!important;
    border: 1px solid #FF4C67;
    box-sizing: border-box;
    color: white;
    font-weight: 600;
}
.end {
    background: #EB384D;
	border-radius: 5px 0px 0px 5px !important;
    border: 1px solid #FF4C67;
    box-sizing: border-box;
    color: white;
    font-weight: 600;
}
.end:hover {
	border: none !important
}
.duration-box {
	display: none;
}
.duration-box button {
	display: none;
    background: #FF4C67;
    border-radius: 5px;
    color: white;
    width: 120px;
    height: 36px;
    border: none;
    font-size: 17px;
}
::v-deep .c-pane-container {
    width: 100%;
    background: #FFFFFF !important;
    border: none !important;
    padding: 10px 15px !important;
    border-radius: 7px !important;
    font-family: 'IRANSans', sans-serif !important
}
::v-deep .c-arrow-layout svg {
    background: rgba(233, 240, 242, 0.7) !important;
    border-radius: 5px !important;
    color: #FF4C67 !important;
    opacity: 1;
}
::v-deep .c-arrow-layout svg:not(.c-disabled):hover{
	background: #FF4C67 !important;
	color: white !important
}
::v-deep .c-arrow-layout svg.c-disabled {
	cursor: no-drop !important;
	pointer-events: unset !important;
}
::v-deep .c-header .c-arrow-layout .c-arrow[data-v-f893c9da]:hover {
    fill-opacity: 1 !important;
}
::v-deep .c-title {
    font-style: normal;
    font-weight: 600 !important;
    font-size: 17px !important;
    line-height: 26px !important;
    text-align: center;
    color: #424242;
}
::v-deep .c-day-content-wrapper{
    box-sizing: border-box;
    height: 100%;
}
::v-deep .c-day[style*="opacity: 0.4;"] {
    display: none !important;
}
::v-deep .c-day-content {
    height: 100% !important;
    margin: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100% !important;
    border-radius: 50%;
    transition: all .18s ease-in-out;
    text-align: center;
    font-weight: 500 !important;
    font-size: 13px;
	line-height: 21px;
	color: #424242;
}
::v-deep .c-day-background {
    background: #fbe6e8 !important;
	height: 100% !important;
	margin: 0px 1.5px;
}
::v-deep .c-day-scale-enter .c-day-background {
	background: #EB384D !important;
	border-radius: 5px !important;
	margin: 0px !important;
	color: white !important;
	width: 100% !important
}
::v-deep .c-week .c-day-popover:last-child .c-day-content {
    color: red;
}
::v-deep .c-weekday {
    font-size: 12px !important;
	color: #646464 !important;
	font-weight: 500;
}
::v-deep .c-pane-div {
    border: none !important;
}
::v-deep .c-pane:first-child {
	position: relative;
}
::v-deep .c-pane:last-child:not(:first-child):before {
    content: " ";
    position: absolute;
    display: block;
    background-color: #f1f6f8;
    right: 50%;
    height: calc(100% - 115px);
    width: 1px;
    top: 60px;
}
::v-deep .c-day-content[style*="color: rgb(250, 250, 250);"] {
    color: black !important;
}
.days-name {
	display: none;
}
.flight-selected-day {
	color: white
}
.more-month {
    margin-top: 45px;
    position: relative;
    bottom: 130px;
	cursor: pointer;
}
.more-month .btn {
    color: #EB384D;
    border-radius: 7px;
	padding: 3px 24px
}
.more-month .btn:focus {
	box-shadow: none
}
/* media queries */
@media only screen and (min-width: 768px) {
	.more-month {
		display: none;
	}
}
@media (max-width: 1050px) and (min-width: 768px){
    ::v-deep .c-day {
        height: 29px !important
    }
    ::v-deep .c-pane {
        min-width: 200px !important
    }

}
@media (max-width: 767.98px) {
	.end {
		border-radius: 8px 0px 0px 8px!important;
	}
	.start {
		border-radius: 0 8px 8px 0!important;
	}
	::v-deep .c-pane:last-child:not(:first-child):before {
		display: none
	}
	.duration-box {
		display: block;
	}
    .duration-box button {
		display: block !important;
        font-size: 18px;
		height: 50px;
		font-weight: 500;
		line-height: 35px;
		text-align: center;
		color: #FFFFFF;
		background: #EB384D;
		border-radius: 8px;
		width: 100%;
    }
	.duration-box button:disabled, .duration-box button button[disabled] {
		background-color: #aaa!important;
	}
    .duration-box {
        z-index: 10;
        position: fixed;
        bottom: 0%;
        padding: 10px 10px;
        width: 100%;
        justify-content: space-between !important;
        background: #F4F4F4;
		border-top: 1px solid #DDDDDD;
		border-bottom: 1px solid #DDDDDD;
		box-shadow: 0px -7px 25px rgba(238, 238, 238, 0.6);
    }
	::v-deep .c-week:first-child {
		padding-top: 13px;
	}
	::v-deep .c-week {
		padding-top: 12px;
	}
	::v-deep .c-weeks {
		padding: 0!important;
		border-bottom: 1px solid #E5E5E5;
		padding-bottom: 8px!important;
	}
	::v-deep .c-day-content {
		font-weight: 500 !important;
		font-size: 15px !important;
		letter-spacing: 0.22px;
		color: #616161 !important;
	}
	::v-deep .c-header {
		padding: 16px 10px 5px 10px !important;
	}
	::v-deep .desktop-calendar {
		display: none!important;
	}
	::v-deep .calendar-input.origin-and-destination-input-selected {
		padding-top: 0!important;
		padding-right: 0!important;
	}
	::v-deep .c-arrow-layout {
		display: none !important;
	}
	.days-name {
		list-style: none;
		display: inline-flex;
		width: 100%!important;
		justify-content: center;
		justify-items: center;
		height: 41px;
		background: #FCFCFC;
		border-top: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
		padding: 5px 19px;
		margin: 0!important;
		font-size: 14px;
		color: #5D5D5D;
		line-height: 25px;
		right: 0px;
	}
	::v-deep .c-pane-container {
		padding-top: 50px;
	}
	.days-name li {
		margin-left: 12%;
	}
	.days-name li:last-child {
		margin-left: 0;
	}
	::v-deep .c-day-content-wrapper{
		border: none!important;
	}
}
@media (max-width: 767.98px) and (min-width: 670px) {
    ::v-deep .c-day {
        height: 50px !important;
    }
}
@media (max-width: 669.98px) and (min-width: 631px) {
    ::v-deep .c-day {
        height: 45px !important;
    }
}
@media (max-width: 630px) and (min-width: 600px) {
    ::v-deep .c-day {
        height: 40px !important;
    }
}
@media (max-width: 599.98px) and (min-width: 520px) {
    ::v-deep .c-day {
        height: 80px !important;
    }
}
@media (max-width: 519.98px) and (min-width: 460px) {
    ::v-deep .c-day {
        height: 70px !important;
    }
}
@media (max-width: 459.98px) and (min-width: 430px) {
    ::v-deep .c-day {
        height: 65px !important;
    }
}
@media (max-width: 429.98px) and (min-width: 400px) {
    ::v-deep .c-day {
        height: 60px !important;
    }
}
@media only screen and (max-width:600px) {
    ::v-deep .c-pane-container {
        display: flex;
        flex-direction: column
    }
}
@media screen and (max-width: 575.98px) {
	::v-deep .c-weekdays {
		display: none!important;
	}
    ::v-deep .c-pane {
        min-width: 330px !important;
    }
    ::v-deep .c-pane-container {
        padding: 0px !important;
		padding-bottom: 100px !important
    }
}
@media(max-width: 400px) {
    ::v-deep .c-pane {
        min-width: 310px !important;
        margin: 0px !important
    }
}

@media(max-width: 400px) and (min-width: 370px) {
    ::v-deep .c-day {
        height: 55px !important;
    }
}
@media(max-width: 369.98px) and (min-width: 330px) {
    ::v-deep .c-day {
        height: 50px !important;
    }
}
@media(max-width: 329.98px) {
    ::v-deep .c-day {
        height: 45px !important;
    }
}
.date:focus {
  outline: none;
  border: none;
  box-shadow: none
}
</style>
