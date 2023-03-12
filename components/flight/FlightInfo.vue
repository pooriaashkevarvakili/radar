<template>
	<div class="flight-info">
		<div class="d-flex">
			<div class="d-flex flex-column justify-content-between">
				<div class="d-flex flex-column">
					<span class="flight-time">{{ flightData.DepartureTime.substr(11, 5) }}</span>
					<span class="flight-date">{{ formatedDate(flightData.DepartureTime.substr(0, 11)) }}</span>
				</div>

				<span class="flight-date">{{ flightDuration }}</span>
				<div class="d-flex flex-column">
					<span class="flight-time">{{ flightData.ArrivalTime.substr(11, 5) }}</span>
					<span class="flight-date">{{ formatedDate(flightData.ArrivalTime.substr(0, 11)) }}</span>
				</div>
			</div>
			<div class="d-flex flex-column align-items-center mx-1">
				<img src="~assets/images/airplane.svg" alt="airplane">
				<span class="vertical-line" />
				<img src="~assets/images/flight-location.svg" alt="flight-location">
			</div>
			<div class="d-flex flex-column justify-content-between align-items-baseline">
				<span class="flight-time">{{ flightData.Origin }}</span>
				<div class="d-flex flex-column airline-info align-items-baseline">
					<div class="d-flex">
						<img :src="flightData.AirlineLogo" :alt="'arline:' + flightData.AirlineTitle">
						{{ flightData.AirlineTitle }}
						{{ flightData.FlightNumber }}
					</div>
					هواپیمای {{ flightData.AirlineCode }}
				</div>
				<span class="flight-time">{{ flightData.Destination }}</span>
			</div>
		</div>
	</div>
</template>
<script>
const moment = require('moment-jalaali');
export default {
	props: {
		flightData: Object,
		flightDuration: String
	},
	data: function () {
		return {
			dayNames: [
				{ en: 'Mon', fa: 'دوشنبه' },
				{ en: 'Tue', fa: 'سه شنبه' },
				{ en: 'Wed', fa: 'چهارشنبه' },
				{ en: 'Thu', fa: 'پنجشنبه' },
				{ en: 'Fri', fa: 'جمعه' },
				{ en: 'Sat', fa: 'شنبه' },
				{ en: 'Sun', fa: 'یکشنبه' }
			]
		};
	},
	methods: {
		formatedDate(date) {
			const jalaliDate = moment(date);
			return this.dayNames[jalaliDate.isoWeekday() - 1].fa + ' ' + moment(date, 'YYYY-MM-DD').format('jMM/jDD');
		}
	}
};
</script>
<style scoped>
.flight-info {
    margin: 30px 50px
}
.vertical-line {
    width: 2px;
    height: 96px;
    background: #C8CFD7;
    margin: 6px 0px
}
.flight-time {
    font-size: 15px;
    color: #43464F;
    font-weight: 800;
    line-height: 22px;
}
.flight-date {
    font-size: 13px;
    line-height: 16px;
    color: #9095A7;
    font-weight: 500;
}
.airline-info {
    font-size: 13px;
    color: #43464F;
}
.airline-info img {
    width: 22px;
    margin-left: 5px
}
</style>
