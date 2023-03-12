<template>
	<div style="margin: 20px" :class="[ {'single-hotel': singleHotel} ]">
		<div class="d-flex">
			<div class="d-flex flex-column">
				<client-only>
					<radialProgressBar
						:diameter="50"
						:completed-steps="comment.Rate"
						inner-stroke-color=" #EEEEEE"
						start-color="#1899A7"
						stop-color="#1899A7"
						:stroke-width="4.5"
						:total-steps="10"
					>
						<p class="m-0 comment-rate-text">
							{{ comment.Rate }}
						</p>
					</radialProgressBar>
				</client-only>
				<div class="date-resource d-flex flex-column d-desktop text-right">
					<span>{{ comment.Name }}</span> {{ date ? calcDate(date) : 'بدون تاریخ' }}
				</div>

				<img v-if="imagePath" alt="provider logo" :src="imagePath" class="d-none d-mobile mobile-size-provider">
			</div>
			<div class="mx-3" :class="[ {'complete-text': !longText || (longText && moreText) } , 'comment-text' ]">
				<div class="user-comment mb-3 overflow-hidden">
					{{ comment.Description }}
					<span
						v-if="!moreText && longText"
						class="show-comment"
						@click="addMoreText"
					>ادامه<font-awesome-icon :icon="['fas', 'chevron-down']" class="fa-style"/></span>
				</div>
			</div>
			<div class="date-resource d-flex align-items-end mr-auto align-items-end d-desktop">
				<span>جمع آوری شده از</span>
				<img v-if="comment.Logo || imagePath" :src="comment.Logo || imagePath" alt="provider">
			</div>
		</div>
		<span class="d-none d-mobile mobile-date-and-user">- <span>{{ comment.Name }}</span> ( {{ date ? calcDate(date) : 'بدون تاریح' }} )</span>
	</div>
</template>
<script>
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import VCalendar from 'v-calendar';
import radialProgressBar from 'vue-radial-progress';
library.add(faChevronDown);
export default {
	name: 'Comment',
	components: {
		radialProgressBar
	},
	props: {
		comment: {
			type: Object,
			default: function () {
				return {};
			}
		},
		singleHotel: Boolean
	},
	data: function () {
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
			moreText: false,
			providerArray: [
				{ nameFa: 'هتلیار', nameEn: 'hotelyar' },
				{ nameFa: 'هتلیار', nameEn: 'snapp' },
				{ nameFa: 'هتلیار', nameEn: 'jainjas' },
				{ nameFa: 'هتلیار', nameEn: 'jabama' },
				{ nameFa: 'هتلیار', nameEn: 'eghamat' },
				{ nameFa: 'هتلیار', nameEn: 'iranhotel' },
				{ nameFa: 'هتلیار', nameEn: 'egardesh' }
			],
			longText: false
		};
	},
	computed: {
		date: function () {
			const Jdate = new VCalendar.JDate(this.comment.Date);
			const month = Jdate.getMonth() + 1;
			return (
				Jdate.getFullYear() + '/' + month + '/' + Jdate.getDate()
			);
		},
		imagePath: function () {
			return this.comment.SourceId ? require('~/assets/images/hotel-provider/' + this.comment.SourceId + '.svg') : '';
		}
	},
	methods: {
		addMoreText: function () {
			this.moreText = true;
		},
		calcDate: function (val) {
			const date = new Date(val);
			return `
      ${date.getDate()}
      ${this.monthes[date.getMonth()]}
      ${date.getFullYear()}
      `;
		}
	}
};
</script>

<style scoped>
.date-resource {
  font-size: 13px;
  color: #A6A6A6;
}
.date-resource span {
  width: 83px;
  font-size: 12px;
}
.date-resource img {
  width: 50px;
  margin-bottom: 2px;
  margin-right: 7px;
}
.user-comment {
  font-size: 14px;
  color: #656565;
  text-align: justify;
  line-height: 27px;
  position: relative;
}
.user-comment::after{
  content: "...";
  color: #000;
  text-align: right;
  position: absolute;
  background: white;
  left: 0px;
  width: 100px;
  top: 132px;
}
@media (max-width: 468px) {
  .date-resource .name {
    display: none;
  }
}
.comment-text {
  margin-left: 0px !important;
  max-height: 167px;
  overflow: hidden;
}
@media (min-width: 767.98px) {
  .mobile-rate {
    display: none !important;
  }
}
.show-comment {
  cursor: pointer;
  position: absolute;
  left: 35px;
  top: 132px;
  color: #A6A6A6;
  z-index: 2;
  font-size: 14px;
  font-weight: 600;
}
.complete-text {
  max-height: 10000000px !important
}
.complete-text .user-comment::after{
  display: none
}
@media (max-width: 767.98px) {
  .d-mobile {
    display: block !important
  }
  .d-desktop {
    display: none !important
  }
  .user-comment {
    font-size: 12.5px;
    line-height: 25px;
    text-align: right;
    color: #656565;
  }
  .show-comment {
    font-size: 12px;
    line-height: 14px;
    text-align: right;
    color: #1899A7;
    left: 58px;
    top: 180px;
  }
  .comment-text {
    max-height: 205px
  }
  .user-comment::after {
    width: 120px;
    top: 174px;
    left: -10px;
  }
}
.mobile-size-provider {
  width: 40px;
  margin-top: 16px
}
.mobile-date-and-user {
  margin-right: 56px;
  font-size: 11px;
  line-height: 17px;
  text-align: right;
  color: #BBBBBB;
}
.single-hotel {
  padding: 0px 15px
}
.comment-rate-text {
  font-weight: 600;
  font-size: 20px;
  color: #1899A7;
}
</style>
