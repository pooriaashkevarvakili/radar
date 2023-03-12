import Vue from 'vue';
import axois from 'axios';
const PriceLoader = {
	priceAndHoliday: {},
	minPrice: [],
	maxLoading: null,
	minLoading: null,
	maxLoaded: null,
	minLoaded: null,
	origin: null,
	destination: null,
	loadedAThing: false,
	loading: false,
	loadPrices: function (origin, destination, fromDate, toDate) {
		this.loading = true;
		if (this.origin !== origin || this.destination !== destination) {
			this.priceAndHoliday = {};
			this.minLoading = null;
			this.maxLoading = null;
			this.loadedAThing = false;
		}

		if (this.minLoading != null && this.maxLoading != null) {
			if (this.minLoading.getTime() <= fromDate.getTime()) { fromDate = this.maxLoading; }
			if (this.maxLoading.getTime() >= toDate.getTime()) { toDate = this.minLoading; }
		}


		if ((toDate.getTime() - fromDate.getTime()) / 86400000 < 10) {
			if (fromDate.getTime() === this.maxLoading.getTime()) { toDate = new Date(toDate.getTime() + 86400000 * 10); }
			if (toDate.getTime() === this.minLoading.getTime()) { fromDate = new Date(fromDate.getTime() - 86400000 * 10); }
		}
		this.origin = origin;
		this.destination = destination;
		const that = this;
		axois({ url: process.env.VUE_APP_FLIGHT_API + '/api/flights/minpriceAndHolidays/' + this.origin + '/' + this.destination + '/' + this.getDateString(fromDate) + '/' + this.getDateString(toDate) + '/IRT', method: 'get', headers: { accept: 'application/vnd.radar361.v1.1+json' } }).then((response) => {
			Vue.set(that.minPrice, response);
			for (let i = 0; i < response.data.length; i++) { Vue.set(that.priceAndHoliday, response.data[i].date, { holiday: response.data[i].holiday, minPrice: response.data[i].minPrice === 0 ? null : response.data[i].minPrice }); }
			that.loadedAThing = true;
			that.maxLoaded = that.maxLoading;
			that.minLoaded = that.minLoading;
			that.loading = false;
		}).catch(() => {
			const fromTimeStamp = fromDate.getTime();
			const toTimeStamp = toDate.getTime();
			for (let i = fromTimeStamp; i <= toTimeStamp; i += 1000 * 24 * 3600) {
				Vue.set(that.priceAndHoliday, (new Date(i)).toISOString().substring(0, 10), { holiday: false, minPrice: null });
			}
			that.loading = false
		});
		if (this.maxLoading == null || this.maxLoading.getTime() < toDate.getTime()) { this.maxLoading = toDate; }
		if (this.minLoading == null || this.minLoading.getTime() > fromDate.getTime()) { this.minLoading = fromDate; }
	},
	getDateString: function (date) {
		if (date.constructor.name === 'JalaliDate') {
			date = date.getGregorianDate();
		}
		return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substr(0, 10);
	},
	getPrice: function (date) {
		const dateStr = this.getDateString(date);
		if (dateStr in this.priceAndHoliday) { return this.priceAndHoliday[dateStr].minPrice; } else { return undefined; }
	},
	getHoliday: function (date) {
		const dateStr = this.getDateString(date);
		if (dateStr in this.priceAndHoliday) { return this.priceAndHoliday[dateStr].holiday; } else { return false; }
	}
};

export default PriceLoader;
