<template>
	<div>
		<div v-if="loaded" class="title-alert">
			<img src="~assets/images/alert-icon.svg" alt="alert"><span>نمایش کمترین قیمت پیشنهادی فروشندگان برای اتاق با ظرفیت مدنظر </span>
		</div>
		<div v-else class="d-flex">
			<div class="title-alert-skeleton" />
		</div>
		<div ref="searchBadge" class="search-badge row" :class="[loaded ? 'wide' : 'w-100', loaded && !arrowRightShow ? 'right-scroll-end': '', loaded && !arrowLeftShow ? 'left-scroll-end': '']">
			<div style="max-width: 700px; display: flex;" :style="[!loaded ? { 'max-width': 'unset !important' } : {}]">
				<div v-if="shownCount > 0 && loaded" class="search-badge-count">
					{{ shownCount }} نتیجه
				</div>
				<div v-if="loaded" class="w-100 d-flex">
					<div
						v-for="(option, index) in categoriesList"
						ref="option"
						:key="index"
						class="search-badge__option"
						:class="{'selected': selectedCategories.includes(option)}"
						@click="addCategory(option)"
					>
						{{ option }}
					</div>
				</div>
				<div v-for="(index) in 7" v-else :key="index" class="search-badge__option search-badge-skeleton" />
			</div>
			<button v-show="totalOptionWidth > totalBadgeWidth && arrowLeftShow" class="arrow-left-btn" @click="slideToLeft()">
				<img src="~assets/images/slider-arrow-left.svg" alt="arrow-left">
			</button>
			<button v-show="arrowRightShow" class="arrow-right-btn" @click="slideToRight()">
				<img src="~assets/images/slider-arrow-right.svg" alt="arrow-right">
			</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import HotelStore from '~/store/Hotel';
export default {
	name: 'HotelSearchBadge',
	props: {
		shownCount: Number,
		loaded: Boolean
	},
	data: function () {
		return {
			totalOptionWidth: 0,
			totalBadgeWidth: 0,
			arrowRightShow: false,
			optionLimitation: 10,
			arrowLeftShow: true,
			categories: []
		};
	},
	computed: {
		...mapGetters('Hotel', ['categoriesList']),
		...mapState('Hotel', ['selectedCategories'])
	},
	updated() {
		let count = 0;
		this.$refs.option && this.$refs.option.forEach((el) => {
			count += el.offsetWidth;
		});
		this.totalOptionWidth = count;
		this.totalBadgeWidth = this.$refs.searchBadge.offsetWidth;
	},
	methods: {
		...mapMutations('Hotel', ['setSelectedCategories']),
		addCategory: function (option) {
			this.setSelectedCategories(option);
		},
		slideToLeft: function () {
			this.arrowRightShow = true;
			this.$refs.searchBadge.scrollLeft -= 250;
			if (this.totalBadgeWidth - this.$refs.searchBadge.scrollWidth >= (this.$refs.searchBadge.scrollLeft - 50)) {
				this.arrowLeftShow = false;
			} else {
				this.arrowLeftShow = true;
			}
		},
		slideToRight: function () {
			this.arrowLeftShow = true;
			this.$refs.searchBadge.scrollLeft += 250;
			if (this.$refs.searchBadge.scrollLeft > this.$refs.searchBadge.scrollWidth - this.$refs.searchBadge.offsetWidth - 250) {
				this.arrowRightShow = false;
			}
		}
	},
	watch: {
		selectedCategories(newValue, oldValue) {
			HotelStore.of(this.$store).filterHotels();
		}
	}

};
</script>

<style scoped>
	.wide {
		width: 89.5% !important;
	}
	.title-alert {
		display: none;
	}
	.search-badge-count  {
		display: none;
		padding: 10px 15px;
        font-weight: 600;
        font-size: 13px;
        margin: 0 5px;
        cursor: pointer;
        margin-bottom: 10px;
        border: 1px solid #CCCCCC;
        background: #E8E8E8;
		color: #808080;
        border-radius: 23px;
	}
    .search-badge {
		display: block;
		overflow-x: hidden;
		scroll-behavior: smooth;
		white-space: nowrap;
		max-width: 1000px;
		width: 89%;
		margin: 0 auto;
    }
    .search-badge__option {
        padding: 10px 15px;
        font-weight: 500;
        font-size: 13px;
        margin: 0 2.5px;
        cursor: pointer;
        margin-bottom: 10px;
        border: 1px solid #CCCCCC;
        background-color: white;
        color: #666666;
        border-radius: 23px;
    }
	.search-badge__option:last-child {
		margin-left: 0px;
		margin-right: 0px;
	}
    .selected {
        background: #E1F7FA;
		border: 1px solid #1899A7;
		box-sizing: border-box;
		border-radius: 23px;
		font-weight: 600;
		font-size: 13px;
		line-height: 20px;
		text-align: right;
		color: #1899A7;
    }
	.arrow-left-btn {
		background: #FFFFFF;
		border: 1px solid #CCCCCC;
		box-sizing: border-box;
		border-radius: 23px;
		width: 41px;
		height: 41px;
		position: absolute;
		outline: none;
		left: 0;
		top: 0;
	}
	.arrow-right-btn {
		background: #FFFFFF;
		border: 1px solid #CCCCCC;
		box-sizing: border-box;
		border-radius: 23px;
		width: 41px;
		height: 41px;
		position: absolute;
		outline: none;
		right: 0;
		top: 0;
	}
	.right-scroll-end {
		width: 94.5% !important;
		margin-right: 0px !important;
	}
	.left-scroll-end {
		width: 94.5% !important;
		margin-left: 0px !important;
	}
	@media screen and (min-width: 767.98px) {
		.title-alert-skeleton {
			display: none !important
		}
	}
    @media screen and (max-width: 767.98px) {
		.title-alert {
			display: block;
			font-style: normal;
			font-weight: 300;
			font-size: 11.5px;
			line-height: 20px;
			color: #B3B3B3;
			text-align: right;
			margin-bottom: 11px;
			margin-top: 0px;
		}
		.title-alert img  {
			margin-right: 7px;
		}
		.title-alert span {
			margin-right: 10px;
		}
		.search-badge {
			overflow-x: scroll;
			width: 100%!important;
			margin-bottom: 5px;
		}
		.arrow-left-btn, .arrow-right-btn {
			display: none;
		}
		.search-badge::-webkit-scrollbar {
			display: none; /* Chrome Safari */
		}
		.search-badge-count  {
			display: block;
			margin: 0 2px;
		}
		.search-badge__option {
			margin: 0 2px;
			font-weight: 500 !important;
		}
        .search-badge .search-badge__option:first-child {
            margin-right: 0px !important;
        }
        .search-badge .search-badge__option:last-child {
            margin-left: 0px !important;
		}
		.right-scroll-end {
			width: 100% !important
		}
    }
    .search-badge::-webkit-scrollbar {
        background: rgb(231, 231, 231);
        height: 7px;
        border-radius: 100px;
    }

    .search-badge::-webkit-scrollbar-thumb {
        background-color: rgb(206, 206, 206);
        border-radius: 100px;
    }
    .search-badge::-webkit-scrollbar-thumb:hover{
        background-color: rgb(90, 90, 90);
    }
	@keyframes shimmer {
		100% {
			transform: translateX(-100%);
		}
	}
	.search-badge-skeleton {
		width: calc(100% / 6);
		height: 41px;
		display: inline-block;
		position: relative;
		vertical-align: middle;
		overflow: hidden;
		background-color: #E8E8E8;
		border: none !important
	}
	.search-badge-skeleton::after {
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
	@media only screen and (max-width: 767.98px) {
		.search-badge-skeleton {
			width: 80px !important;
			padding: 0px 60px;
		}
	}
	.title-alert-skeleton {
		width: 75%;
		height: 20px;
		border-radius: 20px;
		display: inline-block;
		position: relative;
		vertical-align: middle;
		overflow: hidden;
		background-color: #E8E8E8;
		border: none !important;
		margin-bottom: 15px;
		margin-left: auto
	}
	.title-alert-skeleton::after {
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
	@media screen and (max-width: 360px) {
		.title-alert {
		font-size: 10.5px
		}
	}
</style>
