<template>
	<div id="box-result">
		<div class="flight-filter d-flex justify-content-between align-items-center">
			<div class="flight-sort-options">
				<span class="flight-sort-options__item d-none sort-icon"><img src="~/assets/images/gray-filter.svg" alt="gray filter"></span>
				<span class="flight-sort-options__title d-flex align-items-center justify-content-center"><img class="ml-2" src="~assets/images/menu-bar.png" alt="menu bar">مرتب سازی بر اساس : </span>
				<div class="flight-sort-options__item" :class="{selectedOption: 'cheapest' == flightSortOption}" @click="flightSortTypeSelected('cheapest', 1)">
					ارزانترین قیمت
				</div>
				<div class="flight-sort-options__item" :class="{selectedOption: 'closets' == flightSortOption}" @click="flightSortTypeSelected('closets', 1)">
					نزدیک ترین زمان
				</div>
				<div class="flight-sort-options__item" :class="{selectedOption: 'radarOfferRate' == flightSortOption}" @click="flightSortTypeSelected('radarOfferRate', 1)">
					<svg
						class="ml-1"
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path :fill="['radarOfferRate' == flightSortOption ? '#EB384D': '#656565' ]" d="M6.6875 3.0625L7.09375 2.25L7.90625 1.84375L7.09375 1.4375L6.6875 0.625L6.28125 1.4375L5.46875 1.84375L6.28125 2.25L6.6875 3.0625ZM3.03125 4.6875L3.69141 3.3418L5.0625 2.65625L3.69141 1.99609L3.03125 0.625L2.3457 1.99609L1 2.65625L2.3457 3.3418L3.03125 4.6875ZM11.9688 7.9375L11.2832 9.30859L9.9375 9.96875L11.2832 10.6543L11.9688 12L12.6289 10.6543L14 9.96875L12.6289 9.30859L11.9688 7.9375ZM13.7461 3.03711L11.5879 0.878906C11.4355 0.726562 11.2324 0.625 11.0293 0.625C10.8008 0.625 10.5977 0.726562 10.4453 0.878906L1.22852 10.0957C0.898438 10.4258 0.898438 10.9336 1.22852 11.2383L3.38672 13.3965C3.53906 13.5488 3.74219 13.625 3.94531 13.625C4.17383 13.625 4.37695 13.5488 4.5293 13.3965L13.7461 4.17969C14.0762 3.84961 14.0762 3.3418 13.7461 3.03711ZM10.1152 5.80469L8.82031 4.50977L11.0293 2.30078L12.3242 3.5957L10.1152 5.80469Z" />
					</svg>
					پیشنهاد رادار
				</div>
				<div class="flight-sort-options__item" :class="{selectedOption: 'fastest' == flightSortOption}" @click="flightSortTypeSelected('fastest', 1)">
					سریعترین زمان
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { faAngleDown, faSortAmountDown, faFilter, faDollarSign, faClock } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faAngleDown, faSortAmountDown, faFilter, faDollarSign, faClock);
export default {
	name: 'Share',
	directives: {
		ClickOutside
	},
	props: {
		shownCount: Number,
		totalCount: Number,
		sortOption: String,
		loaded: Boolean,
		flightSortOption: String
	},
	data: function () {
		return {
			showOption: false
		};
	},
	mounted: function () {
		this.$nextTick(function () {
			this.setSortAtfirst();
		});
	},
	methods: {
		setSortAtfirst() {
			this.sortTypeSelected('RadarOfferRate', 1);
			this.flightSortTypeSelected('cheapest', 1);
		},
		sortTypeSelected(type, order) {
			this.$emit('selectedSort', type, order);
		},
		flightSortTypeSelected(type, order) {
			this.$emit('flightSelecetdSort', type, order);
		},
		close() {
			this.showOption = false;
		}
	}

};
</script>
<style scoped>
#box-result {
    width: 100% !important;
    height: unset !important
}
.selectedOption {
    border-bottom: 2px solid #EB384D;
    color: #EB384D;
    font-weight: 600;
}
@media only screen and (max-width: 767.98px) {
    .flight-sort-options__title {
        display: none !important;
    }
    .desktop {
        display: none !important
    }
    .mobile {
        display: block !important;
    }
    #box-result {
        margin-top: 0px;
    }
    .selectedOption {
        border: none  !important;
    }
}
@media only screen and (min-width: 768px) {
    .mobile {
        display: none !important;
    }
    #box-result {
        margin-top: 0;
    }
}
@media only screen and (min-width: 768px) {
    .flight-filter  button{
        display: none;
    }
    .sort-option__skeleton {
        border: none !important;
    }
}
.flight-filter button{
    border: 2px solid #ff536d;
    float: right;
    border-radius: 18px;
    padding: 2px 14px;
    background: transparent;
    font-size: 12px
}
.sort-option-skeleton__title {
    width: 240px !important;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
    background-color: #E8E8E8 !important;
    border-left: none !important;
}
.sort-option-skeleton__title::after {
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
 @keyframes shimmer {
	100% {
		transform: translateX(-100%);
	}
}
@media only screen and (max-width: 768px) {
    .flight-filter {
        flex-direction: column;
    }
    .flight-sort-options {
        margin-top: 0px;
        border-right: 0px !important;
        border-left: 0px !important;
        border-top: 0px !important;
        overflow-x: scroll;
        border-radius: 0px !important;
        width: calc(100% + 10px) !important;
        margin-right: unset !important;
        margin-bottom: 5px !important;
        min-width: 120px;
    }
    .flight-sort-options__item {
        padding: 0px 22px;
        width: unset !important;
        min-width: 120px;
    }
    .sort-icon {
        display: flex !important;
        min-width: unset
    }
    .sort-option-skeleton__title {
        width: 80% !important;
        height: 23px !important;
        border-radius: 20px !important;
    }
    .sort-option__skeleton {
        background: none !important;
        margin:0px 5px;
        display: none !important;
    }
}
.flight-sort-options {
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    display: flex;
    font-size: 13px;
    white-space: nowrap;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 10px;
    height: 52px;
    color: #656565;
    margin-right: auto;
}
.flight-sort-options__title {
    width: 220px;
    background: #FAFAFA;
    height: 100%;
    border-left: 1px solid #CCCCCC;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.flight-sort-options__item {
    width: calc((100% - 220px) / 4);
    text-align: center;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
}
.flight-sort-options__item svg {
    margin-left: 10px
}
.flight-sort-options__item:not(:last-of-type)::after{
    content: ' ';
    position: absolute;
    background: #DDDDDD;
    height: 30px;
    width: 1px;
    left: 0px;
}
.blue-circle {
    background: #15BBCC;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 10px;
}
</style>
