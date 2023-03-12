<template>
	<div id="box-filter" :class="{ 'box-filter-open': filtersOpen }">
		<div v-if="!resortLoading" class="flight-box-result-text">
			<img src="~assets/images/search-result-icon.svg" alt="search-result"><span>{{ filteredResortsCount }} نتیجه برای جستجوی شما پیدا شد.</span>
		</div>
		<div v-else class="mt-3 flight-box-result-text result-count-placeholder" />
		<div class="filter-title filter-title-mobile d-none align-items-center">
			<img src="~assets/images/right-arrow.svg" alt="right-arrow" @click="close">
			<div class="filter-tiltle-apply-filter">
				اعمال فیتر
			</div>
			<div class="filter-tiltle-clear-history mr-auto" @click="clearFilters">
				پاک‌سازی
			</div>
		</div>
		<div v-if="resortLoading" class="d-flex flex-column">
			<div class="filter-skeleton" />
			<div class="filter-skeleton" />
			<div class="filter-skeleton" />
			<div class="filter-skeleton" />
		</div>
		<div>
			<div ref="price" class="filter-container">
				<div id="filter-title" class="d-flex justify-content-between first-filter-title">
					<label>هزینه</label>
					<img src="~assets/images/angle-down.svg" alt="angle-down">
				</div>
				<div class="box">
					<div class="capacity">
						<div :class="{ 'item-active': capacityItem == 1 }" class="item first-item" @click="capacityItem = 1, setCapacity(1)">
							<img src="~assets/images/user-icon.svg" alt="user"><span v-if="capacityItem == 1">یک نفر</span>
						</div>
						<div :class="{ 'item-active': capacityItem == 2 }" class="item second-item" @click="capacityItem = 2, setCapacity(2)">
							<img src="~assets/images/two-user-icon.svg" alt="user"><span v-if="capacityItem == 2">دو نفر</span>
						</div>
						<div :class="{ 'item-active': capacityItem == 'all' }" class="item third-item" @click="capacityItem = 'all', setCapacity('all')">
							<img src="~assets/images/users-icon.svg" alt="user"><span v-if="capacityItem == 'all'">همه</span>
						</div>
					</div>
					<div class="d-flex align-items-end flex-row-reverse histogram-wrapper">
						<div
							v-for="(i, index) in resortCountArray"
							:key="index"
							class="histogram"
							:class="{'active-bar': i.start >= sliderValue[0] && i.end <= sliderValue[1]}"
							:style="{ 'height': `calc((100% / ${maximumHotels}) * ${i.count})`}"
						/>
					</div>
					<div class="range-slider">
						<div class="rage-slider-shadow">
							<div class="first-dot" /><div class="second-dot" />
						</div>
						<vue-slider v-model="sliderValue" :min="metaMinPrice" :max="metaMaxPrice" :tooltip="'none'" />
					</div>
					<div class="row justify-content-between price mb-0">
						<div id="max-price">
							{{ formatMoney(sliderValue[1]) }} ت
						</div>
						<div id="min-price">
							{{ formatMoney(sliderValue[0]) }} ت
						</div>
					</div>
					<div class="select-duration-box">
						<div :class="{ 'item-active': activeDuration == 1 }" class="item first-item" @click="durationFilter()">
							کل اقامت
						</div>
						<div :class="{ 'item-active': activeDuration == 2 } " class="item second-item" @click="durationFilter(1)">
							هر شب اقامت
						</div>
					</div>
				</div>
			</div>
			<filter-box
				filter-title="نوع اقامتگاه"
				:filter-length="Types && Types.length"
				:filter-options="Types"
				:selected-filter-oprtion="selectedTypes"
				@setSelectedFilter="setSelectedTypes"
			/>
			<filter-box
				filter-title="امکانات"
				:filter-length="Aminities && Aminities.length"
				:filter-options="Aminities"
				:selected-filter-oprtion="selectedAminities"
				@setSelectedFilter="setSelectedAminities"
			/>
			<filter-box
				filter-title="امتیاز"
				:filter-length="5"
				:filter-options="hotelScore"
				:selected-filter-oprtion="selectedFilter"
				@setSelectedFilter="setSelectedFilter"
			/>
		</div>
		<div class="apply-filters" @click="close">
			<button>
				اعمال فیلترها
			</button>
		</div>
	</div>
	</div>
</template>

<script>
import FilterBox from '~/components/filter.vue';
import ResortStore from '~/store/Resort';
export default {
	components: {
		FilterBox
	},
	props: {
		duration: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			hotelScore: [
				{
					Name: 'محشر',
					max: 10,
					min: 9,
					label: 'بالای ۹ امتیاز'
				},
				{
					Name: 'فوق العاده',
					max: 9,
					min: 8,
					label: '۸ تا ۹ امتیاز'
				},
				{
					Name: 'پسندیدنی',
					max: 8,
					min: 6,
					label: '۶ تا ۸ امتیاز'
				},
				{
					Name: 'معمولی',
					max: 6,
					min: 4,
					label: '۴ تا ۶ امتیاز'
				},
				{
					Name: 'ضعیف',
					max: 4,
					min: 0,
					label: 'پایین ۴ امتیاز'
				}
			],
			selectedFilter: [],
			filtersOpen: false,
			selectedAminities: [],
			selectedTypes: [],
			activeDuration: 1
		};
	},
	computed: {
		Aminities() {
			return ResortStore.of(this.$store).state.cityMeta.Amenities;
		},
		metaMinPrice() {
			return ResortStore.of(this.$store).state.minPrice;
		},
		metaMaxPrice() {
			return ResortStore.of(this.$store).state.maxPrice;
		},
		Types() {
			return ResortStore.of(this.$store).state.cityMeta.Types;
		},
		capacityItem() {
			return this.$route.query.capacity;
		},
		sliderValue: {
			get() {
				return [ResortStore.of(this.$store).state.selectedMinPrice, ResortStore.of(this.$store).state.selectedMaxPrice];
			},
			set(value) {
				const payload = [value[0], value[1]];
				ResortStore.of(this.$store).selectedPriceFilter(payload);
				ResortStore.of(this.$store).filterResort();
			}
		},
		resortCountArray() {
			return ResortStore.of(this.$store).resortCountArray;
		},
		maximumHotels() {
			return this.resortCountArray.length && this.resortCountArray.reduce((prev, curr) => prev.count > curr.count ? prev : curr).count;
		},
		resortLoading() {
			return ResortStore.of(this.$store).state.resortLoading;
		},
		filteredResortsCount() {
			return ResortStore.of(this.$store).state.filteredResortsList.length;
		}
	},
	watch: {
		Types(val) {
			if (this.$route.query.Types && val) {
				const Types = this.$route.query.Types.split(',');
				const arr = Types.map((i) => { return this.Types && this.Types.find(j => j.Name === i); });
				this.setSelectedTypes(arr);
			}
		},
		Aminities: function (val) {
			if (this.$route.query.Aminities && val) {
				const amenities = this.$route.query.Aminities.split(',');
				const arr = amenities.map((i) => { return this.Aminities && this.Aminities.find(j => j.Name === i); });
				this.setSelectedAminities(arr);
			}
		},
		$route: function (to, from) {
			if (from.hash === '#filter' && to.hash === '') {
				this.filtersOpen = false;
			}
		}
	},
	mounted() {
		if (this.$route.query.scores) {
			const scores = this.$route.query.scores.split(',');
			const selectedFilterList = scores.map((i) => { return this.hotelScore.find(score => score.Name === i); });
			this.setSelectedFilter(selectedFilterList);
		}
		this.$nextTick(() => {
			if (this.$route.query.Aminities && this.Aminities) {
				const Aminities = this.$route.query.Aminities.split(',');
				const selectedAminitiesList = Aminities.map((i) => { return this.Aminities && this.Aminities.find(aminity => aminity.Name === i); });
				this.setSelectedAminities(selectedAminitiesList);
			}
			if (this.$route.query.metaMinPrice && this.$route.query.metaMaxPrice) {
				const prices = [parseInt(this.$route.query.metaMinPrice), parseInt(this.$route.query.metaMaxPrice)];
				ResortStore.of(this.$store).selectedPriceFilter(prices);
			} else {
				ResortStore.of(this.$store).selectedPriceFilter([this.metaMinPrice, this.metaMaxPrice]);
			}
		});
	},
	methods: {
		setSelectedFilter(val) {
			this.selectedFilter = val;
			ResortStore.of(this.$store).selectedScoreFilter(this.selectedFilter);
			ResortStore.of(this.$store).filterResort();
		},
		setSelectedAminities(val) {
			this.selectedAminities = val;
			ResortStore.of(this.$store).selectedAminitiesFilter(this.selectedAminities);
			ResortStore.of(this.$store).filterResort();
		},
		setSelectedTypes(val) {
			this.selectedTypes = val;
			ResortStore.of(this.$store).selectedTypesFilter(this.selectedTypes);
			ResortStore.of(this.$store).filterResort();
		},
		filterButtonClicked() {
			this.$router.push({ path: this.$route.fullPath, hash: '#filter' });
			this.filtersOpen = true;
		},
		close() {
			this.filtersOpen = false;
		},
		clearFilters() {
			const query = Object.assign({}, this.$route.query);
			delete query.scores;
			delete query.Types;
			delete query.metaMinPrice;
			delete query.metaMaxPrice;
			delete query.Aminities;
			this.$router.replace({ query });
			this.setSelectedFilter([]);
			this.setSelectedAminities([]);
			this.setSelectedTypes([]);
			this.sliderValue = [this.metaMinPrice, this.metaMaxPrice];
		},
		setCapacity: function (val) {
			this.$router.push({ path: this.$router.currentRoute.fullPath, query: { capacity: val } });
		},
		durationFilter(val) {
			if (val === 1) {
				this.activeDuration = 2;
				const prices = [ResortStore.of(this.$store).state.cityMeta.MinPrice / this.duration, ResortStore.of(this.$store).state.cityMeta.MaxPrice / this.duration];
				ResortStore.of(this.$store).metaPrice = prices;
				const payload = prices;
				ResortStore.of(this.$store).selectedPriceFilter(payload);
				ResortStore.of(this.$store).filterResort();
			} else {
				this.activeDuration = 1;
				const prices = [ResortStore.of(this.$store).state.cityMeta.MinPrice, ResortStore.of(this.$store).state.cityMeta.MaxPrice];
				ResortStore.of(this.$store).metaPrice = prices;
				ResortStore.of(this.$store).selectedPriceFilter(prices);
				ResortStore.of(this.$store).filterResort();
			}
		}
	}
};
</script>
<style scoped>
@import url('~/assets/css/filters.css');
#box-filter {
    width: 280px;
    height: 100%;
    text-align: right;
    padding-bottom:20px;
}
.box-filter-open {
    display: block !important;
}
.filter-tiltle-apply-filter {
    font-weight: 600;
    font-size: 17px;
    line-height: 54px;
    text-align: right;
    color: #1d1d1d;
    margin-right: 10px;
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
	display: inline-block
}
.apply-filters {
    padding: 10px;
    display: none;
    cursor: pointer;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #f4f4f4;
    border-top: 1px solid #ddd;
	display: none;
}
.apply-filters button {
    width: 100%;
    height: 50px;
    background: #eb384d;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    border: none;
}
.apply-filters button:focus {
	outline: none;
}
@media (max-width: 767.98px) {
    #box-filter {
        background: white;
        display: none;
        position: fixed;
        top: 0px;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 1002;
        overflow: auto;
        border-radius: 0;
		padding-bottom: 0px
    }
	.filter-title-mobile {
		display: block !important;
		padding: 6px 15px;
		height: 66px;
	}
	.apply-filters {
		display: block;
		padding-top: 12px;
	}
	.flight-box-result-text {
		display: none
	}
}
@media (min-width: 767px) and (max-width: 991.98px) {
    #box-filter {
        width: 240px
    }
}
</style>
