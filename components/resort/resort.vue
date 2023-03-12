<template>
	<accommodationBox
		:details-open="detailsOpen"
		:images="resortDetail.Images"
		:accommodation-name="resortDetail.NameFa"
		:accommodation-type="resortDetail.Type"
		:accommodation-average-rate="resortDetail.AverageRate"
		:accommodation-address="`استان ${ resortDetail.ProvinceName }، ${ resortDetail.CityName }`"
		:accommodation-cheaper-seller="resortDetail.Seller"
		:accommodation-seller="resortDetail.Seller"
		:accommodation-min-price="resortDetail &&resortDetail.Seller && formatMoney(resortDetail.Seller.TotalPrice)"
		:duration="duration"
		:accommodation-detail="resortDetail.Detail"
		:accommodation-ammenities="resortDetail.Amenities"
		:accommodation-comments="resortDetail.Detail && resortDetail.Detail.Comments ? resortDetail.Detail.Comments : []"
		:accommodation-comments-count="resortDetail.Detail && resortDetail.CommentsCount ? resortDetail.CommentsCount : 0"
		:accommodation-id="resortDetail.Id"
		:show-tab="showTab"
		:city-name-fa="resortDetail.CityName"
		:error="false"
		@toggleDetails="toggleDetails"
		@setTab="setTab"
	>
		<template v-slot:capacity>
			<div class="d-flex align-items-end resort-box__body__capacity-wrapper w-100">
				<div class="resort-box__body__capacity" @click.stop="toggleDetails(3)">
					<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.75 5.25C13.7812 5.25 14.625 4.42969 14.625 3.375C14.625 2.34375 13.7812 1.5 12.75 1.5C11.6953 1.5 10.875 2.34375 10.875 3.375C10.875 4.42969 11.6953 5.25 12.75 5.25ZM12.75 2.625C13.1484 2.625 13.5 2.97656 13.5 3.375C13.5 3.79688 13.1484 4.125 12.75 4.125C12.3281 4.125 12 3.79688 12 3.375C12 2.97656 12.3281 2.625 12.75 2.625ZM2.25 5.25C3.28125 5.25 4.125 4.42969 4.125 3.375C4.125 2.34375 3.28125 1.5 2.25 1.5C1.19531 1.5 0.375 2.34375 0.375 3.375C0.375 4.42969 1.19531 5.25 2.25 5.25ZM2.25 2.625C2.64844 2.625 3 2.97656 3 3.375C3 3.79688 2.64844 4.125 2.25 4.125C1.82812 4.125 1.5 3.79688 1.5 3.375C1.5 2.97656 1.82812 2.625 2.25 2.625ZM11.5312 7.57031C10.875 6.63281 9.63281 6.25781 8.53125 6.60938C8.20312 6.70312 7.85156 6.75 7.47656 6.75C7.125 6.75 6.77344 6.70312 6.44531 6.60938C5.34375 6.25781 4.07812 6.60938 3.44531 7.57031C3.16406 8.01562 2.97656 8.53125 2.97656 9.09375V10.125C2.97656 10.7578 3.49219 11.25 4.10156 11.25H10.8516C11.4844 11.25 11.9766 10.7578 11.9766 10.125V9.09375C12 8.53125 11.8125 8.01562 11.5312 7.57031ZM10.875 10.125H4.125V9.09375C4.125 8.22656 4.80469 7.52344 5.64844 7.5C6.23438 7.75781 6.86719 7.875 7.5 7.875C8.10938 7.875 8.74219 7.75781 9.32812 7.5C10.1719 7.52344 10.875 8.22656 10.875 9.09375V10.125ZM13.0312 6H12.4688C12.0469 6 11.6719 6.14062 11.3672 6.35156C11.6719 6.58594 11.9531 6.86719 12.1641 7.19531C12.2578 7.17188 12.3516 7.125 12.4453 7.125H13.0078C13.4766 7.125 13.8516 7.52344 13.8516 7.96875C13.8516 8.29688 14.1094 8.53125 14.4141 8.53125C14.7422 8.53125 14.9766 8.29688 14.9766 7.96875C15 6.89062 14.1094 6 13.0312 6ZM7.5 6C8.92969 6 10.125 4.82812 10.125 3.375C10.125 1.94531 8.92969 0.75 7.5 0.75C6.04688 0.75 4.875 1.94531 4.875 3.375C4.875 4.82812 6.04688 6 7.5 6ZM7.5 1.875C8.32031 1.875 9 2.55469 9 3.375C9 4.21875 8.32031 4.875 7.5 4.875C6.65625 4.875 6 4.21875 6 3.375C6 2.55469 6.65625 1.875 7.5 1.875ZM3.60938 6.35156C3.30469 6.14062 2.92969 6 2.53125 6H1.96875C0.867188 6 0 6.89062 0 7.96875C0 8.29688 0.234375 8.53125 0.5625 8.53125C0.867188 8.53125 1.125 8.29688 1.125 7.96875C1.125 7.52344 1.5 7.125 1.96875 7.125H2.53125C2.625 7.125 2.71875 7.17188 2.8125 7.19531C3.02344 6.86719 3.30469 6.58594 3.60938 6.35156Z" fill="#23A718" />
					</svg>
					ظرفیت:
					<span v-if="resortDetail.ExraCapacity && resortDetail.Capacity">از</span>
					{{ resortDetail.Capacity ? resortDetail.Capacity : '' }}
					<span v-if="resortDetail.ExraCapacity">تا {{ resortDetail.ExraCapacity + resortDetail.Capacity }}</span>
					نفر
				</div>
				<div v-if="resortDetail.RoomCount" class="resort-box__body__capacity" @click.stop="toggleDetails(3)">
					<svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.875 3.25C1.875 2.85156 2.20312 2.5 2.625 2.5H4.875C5.27344 2.5 5.625 2.85156 5.625 3.25V4H6.375V3.25C6.375 2.85156 6.70312 2.5 7.125 2.5H9.375C9.77344 2.5 10.125 2.85156 10.125 3.25V4H11.25V1C11.25 0.601562 10.8984 0.25 10.5 0.25H1.5C1.07812 0.25 0.75 0.601562 0.75 1V4H1.875V3.25ZM10.5 4.75H1.5C0.65625 4.75 0 5.42969 0 6.25V10.375C0 10.5859 0.164062 10.75 0.375 10.75H0.75C0.9375 10.75 1.125 10.5859 1.125 10.375V9.25H10.875V10.375C10.875 10.5859 11.0391 10.75 11.25 10.75H11.625C11.8125 10.75 12 10.5859 12 10.375V6.25C12 5.42969 11.3203 4.75 10.5 4.75ZM10.875 8.125H1.125V6.25C1.125 6.0625 1.28906 5.875 1.5 5.875H10.5C10.6875 5.875 10.875 6.0625 10.875 6.25V8.125Z" fill="#23A718" />
					</svg>

					{{ resortDetail.RoomCount }}
					اتاق خواب
				</div>
				<span class="resort-box__body__detail" @click.stop="toggleDetails(1)">
					جزییات اقامتگاه
					<svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.53906 4.65625C4.65625 4.77344 4.82031 4.77344 4.9375 4.65625L8.40625 1.21094C8.52344 1.11719 8.52344 0.929686 8.40625 0.812499L7.9375 0.367186C7.84375 0.249999 7.65625 0.249999 7.53906 0.367186L4.75 3.13281L1.9375 0.367187C1.82031 0.25 1.65625 0.25 1.53906 0.367187L1.07031 0.8125C0.953126 0.929688 0.953126 1.11719 1.07031 1.21094L4.53906 4.65625Z" fill="#4D4D4D" />
					</svg>

				</span>
			</div>
		</template>
		<template v-slot:show-sellers>
			<div class="seller-info-mobile d-none">
				<nuxt-link :to="`/resort/singleResort/${resortDetail.Id}`" class="rooms-list mt-auto text-white">
					مشاهده
					<font-awesome-icon class="mr-1 fa-style" :icon="['fas', 'chevron-left']" />
				</nuxt-link>
			</div>
		</template>
		<template v-slot:show-sellers-desktop>
			<div class="seller-info-mobile">
				<nuxt-link :to="`/resort/singleResort/${resortDetail.Id}`" class="rooms-list mt-auto mb-3 text-white">
					مشاهده و رزرو
				</nuxt-link>
			</div>
		</template>
		<template v-slot:id>
			- کد  {{ resortDetail.Id }}
		</template>
		<template v-slot:name>
			{{ resortDetail.NameFa }}
		</template>
	</accommodationBox>
</template>
<script lang="ts">
import Vue from 'vue';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core';
import ResortStore from '~/store/Resort';
import accommodationBox from '~/components/accommodationBox.vue';
const VueScrollTo = require('vue-scrollto');
// library.add(faChevronLeft);
export default Vue.extend({
	components: {
		accommodationBox
	},
	props: {
		resortDetail: {
			type: Object,
			default() {
				return {};
			}
		},
		duration: {
			type: Number,
			default: 1
		}
	},
	data() {
		return new class {
			detailsOpen: boolean = false;
			showTab: number = 0;
			commentsToShow: number = 3;
		}();
	},
	computed: {
		pricePerDate(): number {
			return this.resortDetail.Seller.TotalPrice / this.duration;
		}
	},
	watch: {
		$route: function (to, from) {
			if (from.hash === `#hotel${this.resortDetail.Id}` && to.hash === '') {
				this.detailsOpen = false;
			}
		}
	},
	methods: {
		redirectToReserve(url: string) {
			window.open(url, '_blank');
		},
		setTab(val: number) {
			this.showTab = val;
		},
		async toggleDetails(tab: number) {
			if (window.innerWidth < 768 && tab == null && this.$route.hash === `#hotel${this.resortDetail.Id}`) {
				this.$router.go(-1);
			}
			if (tab === 4) {
				this.detailsOpen = true;
				this.showTab = 1;
			} else {
				if (tab == null) {
					const prevOpen = this.detailsOpen;
					this.detailsOpen = !prevOpen;
				} else if (tab === this.showTab && this.detailsOpen) {
					console.log(tab);
					this.detailsOpen = false;
					if (window.innerWidth < 768) {
						this.$router.go(-1);
					}
				} else {
					if (window.innerWidth > 768) {
						VueScrollTo.scrollTo('#hotel' + this.resortDetail.Id, 1000, { offset: 0 });
					} else {
						this.$router.push({ path: this.$route.fullPath, hash: `#hotel${this.resortDetail.Id}` });
					}
					this.detailsOpen = true;
					this.showTab = tab;
				}
				await ResortStore.of(this.$store).getResidenceDetail(this.resortDetail.Id);
			}
		}
	}
});
</script>
<style scoped>
@import url('~/assets/css/accommodation.css');
.resort-box-wrapper {
	margin-bottom: 10px
}
.resort-box {
    width: 100%;
    height: 180px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    z-index: 2;
    overflow: hidden;
    margin: 0;
}
.resort-images {
    background-size: cover;
    height: 100%;
    width: 240px;
    position: relative;
}
.resort-box__seller {
    background: #fafafa;
    width: 170px;
    border-right: 1px solid #ccc;
    margin-right: 10px;
    margin-right: auto;
    padding: 17px;
}
.resort-box__body {
    width: calc(100% - 420px);
    padding: 15px
}
.rate-box {
  float: left;
}
.card-rate-box {
  background: #F1F9FA;
  border: 1px solid #1899A7;
  border-radius: 5px;
  width: 32px;
  height: 32px;
  color: #1899A7;
  font-size: 15px;
  padding: 5px 0px;
  margin-right: 5px;
  float: left;
  text-align: center;
  font-weight: 200;
}
.card-rate-text {
  color: #1899A7 !important;
  font-size: 11px;
  font-weight: 600;
}
.resort-box__body__name {
    font-size: 17px;
    line-height: 20px;
    text-align: right;
    color: #323232;
}
.resort-box__body__city {
    font-size: 12px;
    line-height: 19px;
    text-align: right;
    color: #999999;
    font-weight: 300;
    margin-top: 7px
}
.resort-box__body__capacity {
    background: #F2FAF1;
    border: 1px solid #23A718;
    border-radius: 5px;
    font-size: 12px;
    line-height: 19px;
    text-align: right;
    color: #23A718;
    font-weight: 500;
    padding: 5px 10px;
	margin-left: 5px
}
.resort-box__body__detail {
    font-size: 10px;
    line-height: 16px;
    text-align: right;
    cursor: pointer;
    margin-right: auto
}
.resort-box__seller__price {
    font-size: 24px;
    line-height: 28px;
    text-align: right;
    color: #1D1D1D;
}
.resort-box__seller__currency {
    font-size: 11px;
    line-height: 13px;
    color: #656565
}
.resort-box__seller__reserve-btn {
    background: #EB384D;
    border-radius: 20px;
    padding: 9px 14px;
    color: #FFFFFF;
    font-size: 13px;
    margin-top: auto;
}
@media (min-width: 767px) {
  .mobile-top-info {
    display: none !important;
  }
}
.mobile-top-info {
  background: #F5F8FA;
  padding: 5px 20px;
  border-bottom: 1px solid #EEEEEE;
  position: fixed;
  z-index: 10;
  width: 100%;
  min-height: 55px;
}
.mobile-top-info h1 {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 0px;
  margin-top: 4px;
}
.detail-card-header {
	background: #FAFAFA;
	border-bottom: 2px solid #EEEEEE;
}
.card-min-height {
	background: #FFFFFF;
	border-radius: 0px 0px 10px 10px;
	position: relative;
	top: -1px;
	overflow: hidden;
	max-height: 0px;
	transition: max-height 0.5s;
}
.card-max-height {
	border: 1px solid #CCCCCC;
	max-height: 10000px !important;
	width: 100%;
	max-height: 10000px !important;
}
.sellers-card-details-open {
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
}
.not-found-img {
	object-fit: cover;
}
::v-deep .seller-logo {
	max-width: 100px;
	margin: auto;
	margin-top: 11px;
}
.price-per-date {
	font-size: 10px;
	line-height: 12px;
	text-align: right;
	color: #808080;
	margin-top: 10px;
}
@media (max-width: 767px) {
	::v-deep .hotel-name {
		white-space: unset;
		text-overflow: unset;
	}
	.resort-detail-mobile {
		background: white;
		display: none;
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 1003;
		overflow: auto;
		border-radius: 0;
	}
	.resort-box {
		flex-wrap: wrap;
	}
	.resort-images {
		width: 120px;
	}
	.resort-box__seller {
		display: none !important;
	}
	.resort-box__body {
		width: calc(100% - 120px)
	}
	.resort-box__body__detail {
		display: none;
	}
	.resort-box__body__name {
		font-size: 15px;
		font-weight: 600
	}
	.resort-box__body__city {
		margin-top: 2px;
		font-size: 11px
	}
	.resort-box__body__price-mobile {
		display: flex !important;
		justify-content: space-between;
		border-top: 1px solid #EEEEEE;
		text-align: right;
		padding-top: 8px
	}
	.mobile-price-per-night {
		font-size: 11px;
		color: #4F4F4F;
	}
	.resort-box__seller-mobile {
		color: #EB384D;
		font-size: 18px;
		font-weight: 600;
	}
	.resort-box__currency-mobile {
		font-size: 11px;
		color: #EB384D;
	}
	.resort-box__provider-mobile {
		color: #1D1D1D;
		font-size: 11px
	}
	.resort-box__seller__reserve-btn {
		padding: 6px 10px
	}
	.resort-box__body__capacity {
		border: none;
		font-size: 10px;
		padding: 3px 10px
	}
	.resort-box__body__capacity-wrapper {
		margin-top: auto;
		margin-bottom: 8px
	}
}

</style>
