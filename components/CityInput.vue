<template>
	<div v-click-outside="close">
		<div class="text-right d-flex cursor-pointer" @click="labelClicked">
			<img src="~assets/images/location-icon.svg" class="mb-1 location-icon" alt="location-icon">
			<input
				ref="cityInput"
				v-model="label"
				type="text"
				:placeholder="title"
				class="city-input cursor-pointer"
				:disabled="readOnly"
				@focus.prevent="inputFocused"
				@blur="inputBlur"
				@keydown="checkKeyPressed($event)"
				@keyup.tab="tabkey"
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
				:show-history="true"
				class="city-name"
				:input-title="title"
				:lists="lists"
				:history-list="historyList"
				:error="error"
				@itemSelected="itemSelected"
				@closeCityList="sth"
			>
				<template #default="{item}">
					<slot :item="item" />
				</template>
			</city-list>
		</transition>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { faSearch, faHotel } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import CityList from './CityList.vue';
library.add(faSearch, faHotel);
export default {
	name: 'CityInput',
	components: { CityList },
	directives: {
		ClickOutside
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
			mobileSize: 768
		};
	},
	computed: {
		selectedLabel: function () {
			if (!this.id) return '';
			let searchedId;
			if (this.id.split('/').length > 1) {
				searchedId = this.id.split('/')[0] + '/' + this.id.split('/')[1].replace(/\s/g, '-');
			} else {
				searchedId = this.id;
			}
			for (let i = 0; i < this.lists.length; i++) {
				for (let j = 0; j < this.lists[i].list.length; j++) {
					if (
						this.lists[i].list[j].id &&
            this.lists[i].list[j].id.toLowerCase() === searchedId.toLowerCase()
					) {
						return this.lists[i].list[j].label;
					}
				}
			}
			return '';
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
			if (!val) {
				this.label = this.selectedLabel;
			}
			this.$refs.cityList.shown = val;
		},
		selectedLabel: function (val) {
			if (typeof val !== 'undefined') this.label = val;
		},
		id: function (newVal, oldVal) {
			if (newVal !== '' && oldVal === '') {
				this.$emit('checkInpputIsEmptiy', false);
			}
		}
	},
	mounted() {
		if (this.selectedDestination) {
			this.id = this.selectedDestination;
		}
	},
	methods: {
		close: function () {
			this.focused = false;
		},
		itemSelected: function (item, doNotEmit) {
			this.id = item.id;
			this.label = item.label;
			this.$refs.cityInput.blur();
			this.focused = false;
			if (!doNotEmit) {
				this.$emit('setValue');
			}
		},
		removeSelectedItem() {
			this.id = '';
			this.label = 'item.label';
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
				if (this.$refs.filter) {
					this.id = this.$route.params.origin;
				}
				this.$refs.cityInput.value = this.label;
			}
		},
		labelClicked: function () {
			if (this.$parent.internalDisabled) {
				this.$parent.internalDisabled = false;
				const that = this;
				setTimeout(function () {
					that.$refs.cityInput.focus();
				}, 100);
			}
			this.inputFocused();
		},
		sth: function () {
			this.focused = false;
			this.$refs.cityInput.value = this.label;
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
</style>
