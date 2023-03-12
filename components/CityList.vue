<template>
	<div v-if="shown" class="row" dir="rtl" @mousedown.stop>
		<!-- city list for mobile size -->
		<div class="box-title justify-content-between align-items-center">
			<span class="modal-back-btn">
				<svg @click="$emit('closeCityList')" width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.53125 0.425781L0.671875 1.24219C0.5 1.45703 0.5 1.80078 0.671875 1.97266L8.44922 9.75L0.671875 17.5703C0.5 17.7422 0.5 18.0859 0.671875 18.3008L1.53125 19.1172C1.74609 19.332 2.04688 19.332 2.26172 19.1172L11.2852 10.1367C11.457 9.92188 11.457 9.62109 11.2852 9.40625L2.26172 0.425781C2.04688 0.210938 1.74609 0.210938 1.53125 0.425781Z" fill="#656565"/>
				</svg>
			</span>
			<font-awesome-icon :icon="['fas', 'map-marker-alt']" class="map-marker fa-style"/>
			<input
				ref="inputsearch"
				v-model="selectedCity"
				type="text"
				class="origin-and-destination-mobile"
				:placeholder="inputTitle"
			>
		</div>
		<div class="city-list d-flex justify-content-center align-items-center" @mousedown.prevent>
			<div v-if="!loaded" class="spinner">
				<div class="bounce1" />
				<div class="bounce2" />
				<div class="bounce3" />
			</div>
			<div v-if="loaded || error" class="w-100 h-100">
				<div v-if="error || notFound" class="list-not-found py-3">
					چیزی یافت نشد!
				</div>
				<ul class="p-0 mb-0 h-100 desktop-list">
					<span v-if="filter.length < 2" class="important-cities">شهرهای پرتردد</span>
					<div
						v-for="(item, key) in filteredList"
						:key="key"
						class="city-list__item d-flex align-items-center"
						@click.stop="itemClicked(item)"
					>
						<slot :item="item" />
					</div>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { faHistory, faMapMarker, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faHistory, faMapMarker, faMapMarkerAlt);
const stringSimilarity = require('string-similarity');

export default {
	name: 'CityList',
	props: {
		showHistory: Boolean,
		lists: {
			type: Array,
			default: function () {
				return [];
			}
		},
		historyList: {
			type: Array,
			default: function () {
				return [];
			}
		},
		inputTitle: {
			type: String,
			default: ''
		},
		error: Boolean,
		type: {
			type: String,
			default: ''
		}
	},
	data: function () {
		return {
			filter: '',
			shown: false,
			selectedCity: '',
			totalItem: 7
		};
	},
	computed: {
		loaded: function () {
			if (!this.lists[0]) { return false; }
			if (this.type !== 'resort') {
				return (this.lists[0].list.length !== 0 || this.lists[1].list.length !== 0 || (this.lists[2] && this.lists[2].list.length !== 0));
			} else {
				return this.lists.length;
			}
		},
		filteredList() {
			if (this.type !== 'resort') {
				if (!this.filter || this.filter.length < 2) {
					return this.lists[0].list;
				} else {
					const that = this;
					const completeList = this.$route.fullPath.includes('flight') ? that.lists[0].list.concat(that.lists[1].list) : that.lists[0].list.concat(that.lists[1].list.concat(that.lists[2].list));
					const filter = completeList.map(item => ({ ...item, similarity: stringSimilarity.compareTwoStrings(item.label, this.matchString(this.filter)) })).filter(i => i.similarity > 0);
					return filter.length ? filter.sort((c1, c2) => c2.similarity - c1.similarity).slice(0, this.totalItem) : [];
				// console.log(filter);
				// return [];
				}
			} else return this.lists;
		},
		filteredCount() {
			return this.filteredList.length;
		},
		notFound() {
			return this.filteredList && !this.filteredList.length;
		}
	},
	watch: {
		selectedCity: function (value) {
			this.filter = value;
		},
		shown: function (value) {
			if (value) {
				const that = this;
				this.toggleBodyClass('addClass', 'body-overflow');
				setTimeout(function () {
					that.$refs.inputsearch.focus();
					// that.$refs.inputsearch.select();
				}, 0);
			} else {
				this.toggleBodyClass('removeClass', 'body-overflow');
			}
		},
		filter: function (val) {
			if (val.length > 0) {
				this.totalItem = 14;
			}
			if (this.type === 'resort') {
				console.log(val);
				this.$emit('searchForCities', val);
			}
		}
	},
	methods: {
		matchString: function (term) {
			if (!term) return true;
			const map = {
				Q: 'ض',
				W: 'ص',
				E: 'ث',
				R: 'ق',
				T: 'ف',
				Y: 'غ',
				U: 'ع',
				I: 'ه',
				O: 'خ',
				P: 'ح',
				'[': 'ج',
				']': 'چ',
				A: 'ش',
				S: 'س',
				D: 'ی',
				F: 'ب',
				G: 'ل',
				H: 'ا',
				J: 'ت',
				K: 'ن',
				L: 'م',
				';': 'ک',
				"'": 'گ',
				Z: 'ظ',
				X: 'ط',
				C: 'ز',
				V: 'ر',
				B: 'ذ',
				N: 'د',
				M: 'پ',
				',': 'و',
				'\\': 'پ',
				ي: 'ی',
				ك: 'ک'
			};
			const derivedTerms = [
				term,
				term.replace(/\S/g, function (token) {
					return map[token.toUpperCase()] || token;
				})
			];
			return derivedTerms[1];
		},
		itemClicked: function (item) {
			this.$emit('itemSelected', item);
		},
		isInputVisible: function () {
			// Checks if mobile input is visible
			const inputsearch = this.$refs.inputsearch;
			return (
				inputsearch != null &&
        !(inputsearch.offsetWidth === 0 && inputsearch.offsetHeight === 0)
			);
		},
		clearHistory: function () {
			this.$root.$emit('clearHistory');
		},
		degreesToRadians: function (degrees) {
			return (degrees * Math.PI) / 180;
		},
		geoFindMe: function () {
			const cityList = this.lists[1].list.concat(this.lists[0].list);
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					let minDistance = Number.MAX_VALUE;
					// eslint-disable-next-line no-unused-vars
					let minTitle;
					let selectedCity;
					const earthRadiusKm = 6371;
					for (let i = 0; i < cityList.length; i++) {
						const dLat = this.degreesToRadians(cityList[i].latitude - latitude);
						const dLon = this.degreesToRadians(cityList[i].longitude - longitude);
						const lat1 = this.degreesToRadians(latitude);
						const lat2 = this.degreesToRadians(cityList[i].latitude);
						const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) *
                Math.sin(dLon / 2) *
                Math.cos(lat1) *
                Math.cos(lat2);
						const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
						const distance = earthRadiusKm * c;
						if (distance < minDistance) {
							minDistance = distance;
							minTitle = cityList[i].CityTitle;
							selectedCity = cityList[i];
						}
					}
					this.$emit('itemSelected', selectedCity, minTitle);
				},
				() => {
					if (!navigator.geolocation) {
						alert('موقعیت جغرافیایی توسط مرورگر شما پشتیبانی نمی شود');
					}
				}
			);
		}
	}
};
</script>

<style scoped>
.city-list {
  background-color: #ffffff;
  width: 327px !important;
  border-radius: 7px;
  margin: 25px 0px 0px 0px;
  box-shadow: 0 0 6px rgb(0 0 0 / 15%);
  text-align: right;
  position: absolute;
  z-index: 5;
}
.city-icon {
  width: 18px
}
.state {
  font-size: 12px;
  color: #848484;
}
.origin-and-destination-mobile {
  flex-grow: 1;
  border: none;
  outline: none;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  background: #F2F2F2;
  border-radius: 8px;
  padding: 20px;
  margin-right: 10px;
  padding-right: 50px
}
.list-not-found {
  font-size: 15px !important;
  font-weight: 600;
  color: #333;
  text-align: center;
}
.city-list__item {
  font-weight: 600;
  font-size: 14px;
  color: #0f131c;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
  width: 100%;
  padding-right: 25px !important;
  padding-top: .5em;
  padding-bottom: .5em;
  min-height: 54px
}
.city-list__item:hover {
  background: #F6F6F6;
}
.desktop-list {
  max-height: 378px;
  overflow-x: auto;
}
.important-cities {
	color: #B3B3B3;
	font-size: 14px;
	border-bottom: 1px solid #F2F2F2;
	width: 100%;
	display: none;
	padding: 10px
}
.map-marker {
	position: absolute;
	right: 70px;
	bottom: 32px
}
@media (max-width: 767.98px) {
	.city-list__item:focus {
		background: #E6E6E6;
	}
	.desktop-list {
		max-height: unset !important;
	}
	.city-list__item {
		padding-right: 10px !important;
    height: 54px
	}
	.list-not-found {
		width: 100%;
		top: 36%;
	}
	.city-list {
		width: 100% !important;
		border-radius: 0px;
		right: 0;
		margin: 0;
		box-shadow: none;
		height: 100%;
		padding: 100px 15px 0px 15px;
	}
	.important-cities {
		display: inline-block
	}
}

@media (max-width: 575.98px) {
  .city-list {
    width: 100%;
    border-radius: 0px;
    right: 0;
    margin: 0;
    box-shadow: none;
  }
}
.hotel-list-icon {
  height: 20px;
}
.spinner {
	margin: 20px 0px;
}
.spinner > div {
  width: 12px;
  height: 12px;
  background-color: #EB384D;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
::-webkit-scrollbar {
  width: 3.5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #E7E7E7;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(206, 206, 206);
  border-radius: 5px;
}
.resort-name {
	font-weight: 400;
	font-size: 16px
}
.resort-count {
	margin-right: auto;
	color: #999999;
	font-size: 14px;
	font-weight: 300;
	margin-left: 15px
}
</style>
