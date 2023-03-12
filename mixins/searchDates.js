const moment = require('moment-jalaali');
export default {
	computed: {
		CheckInDate: function () {
			let gregDate;
			if (this.$route.query.CheckInDate === undefined) {
				gregDate = moment().format('YYYY-MM-DD');
			} else {
				gregDate = moment(this.$route.query.CheckInDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
			}
			return gregDate;
		},
		CheckOutDate: function () {
			let gregDate;
			if (this.$route.query.CheckOutDate === undefined) {
				gregDate = moment().add(1, 'day').format('YYYY-MM-DD');
			} else {
				gregDate = moment(this.$route.query.CheckOutDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
			}
			return gregDate;
		}
	}
};
