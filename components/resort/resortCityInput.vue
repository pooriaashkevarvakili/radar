<template>
	<div v-click-outside="close">
		<div class="text-right d-flex cursor-pointer" @click="labelClicked">
			<img src="~assets/images/location-icon.svg" class="mb-1 location-icon" alt="location-icon">
			<input
				ref="cityInput"
				v-model="label"
				type="text"
				placeholder="جستجوی مقصد (شهر/استان)"
				class="city-input cursor-pointer"
				:disabled="readOnly"
				@focus.prevent="inputFocused"
				@keydown="checkKeyPressed($event)"
				@keyup.tab="tabkey"

				@blur="inputBlur"
			>
			<span v-if="label != ''" class="d-flex align-items-center desktop-empty-item justify-content-center" @click.stop="removeSelectedItem">
				<img src="~assets/images/gray-times.svg" alt="times">
			</span>
		</div>
		<transition
			name="slide-fade"
		>
			<city-list
				ref="cityList"
				class="city-name"
				input-title="جستجوی مقصد (شهر/استان)"
				:lists="selectedList"
				:error="error"
				type="resort"
				@itemSelected="itemSelected"
				@closeCityList="sth"
				@searchForCities="searchForCities"
			>
				<template #default="{item}">
					<div class="d-flex flex-column w-100">
						<div class="d-flex w-100 resort-item align-items-center">
							<div class="d-flex">
								<div>
									<span v-if="item.Type === 'استان'"><img src="~/assets/images/province-img.svg" class="ml-3 city-icon" alt="ptovince icon"></span>
									<img v-else src="~assets/images/red-location-icon.svg" alt="location-image" class="ml-3 city-icon">
								</div>
								<div class="d-flex flex-column">
									<span class="resort-name">
										{{ item.NameFa }}
									</span>
									<span v-if="item.Type !== 'استان' " class="resort-province">استان {{ item.ProvinceName }}</span>
								</div>
							</div>
							<span class="resort-count">({{ item.ResidenceCount }} اقامتگاه) </span>
						</div>
					</div>
				</template>
			</city-list>
		</transition>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { faSearch, faHotel } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import CityList from '../CityList.vue';
import ResortStore from '~/store/Resort';
library.add(faSearch, faHotel);
export default {
	name: 'CityInput',
	directives: {
		ClickOutside
	},
	components: {
		CityList
	},
	props: {
		lists: {
			type: Array,
			default: function () {
				return [];
			}
		},
		title: {
			type: String,
			default: ''
		},
		historyList: {
			type: Array,
			default: function () {
				return [];
			}
		},
		disabled: Boolean,
		error: Boolean,
		inputTitle: {
			type: String,
			default: ''
		},
		selectedDestination: {
			type: String,
			default: ''
		}
	},
	data: function () {
		return {
			id: '',
			label: '',
			focused: false,
			mobileSize: 768,
			selectedList: [],
			selectedCity: {},
			nameEn: ''
		};
	},
	computed: {
		searchedCity() {
			return ResortStore.of(this.$store).state.searchedCity;
		},
		readOnly() {
			if (process.client) {
				return window.innerWidth < 768;
			} else return true;
		}
	},
	watch: {
		label: function (val) {
			this.$refs.cityList.filter = val;
			this.$refs.cityList.changeTitle = val;
		},
		$route: function (to, from) {
			if (from.hash === '#way' && to.hash === '') {
				this.$refs.cityList.shown = false;
				this.focused = false;
			}
		},
		focused: function (val) {
			this.$refs.cityList.shown = val;
		},
		id: function (newVal, oldVal) {
			if (newVal !== '' && oldVal === '') {
				this.$emit('checkInpputIsEmptiy', false);
			}
		},
		lists(val) {
			if (val.length && this.label === '') {
				this.selectedList = this.lists;
			}
		}
	},
	async beforeMount() {
		if (this.$route.params.city || this.$route.params.resort) {
			await ResortStore.of(this.$store).searchForCityInUrl(this.$route.params.city ? this.$route.params.city : this.$route.params.resort);
			this.nameEn = ResortStore.of(this.$store).state.searchedCityInUrl.NameEn;
			this.id = ResortStore.of(this.$store).state.searchedCityInUrl.Id;
			this.label = ResortStore.of(this.$store).state.searchedCityInUrl.NameFa;
			this.selectedCity = ResortStore.of(this.$store).state.searchedCityInUrl;
		}
	},
	methods: {
		close: function () {
			this.focused = false;
		},
		removeSelectedItem() {
			this.nameEn = '';
			this.id = '';
			this.label = '';
			this.inputFocused();
			this.$refs.cityInput.focus();
			this.$emit('closeDatePicker');
		},
		inputFocused: function () {
			this.focused = true;
			this.$refs.cityList.filter = '';
			this.$refs.cityList.changeTitle = '';
			if (window.innerWidth < 768) {
				this.$router.push({ path: this.$route.fullPath, hash: '#way' });
			}
		},
		inputBlur: function () {
			if (this.$refs.cityList && !this.$refs.cityList.isInputVisible()) this.focused = false;
			if (this.$refs.cityInput) {
				if (this.$refs.cityList.filter) {
					if (this.selectedCity.Id) {
						this.Id = this.selectedCity.Id;
						this.nameEn = this.selectedCity.NameEn;
						this.$refs.cityInput.value = this.selectedCity.NameFa;
					} else {
						this.label = '';
						this.Id = '';
						this.nameEn = '';
						this.$refs.cityInput.value = '';
					}
				}
			}
		},
		labelClicked: function () {
			this.inputFocused();
		},
		checkKeyPressed: function (e) {
			const evt = e || (e || null);
			if (evt.keyCode === 9) {
				evt.preventDefault();
			}
		},
		tabkey: function (e) {
			const evt = e || (e || null);
			if (evt.keyCode === 9) {
				this.$refs.cityList.firstOfList();
			}
		},
		focusInput: function () {
			this.$refs.cityInput.focus();
			this.inputFocused();
		},
		itemSelected: function (item, doNotEmit) {
			this.selectedCity = item;
			this.id = item.Id;
			this.nameEn = item.NameEn;
			this.label = item.NameFa;
			this.$refs.cityInput.blur();
			this.focused = false;
		},
		sth: function () {
			this.focused = false;
			this.$refs.cityInput.value = this.label;
		},
		async searchForCities(val) {
			if (val !== '') {
				await ResortStore.of(this.$store).searchForCity(val);
				this.selectedList = this.searchedCity;
			} else {
				this.selectedList = this.lists;
			}
		}
	}
};
</script>

<style scoped>
.city-input {
  font-weight: 500;
  font-size: 16px;
  color: #444444;
  border: none;
  outline: none;
  width: 100%;
  background: none;
}
.city-input::placeholder {
	font-size: 16px;
	line-height: 25px;
	text-align: right;
	color: #999999;
	line-height: 60px;
	font-weight: 400
}
.location-icon {
	margin-right: 20px;
    margin-left: 10px;
}
.city-name {
	position: absolute;
	z-index: 4;
}
.desktop-empty-item {
	margin-left: 16px;
	cursor: pointer;
	align-self: center;
	padding: 5px
}
.desktop-empty-item img {
	width: 10px;
}
.desktop-empty-item:hover {
	background: #D9D9D9;
	border-radius: 50%;
}
@media (min-width: 576px) and (max-width: 767.98px) {
  .city-name {
    top: 0;
    height: 100%;
    position: fixed;
    right: 0;
    width: 100%;
    background: #ffffff;
    z-index: 2;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center
  }
}
@media /*(min-width: 320px) and*/ (max-width: 575.98px) {
	input[type="text"]:disabled {
		color: #444444 !important;
		-webkit-appearance: none;
	}
	.city-name {
		top: 0;
		height: 100%;
		position: fixed;
		right: 0;
		width: 100%;
		background: #ffffff;
		z-index: 2;
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: center
	}
	.desktop-empty-item {
		display: none;
	}
}
@media (max-width: 767.98px) {
  .origin-and-destination-input {
      margin: 0 !important;
      /* width: auto !important; */
      font-weight: 200;
  }
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}
.resort-province {
	font-size: 12px;
    color: #848484;
}
</style>
