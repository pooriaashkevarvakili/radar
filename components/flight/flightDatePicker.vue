<template>
	<div v-click-outside="closeDatepicker" @click.stop class="w-100 h-100">
		<div class="flight-date d-flex align-items-center" @click="openDatepicker">
			<img class="calendar-icon" src="~assets/images/calendar.svg" alt="calendar-icon">
			{{ formatedDate }}
			<span class="mr-auto change-day-arrows">
				<span class="arrow-day" @click.stop="goToflightPreviousDay">
					<img class="arrow" src="/images/right-arrow.svg" alt="arrow-icon">
				</span>
				<span class="arrow-day" @click.stop="goToFlightNextDay">
					<img class="arrow" src="/images/left-arrow.svg" alt="arrow-icon">
				</span>
			</span>
		</div>
		<date-picker
			@click.stop
			ref="datepicker"
			class="date-wrapper"
			:calendar-date="calendarDate"
			:start-date="defaultDate"
			type="flight"
			:month-count="maxMonthCount"
			@setDates="setDates"
			@addMoreMonths="addMoreMonths"
		/>
	</div>
</template>
<script>
import VCalendar from 'v-calendar';
import ClickOutside from 'vue-click-outside';
import DatePicker from '../DatePicker.vue';
const moment = require('moment-jalaali');
export default {
	components: {
		DatePicker
	},
	directives: {
		ClickOutside
	},
	props: {
		defaultDate: String
	},
	data() {
		return {
			selectedDate: {},
			maxMonthCount: 2
		};
	},
	computed: {
		formatedDate() {
			moment.loadPersian({ dialect: 'persian-modern' });
			return JSON.stringify(this.selectedDate) === '{}' ? '' : moment(this.selectedDate.getGregorianDate()).format('dddd') + ' ' + moment(this.selectedDate.getGregorianDate()).format('jDD') + ' ' + moment(this.selectedDate.getGregorianDate()).format('jMMMM');
		},
		calenderOpened() {
			return this.$refs.datepicker ? this.$refs.datepicker.open : false;
		},
		calendarDate() {
			const date = new Date(this.defaultDate);
			const jDate = new VCalendar.JDate();
			jDate.setGregorianDate(date.getFullYear(), date.getMonth(), date.getDate());
			return jDate;
		}
	},
	watch: {
		'$route.query': function (newParams, oldParams) {
			const date = new Date(moment(newParams.date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'));
			this.$refs.datepicker.dates = new VCalendar.JDate(date);
		}
	},
	methods: {
		addMoreMonths() {
			this.maxMonthCount += 1;
		},
		openDatepicker() {
			this.$refs.datepicker.openDatePicker();
		},
		closeDatepicker() {
			this.$refs.datepicker.close();
		},
		setDates(val) {
			this.selectedDate = val;
		},
		goToFlightNextDay() {
			this.$refs.datepicker.dates = new VCalendar.JDate(this.$refs.datepicker.dates.getTime() + 86400000 * 1);
		},
		goToflightPreviousDay() {
			if (this.selectedDate.getTime() <= this.$refs.datepicker.minDate.getTime()) {

			} else this.$refs.datepicker.dates = new VCalendar.JDate(this.$refs.datepicker.dates.getTime() - 86400000 * 1);
		}
	}
};
</script>
<style scoped>
.flight-date {
    height: 58px;
    padding-right: 10px;
	padding-left: 16px
}
.calendar-icon {
    width: 18px;
    margin-left: 14px;
    margin-right: 5px;
}
.arrow-day {
	width: 20px;
    text-align: center;
    cursor: pointer;
    user-select: none;
	display: inline-flex;
	justify-content: center;
}
.date-wrapper {
	left: 0%
}
@media only screen and (max-width: 768px) {
	.mobile-wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		background: white;
		top: 0px;
		left: 0px;
		z-index: 3
	}
	.change-day-arrows {
		display: none;
	}
	.date-wrapper {
		max-width: unset;
	}
}
</style>
