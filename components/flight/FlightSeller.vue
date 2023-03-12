<template>
	<div class="flight-seller">
		<div v-for="(flight, index) in showAllSeller? allClasses : allClasses.slice(0, 8)" :key="index" :class="{'first-seller': index === 0}" class="d-flex seller-card align-items-center justify-content-between">
			<div class="d-flex align-items-center flight-provider">
				<img class="seller-logo" :class="{'seller-without-logo': flight.SellerLogo.includes('NotFound')}" :src="flight.SellerLogo" :alt="flight.SellerName">
				<span class="seller-name">{{ flight.SellerName }}</span>
			</div>
			<div class="capacity">
				<span>ظرفیت: {{ flight.Capacity }} نفر</span>
				<span v-if="flight.IsBusiness" class="business">بیزینس</span>
				<span v-else class="economy">اکونومی</span>
			</div>
			<div class="d-flex align-items-center">
				<span class="price">{{ formatMoneyWithoutRounding(flight.Price) }}  تومان</span>
				<button class="buy-ticket d-flex align-items-center justify-content-between" @click="linkToSeller(flight.BuyLink)">
					<span class="mx-auto">خرید بلیط</span>
					<font-awesome-icon v-if="index === 0" :icon="['fas', 'arrow-left']" class="fa-style"/>
				</button>
			</div>
		</div>
		<div v-if="allClasses.length > 8 " class="show-all-seller d-flex align-items-center justify-content-center" @click="showAllSeller = !showAllSeller">
			<span v-if="!showAllSeller">نمایش تمام فروشندگان</span>
			<span v-else>بستن</span>
			<span class="mr-1 mt-1">
				<font-awesome-icon v-if="!showAllSeller" :icon="['fas', 'chevron-down']" class="fa-style"/>
				<font-awesome-icon v-else :icon="['fas', 'chevron-up']" class="fa-style"/>
			</span>
		</div>
	</div>
</template>
<script>
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faChevronDown, faChevronUp);
export default {
	props: {
		classes: {
			type: Object,
			default: function () {
				return {};
			}
		}
	},
	data() {
		return {
			showAllSeller: false
		};
	},
	computed: {
		allClasses() {
			return this.classes.Business.concat(this.classes.Economy);
		}
	},
	methods: {
		linkToSeller(url) {
			window.open(url, '_blank');
			this.$ga.event('send', {
				eventCategory: 'flight',
				eventAction: 'redirect(OTA)'
			});

		}
	}
};
</script>

<style scoped>
.flight-seller {
	text-align: right;
	padding: 20px 40px
}
.seller-logo {
	width: 50px
}
.seller-card {
	height: 60px;
}
.seller-card:not(:last-child) {
	border-bottom: 1px solid #E6E6E6;
}
.seller-name {
	font-style: normal;
	font-weight: 300;
	font-size: 13px;
	line-height: 19px;
	color: #1D1D1D;
	margin-right: 13px;
}
.buy-ticket {
	border-radius: 17px;
	color: #EB384D;
	background: white;
	min-height: 33px;
	width: 114px;
	padding: 0px 15px;
	font-size: 15px;
	border: 1px solid #EB384D;
}
.buy-ticket:focus {
	outline: none !important;
}
.business {
	background: #FFEAB5;
	border-radius: 5px;
	padding: 3px 6px;
	color: #E6AB19;
	font-size: 12px;
	font-weight: 500;
	margin-right: 13px
}
.economy {
	background: #F1F9FA;
	border-radius: 5px;
	padding: 3px 6px;
	color: #15BBCC;
	font-size: 12px;
	font-weight: 500;
	margin-right: 13px
}
.flight-provider {
	width: 25%
}
.capacity {
	color: #1D1D1D;
	font-size: 13px;
}
.capacity-airplane {
	color: #1D1D1D;
	font-size: 13px;
}
.price {
	font-size: 14px;
	color: #6D6D6D;
	margin-left: 16px
}
.first-seller .buy-ticket {
	background: #EB384D;
	color: white
}
.show-all-seller {
	border-top: 1px solid #C3D7D9;
	font-size: 15px;
	line-height: 18px;
	color: #EB384D;
	padding-top: 16px;
	text-align: center;
	cursor: pointer;
}
.seller-without-logo {
	width: 40px
}
@media only screen and (max-width: 768px) {
	.seller-logo {
		width: 40px
	}
	.seller-without-logo {
		width: 30px
	}
	.seller-name {
		font-size: 12px;
	}
	.seller-card {
		padding: 10px;
		height: 75px
	}
	.buy-ticket {
		font-size: 15px;
		padding: 0px 10px;
		min-height: 35px;
		justify-content: center !important;
		width: unset;
		margin-right: 9px;
	}
	.buy-ticket svg {
		display: none;
	}
	.price {
		margin-left: 0px
	}
	.flight-seller {
		padding: 0px
	}
	.first-seller .price {
		color: #333333;
		font-weight: 600;
	}
	.flight-provider {
        flex-direction: column !important;
	}
	.capacity {
		display: flex;
		flex-direction: column-reverse;
		align-items: baseline;
	}
	.capacity span:first-child {
		font-size: 9px;
		color: #656565;
	}
	.economy {
		margin-right: 0px;
	}

}
</style>
