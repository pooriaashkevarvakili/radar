<template>
	<div>
		<div>
			<div class="row-number-of-people">
				<div>
					<div class="seller-list-container">
						<div class="seller-list-header justify-content-between d-flex align-items-center">
							لیست اتاق ها
						</div>
						<div class="seller-list-head">
							<div v-for="(item, index) in showAllRooms ? rooms : rooms.slice(0,3) " :key="index" class="seller-list-item d-flex justify-content-between align-items-center">
								<div class="title">
									<span>{{ item.Title + ' ' + item.Capacity + ' ' + ' نفره' }} </span>
									<span v-if="item.ExtraCapacity"> {{ item.ExtraCapacity }}</span>
								</div>
								<div class="d-flex align-items-center">
									<div class="d-flex align-items-center mx-4">
										<div class="d-flex flex-column">
											<span class="sale-price"> {{ formatMoney(item.Price.SalePrice) }} </span>
											<span class="price-to-pay">{{ formatMoney(item.Price.PriceToPay) }}</span>
										</div>
										<span class="discount-percent mr-2">{{ item.Price.DiscountPercent }} درصد تخفیف</span>
									</div>
									<a :href="`${environment}/${hotel.NameEn}/payment?type=PreSale&roomsId=${item.RoomId}`" class="reserve-btn d-flex justify-content-around align-items-center"><span>رزرو</span> <font-awesome-icon :icon="['fas', 'arrow-left']" class="fa-style"/></a>
								</div>
							</div>
							<div class="more">
								<button v-if="rooms.length > 3 && !showAllRooms" class="more-seller d-flex justify-content-center" @click="addMoreRoom">
									<span class="d-flex align-items-center"><font-awesome-icon :icon="['fas', 'chevron-down']" class="ml-1 fa-style" /> {{ rooms.length - 3 }} اتاق دیگر </span>
								</button>
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
	name: 'SellerList',
	props: {
		rooms: Array,
		hotel: Object
	},
	data() {
		return {
			showAllRooms: false
		};
	},
	computed: {
		environment() {
			return process.env.VUE_APP_DBOOKING;
		}
	},

	methods: {
		addMoreRoom() {
			this.showAllRooms = true;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sale-price {
    text-decoration: line-through;
    color: #a3a3a3;
    font-size: 13px;
}
.price-to-pay {
    font-size: 13px;
    font-weight: 600;
}
.discount-percent {
    font-size: 11px;
    background: #189AA7;
    color: white;
    border-radius: 20px;
    padding: 2px 5px;
}
.seller-list-container {
    margin: 20px 0;
    margin: 18px 10px;
    box-sizing: border-box;
    border-radius: 7px;
}
.seller-list-header {
    background: #F5FCFC;
    border-bottom:  1px solid #C3D7D9 !important;
    border: 1px solid #ADD5D9;
    border-radius: 10px 10px 0px 0px;
    height: 45px;
    padding: 0px 15px;
    position: relative;
    font-size: 14px;
    font-weight: 600;
}

.seller-title {
    height: 60px;
    display: inline-flex;
    width: 40%;
    /* width: calc(100% - 277px); */
}

.seller-bold {
    font-weight: 600!important;
}
.seller-list-head {
    border: 1px solid #ADD5D9;
    border-radius: 0px 0px 10px 10px;
    border-top: 0px;
}
.seller-list-item:not(:last-child) {
    border-bottom: 1px solid #E9F0F2
}
.seller-list-item {
    padding: 5px 15px;
}
.seller-list-item .title {
    font-size: 13px;
}
.reserve-btn {
    display: block;
    background: #EB384D;
    border-radius: 100px;
    border: none;
    width: 75px;
    height: 30px;
    color: #fff !important;
    font-weight: 600;
    float: left;
    outline: none;
    cursor: pointer;
    font-size: 13px;
}
.more {
    height: 15px;
    background: #F5FCFC;
    border-radius: 15px -1px 0px 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
}

.more-seller {
    font-weight: 600;
    font-size: 12px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #235B61;
    background: white;
    position: relative;
    top: -1px;
    height: 20px;
    border: 1px solid #C3D6D9;
    box-sizing: border-box;
    border-radius: 0px 0px 10px 10px;
    border-top: none;
    width: 120px;
    outline: none;
    padding: 0px
}
.more-seller::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: white;
    top: -1px;
    right: 0;
}
.more-seller span {
    position: relative;
    top: -4px;
}

.more-seller img {
    width: 13px;
    height: 7px;
    margin-right: 5px;
}
</style>
