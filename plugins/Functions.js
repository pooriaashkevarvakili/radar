/* eslint-disable */
// attention please fix this component
import Vue from 'vue';
Vue.mixin({
	methods: {
		pad: function (num) {
			let s = num + '';
			while (s.length < 2) s = '0' + s;
			return s;
		},
		formatMoney: function (num) {
			num = Math.round(num / 1000) * 1000;
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		toggleBodyClass(addRemoveClass, className) {
			const el = document.body;
			if (addRemoveClass === 'addClass') {
				el.classList.add(className);
			} else {
				el.classList.remove(className);
			}
		},
		formatMoneyWithoutRounding(price) {
			return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
	}
});

Number.prototype.toCurrency = function () {
	const re = '\\d(?=(\\d{3})+$)';
	return this.toFixed(0).replace(new RegExp(re, 'g'), '$&,');
};
