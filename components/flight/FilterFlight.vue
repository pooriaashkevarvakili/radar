<template>
	<div id="box-filter" :class="{ 'box-filter-open': filtersOpen }">
		<div v-if="loaded" class="filters">
			<div class="filter-title filter-title-mobile d-none align-items-center justify-content-between">
				<div class="d-flex">
					<img src="~assets/images/right-arrow.svg" alt="right-arrow" @click="close">
					<div class="filter-tiltle-apply-filter">
						اعمال فیتر
					</div>
				</div>
				<div class="filter-tiltle-clear-history" @click="clearFilters">
					پاک‌سازی
				</div>
			</div>
			<div class="filter-container  align-items-center px-2 d-none">
				<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.6836 13.0117C15.0156 12.2734 13.7148 11.1836 13.7148 7.5625C13.7148 4.85547 11.8164 2.67578 9.21484 2.11328V1.375C9.21484 0.777344 8.72266 0.25 8.125 0.25C7.49219 0.25 7 0.777344 7 1.375V2.11328C4.39844 2.67578 2.5 4.85547 2.5 7.5625C2.5 11.1836 1.19922 12.2734 0.53125 13.0117C0.320312 13.2227 0.214844 13.5039 0.25 13.75C0.25 14.3477 0.671875 14.875 1.375 14.875H14.8398C15.543 14.875 15.9648 14.3477 16 13.75C16 13.5039 15.8945 13.2227 15.6836 13.0117ZM2.60547 13.1875C3.34375 12.2383 4.15234 10.5859 4.1875 7.59766C4.1875 7.59766 4.1875 7.59766 4.1875 7.5625C4.1875 5.41797 5.94531 3.625 8.125 3.625C10.2695 3.625 12.0625 5.41797 12.0625 7.5625C12.0625 7.59766 12.0273 7.59766 12.0273 7.59766C12.0625 10.5859 12.8711 12.2383 13.6094 13.1875H2.60547ZM8.125 18.25C9.35547 18.25 10.3398 17.2656 10.3398 16H5.875C5.875 17.2656 6.85938 18.25 8.125 18.25Z" fill="#AFAFAF" />
				</svg>
				<span class="filter-title border-0">اطلاع از کاهش قیمت</span>
				<label class="switch mb-0 mr-auto">
					<input type="checkbox">
					<span class="slider round" />
				</label>
			</div>
			<client-only>
				<div class="filter-container mt-0">
					<div class="filter-title">
						ساعت پرواز
					</div>
					<div class="filter-container__box">
						<vue-slider v-model="sliderValue" :min="0" :max="1440" :tooltip="'none'" :enable-cross="false" />
						<div class="row justify-content-between">
							<div id="max-time">
								{{ timeLabel[1] }}
							</div>
							<div id="min-time">
								{{ timeLabel[0] }}
							</div>
						</div>
					</div>
				</div>
			</client-only>
			<filter-box
				filter-title="نوع هواپیما"
				:filter-length="formatedAircraftTypes && formatedAircraftTypes.length"
				:filter-options="formatedAircraftTypes"
				:selected-filter-oprtion="selectedAircraftTypes"
				@setSelectedFilter="setSelectedAircraftTypes"
			/>
			<filter-box
				filter-title="هواپیمایی"
				:filter-length="formatedAirlines && formatedAirlines.length"
				:filter-options="formatedAirlines"
				:selected-filter-oprtion="selectedAirlines"
				@setSelectedFilter="setSelectedAirlines"
			/>
			<filter-box
				filter-title="کلاس پروازی"
				:filter-length="foramtedCabinClasses && foramtedCabinClasses.length"
				:filter-options="foramtedCabinClasses"
				:selected-filter-oprtion="selectedCabinClass"
				@setSelectedFilter="setSelectedCabinClass"
			/>
			<div class="apply-filters">
				<button @click="apply">
					اعمال فیلتر
				</button>
			</div>
		</div>
		<div v-else class="d-flex flex-column">
			<div class="filter-skeleton" style="height: 170px" />
			<div class="filter-skeleton" style="height: 250px" />
			<div class="filter-skeleton" style="height: 250px" />
			<div class="filter-skeleton" style="height: 250px" />
		</div>
		<div v-if="loaded" class="w-100">
			<a v-if="filterAdUrl" :href="filterAdUrl" target="_blank" class="w-100">
				<img class="ad-banner w-100" :src="`https://blog.radar361.com/ads/flights/${$route.params.origin + '-' + $route.params.destination}/right.png`">
			</a>
			<nuxt-link v-else to="/contactUs" class="w-100">
				<img class="ad-banner" src="~assets/images/advertise/small-ad.svg" alt="advertise">
			</nuxt-link>
		</div>
		<div v-else class="filter-ad-banner-skeleton" />
	</div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import Axios from 'axios';
import FilterBox from '~/components/filter';
export default {
	name: 'Filters',
	components: { FilterBox },
	props: {
		origin: {
			type: String,
			default: ''
		},
		loaded: Boolean
	},
	data: function () {
		return {
			sliderLabel: [],
			filtersOpen: false,
			airlinesList: [],
			selectedAirlines: [],
			selectedCabinClass: [],
			selectedAircraftTypes: [],
			filterAdUrl: ''
		};
	},
	computed: {
		...mapGetters('Flight', [
			'formatedAirlines',
			'foramtedCabinClasses',
			'formatedAircraftTypes'
		]),
		timeLabel: function () {
			let hourRight = Math.floor(Math.abs(this.sliderValue[0]) / 60);
			let minuteRight = Math.abs(this.sliderValue[0]) - hourRight * 60;
			if (hourRight.toString().length === 1) hourRight = '0' + hourRight;
			if (minuteRight.toString().length === 1) minuteRight = '0' + minuteRight;
			const minTimeLabel = (hourRight + ':' + minuteRight);
			let hourLeft = Math.floor(Math.abs(this.sliderValue[1]) / 60);
			let minuteLeft = Math.abs(this.sliderValue[1]) - hourLeft * 60;
			if (hourLeft.toString().length === 1) hourLeft = '0' + hourLeft;
			if (minuteLeft.toString().length === 1) minuteLeft = '0' + minuteLeft;
			const maxTimeLabel = (hourLeft + ':' + minuteLeft);
			this.setMinTimeLable(minTimeLabel);
			this.setMaxTimeLable(maxTimeLabel);

			return [minTimeLabel, maxTimeLabel];
		},
		sliderValue: {
			get() {
				return [this.$store.state.Flight.minTime, this.$store.state.Flight.maxTime];
			},
			set(value) {
				const payload = [value[0], value[1]];
				this.selectedTimeFilter(payload);
			}
		}
	},
	watch: {
		loaded() {
			this.filterFlights();
		},
		formatedAirlines(val) {
			if (this.$route.query.Airlines && this.formatedAirlines.length) {
				const airlines = this.$route.query.Airlines.split(',');
				const arr = airlines.map((i) => { return val.find(j => j.AirlineCode === i); });
				this.setSelectedAirlines(arr);
			}
		},
		formatedAircraftTypes(val) {
			if (this.$route.query.AircraftTypes && val.length) {
				const cabinClasses = this.$route.query.AircraftTypes.split(',');
				const arr = cabinClasses.map((i) => { return val.find(j => j.Title === i); });
				this.setSelectedAircraftTypes(arr);
			}
		},
		foramtedCabinClasses(val) {
			if (this.$route.query.CabinClass && this.foramtedCabinClasses.length) {
				const cabinClasses = this.$route.query.CabinClass.split(',');
				const arr = cabinClasses.map((i) => { return val.find(j => j.Class === i); });
				this.setSelectedCabinClass(arr);
			}
		},
		$route: function (to, from) {
			if (from.hash === '#filter' && to.hash === '') {
				this.filtersOpen = false;
			}
		},
		filters: function () {
			this.$emit('apply', this.filters);
		},
		filtersOpen(newVal) {
			if (newVal === true) {
				this.toggleBodyClass('addClass', 'body-overflow');
			} else {
				this.toggleBodyClass('removeClass', 'body-overflow');
			}
		}

	},
	mounted() {
		Axios.get(`https://blog.radar361.com/ads/flights/${this.$route.params.origin + '-' + this.$route.params.destination}/right.txt`).then((res) => {
			this.filterAdUrl = res.data;
		});
		if (this.$route.query.minTime && this.$route.query.maxTime) {
			const times = [parseInt(this.$route.query.minTime), parseInt(this.$route.query.maxTime)];
			this.sliderValue = times;
			this.filterFlights();
		}
	},
	methods: {
		filterButtonClicked() {
			const that = this;
			that.filtersOpen = true;
			this.$router.push({ path: this.$route.fullPath, hash: '#filter' });
			this.$ga.event('send', {
				eventCategory: 'filter',
				eventAction: 'open'
			});
		},
		...mapMutations('Flight', ['setMinTimeLable', 'setMaxTimeLable']),
		...mapActions('Flight', ['filterFlights', 'selectedAirlinesFilter', 'selectedCabinClassesFilter', 'selecteddAircraftTypes', 'selectedTimeFilter']),
		apply: function () {
			this.filtersOpen = false;
			this.$router.go(-1);
		},
		close: function () {
			this.$emit('close');
			this.filtersOpen = false;
			this.$router.go(-1);
		},
		clearFilters: function () {
			this.setSelectedAircraftTypes([]);
			this.setSelectedAirlines([]);
			this.selectedTimeFilter([0, 1440]);
			this.setSelectedCabinClass([]);
		},
		toggleBodyClass(addRemoveClass, className) {
			const el = document.body;
			if (addRemoveClass === 'addClass') {
				el.classList.add(className);
			} else {
				el.classList.remove(className);
			}
		},
		setSelectedAirlines(val) {
			this.selectedAirlines = val;
			this.selectedAirlinesFilter(this.selectedAirlines);
			this.filterFlights();
		},
		setSelectedCabinClass(val) {
			this.selectedCabinClass = val;
			this.selectedCabinClassesFilter(val);
			this.filterFlights();
		},
		setSelectedAircraftTypes(val) {
			this.selectedAircraftTypes = val;
			this.selecteddAircraftTypes(val);
			this.filterFlights();
		}
	}
};
</script>

<style scoped>
::v-deep .vue-slider-dot-handle {
    background-color: #08b6c5 !important;
    border:1px solid #08b6c5 !important;
    width: 22px !important;
    height: 22px !important;
    position: relative !important;
    top: -5px !important;
    box-shadow: 0px 2px 4px rgba(61, 216, 168, 0.35);
}
::v-deep .vue-slider-process {
    background-color: #08b6c5 !important;
}
.filters {
	width: 100%;
}
#box-filter {
	width: 280px;
	height: 100%;
	border-radius: 8px;
	text-align: right;
	margin-bottom: 30px;
}
.box-filter-open {
	display: block !important;
}
.filter-title {
	font-weight: 600;
	font-size: 14px;
	color: #656565;
	padding: 0px 15px;
	border-bottom: 1px solid #DDDDDD;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 52px
}
.airlines-container {
	margin: 0px 5px;
}
input[type=checkbox] {
    cursor: pointer;
    font-size: 19px;
    height: 20px;
    position: relative;
    margin-left: 10px;
	border: 1px solid #656565;
	background: none!important;
	border-radius: 5px;
}
input[type=checkbox]:after {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    content: " ";
    color: #FFFFFF;
    visibility: visible;
    padding: 0px 4px;
    border-radius: 5px;
    background-color: #FFFFFF;
    border: 1px solid #656565;
}
input[type=checkbox]:checked{
	border-radius: 5px!important;
}
input[type=checkbox]:checked:after {
    background-image: url('~assets/images/right-icon.svg')!important;
    background-color: #EB384D!important;
	background-size: cover!important;
    border: 1px solid #EB384D;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    margin: 0;
}
.airlines-name {
	font-size: 13px;
	font-weight: 500;
	padding-right: 15px;
	color: #656565;
	padding-top: 0!important;
	white-space: nowrap;
}
.airplanes-price {
	height: 25px;
	text-align: left;
	color: #A4A4A4;
	font-size: 14px !important;
	font-weight: 500;
	cursor: pointer;
	padding: 0;
	line-height: 20px;
	position: relative;
}
.airplanes-price:hover span::before {
	font-size: 12px;
	content: 'فقط این گزینه';
	line-height: 20px;
	position: absolute;
	top: 1px;
	left: 0;
	width: 100%;
	display: block;
	z-index: 10000000;
	height: 23px;
	background-color: #fcfcfc;
}
.class-container {
	margin-bottom: 20px;
}
.apply-filters {
    padding: 10px;
    display: none;
    cursor: pointer;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #F4F4F4;
    border-top: 1px solid #DDDDDD;
}
.apply-filters button {
    width: 100%;
    height: 50px;
    background: #EB384D;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
    border: none;
}
.filter-container {
	margin-top: 10px;
	background: #FCFCFC;
	border: 1px solid #DDDDDD;
	border-radius: 5px;
}
.filter-container__box {
	padding: 10px
}
::v-deep .vue-slider {
	padding: 30px 15px !important;
	padding-bottom: 20px !important;
}
.switch {
	position: relative;
	display: inline-block;
	width: 35px;
	height: 20px;
}

.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}
.filter-skeleton {
    width: 100%;
    background: #E8E8E8;
    border-radius: 10px;
    margin-top: 13px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
}
.filter-skeleton::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(100%);
    background-image: linear-gradient(90deg, rgba(255, 255, 255, .2) 60%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, .2) , rgba(255, 255, 255, 0) );
    animation: shimmer 2s infinite;
    content: '';
}
.filter-skeleton:first-child {
	margin-top: 0px;
}
@keyframes shimmer {
	100% {
		transform: translateX(-100%);
	}
}
.see-more {
    border-top: 1px solid #DDDDDD;
    height: 47px;
    color: #656565;
    font-weight: 600;
    font-size: 14px;
	cursor: pointer;
}
.see-more__icon {
    font-size: 13px;
    margin-left: 6px;
}
#max-time, #min-time {
	color: #828282;
	font-size: 15px;
	font-weight: 600;
	width: 125px;
	background: #F2F2F2;
	border-radius: 5px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center
}
.ad-banner {
	border: 1px solid #DDDDDD;
    border-radius: 5px;
	margin-top: 10px
}
@media (max-width: 767.98px) {
	.filters {
		margin-bottom: 0px;
		background: white;
		min-height: calc(100% - 70px);
		padding-bottom: 70px
	}
	.filter-title {
		height: 66px;
	}
	.filter-container {
		border-radius: 0px !important;
	}
	#box-filter {
		display: none;
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 1002;
		overflow: auto;
		border-radius: 0;
		background: white;
	}
	.apply-filters {
		display: block;
	}
	::v-deep .vue-slider {
		margin-bottom: 20px
	}
	.filter-container {
		margin-top: 0!important;
		background: white;
		border-radius: none !important;
	}
	.filter-container__box {
		background: #FCFCFC;
	}
	.filter-tiltle-apply-filter {
		font-weight: 600;
		font-size: 17px;
		line-height: 54px;
		text-align: right;
		color: #1d1d1d;
		margin-right: 10px
	}
	.filter-tiltle-clear-history {
		width: 105px;
		height: 35px;
		margin-left: 0;
		background: #f4f4f4;
		border-radius: 10px;
		font-weight: 600;
		font-size: 15px;
		line-height: 23px;
		color: #eb384d;
		padding: 5px 10px;
		text-align: center;
	}
	.filter-title-mobile {
		display: flex !important
	}
	#min-time {
		margin-right: 17%;
	}
	#max-time {
		margin-left: 17%;
	}
	.ad-banner {
		display: none
	}
}

@media (max-width: 575.98px) {
	.airlines-name {
		font-size: 14px;
		padding-top: 6px;
	}
	.airplanes-price {
		font-size: 12px;
	}
	.apply-filters {
		display: block;
		padding-top: 12px;
	}
	#min-time {
		margin-right: 5%;
	}
	#max-time {
		margin-left: 7%;
	}
}
</style>
