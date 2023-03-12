<template>
	<div v-if="openPopUp == true" class="PriceTrackingPopUp">
		<div class="pop-up-background" @click="closePopUp" />
		<div class="pop-up-box" :class="{ 'pop-up-box-all': flightData == null }">
			<div class="pop-up-day-time" :class="{ 'pop-up-day-time-all': flightData == null }">
				{{ $parent.popUpDate }}
			</div>
			<div class="border-mid">
				<div v-if=" flightData != null " class="pop-up-airline">
					<div class="pop-up-airlane-name">
						{{ flightData.flight.Flight.Airline }} {{ flightData.flight.Flight.FlightNumber }}
					</div>
					<div class="pop-up-airline-logo" :style="{ 'background-image': 'url(/img/AirlineLogos/' + flightData.flight.Flight.AirlineCode + '.png)' }" />
					<div style="clear: both;" />
				</div>
				<div class="flight-time" :class="{ 'flight-time-all': flightData == null }">
					<div>
						<div class="pop-up-city-name" :class="{ 'pop-up-city-name-all': flightData == null }">
							{{ priceTrackData.originTitle }}
						</div>
						<div v-if="flightData != null" class="pop-up-time">
							{{ flightData.flight.Flight.DepartureTime.substr(11, 5) }}
						</div>
					</div>
					<div>
						<img src="~assets/images/direct.png" class="pop-up-direct-img" :class="{ 'pop-up-direct-img-all': flightData == null }">
						<div v-if="flightData != null" class="pop-up-aircraft-type">
							{{ flightData.flight.Flight.AircraftType }}
						</div>
					</div>
					<div>
						<div class="pop-up-city-name" :class="{ 'pop-up-city-name-all': flightData == null }">
							{{ priceTrackData.destinationTitle }}
						</div>
						<div v-if="flightData != null" class="pop-up-time">
							{{ flightData.flight.Flight.ArrivalTime.substr(11, 5) }}
						</div>
					</div>
				</div>
			</div>
			<input type="checkbox" @click="beforAfter">
			<div class="pop-up-befor-after">
				رهگیری پروازهای 2 روز قبل و بعد
			</div>
			<div style="clear: both;" />
			<input type="checkbox" @click="decreasePrice">
			<div class="pop-up-befor-after">
				فقط درصورت ارزان شدن به من پیام بده
			</div>
			<div style="clear: both;" />
			<div class="pop-up-price-track">
				<input
					v-model="phoneNumber"
					type="text"
					class="pop-up-price-track-input"
					:class="{ 'pop-up-price-track-input-error': phoneNumberEmpty }"
					placeholder="شماره موبایل: 09121234567"
					@click="phoneNumberEmpty = false , phoneNumber = ''"
				>
				<div class="pop-up-price-track-btn" @click="priceTrackClicked()">
					رهگیری قیمت
				</div>
			</div>
			<font-awesome-icon v-if="phoneNumberEmpty" :icon="['fas', 'exclamation-circle']" :class="{ 'exclamation-icon-all': flightData == null }" class="fa-style"/>
			<div class="pop-up-msg">
				رادار به محض تغییر قیمت محسوس به شما اطلاع رسانی خواهد کرد
			</div>
		</div>
	</div>
</template>
<script>
import PriceTrackApi from 'price_track_api';
import swal from 'sweetalert';
export default {
	name: 'PriceTrackingPopUp',
	props: {
		openPopUp: Boolean,
		priceTrackData: Object,
		flightData: Object,
		trackList: Array
	},
	data: function () {
		return {
			phoneNumber: '',
			phoneNumberEmpty: false,
			uuid: null,
			option: 3,
			dateRange: 0
		};
	},
	mounted: function () {
		if (localStorage.getItem('uuid') != null) {
			this.uuid = localStorage.getItem('uuid');
		} else {
			this.uuid = this.generateUUID();
			localStorage.setItem('uuid', this.uuid);
		}
	},
	methods: {
		closePopUp: function () {
			this.$parent.flightData = null;
			this.$parent.popUp = false;
		},
		beforAfter: function (a) {
			if (a.target.checked) {
				this.dateRange = 2;
			} else {
				this.dateRange = 0;
			}
		},
		decreasePrice: function (e) {
			if (e.target.checked) {
				this.option = 2;
			} else {
				this.option = 3;
			}
		},
		generateUUID: function () {
			let d = new Date().getTime();
			if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
				d += performance.now();
			}
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				const r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
		},
		priceTrackClicked: function () {
			const that = this;
			if (this.phoneNumber === '') {
				this.phoneNumberEmpty = true;
				this.phoneNumber = 'شماره موبایل خود را وارد کنید.';
			} else if (!this.phoneNumber.match(/^09\d{9}$/)) {
				this.phoneNumberEmpty = true;
				this.phoneNumber = 'شماره وارد‌شده نادرست است.';
			} else {
				const apiInstance = new PriceTrackApi.PriceTrackApi();
				const newPriceTrack = new PriceTrackApi.Radar361PriceAlertModelsRequestsPriceTrackRequestsAddPriceTrackRequest();

				newPriceTrack.origin = that.priceTrackData.originCode;
				newPriceTrack.destination = that.priceTrackData.destinationCode;
				newPriceTrack.date = that.priceTrackData.date;
				newPriceTrack.phoneNumber = that.phoneNumber;
				// newPriceTrack.deviceId = that.chabok.deviceId;
				newPriceTrack.option = that.option;
				newPriceTrack.filters = {};
				newPriceTrack.filters.dateRange = that.dateRange;
				if (that.flightData == null) {
					newPriceTrack.price = that.priceTrackData.price;
					newPriceTrack.type = 1;
				} else {
					newPriceTrack.type = 2;
					newPriceTrack.price = that.flightData.price;
					newPriceTrack.airlineTitle = that.flightData.flight.Flight.Airline;
					newPriceTrack.airlineCode = that.flightData.flight.Flight.AirlineCode;
					newPriceTrack.filters.startTime = that.flightData.flight.Flight.DepartureTime.substr(0, 10) + 'T' + that.flightData.flight.Flight.DepartureTime.substr(11, 5);
					newPriceTrack.filters.endTime = that.flightData.flight.Flight.ArrivalTime.substr(0, 10) + 'T' + that.flightData.flight.Flight.ArrivalTime.substr(11, 5);
					newPriceTrack.filters.flightNumber = that.flightData.flight.Flight.FlightNumber;
				}

				const opts = {
					request: newPriceTrack,
					playerId: that.uuid
				};
				const callback = function (error, data, response) {
					if (error) {
						that.$parent.flightData = null;
						that.$parent.popUp = false;
						if (response.body.Message) {
							swal({
								text: response.body.Message,
								type: 'error',
								icon: 'error',
								confirmButtonText: 'بستن'
							});
						} else {
							swal({
								text: 'خطای نامشخصی رخ‌داده‌است.',
								type: 'error',
								icon: 'error',
								confirmButtonText: 'بستن'
							});
						}
					} else {
						if (that.flightData == null) {
							that.$parent.flightTracked = true;
						} else if (that.flightData != null) {
							that.trackList.push(that.flightData.flight.Flight.FlightNumber);
						}
						that.$parent.flightData = null;
						that.$parent.popUp = false;
						swal({
							text: 'رادار361 پرواز‌های مورد نظر شما را دنبال کرده و به محض تغییر قیمت محسوس به شما اطلاع رسانی خواهد کرد.',
							icon: 'success',
							button: 'بستن'
						});
					}
				};
				apiInstance.addPriceTrack(opts, callback);
			}
		}
	}
};
</script>

<style scoped>
.pop-up-background {
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.3;
    position: fixed;
    z-index: 10000;
    top: 0;
}
.pop-up-box {
    width: 490px;
    height: 385px;
    background-color: #FFFFFF;
    border-radius: 26px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 18px 22px;
    position: fixed;
    top: 30vh;
    right: 50%;
    margin-right: -245px;
    z-index: 10001;
}
.pop-up-box-all {
    height: 360px;
}
.pop-up-day-time {
    font-size: 18px;
    font-weight: 900;
    text-align: center;
    color: #848484;
    margin-bottom: 25px;
}
.border-mid {
    border-bottom: 2px solid #E9F0F2;
    padding-bottom: 27px;
    margin-bottom: 20px;
    display: flex;
}
.pop-up-airlane-name {
    font-size: 13px;
    font-weight: 900;
    color: #C4C4C4;
    text-align: right;
    margin: 0 0 6px 0;
}
.pop-up-airline {
    width: 120px;
}
.pop-up-airline-logo {
    width: 35px;
    height: 35px;
    background-size: 35px;
}
.flight-time {
    display: flex;
}
.flight-time-all {
    display: flex;
    margin: 0 auto;
}
.pop-up-city-name {
    font-size: 18px;
    font-weight: 900;
    color: #848484;
    margin-bottom: 6px;
}
.pop-up-time {
    font-size: 16px;
    font-weight: 900;
    text-align: center;
    color: #1C1C1C;
}
.pop-up-direct-img {
    width: 105px;
    height: 32px;
    margin: 6px 13px 0 13px;
}
.pop-up-aircraft-type {
    font-size: 11px;
    font-weight: 900;
    text-align: center;
    padding-left: 15px;
    color: #C4C4C4;
    display: none;
}
input[type=checkbox] {
    cursor: pointer;
    font-size: 19px;
    width: 18px;
    height: 18px;
    float: right;
    margin: 0 !important;
}
input[type=checkbox]:after {
    width: 18px;
    height: 18px;
    content: " ";
    color: #FFFFFF;
    visibility: visible;
    padding: 0px 4px;
    border-radius: 3px;
    background-color: #FFFFFF;
    border: 2px solid #C1C2C4;
    margin-right: 1px;
}
input[type=checkbox]:checked:after {
    content: "✓";
    font-size: 13px;
    background-color: #08b6c5 ;
    width: 18px;
    height: 18px;
    margin-right: 1px;
    border: none;
}
input[type=checkbox][disabled]:after {
    background-color: #C1C2C4;
}
.pop-up-befor-after {
    font-size: 14px;
    font-weight: 900;
    color: #848484;
    text-align: right;
    float: right;
    margin: -3px 10px 15px 0;
}
.pop-up-price-track {
    width: 100%;
    height: 52px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    border-radius: 7px;
    margin: 20px 0 13px 0;
    cursor: pointer;
}
.pop-up-price-track-btn {
    width: 175px;
    height: 100%;
    background-color: #3DD8A8;
    border-radius: 6px 0px 6px 6px;
    font-size: 18px;
    font-weight: 900;
    color: #FFFFFF;
    text-align: center;
    padding-top: 11px;
    float: left;
}
.pop-up-price-track-input {
    width: 270px;
    border: none;
    border-radius: 0 7px 7px 0;
    font-size: 15px;
    font-weight: 900;
    text-align: right;
    outline: none;
    padding: 15px;
}
.pop-up-price-track-input-error {
    background-color: #FFDBDB;
    color: #FF0000;
    padding-right: 40px;
}
.fa-exclamation-circle {
    color: #FF0000;
    font-size: 20px;
    position: absolute;
    bottom: 83px;
    right: 35px;
}
::placeholder {
    color: #C4C4C4;
}
.pop-up-msg {
    font-size: 13px;
    font-weight: 900;
    text-align: right;
    color: #C4C4C4;
}
@media (max-width: 767.98px) {
    .pop-up-box {
        height: 440px;
    }
    .pop-up-day-time {
        margin-bottom: 8px;
    }
    .border-mid {
        padding-bottom: 4px;
        margin-bottom: 17px;
        display: block;
    }
    .pop-up-airline {
        width: 128px;
        margin: 0 auto;
    }
    .pop-up-airlane-name {
        margin: 6px 0 0 0;
        float: left;
        color: #848484;
    }
    .pop-up-airline-logo {
        float: right;
    }
    .flight-time {
        width: 317px;
        margin: 12px auto;
    }
    .pop-up-aircraft-type {
        display: block;
    }
    .pop-up-city-name {
        text-align: center;
        width: 93px;
    }
    .pop-up-price-track {
        height: 130px;
        margin: 7px 0 16px 0;
    }
    .pop-up-price-track-input {
        width: 353px;
        border-radius: 0;
        height: 54px;
        text-align: center;
        border: none;
        padding-right: 0;
        outline: none;
        border-bottom: 2px solid #E9F0F2;
        margin: 0  46px;
    }
    .pop-up-price-track-btn {
        width: 235px;
        height: 40px;
        border-radius: 50px;
        font-size: 18px;
        padding-top: 6px;
        float: none;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        margin: 17px auto;
    }
    .pop-up-msg {
        font-size: 11px;
    }
    .fa-exclamation-circle {
        bottom: 137px;
        right: 117px;
    }
    .exclamation-icon-all {
        bottom: 200px;
    }
}
@media (max-width: 575.98px) {
    .pop-up-box {
        width: 90%;
        height: 445px;
        padding: 18px 20px;
        right: 5%;
        margin-right: 0px;
    }
    .pop-up-box-all {
        height: 400px;
    }
    .pop-up-day-time-all {
        margin-bottom: 26px;
    }
    .pop-up-city-name {
        display: none;
    }
    .pop-up-city-name-all {
        display: block;
        font-size: 15px;
    }
    .pop-up-direct-img {
        width: 96px;
        height: 28px;
        margin: 0px 9px;
    }
    .pop-up-direct-img-all {
        width: 76px;
    }
    .flight-time {
        width: 192px;
        margin: 12px auto;
    }
    .flight-time-all {
        width: 260px;
    }
    .pop-up-befor-after {
        font-size: 13px;
        margin: -1px 10px 15px 0;
    }
    .pop-up-price-track-input {
        width: 66%;
        font-size: 14px;
        margin: 0 17%;
    }
    .pop-up-price-track-btn {
        width: 175px;
    }
    .pop-up-price-track-input {
        width: 75%;
        margin: 0 12%;
    }
    .pop-up-price-track-input {
        padding: 0px;
    }
    .fa-exclamation-circle {
        bottom: 156px;
        right: 48%;
        margin-right: -100px;
    }
}
</style>
