<template>
	<div class="filter-container">
		<div id="filter-title" class="d-flex justify-content-between">
			<label>{{ filterTitle }}<div class="counter">{{ filterLength }}</div></label>
			<img src="~assets/images/angle-down.svg" alt="angle-down">
		</div>
		<div class="container airlines-container">
			<div v-for="(filter, index) in filterOptions.slice(0, itemCount)" :key="index" class="d-flex justify-content-between">
				<div class="d-flex align-items-center">
					<input v-model="selectedFilter" type="checkbox" :value="filter" @click="scrollToTop">
					<slot :options="filter">
						<div class="airlines-name"> {{ filter.Name || filter.NameFa }} </div>
					</slot>
				</div>
				<div class="airplanes-price" @click="updateFilter(filter)">
					<span class="title">{{ filter.Count || ( filter.MinPrice && "از" + formatMoney(filter.MinPrice)) || filter.label }}</span>
				</div>
			</div>
		</div>
		<div v-if="filterLength > 6" class="see-more d-flex justify-content-center align-items-center">
			<div v-show="itemCount == 6 && filterLength > 6" @click="itemCount = filterLength">
				<font-awesome-icon :icon="['fas', 'chevron-down']" class="see-more__icon fa-style" />
				<span>مشاهده بیشتر </span>
			</div>
			<div v-show="itemCount != 6 && filterLength > 6" @click="itemCount = 6">
				<font-awesome-icon :icon="['fas', 'chevron-up']" class="see-more__icon fa-style" />
				<span>مشاهده کمتر</span>
			</div>
		</div>
	</div>
</template>
<script>
const VueScrollTo = require('vue-scrollto');
export default {
	props: {
		filterTitle: {
			type: String,
			default: ''
		},
		filterLength: {
			type: Number,
			default: 0
		},
		filterOptions: {
			type: Array,
			default() {
				return [];
			}
		},
		selectedFilterOprtion: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			itemCount: 6
		};
	},
	computed: {
		selectedFilter: {
			get() {
				return this.selectedFilterOprtion;
			},
			set(val) {
				this.$emit('setSelectedFilter', val);
			}
		}
	},
	methods: {
		updateFilter() {
			this.$emit('updateFilter');
		},
		scrollToTop() {
			if (window && window.innerWidth > 768) {
				VueScrollTo.scrollTo('body', 1000, { offset: 200 });
			}
		}
	}
};
</script>
<style scoped>
@import url('~/assets/css/filters.css');
</style>
