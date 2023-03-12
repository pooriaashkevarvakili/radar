<template>
	<div>
		<div v-if="RoomTypes && RoomTypes.length == 0">
			<p class="noSeller-text">
				ظرفیت تکمیل می باشد.
			</p>
		</div>
		<div v-if="error" class="flight-no-seller">
			<img src="~/assets/images/noresult.svg" alt="No Result" class="noSeller">
			<div class="noSeller-text">
				فروشنده‌ای پیدا نشد!
			</div>
		</div>
		<div v-if="!RoomTypes && !error" class="hotelDetailsLoader" />
		<div v-if="error" class="flight-no-seller">
			<img src="~/assets/images/noresult.svg" alt="No Result" class="noSeller">
			<div class="noSeller-text">
				{{ errorText }}
			</div>
		</div>
		<div v-if="RoomTypes && !error">
			<div class="row-number-of-people">
				<seller-list-group v-for="(roomGroup, i) in roomsLimited" :key="i" :room-group="roomGroup" :duration="duration" />
				<div class="more">
					<button v-if="RoomTypes.length > 3 && roomGroupLimit" class="more-room" @click="addMoreRoom">
						نمایش تمام اتاق ها<img src="~/assets/images/arrow-bottom.png" alt="arrow">
					</button>
					<button v-if="RoomTypes.length > 3 && !roomGroupLimit" class="more-room d-flex align-items-center justify-content-center m-auto" @click="closeRoom">
						بستن <font-awesome-icon :icon="['fas', 'chevron-up']" class="mr-2 fa-style" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import SellerListGroup from '~/components/hotel/SellerListGroup.vue';
library.add(faChevronUp);
export default {
	name: 'SellerList',
	components: {
		SellerListGroup
	},
	props: {
		RoomTypes: Array,
		capacityArray: Array,
		error: Boolean,
		duration: Number,
		errorText: String
	},
	data() {
		return {
			roomsCapacity: 1,
			sellerShow: 4,
			roomGroupLimit: true
		};
	},

	computed: {
		roomsLimited() {
			return window.innerWidth > 768 ? this.RoomTypes.slice(0, this.roomGroupLimit ? 3 : 1000) : this.RoomTypes.slice(0, this.roomGroupLimit ? 6 : 1000);
		}
	},
	methods: {
		addMoreRoom: function () {
			this.roomGroupLimit = false;
		},
		closeRoom: function () {
			this.roomGroupLimit = true;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.more {
    width: 100%;
    text-align: center;
}
.more-seller {
    background: none;
    border: none;
    color: #0094cc;
    font-weight: 900;
    font-size: 12px;
    padding-bottom: 8px;
}
.more-seller img {
    width: 13px;
    height: 7px;
    margin-right: 5px;
}
.more-room {
    background: none;
    border: none;
    color: #EB384D;
    font-weight: 600;
    font-size: 15px;
    outline: none;
    cursor: pointer;
}
.more-room img {
    width: 12px;
    height: 9px;
    margin-right: 5px;
}
.mobile-reserve-btn {
    display: none;
}
.noSeller-text {
text-align: center;
font-weight: 600;
font-size: 18px
}
</style>
