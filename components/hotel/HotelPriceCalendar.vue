<template>
	<div>
		<div class="room-price__wrapper mx-2">
			<div style="max-width: 700px;" class="d-flex">
				<div v-for="(item, index) in priceCalendar" :key="index" class="room-price" :class="[routerDate == convertToJalali(item.Date).jalaliDate ? 'active' : '' ]">
					<div class="room-price__date">
						{{ convertToJalali(item.Date).dayDate }}  {{ convertToJalali(item.Date).month }}
					</div>
					<div class="room-price__day">
						{{ convertToJalali(item.Date).weekDay }}
					</div>
					<div class="room-price__price">
						{{ item.Price ? formatMoney(item.Price) : '' }}
						<span v-if="item.Price"> تومان</span>
						<span v-else> قیمت موجود نیست</span>
					</div>
					<span :class="[routerDate == convertToJalali(item.Date).jalaliDate ? 'room-price-active__border' : '' ]" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VCalendar from 'v-calendar';
export default {
	name: 'HotelPriceCalendar',
	props: { priceCalendar: Array },
	data() {
		return {
			monthes: [
				'فروردین',
				'اردیبهشت',
				'خرداد',
				'تیر',
				'مرداد',
				'شهریور',
				'مهر',
				'آبان',
				'آذر',
				'دی',
				'بهمن',
				'اسفند'
			],
			weekDays: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']
		};
	},
	computed: {
		routerDate() {
			const date = new Date(this.$route.query.CheckInDate);
			const month = date.getMonth() + 1;
			return date.getFullYear() + ',' + month + ',' + date.getDate();
		}
	},
	methods: {

		convertToJalali(miladiDate) {
			const date = new Date(miladiDate);
			const jDate = new VCalendar.JDate();
			jDate.setGregorianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
			return {
				dayDate: jDate.getDate(),
				weekDay: this.weekDays[date.getDay()],
				month: this.monthes[jDate.getMonth() - 1],
				jalaliDate: jDate
			};
		}
	}
};
</script>
<style scoped>
.room-price {
    height: 100px;
    min-width: 100px;
    cursor: pointer;
    background: #fff;
    border: 1px solid #ededed;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    position: relative;
    justify-content: space-around;
}
.room-price__date {
    font-weight: 600;
    color: #c37a85fa;
}
.room-price__day {
    line-height: 16px;
    color: #a7a7a7;
    font-size: .8rem;
}
.room-price__price {
    font-size: .9em;
    font-weight: 600;
}
.room-price__price span {
    font-size: .7rem;
    color: #a7a7a7;
    line-height: 2.5rem;
}
.active .room-price-active__border {
    background-color: #ff536d;
    height: 2px;
    position: absolute;
    bottom: 0;
    right: -1px;
    left: -1px;
}
.active::after {
    content: "";
    right: -10px;
    background-color: #ff536d;
    height: 20px;
    width: 20px;
    bottom: -10px;
    position: absolute;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.active::before {
    content: "";
    left: -10px;
    background-color: #ff536d;
    height: 20px;
    width: 20px;
    bottom: -10px;
    position: absolute;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.room-price__wrapper {
    display: block;
    /* overflow-x: auto; */
    white-space: nowrap;
    position: relative;
}
@media only screen and (max-width: 500px) {
    .room-price {
        font-size: .8em;
        min-width: 80px;
        height: 80px;
    }
}
</style>
