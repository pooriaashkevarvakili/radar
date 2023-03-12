<template>
	<div class="flight">
		<div
			:id="'hotel' + accommodationId"
			class="row sellers-card justify-content-between"
			:class="{'sellers-card-details-open': detailsOpen }"
			@click.self="toggleDetails(2)"
		>
			<div
				v-show="images && images.length != 0"
				id="hotel-imgs"
				class="hotel-imgs d-flex justify-content-center"
				@click="toggleDetails(2)"
			>
				<div
					v-for="(image, imageIndex) in (images? images.slice(0,3) : [])"
					:key="imageIndex"
					class="hotel-img"
				>
					<transition name="fade">
						<div
							v-if="imageIndex == currentImage"
							class="slider-image"
						>
							<img v-show="isLoaded" class="loading-image" alt="loading image" :src="image['URL240x178'] || image.URL" @load="checkImageLoading">
							<img v-show="!isLoaded" alt="blur loaded" src="~assets/images/blur-loading-image.png">
						</div>
					</transition>
				</div>
				<div
					class="image-slider-prev image-slider-nav d-desktop"
					@click="nextImage($event)"
				>
					<svg
						class="img-slider__left-icon"
						width="8"
						height="14"
						viewBox="0 0 8 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M7.01758 13.7617L7.60352 13.2051C7.7207 13.0586 7.7207 12.8242 7.60352 12.707L2.30078 7.375L7.60352 2.07227C7.7207 1.95508 7.7207 1.7207 7.60352 1.57422L7.01758 1.01758C6.87109 0.871094 6.66602 0.871094 6.51953 1.01758L0.367188 7.14062C0.25 7.28711 0.25 7.49219 0.367188 7.63867L6.51953 13.7617C6.66602 13.9082 6.87109 13.9082 7.01758 13.7617Z" fill="white" />
					</svg>
				</div>
				<div
					class="image-slider-next image-slider-nav d-desktop"
					@click="previousImage($event)"
				>
					<svg
						width="8"
						height="14"
						viewBox="0 0 8 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="img-slider__right-icon"
					>
						<path d="M0.953125 1.01758L0.367188 1.57422C0.25 1.7207 0.25 1.95508 0.367188 2.07227L5.66992 7.375L0.367188 12.707C0.25 12.8242 0.25 13.0586 0.367188 13.2051L0.953125 13.7617C1.09961 13.9082 1.30469 13.9082 1.45117 13.7617L7.60352 7.63867C7.7207 7.49219 7.7207 7.28711 7.60352 7.14062L1.45117 1.01758C1.30469 0.871094 1.09961 0.871094 0.953125 1.01758Z" fill="white" />
					</svg>
				</div>
				<div class="hotel-img-bullet-container" @click.stop>
					<div v-if="images && images.length != 0">
						<div class="d-flex">
							<div v-for="(index,i) in images.slice(0,3).length" :key="i" class="slider-img-bullet" :class="[i == currentImage ? 'current-slider-img-bullet' : '' ]" />
						</div>
					</div>
				</div>
			</div>
			<div
				v-show="!images || images.length == 0"
				class="hotel-default-img"
				style="position: absolute"
				@click="toggleDetails(2)"
			/>
			<div
				class="card-style d-flex flex-column justify-content-between"
			>
				<div
					class="align-items-start d-flex justify-content-between place-style w-100 flex-column h-100"
					@click="toggleDetails(1)"
				>
					<div
						class="box d-flex flex-column justify-content-between w-100"
					>
						<div class="hotel-name">
							<div class="d-flex flex-column" @click.stop="toggleDetails(4)">
								<span>
									<slot name="name" />
									<span class="d-desktop"> <slot name="id" /> </span>
								</span>
								<div class="d-none d-mobile">
									<svg
										v-for="i in accommodationType && accommodationType.Stars"
										:key="i"
										width="12"
										height="12"
										viewBox="0 0 12 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M5.56445 0.761719L4.16797 3.61914L1.00977 4.07031C0.451172 4.15625 0.236328 4.84375 0.644531 5.25195L2.90039 7.46484L2.36328 10.5801C2.27734 11.1387 2.87891 11.5684 3.37305 11.3105L6.1875 9.82812L8.98047 11.3105C9.47461 11.5684 10.0762 11.1387 9.99023 10.5801L9.45312 7.46484L11.709 5.25195C12.1172 4.84375 11.9023 4.15625 11.3438 4.07031L8.20703 3.61914L6.78906 0.761719C6.55273 0.267578 5.82227 0.246094 5.56445 0.761719Z" fill="#FFCD4F" />
									</svg>
								</div>
							</div>
							<div class="rate-box pt-1 flex-wrap" @click.stop="toggleDetails(3)">
								<div class="d-desktop">
									<div style="float: right">
										<div
											class="card-rate-text"
											:style="{ color: accommodationRateLevel && accommodationRateLevel.Level == 0? '#B8C7DC!important': '#4466AA','padding-top':accommodationRateLevel && accommodationRateLevel.Level == 0? '5px': '0'}"
										>
											{{ accommodationRateLevel && accommodationRateLevel.Level ? (accommodationRateLevel.Level == 0 ? "بدون نظر" : accommodationRateLevel && accommodationRateLevel.Caption) : accommodationAverageRate && accommodationAverageRate.toFixed(1) }}
										</div>
										<div class="card-rate-number">
											{{
												accommodationCommentsCount && accommodationCommentsCount != 0
													? accommodationCommentsCount + " نظر"
													: ""
											}}
										</div>
									</div>
									<div class="card-rate-box">
										{{
											typeof accommodationAverageRate !== "undefined" &&
												accommodationAverageRate != null
												? +accommodationAverageRate.toFixed(1)
												: "-"
										}}
									</div>
								</div>
								<div class="d-none d-mobile">
									<div class="d-mobile__rate-box">
										{{
											typeof accommodationAverageRate !== "undefined" &&
												accommodationAverageRate != null
												? +accommodationAverageRate.toFixed(1)
												: "-"
										}}/10
									</div>
									<div class="d-mobile__comments-count">
										{{
											accommodationCommentsCount && accommodationCommentsCount != 0
												? '(' + accommodationCommentsCount + "نظر" + ')'
												: ""
										}}
									</div>
								</div>
							</div>
						</div>
						<div class="d-flex rate-height align-items-md-center" @click.stop="toggleDetails(3)">
							<div class="d-desktop">
								<svg
									v-for="i in accommodationType && accommodationType.Stars"
									:key="i"
									class="hotel-rating"
									width="14"
									height="13"
									viewBox="0 0 14 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M6.57031 0.921875L5.04688 4.03906L1.60156 4.53125C0.992188 4.625 0.757812 5.375 1.20312 5.82031L3.66406 8.23438L3.07812 11.6328C2.98438 12.2422 3.64062 12.7109 4.17969 12.4297L7.25 10.8125L10.2969 12.4297C10.8359 12.7109 11.4922 12.2422 11.3984 11.6328L10.8125 8.23438L13.2734 5.82031C13.7188 5.375 13.4844 4.625 12.875 4.53125L9.45312 4.03906L7.90625 0.921875C7.64844 0.382812 6.85156 0.359375 6.57031 0.921875Z" fill="#FFCD4F" />
								</svg>
							</div>
							<span v-if="accommodationImportantPlace != null" class="rate-height__info" @click.stop="toggleDetails(1)">
								<span v-if="accommodationImportantPlace.Distance">
									({{ Math.round(accommodationImportantPlace.Distance / 1000) }}کیلومتر تا{{ accommodationImportantPlace.Title }})
								</span>
							</span>
							<span v-if="accommodationImportantPlace && Object.keys(accommodationImportantPlace).length === 0" class="rate-height__info" @click.stop="toggleDetails(1)">
								<svg
									data-v-7fdd0691=""
									aria-hidden="true"
									focusable="false"
									data-prefix="fas"
									data-icon="map-marker-alt"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 384 512"
									class="ml-1 svg-inline--fa fa-map-marker-alt fa-w-12"
								><path data-v-7fdd0691="" fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" class="" /></svg>
								{{ accommodationAddress }}
							</span>
						</div>
					</div>
					<slot name="capacity" />
				</div>
				<div class="w-100">
					<hr class="w-100 m-0 d-none d-mobile">
					<div class="d-flex w-100 justify-content-between align-items-center">
						<div class="seller-info-mobile d-none">
							<span v-if="sellersCount">{{ sellersCount }} فروشنده٬ قیمت برای {{ duration }} شب از</span>
							<span v-else>{{ accommodationCheaperSeller && accommodationCheaperSeller.Name }}، هرشب از </span>
							<div class="d-flex align-items-center justify-content-between">
								<span class="seller-info-mobile__price">{{ formatMoney(accommodationCheaperSeller.Price || accommodationCheaperSeller.TotalPrice) }}</span> <span class="seller-info-mobile__currency mx-1">تومان</span> <span class="seller-info-mobile__name" v-if="accommodationCheaperSeller.SellerName">({{ accommodationCheaperSeller.SellerName || '' }})</span>
							</div>
						</div>
						<slot name="show-sellers" />
					</div>
				</div>
				<div class="clearFloat" />
				<div class="d-flex four-cheapest-sellers">
					<a
						v-for="(item, i) in accommodationCheaperSellers"
						:key="i"
						:href="item.SellerURL"
						target="_blank"
						:class="{ 'selected-cheapest-seller': i == 0 }"
						class="cheapest-seller d-flex flex-column ml-2"
						@click="setGoals"
					>
						<span>{{ item.SellerName }}</span>
						<span>{{ formatMoney( item.TotalPrice ) }} ت</span>
					</a>
				</div>
			</div>
			<div class="card-border" @click.stop="toggleDetails(4)">
				<div class="h-100 d-flex flex-column justify-content-start">
					<div class="min-price-days">
						<div class="card-hotel-min-price">
							<div v-if="(showaccommodationDetail && accommodationDetail.Meta && priceLoader && accommodationSeller) || (accommodationMinPrice == 'نامشخص' && accommodationSeller) " class="spinner">
								<div class="bounce1" />
								<div class="bounce2" />
								<div class="bounce3" />
							</div>

							<span v-if="accommodationSeller && (!priceLoader || !showaccommodationDetail) && accommodationMinPrice != 'نامشخص' ">{{ accommodationMinPrice }}
							</span>
							<span class="card-hotel-min-price__currency">تومان</span>
							<span v-if="!accommodationSeller" class="full">ظرفیت تکمیل</span>
						</div>
						<div
							v-if="accommodationSeller && (!priceLoader || !showaccommodationDetail) && accommodationMinPrice != 'نامشخص' "
							class="card-hotel-room-day"
							:style="{ display: duration > 1 ? 'block' : 'none' }"
							@click.stop="toggleDetails(4)"
						>
							(هر شب {{ accommodationCheaperSeller && accommodationCheaperSeller.TotalPrice && formatMoney(accommodationCheaperSeller.TotalPrice / duration) }})
						</div>
					</div>
					<div v-if="accommodationCheaperSeller && accommodationCheaperSeller.SellerName" class="card-seller">
						{{ accommodationCheaperSeller.SellerName }}
					</div>
					<img v-else class="seller-logo" :src="accommodationCheaperSeller.Logo" :alt="accommodationCheaperSeller.Name">
					<slot name="show-sellers-desktop" />
				</div>
			</div>
		</div>
		<div class="hotel-details-mobile" :class="{ 'd-block': detailsOpen }">
			<div class="mobile-top-info d-flex align-items-center">
				<img src="~/assets/images/arrow-right.png" alt="arrow-right" @click.stop="toggleDetails()">
				<div class="d-flex flex-column mobile-top-info__name">
					<h5>{{ accommodationType.Name }} {{ accommodationName }}</h5>
					<div class="text-right">
						<svg
							v-for="i in accommodationType && accommodationType.Stars"
							:key="i"
							width="13"
							height="11"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M5.56445 0.761719L4.16797 3.61914L1.00977 4.07031C0.451172 4.15625 0.236328 4.84375 0.644531 5.25195L2.90039 7.46484L2.36328 10.5801C2.27734 11.1387 2.87891 11.5684 3.37305 11.3105L6.1875 9.82812L8.98047 11.3105C9.47461 11.5684 10.0762 11.1387 9.99023 10.5801L9.45312 7.46484L11.709 5.25195C12.1172 4.84375 11.9023 4.15625 11.3438 4.07031L8.20703 3.61914L6.78906 0.761719C6.55273 0.267578 5.82227 0.246094 5.56445 0.761719Z" fill="#FFCD4F" />
						</svg>
					</div>
				</div>
				<div class="mobile-top-info__price">
					<span>{{ formatMoney(accommodationCheaperSeller.TotalPrice || accommodationCheaperSeller.Price) }}</span>
					<span>تومان</span>
				</div>
			</div>
			<div
				class="card-min-height"
				:class="{ 'card-max-height': detailsOpen }"
			>
				<div v-if="!((showaccommodationDetail && priceLoader) && accommodationSeller)" class="list-seller">
					<div>
						<div v-if="error" class="flight-no-seller">
							<img src="/img/noresult.svg" alt="No Result" class="noSeller">
							<div class="noSeller-text">
								خطایی در بارگیری رخ داد، لطفا مجددا تلاش فرمایید!
							</div>
						</div>
						<div
							v-if="accommodationDetail === null && !error"
							class="radar-loader"
						/>
						<div v-if="accommodationDetail !== null && !error">
							<div class="row-number-of-information">
								<div
									v-if="priceLoader && priceLoader.length"
									class="number-of-people"
									:class="{ 'stand-border': showTab == 4 }"
									@click="setTab(4)"
								>
									لیست فروشندگان
								</div>
								<div
									class="number-of-people"
									:class="{ 'stand-border': showTab == 1 }"
									@click="setTab(1)"
								>
									درباره ‌اقامتگاه
								</div>
								<div
									class="number-of-people"
									:class="{ 'stand-border': showTab == 2 }"
									@click="setTab(2)"
								>
									تصاویر
								</div>
								<div
									class="number-of-people"
									:class="{ 'stand-border': showTab == 3 }"
									@click="setTab(3)"
								>
									امتیاز و نظرات
								</div>
								<div class="mr-auto d-flex align-items-center">
									<nuxt-link v-if="priceLoader && priceLoader.length" class="hotel-radar-page my-1" target="_blank" :to="'/' + cityName + '/' + accommodationDetail.NameEn+'?CheckInDate='+checkInDate()+'&CheckOutDate='+checkOutDate()">
										<img src="~/assets/images/attach.svg" alt="attach icon">صفحه هتل در رادار
									</nuxt-link>
									<span class="close-tab" @click="toggleDetails()">
										<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8.41797 7.75L12.8438 3.36719L13.7461 2.46484C13.875 2.33594 13.875 2.12109 13.7461 1.94922L12.8008 1.00391C12.6289 0.875 12.4141 0.875 12.2852 1.00391L7 6.33203L1.67188 1.00391C1.54297 0.875 1.32812 0.875 1.15625 1.00391L0.210938 1.94922C0.0820312 2.12109 0.0820312 2.33594 0.210938 2.46484L5.53906 7.75L0.210938 13.0781C0.0820312 13.207 0.0820312 13.4219 0.210938 13.5938L1.15625 14.5391C1.32812 14.668 1.54297 14.668 1.67188 14.5391L7 9.21094L11.3828 13.6367L12.2852 14.5391C12.4141 14.668 12.6289 14.668 12.8008 14.5391L13.7461 13.5938C13.875 13.4219 13.875 13.207 13.7461 13.0781L8.41797 7.75Z" fill="#858585" />
										</svg>
									</span>
								</div>
							</div>
							<div v-if="showTab == 4" class="information-tab">
								<slot name="sellers" />
							</div>

							<div v-if="showTab == 1" class="row options-row">
								<about-hotel :hotel-details="accommodationDetail" :amenities="accommodationAmmenities" />
							</div>
							<div
								v-if="showTab == 3"
								class="information-tab"
								:class="{ '': !showMoreComments }"
							>
								<div class="d-flex justify-content-between mb-2 align-items-center my-3">
									<div class="d-flex">
										<div class="hotel-average-rate d-flex justify-content-center align-items-center" :style="{'background' : accommodationAverageRate > 5 || accommodationAverageRate == 5 ? '#1899a7' : '#EB384D' }">
											{{ accommodationAverageRate }}
										</div>
										<div class="comments-number mr-1 d-flex flex-column">
											<span class="hotel-average-text">{{ accommodationRateLevel && accommodationRateLevel.Level == 0 ? "بدون نظر" : accommodationRateLevel && accommodationRateLevel.Caption }}</span>
											<div>
												<span> از بین</span>
												<span>{{ accommodationCommentsCount }}</span>
												<span> نظر</span>
											</div>
										</div>
									</div>
									<div v-if="accommodationDetail.CommentDetails && accommodationDetail.CommentDetails.Details" class="d-none d-mobile w-50">
										<span v-for="(item, i) in accommodationDetail.CommentDetails.Details ? accommodationDetail.CommentDetails.Details : '' " :key="i" class="cheapest-seller-mobile">
											{{ item.Provider }}  ({{ item.AverageRate }}/۱۰)
										</span>
									</div>
									<div v-if="accommodationDetail.CommentDetails && accommodationDetail.CommentDetails.Details" class="d-flex ml-3 d-desktop">
										<div v-for="(item, i) in accommodationDetail.CommentDetails.Details ? accommodationDetail.CommentDetails.Details : '' " :key="i" class="cheapest-seller-rate">
											<span>{{ item.AverageRate }}</span>
											<span>{{ item.Provider }}</span>
										</div>
									</div>
								</div>
								<hr>
								<div v-for="(comment, index) in slicedAccommodationComments" :key="index" class="d-desktop">
									<comment
										:comment="comment"
									/>
									<hr class="mx-2">
								</div>
								<div v-for="(comment, i) in accommodationComments" :key="'comment' + i" class="d-mobile d-none">
									<comment
										:comment="comment"
									/>
									<hr class="mx-2">
								</div>
								<div class="desktop-pagination">
									<pagination v-if="commentsTotalPage > 1" :page-count="commentsTotalPage" @loadMoreComments="loadMoreComments" :forcePage="forcePage"/>
								</div>
								<div v-if="commentsTotalPage > 1" class="mobile-pagination d-none text-center">
									<button class="btn" @click="loadMoreComments(page + 1)">
										نظرات بیشتر
									</button>
								</div>
							</div>
							<div v-if="showTab == 2" class="row options-row">
								<hotel-images :images-count="accommodationDetail.ImagesCount" :images="accommodationDetail.Images || images" :hotel-name="accommodationDetail.NameEn" :hotel-name-fa="accommodationName" :hotel-type="accommodationType.Name" :city-name-fa="cityNameFa" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import HotelImages from '~/components/hotel/HotelImages.vue';
import Comment from '~/components/hotel/Comment.vue';
import aboutHotel from '~/components/hotel/AboutHotel.vue';
import Pagination from '~/components/layouts/pagination.vue';
const moment = require('moment-jalaali');
export default Vue.extend({
	components: {
		Comment,
		aboutHotel,
		HotelImages,
		Pagination
	},
	props: {
		detailsOpen: {
			type: Boolean,
			default: false
		},
		images: {
			type: Array,
			default() {
				return [];
			}
		},
		accommodationName: {
			type: String,
			default() {
				return '';
			}
		},
		accommodationType: {
			type: Object,
			default() {
				return {};
			}
		},
		accommodationRateLevel: {
			type: Object,
			default() {
				return {};
			}
		},
		accommodationCommentsCount: {
			type: Number,
			default() {
				return 0;
			}
		},
		accommodationAverageRate: {
			type: Number,
			default() {
				return 0;
			}
		},
		accommodationImportantPlace: {
			type: Object,
			default() {
				return {};
			}
		},
		accommodationAddress: {
			type: String,
			default() {
				return '';
			}
		},
		priceLoader: {
			type: Array,
			default() {
				return [];
			}
		},
		accommodationSeller: {
			type: Object,
			default() {
				return {};
			}
		},
		accommodationMinPrice: {
			type: String,
			default: ''
		},
		accommodationCheaperSeller: {
			type: Object,
			default() {
				return {};
			}
		},
		error: {
			type: Boolean,
			default: false
		},
		duration: {
			type: Number,
			default: 0
		},
		accommodationDetail: {
			type: Object,
			default() {
				return {};
			}
		},
		accommodationAmmenities: {
			type: Array,
			default() {
				return [];
			}
		},
		accommodationComments: {
			type: Array,
			default() {
				return [];
			}
		},
		accommodationCheaperSellers: {
			type: Array,
			default() {
				return [];
			}
		},
		accommodationId: {
			type: Number,
			default: 0
		},
		showTab: {
			type: Number,
			default: 1
		},
		cityNameFa: {
			type: String,
			default: ''
		},
		sellersCount: {
			type: Number,
			default: 0
		},
		cityName: {
			type: String,
			default: ''
		},
		commentsTotalPage: {
			type: Number,
			default: 1
		}
	},
	data() {
		return new class {
            currentImage: number = 1;
            isLoaded: boolean = false;
            showaccommodationDetail: boolean = false;
            showMoreComments: boolean = false;
			page: number = 1;
			forcePage: number = 1;
		}();
	},
	computed: {
		slicedAccommodationComments(): any {
			return this.commentsTotalPage > 1 ? this.accommodationComments.slice((this.page * 6) - 6, (this.page * 6) - 1) : this.accommodationComments;
		}
	},
	methods: {
		setTab(val: number) {
			this.$emit('setTab', val);
		},
		toggleDetails(tab: number) {
			this.$emit('toggleDetails', tab);
		},
		checkImageLoading: function () {
			this.isLoaded = true;
		},
		previousImage: function (e: any) {
			e.stopPropagation();
			if (this.currentImage === 0) {
				this.currentImage = this.images.slice(0, 3).length - 1;
			} else {
				this.currentImage--;
			}
		},
		nextImage: function (e: any) {
			e.stopPropagation();
			if (this.currentImage === this.images.slice(0, 3).length - 1) {
				this.currentImage = 0;
			} else {
				this.currentImage++;
			}
		},
		setGoals() {
			this.$emit('setGoals');
		},
		loadMoreComments(pageNumber: number) {
			this.forcePage = pageNumber;
			this.$emit('loadMoreComments', pageNumber);
			this.page = pageNumber;
		},
		checkInDate(){
			if(this.$route.query.CheckInDate == undefined){
				const checkInDate =moment().format('jYYYY-jMM-jDD');
				return checkInDate;
			}
			return this.$route.query.CheckInDate;
		},
		checkOutDate(){
			if(this.$route.query.CheckOutDate == undefined){
				const checkOutDate =moment().add(1, 'day').format('jYYYY-jMM-jDD');
				return checkOutDate;
			}
			return this.$route.query.CheckOutDate;
		}
	}
});
</script>
<style scoped>
@import url('~/assets/css/accommodation.css');
</style>
