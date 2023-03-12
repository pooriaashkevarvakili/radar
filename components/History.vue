<template>
	<div v-show="shown" id="history-list" class="row history">
		<div class="box-title">
			<div class="row justify-content-between">
				<div class="row">
					<font-awesome-icon :icon="['fas', 'times']" class="close-choose-box fa-style" @click="closeHistoryBox" />
					<div class="box-title-color">
						تاریخچه
					</div>
				</div>
				<div v-show="!empty " class="clear-history" @click="clear">
					پاک‌سازی
				</div>
			</div>
		</div>
		<div v-show="historyLength > 3" class="line-scroll-left" style="margin:0" />
		<div class="history-box">
			<div v-show="!empty" id="history-box-clear" @click="clear">
				پاک‌سازی تاریخچه
			</div>
			<div id="simplebar-left" data-simplebar>
				<div class="history-container">
					<div v-for="(list, month) in monthes" :key="month" class="history-month">
						<div id="history-box-date">
							<font-awesome-layers class="fa-lg">
								<font-awesome-icon :icon="['fas', 'calendar-alt']" style="margin-left: 15px;" class="fa-style"/>
							</font-awesome-layers>
							{{ getMonthString(month) }}
						</div>
						<div v-for="item in list" :key="item.index" class="row rowresult history-item" @click="openUrl(item)">
							<div id="history-box-circle">
								<font-awesome-icon :icon="['fas', 'plane']" class="fa-style" />
							</div>
							<div id="history-origin">
								<span class="history-item-route">{{ item.origin }} به {{ item.destination }}</span>
								<span class="history-item-carrier">{{ item.carrierName }}</span>
								<br>
								<span id="history-item-destination">{{ getDayString(item.departureDate) }}</span>
							</div>
							<div id="history-destination">
								{{ item.sellerName }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'History',
	props: {
	},
	data: function () {
		return {
			shown: false,
			empty: true,
			historyLength: 5,
			monthes: { },
			monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
		};
	},
	watch: {
		shown: function (value) {
			if (value) {
				this.switchComponents();
			}
		}
	},
	mounted: function () {
		// Loading history
		const historyStr = localStorage.getItem('flightHistory');
		const history = historyStr ? JSON.parse(historyStr) : [];
		this.monthes = {};
		for (let i = 0; i < history.length; i++) {
			const month = history[i].flight.JDepartureTime.substring(0, 7);
			if (!(month in this.monthes)) {
				this.monthes[month] = [];
			}
			this.monthes[month].push({
				departureDate: history[i].flight.JDepartureTime.substring(0, 10),
				sellerName: history[i].seller.SellerName,
				carrierName: history[i].flight.AirlineTitle,
				origin: history[i].flight.Origin,
				destination: history[i].flight.Destination,
				index: i,
				url: history[i].seller.SellerLink
			});
			this.empty = false;
		}

		this.historyLength = history.length;

		const that = this;
		// Attention: fix this line
		// $(document).on('click', function () {
		// 	that.shown = false;
		// });

		this.$root.$on('showOne', function (component) {
			if (component !== that) {
				that.shown = false;
			}
		});
	},
	methods: {
		getMonthString: function (month) {
			const parts = month.split('-');
			return this.monthNames[parseInt(parts[1]) - 1] + ' ' + parts[0].substr(2, 2);
		},
		getDayString: function (date) {
			const parts = date.split('-');
			return parts[2] + ' ' + this.monthNames[parseInt(parts[1]) - 1];
		},
		openUrl: function (item) {
			window.open(item.url, '_blank');
		},
		clear: function () {
			localStorage.setItem('flightHistory', '[]');
			this.monthes = {};
			this.empty = true;
			this.shown = false;
		},
		switchComponents: function () {
			this.$root.$emit('showOne', this);
		},
		closeHistoryBox: function () {
			this.shown = false;
			this.$router.go(-1);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#history-list {
    position: absolute;
    z-index: 1002;
	left: -124px;
	top: 155px;
    width: 557px;
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
.history-box {
    background-color: #FFFFFF;
    width: 400px;
    height: 290px;
    border-radius:22px;
    margin: 0px 15px 0px 0px;
    box-shadow:0px 0px 25px rgba(0, 0, 0, 0.1);
    text-align: right;
    position: absolute;
    z-index: 5;
}
.history-item-carrier {
	display: none;
}

.history-item:hover .history-item-carrier {
	display: inline;
}

.history-item:hover .history-item-route {
	display: none;
}
#history-box-clear {
    width: 141px;
    height: 41px;
    background-color: #ECECEC;
    font-weight: 900;
    font-size: 14px;
    color: #C1C2C4;
    text-align: center;
    border-radius:22px 0px 22px 0px;
    position: absolute;
    left: 0;
    padding: 9px;
    z-index: 2;
    cursor: pointer;
}
#history-box-clear:hover {
	background-color: #3DD8A8;
	color: #FFFFFF;
}
#simplebar-left {
    width: 420px;
    height: 290px;
	border-radius: 0px 22px 22px 0px;
}
#simplebar-left .simplebar-track.vertical {
    top: 0;
    right: auto;
    left: 0;
}
#history-box-date {
    background-color: #4466AA;
    width: 190px;
    height: 45px;
    font-weight: 900;
    font-size: 15px;
    color: #FFFFFF;
    border-radius:0px 0px 0px 22px;
    padding: 10px 45px 0px 0px;
    margin-bottom: 20px;
}
#history-box-circle {
    background-color: #C1C2C4;
    width: 25px;
    height: 25px;
    border-radius: 100px;
    margin-right: 45px;
    color: #FFFFFF;
    text-align: center;
    padding: 2px;
}
#history-origin {
    width: 200px;
    margin: 0px 10px 20px 0px;
    font-size: 14px;
    font-weight: 900;
}
#history-item-destination {
    color: #C1C2C4;
    font-size: 12px;
    font-weight: 900;
    padding-top: 5px;
}
#history-destination {
    color: #A4A5A9;
    font-weight: 900;
    font-size: 14px;
}
@media (min-width: 992px) and (max-width: 1199.98px) {
	#history-list {
		width: 460px;
	}
}
@media (min-width: 767px) and (max-width: 991.98px) {
	#history-list {
		width: 360px;
	}
}
@media (min-width: 576px) and (max-width: 767.98px) {
	.line-scroll-left {
		display: none;
	}
	#history-list {
        top: 0;
        height: 100%;
        position: fixed;
        right: 0;
        width: 100%;
        background: #FFFFFF;
        z-index: 2;
        overflow: auto;
	}
	.history-box {
        top: 114px;
        right: 0;
        margin: 0;
        border-radius:0px;
        box-shadow:none;
        width: 100%;
	}
	#history-box-clear {
        display: none;
	}
	#simplebar-left {
		display: initial;
        border-radius:0px !important;
        width: 100% !important;
	}
	#history-box-date {
        background-color: #4466AA;
        height: 53px;
        font-weight: 900;
        font-size: 18px;
        border-radius: 0px 0px 0px 22px;
        padding: 12px 77px;
        width: 45%;
	}
	#history-box-circle {
        margin-right: 77px;
	}
	#history-origin {
        width: 53%;
	}
	.rowresult {
        width: 100%;
    }
}
@media /*(min-width: 320px) and*/ (max-width: 575.98px) {
	.line-scroll-left {
		display: none;
	}
	#history-list {
        top: 0;
        height: 100%;
        position: fixed;
        right: 0;
        width: 100%;
        background: #FFFFFF;
        z-index: 2;
        overflow: auto;
	}
	.history-box {
        top: 114px;
        right: 0;
        margin: 0;
        border-radius:0px;
        box-shadow:none;
        width: 100%;
	}
	#history-box-clear {
        display: none;
	}
	#simplebar-left {
        border-radius:0px !important;
        width: 100%;
		display: initial;
	}
	#history-box-date {
        background-color: #4466AA;
        width: 45%;
        height: 53px;
        font-weight: 900;
        font-size: 18px;
        border-radius: 0px 0px 0px 22px;
        padding: 12px 15px;
	}
	#history-box-circle {
        margin-right: 15px;
	}
	#history-origin {
        width: 40%;
    }
}
</style>
