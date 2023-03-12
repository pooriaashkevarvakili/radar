<template>
	<div class="container-fluid" :class="homeSearch ? '' : 'flight-search'">
		<div class="search" :class="homeSearch? 'home-page container' : 'custom-container'">
			<div>
				<div id="currency-desktop">
					<div>
						<font-awesome-icon id="calender-icon" :icon="['fas', 'sort']" class="fa-style" />
						تومان
					</div>
					<div>
						<font-awesome-icon id="calender-icon" :icon="['fas', 'sort']" class="fa-style" />
						ریال
					</div>
				</div>
			</div>
			<div class="home-page__container d-flex">
				<div v-if="!homeSearch" class="flight-breadcrumb">
					<div class="title">
						<nuxt-link to="/flights">
							صفحه ی اصلی
						</nuxt-link>
						<img src="~assets/images/left-arrow.svg" alt="flight-icon">
						<nuxt-link to="/flights">
							بلیط هواپیما
						</nuxt-link>
						<img src="~assets/images/left-arrow.svg" alt="flight-icon">
						<span> پرواز {{ metaOrigin }} به {{ metaDestination }}</span>
					</div>
					<div class="city-name">
						<svg
							class="mt-2"
							width="21"
							height="21"
							viewBox="0 0 21 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M4.93131 4.78499L12.5824 6.85659L15.7865 3.65251C16.5047 2.93436 18.0515 2.49242 18.6315 2.57528C18.742 3.18295 18.2724 4.70213 17.5543 5.42028L14.3502 8.62436L16.4218 16.2755L15.3998 17.2975L11.9195 11.055L8.71544 14.2591L9.04689 16.5793L7.8868 17.7394L6.34 14.8668L3.46738 13.32L4.62748 12.1599L6.94767 12.4913L10.1517 9.28727L3.90932 5.80698L4.93131 4.78499ZM4.13029 2.93436L1.4234 5.64125C1.11956 5.94509 1.20243 6.46989 1.56151 6.66324L7.08578 9.70159L6.28476 10.5026L4.2684 10.254C4.07505 10.2264 3.8817 10.254 3.74359 10.3921L0.981457 13.1543C0.677622 13.4581 0.732865 13.9553 1.09194 14.1486L4.95893 16.2479L7.08578 20.1425C7.27913 20.5015 7.74869 20.5292 8.05253 20.2253L10.8147 17.4632C10.9528 17.3251 11.008 17.1594 10.9804 16.966L10.7042 14.922L11.5052 14.121L14.5712 19.6729C14.7645 20.032 15.2617 20.0872 15.5655 19.7834L18.2724 17.0765C18.4105 16.9384 18.4934 16.6898 18.4382 16.4688L16.4494 9.17679L18.8801 6.74611C20.0954 5.53077 21.2279 2.4648 19.985 1.22183C18.7696 0.00649457 15.676 1.11135 14.4607 2.32669L12.03 4.75737L4.76558 2.79625C4.54461 2.74101 4.2684 2.79625 4.13029 2.93436Z" fill="#666666" />
						</svg>
						<h1> پرواز {{ metaOrigin }} به {{ metaDestination }}</h1>
					</div>
				</div>
				<div id="search-box">
					<div
						class="search-box-border-left search-box-border-bottom d-flex align-items-center"
						:class="[{'empty-origin' : originIsEmpty}]"
					>
						<city-input
							ref="origin"
							class="w-100"
							:lists="cityList"
							:input-title="'انتخاب مبدا'"
							title="انتخاب مبدا"
							:history-list="history"
							:selected-destination="selectedorigin"
							@setValue="setOriginValue"
							@closeDatePicker="closeDatePicker"
						>
							<template #default="{item}">
								<div class="d-flex">
									<img src="~assets/images/red-location-icon.svg" alt="location-image" class="ml-3 city-icon">
									<div class="d-flex flex-column">
										<span style="font-size: 14px">{{ item.label || item.label }}</span>
									</div>
								</div>
							</template>
						</city-input>
						<div class="circle-wrapper" @click="swap">
							<div id="circle-reverse">
								<font-awesome-icon
									id="reverse-icon"
									:icon="['fa', 'exchange-alt']"
									:class="{ reversed: isReversed }"
                  class="fa-style"
									@click="isReversed = true"
									@mouseleave="isReversed = false"
								/>
							</div>
						</div>
					</div>
					<div
						class="search-box-border-left search-box-border-bottom pr-0 pr-sm-2 d-flex align-items-center"
						:class="[{'empty-dest' : destinationIsEmpty}]"
					>
						<city-input
							ref="destination"
							class="w-100"
							:lists="cityList"
							:input-title="'انتخاب مقصد'"
							title="انتخاب مقصد"
							:history-list="history"
							:selected-destination="selectedDestination"
							@setValue="setDestinationValue"
							@closeDatePicker="closeDatePicker"
						>
							<template #default="{item}">
								<div class="d-flex">
									<img src="~assets/images/red-location-icon.svg" alt="location-image" class="ml-3 city-icon">
									<div class="d-flex flex-column">
										<span style="font-size: 14px">{{ item.label || item.label }}</span>
									</div>
								</div>
							</template>
						</city-input>
					</div>
					<div
						class="search-box-border-left search-box-border-bottom search-box-last-part"
					>
						<flight-date-picker
							ref="datepicker"
							:default-date="defaultDate"
							title=" تاریخ"
						/>
					</div>

					<div v-if="homeSearch" id="search-box-button" class="d-flex justify-content-center align-items-center">
						<button
							type="submit"
							class="search-btn d-flex justify-content-center align-items-center"
							style="outline:none"
							@click="searchOrEdit"
						>
							<div v-if="searchLoading" class="spinner">
								<div class="bounce1" />
								<div class="bounce2" />
								<div class="bounce3" />
							</div>
							<div v-else id="search-icon" class="align-items-center d-flex justify-content-center m-0">
								<img src="~/assets/images/white-search-icon-desktop.svg" alt="search-icon" class="desktop-seacrh-icon ml-1">
								<img src="~/assets/images/white-search-icon.svg" alt="search-icon" class="mobile-seacrh-icon d-none ml-1">
								جستجو
							</div>
						</button>
					</div>
				</div>
				<div v-if="!homeSearch" class="flight-page-search-icon" @click="searchOrEdit">
					<div v-if="searchLoading" class="search-loader" />
					<img v-else src="~assets/images/search-icon-red.svg" alt="search">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { faSort, faExchangeAlt, faPlane, faEdit } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import CityInput from '~/components/CityInput.vue';
import FlightDatePicker from '~/components/flight/flightDatePicker';
library.add(faSort, faExchangeAlt, faPlane, faEdit);
export default {
	name: 'Search',
	components: {
		CityInput,
		FlightDatePicker
	},
	props: {
		defaultDate: String,
		showIconSearch: Boolean,
		showIconEdit: Boolean,
		showCurrency: Boolean,
		disabled: Boolean,
		homeSearch: Boolean,
		metaOrigin: String,
		metaDestination: String,
		cityList: Array
	},
	data: function () {
		return {
			history: [],
			isReversed: false,
			destinationFocused: false,
			disabledButton: true,
			originIsEmpty: false,
			destinationIsEmpty: false,
			searchLoading: false
		};
	},
	computed: {
		originAndDestination() {
			return { orifinId: this.$refs.origin.id || '', destinationId: this.$refs.destination.id || '' };
		},
		originLabel() {
			return this.$refs.origin && this.$refs.origin.label;
		},
		destinationLabel() {
			return this.$refs.destination && this.$refs.destination.label;
		},
		selectedDestination() {
			return this.$route.params.destination ? this.$route.params.destination : '';
		},
		selectedorigin() {
			return this.$route.params.origin ? this.$route.params.origin : '';
		}
	},
	watch: {
		$route: function (to, from) {
			if (from.hash === '#history' && to.hash === '') {
				this.$refs.history.shown = false;
			}
		},
		'$route.query': function (newParams, oldParams) {
			this.searchLoading = false;
		}
	},
	mounted: function () {
		this.$watch('originAndDestination', function (newValue, oldValue) {
			if (newValue.originAndDestination !== '' && newValue.destinationId !== '') {
				this.disabledButton = false;
			}
		});
	},
	methods: {
		closeDatePicker() {
			this.$refs.datepicker.closeDatepicker();
		},
		swap: function () {
			let tmp = this.$refs.origin.id;
			this.$refs.origin.id = this.$refs.destination.id;
			this.$refs.destination.id = tmp;

			tmp = this.$refs.origin.label;
			this.$refs.origin.label = this.$refs.destination.label;
			this.$refs.destination.label = tmp;
			this.$ga.event('send', {
				eventCategory: 'reverse',
				eventAction: 'cities'
			});
		},
		editSearchFocus: function () {
			const that = this;
			setTimeout(function () {
				that.$refs.origin.$refs.cityInput.focus();
			}, 100);
		},
		searchOrEdit: function () {
			const origin = this.$refs.origin.id;
			const destination = this.$refs.destination.id;
			const date = this.$refs.datepicker.$refs.datepicker.dates;
			if (origin === '') {
				this.originIsEmpty = true;
				return false;
			}

			if (destination === '') {
				this.destinationIsEmpty = true;
				return false;
			}

			if (origin === destination) {
				alert('انتخاب مبدا و انتخاب مقصد نباید یکسان باشد!');
				return false;
			}
			this.$parent.homepageSearched = true;
			const that = this;
			that.searchLoading = true;
			setTimeout(function () {
				that.$emit(
					'searchFlights',
					that.$refs.origin.id,
					that.$refs.destination.id,
					  date.getFullYear() +
            '-' +
            that.pad(date.getMonth() + 1) +
            '-' +
            that.pad(date.getDate())
				);
			}, 300);
			this.$ga.event('send', {
				eventCategory: 'flight',
				eventAction: 'search'
			});
		},
		getOriginTitle: function () {
			return this.$refs.origin ? this.$refs.origin.selectedLabel : '';
		},
		getDestinationTitle: function () {
			return this.$refs.destination ? this.$refs.destination.selectedLabel : '';
		},
		setOriginValue() {
			this.$refs.destination.focusInput();
		},
		setDestinationValue() {
			if (this.homeSearch) {
				this.$refs.datepicker.$refs.datepicker.focusInput();
			}
		}
	}
};
</script>
<style scoped>
::v-deep .datepicker {
  margin-top: 22px !important;
  max-width: 290px;
  max-height: 270px;
}
.flight-search #search-box {
  background: #EEEEEE;
  width: calc(100% - 280px - 90px);
}
.home-page .home-page__container {
	justify-content: right!important;
}
a:hover {
  text-decoration: none !important;
}
.button-disabled {
    background: #C4C4C4 !important;
}
#currency-desktop {
  width: 58px;
  height: 32px;
  color: #c1c2c4;
  margin: 6px 32px 0px 0px;
  font-weight: 900;
  font-size: 16px;
  text-decoration: none;
  float: right;
  text-align: right;
  display: none;
}

#currency-desktop:hover {
  color: #3dd8a8;
}

#history-search-desktop {
  width: 84px;
  height: 32px;
  color: #c1c2c4;
  margin: 6px 32px 0px 0px;
  font-weight: 900;
  font-size: 16px;
  text-decoration: none;
  float: left;
}

.search {
  position: relative;
}
.search-box-border-left {
  position: relative;
  width: 327px;
}

#circle-reverse {
  position: relative;
  top: -10px;
  margin-left: -16px;
  background-color: #ffffff;
  border: 3px solid #ff536d ;
  width: 33px;
  height: 33px;
  border-radius: 100px;
  z-index: 1;
  cursor: pointer;
}

#reverse-icon {
  position: relative;
  font-size: 27px;
  color: #ff536d ;
  cursor: pointer;
  z-index: 1;
  padding: 5.4px;
  -webkit-transition: -webkit-transform 0.4s;
  transition: transform 0.4s;
  transition-timing-function: cubic-bezier(0.81, 0.01, 0.15, 0.99);
  height: auto;
}

#reverse-icon:hover {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

.reversed {
  transition: none !important;
}
#go-another-day {
  width: 90%;
  font-size: 18px;
  font-weight: 600;
  color: rgba(15, 19, 28, 0.54);
  margin: 0px auto 50px auto;
  text-align: center;
}
#clear-filters {
  position: relative;
	border-radius: 20px;
	border: 1px solid #EB384D;
	width: 120px;
	height: 34px;
	font-weight: 600;
	font-size: 15px;
	text-align: center;
	letter-spacing: -0.03em;
	color: #EB384D;
	outline: none;
	background: none;
  margin: 16px auto;
  cursor: pointer;
  padding-top: 5px;
}

#history-search-mobile {
  width: 101px;
  height: 32px;
  color: #c1c2c4;
  border-radius: 100px;
  border: 2px solid #c1c2c4;
  font-weight: 900;
  font-size: 18px;
  text-decoration: none;
  display: none;
  padding-left: 17px;
  z-index: 1;
}

#history-search-mobile:hover {
  color: #3dd8a8;
}

#currency {
  font-size: 18px;
  font-weight: 900;
  color: #c1c2c4;
  width: 195px;
  height: 32px;
  margin-bottom: 30px;
}

.line-scroll-left {
  height: 290px;
  width: 2px;
  margin-top: 15px;
  background-color: #c1c2c4;
  right: 429px;
  position: absolute;
  z-index: 1;
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .origin-and-destination {
    right: 30px;
  }
}

@media (min-width: 767px) and (max-width: 991.98px) {
  .origin-and-destination {
    right: 20px;
  }
  #search-box {
    margin: 0px
  }
}

@media (max-width: 767.98px) {
  .desktop-seacrh-icon {
    display: none
  }
  .mobile-seacrh-icon {
    display: block !important;
  }
::v-deep .datepicker {
  max-width: unset;
  max-height: unset;
}
.search {
  margin-top: 0px !important;
  padding: 0px
}
#search-box {
    background: none;
    border: none;
    margin: 0 0px!important;
    height: 100%!important;
}
.search-box-border-left {
    background: #F2F2F2;
    box-sizing: border-box;
    height: 56px!important;
    border-radius: 8px;
    margin-bottom: 10px!important;
    width: 100%!important;
}
  #circle-reverse {
    top: -10px;
    margin-left: 50px;
  }
  #search-box-button {
    width: 100%;
	position: absolute;
    left: -170px;
    top: 0;
  }
  #history-search-desktop {
    display: none;
  }
  .sizeBox {
    height: 192px !important;
    margin-top: 40px !important;
  }

  .origin-and-destination {
    top: 19px;
    right: 0;
    font-size: 15px;
  }
  .search-icon-span {
    margin-right: -20px;
    margin-left: 25px;
  }

  .origin-and-destination-after {
    font-size: 13px;
    right: 0 !important;
  }
  #reverse-icon {
    padding: 5.2px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  #reverse-icon:hover {
    padding-right: 7px;
    padding-top: 3px;
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  .search-box-edit-show {
    display: block !important;
  }

  .search-box-edit-city {
    font-size: 20px;
    font-weight: 900;
    color: #c1c2c4;
  }

  #flight-icon-color {
    color: #a4a5a9;
    margin: 28px 15px;
  }
  #search-icon {
    color: #ffffff;
    margin-top: 2px;
    font-size: 25px;
  }

  #row-history-currency {
    width: 85%;
    margin: auto;
  }

  #history-search-mobile {
    display: block;
  }

  .line-scroll-left {
    display: none;
  }
}

@media /*(min-width: 320px) and*/ (max-width: 575.98px) {
  #history-search-desktop {
    display: none;
  }
.mobile-calendar {
  top: 19px !important
}
  .sizeBox {
    height: 172px !important;
    margin-top: 30px !important;
  }

  .origin-and-destination {
    top: 14px;
    right: 0;
  }
  #reverse-icon {
    font-size: 15px;
    margin: 6px 0;
    padding: 0px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  #reverse-icon:hover {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .search-box-edit-show {
    display: block !important;
  }

  .search-box-edit-city {
    font-size: 16px;
    font-weight: 900;
    color: #c1c2c4;
  }

  #flight-icon-color {
    color: #a4a5a9;
    margin: 28px 10px;
  }
  #search-icon {
    color: #ffffff;
    margin-top: 2px;
    font-size: 25px;
  }

  #row-history-currency {
    width: 85%;
    margin: auto;
  }

  #history-search-mobile {
    width: 94px;
    height: 29px;
    font-size: 16px;
    display: block;
  }

  #currency {
    font-size: 16px;
    display: none;
  }

  .line-scroll-left {
    display: none;
  }
}
.search-box-border-left::after {
    content: " ";
    display: block;
    position: absolute;
    background: #E0E0E0;
    width: 1px;
    right: 100%;
    height: 55px;
    top: 0;
}
.search-box-last-part::after {
  display: none !important;
}
::v-deep #search-box-button {
  left: 20px !important
}
@media (max-width: 767.98px) {
  .circle-wrapper {
    display: none !important
  }
  #search-box-button {
    width: 100%;
    position: unset!important;
    margin-top: 10px
  }
  .search-btn {
      width: 100% !important;
      border: none;
      box-shadow: none;
      border-radius: 0px;
      border-bottom-left-radius: 23px;
      border-bottom-right-radius: 23px;
      height: 56px !important;
  }

}
.search-btn {
  margin: 0 !important;
  width: 160px;
  height: 55px;
  text-align: center;
}
.search-btn p {
  text-align: center;
  width: 100%;
}
.circle-wrapper {
  align-self: flex-end;
}
.flight-search {
  display: flex;
  text-align: center;
  background: #FAFAFA;
  padding-top: 27px;
  margin-bottom: 12px;
  border-bottom: 1px solid #EEEEEE;
}
.flight-page-search-icon {
  width: 60px;
  height: 60px;
  background: #EEEEEE;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer
}
.flight-search .flight-breadcrumb {
  min-width: 280px;
  margin-left: 20px;
  text-align: right;
}
.flight-search .flight-breadcrumb .title {
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 17px;
  text-align: right;
  color: #666666;
}
.flight-search .flight-breadcrumb .title img {
  margin: 0 4px;
}
.flight-search .flight-breadcrumb .city-name {
  display: inline-flex;
  margin-top: 3px;
}
.flight-search .flight-breadcrumb .city-name h1 {
  margin: 0 10px 0 0;
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 36px;
  text-align: right;
  color: #333333;
}
.empty-origin {
  border: 3px solid #EB384D !important;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
}
.empty-dest {
  border: 3px solid #EB384D !important;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
}
.empty-orirign::after, .empty-dest::after {
  background: #EB384D !important;
}
#calender-icon {
  margin-left: 10px;
  font-size: 17px;
}
.spinner > div {
  width: 12px;
  height: 12px;
  background-color: white;

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
.search-loader {
  font-size: 6px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em red, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em red, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em red, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em red, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em red, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em red, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em red, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em red;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em red, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em red, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em red, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em red, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em red, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em red, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em red, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em red;
  }
}
</style>
