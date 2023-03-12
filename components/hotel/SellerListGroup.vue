<template>
	<div>
		<div class="seller-list-container">
			<div class="seller-list-header justify-content-between d-flex align-items-center room-list-seller">
				<!-- <div class="room-config">
                    <div v-for="(group, k) in roomTypeGroup" :key="k"  class="bed">
                        <div v-for="(option, j) in group" :key="j" class="box">
                            <span v-if="option.SingleBed != 0" class="single-bed"><label><span class="cross">x</span>{{option.SingleBed}}</label><img class="single" src="~/assets/images/single-bed.png" alt="vector"/></span>
                            <label v-if="option.SingleBed && option.DoubleBed">+</label>
                            <span v-if="option.DoubleBed != 0" class="double-bed"><label><span class="cross">x</span>{{option.DoubleBed}}</label><img class="double" src="~/assets/images/double-bed.png" alt="vector"/></span>
                            <label v-if="group.length > 1 && j < group.length - 1" class="or-clause">یا</label>
                        </div>
                    </div>
                </div> -->
				<div class="room-title">
					<span>{{ roomGroup.Name }}</span>
				</div>
				<div class="room-group-capacity d-flex h-100 align-items-center">
					<!-- <div class="room-group-capacity__extra-bed d-flex room-group-capacity__item">
            <span v-if="roomGroup[0].ExtraCapacity"><font-awesome-icon class="mt-1 ml-1" :icon="['fas', 'check']" /></span>
            <span v-else><font-awesome-icon class="mt-1 ml-1" :icon="['fas', 'times']" /></span>
            تخت اضافه
          </div> -->
					<div class="room-config">
						<div v-for="(group, k) in roomTypeGroup" :key="k" class="bed">
							<div v-for="(option, j) in group" :key="j" class="box">
								<span v-if="option.SingleBed != 0" class="single-bed"><label><span class="cross">x</span>{{ option.SingleBed }}</label>
									<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8.93359 9.0625C8.14062 9.0625 7.78516 9.5 6.5 9.5C5.1875 9.5 4.83203 9.0625 4.03906 9.0625C2.01562 9.0625 0.375 10.7305 0.375 12.7539V13.4375C0.375 14.1758 0.949219 14.75 1.6875 14.75H11.3125C12.0234 14.75 12.625 14.1758 12.625 13.4375V12.7539C12.625 10.7305 10.957 9.0625 8.93359 9.0625ZM11.3125 13.4375H1.6875V12.7539C1.6875 11.4414 2.72656 10.375 4.03906 10.375C4.44922 10.375 5.07812 10.8125 6.5 10.8125C7.89453 10.8125 8.52344 10.375 8.93359 10.375C10.2461 10.375 11.3125 11.4414 11.3125 12.7539V13.4375ZM6.5 8.625C8.66016 8.625 10.4375 6.875 10.4375 4.6875C10.4375 2.52734 8.66016 0.75 6.5 0.75C4.3125 0.75 2.5625 2.52734 2.5625 4.6875C2.5625 6.875 4.3125 8.625 6.5 8.625ZM6.5 2.0625C7.92188 2.0625 9.125 3.26562 9.125 4.6875C9.125 6.13672 7.92188 7.3125 6.5 7.3125C5.05078 7.3125 3.875 6.13672 3.875 4.6875C3.875 3.26562 5.05078 2.0625 6.5 2.0625Z" fill="#1D1D1D" />
									</svg>
								</span>
								<label v-if="option.SingleBed && option.DoubleBed">+</label>
								<span v-if="option.DoubleBed != 0" class="double-bed"><label><span class="cross">x</span>{{ option.DoubleBed }}</label><img class="double" src="~/assets/images/double-bed.png" alt="vector"></span>
								<label v-if="group.length > 1 && j < group.length - 1" class="or-clause">یا</label>
							</div>
						</div>
					</div>
					<div class="room-group-capacity__item h-100  d-flex align-items-center ">
						{{ roomGroup.Capacity }}
						<svg
							class="mr-1"
							width="8"
							height="8"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.29492 7.375L13.9219 2.79297L14.8652 1.84961C15 1.71484 15 1.49023 14.8652 1.31055L13.877 0.322266C13.6973 0.1875 13.4727 0.1875 13.3379 0.322266L7.8125 5.89258L2.24219 0.322266C2.10742 0.1875 1.88281 0.1875 1.70312 0.322266L0.714844 1.31055C0.580078 1.49023 0.580078 1.71484 0.714844 1.84961L6.28516 7.375L0.714844 12.9453C0.580078 13.0801 0.580078 13.3047 0.714844 13.4844L1.70312 14.4727C1.88281 14.6074 2.10742 14.6074 2.24219 14.4727L7.8125 8.90234L12.3945 13.5293L13.3379 14.4727C13.4727 14.6074 13.6973 14.6074 13.877 14.4727L14.8652 13.4844C15 13.3047 15 13.0801 14.8652 12.9453L9.29492 7.375Z" fill="#1D1D1D" />
						</svg>
						<svg
							class="mb-1 mr-1"
							width="13"
							height="15"
							viewBox="0 0 13 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M8.93359 9.0625C8.14062 9.0625 7.78516 9.5 6.5 9.5C5.1875 9.5 4.83203 9.0625 4.03906 9.0625C2.01562 9.0625 0.375 10.7305 0.375 12.7539V13.4375C0.375 14.1758 0.949219 14.75 1.6875 14.75H11.3125C12.0234 14.75 12.625 14.1758 12.625 13.4375V12.7539C12.625 10.7305 10.957 9.0625 8.93359 9.0625ZM11.3125 13.4375H1.6875V12.7539C1.6875 11.4414 2.72656 10.375 4.03906 10.375C4.44922 10.375 5.07812 10.8125 6.5 10.8125C7.89453 10.8125 8.52344 10.375 8.93359 10.375C10.2461 10.375 11.3125 11.4414 11.3125 12.7539V13.4375ZM6.5 8.625C8.66016 8.625 10.4375 6.875 10.4375 4.6875C10.4375 2.52734 8.66016 0.75 6.5 0.75C4.3125 0.75 2.5625 2.52734 2.5625 4.6875C2.5625 6.875 4.3125 8.625 6.5 8.625ZM6.5 2.0625C7.92188 2.0625 9.125 3.26562 9.125 4.6875C9.125 6.13672 7.92188 7.3125 6.5 7.3125C5.05078 7.3125 3.875 6.13672 3.875 4.6875C3.875 3.26562 5.05078 2.0625 6.5 2.0625Z" fill="#1D1D1D" />
						</svg>
					</div>
				</div>
			</div>
			<div class="seller-list-head">
				<div v-for="(seller, i) in aggregateSellers(roomGroup, limit)" :key="i">
					<div v-if="true">
						<div class="seller-list-item">
							<div>
								<div class="row justify-content-between mx-lg-3  mx-2">
									<div class="seller-title" :class="{'seller-complete-title': toggledRoomName.findIndex(item => item === i) > -1}">
										<div class="room-name">
											<h2
												v-tooltip="{
													content: seller.ProviderRoomName,
													placement: 'top',
												}"
												:class="{'seller-bold': i == 0 , 'add-margin': seller.DiningServiceLevel.Title == 'نامشخص'}"
												@click="toggleRoomName(i)"
											>
												{{ seller.ProviderRoomName }}
											</h2>
											<h3 v-if="seller.DiningServiceLevel.Title != 'نامشخص'" :class="{ 'DiningServiceLevel-mobile': i != 0 }">
												<font-awesome-icon :icon="['fas', 'check']" class="check-icon fa-style" />{{ seller.DiningServiceLevel.Title }}
											</h3>
										</div>
									</div>
									<div class="d-flex align-items-center justify-content-end price-row">
										<img
											:alt="seller.Provider.Name"
											class="img-box"
											:src=" seller.Provider.Logo"
										>
										<div class="align-items-end d-flex flex-column justify-content-center show d-desktop">
											<div class="total-price d-flex flex-row-reverse w-100 justify-content-between" :class="{ 'first-price': i == 0 }">
												{{ formatMoney(seller.TotalPrice) }}
												تومان
												<svg
													v-if="!i"
													class="first-seller ml-2"
													width="18"
													height="19"
													viewBox="0 0 18 19"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M18 9.25C18 7.94922 17.1562 6.82422 15.9609 6.36719C16.4883 5.24219 16.2773 3.83594 15.3633 2.88672C14.4141 1.97266 13.0078 1.76172 11.8828 2.28906C11.4258 1.09375 10.3008 0.25 9 0.25C7.66406 0.25 6.53906 1.09375 6.08203 2.28906C4.95703 1.76172 3.55078 1.97266 2.63672 2.88672C1.6875 3.83594 1.47656 5.24219 2.00391 6.36719C0.808594 6.82422 0 7.94922 0 9.25C0 10.5859 0.808594 11.7109 2.00391 12.168C1.47656 13.293 1.6875 14.6992 2.63672 15.6133C3.55078 16.5625 4.95703 16.7734 6.08203 16.2461C6.53906 17.4414 7.66406 18.25 9 18.25C10.3008 18.25 11.4258 17.4414 11.8828 16.2461C13.043 16.7734 14.4141 16.5625 15.3633 15.6133C16.2773 14.6992 16.4883 13.293 15.9609 12.168C17.1562 11.7109 18 10.5859 18 9.25ZM12.9023 7.70312L8.29688 12.2734C8.12109 12.4492 7.875 12.4141 7.73438 12.2734L5.0625 9.60156C4.92188 9.46094 4.92188 9.21484 5.0625 9.03906L5.97656 8.125C6.15234 7.98438 6.39844 7.98438 6.53906 8.16016L8.01562 9.63672L11.4258 6.26172C11.6016 6.08594 11.8477 6.08594 11.9883 6.26172L12.9023 7.17578C13.043 7.31641 13.043 7.5625 12.9023 7.70312Z" fill="#EB384D" />
												</svg>
											</div>
											<div v-if="duration > 1" class="per-day ">
												(هر شب
												{{ formatMoney(seller.TotalPrice / duration) }})
											</div>
										</div>
										<button class="show-price-calendar d-flex" :class="{'mobile-first-seller' : i == 0, 'mb-0 mt-0': duration == 1 }" @click="collapseRoomPrice(i)">
											<svg
												class="d-none"
												:class="{'mobile-first-seller-icon': i == 0}"
												width="15"
												height="18"
												viewBox="0 0 15 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M5.03906 9.6875C5.23828 9.6875 5.4375 9.52148 5.4375 9.28906V7.96094C5.4375 7.76172 5.23828 7.5625 5.03906 7.5625H3.71094C3.47852 7.5625 3.3125 7.76172 3.3125 7.96094V9.28906C3.3125 9.52148 3.47852 9.6875 3.71094 9.6875H5.03906ZM8.625 9.28906V7.96094C8.625 7.76172 8.42578 7.5625 8.22656 7.5625H6.89844C6.66602 7.5625 6.5 7.76172 6.5 7.96094V9.28906C6.5 9.52148 6.66602 9.6875 6.89844 9.6875H8.22656C8.42578 9.6875 8.625 9.52148 8.625 9.28906ZM11.8125 9.28906V7.96094C11.8125 7.76172 11.6133 7.5625 11.4141 7.5625H10.0859C9.85352 7.5625 9.6875 7.76172 9.6875 7.96094V9.28906C9.6875 9.52148 9.85352 9.6875 10.0859 9.6875H11.4141C11.6133 9.6875 11.8125 9.52148 11.8125 9.28906ZM8.625 12.4766V11.1484C8.625 10.9492 8.42578 10.75 8.22656 10.75H6.89844C6.66602 10.75 6.5 10.9492 6.5 11.1484V12.4766C6.5 12.709 6.66602 12.875 6.89844 12.875H8.22656C8.42578 12.875 8.625 12.709 8.625 12.4766ZM5.4375 12.4766V11.1484C5.4375 10.9492 5.23828 10.75 5.03906 10.75H3.71094C3.47852 10.75 3.3125 10.9492 3.3125 11.1484V12.4766C3.3125 12.709 3.47852 12.875 3.71094 12.875H5.03906C5.23828 12.875 5.4375 12.709 5.4375 12.4766ZM11.8125 12.4766V11.1484C11.8125 10.9492 11.6133 10.75 11.4141 10.75H10.0859C9.85352 10.75 9.6875 10.9492 9.6875 11.1484V12.4766C9.6875 12.709 9.85352 12.875 10.0859 12.875H11.4141C11.6133 12.875 11.8125 12.709 11.8125 12.4766ZM15 3.84375C15 2.98047 14.2695 2.25 13.4062 2.25H11.8125V0.523438C11.8125 0.324219 11.6133 0.125 11.4141 0.125H10.0859C9.85352 0.125 9.6875 0.324219 9.6875 0.523438V2.25H5.4375V0.523438C5.4375 0.324219 5.23828 0.125 5.03906 0.125H3.71094C3.47852 0.125 3.3125 0.324219 3.3125 0.523438V2.25H1.71875C0.822266 2.25 0.125 2.98047 0.125 3.84375V15.5312C0.125 16.4277 0.822266 17.125 1.71875 17.125H13.4062C14.2695 17.125 15 16.4277 15 15.5312V3.84375ZM13.4062 15.332C13.4062 15.4648 13.3066 15.5312 13.207 15.5312H1.91797C1.78516 15.5312 1.71875 15.4648 1.71875 15.332V5.4375H13.4062V15.332Z" fill="#EB384D" />
											</svg>
											<svg
												:class="{'mobile-not-first-seller-icon': i == 0}"
												width="14"
												height="17"
												viewBox="0 0 14 17"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M12.5 2.9856H11V1.3606C11 1.1731 10.8125 0.985596 10.625 0.985596H10.375C10.1562 0.985596 10 1.1731 10 1.3606V2.9856H4V1.3606C4 1.1731 3.8125 0.985596 3.625 0.985596H3.375C3.15625 0.985596 3 1.1731 3 1.3606V2.9856H1.5C0.65625 2.9856 0 3.6731 0 4.4856V15.4856C0 16.3293 0.65625 16.9856 1.5 16.9856H12.5C13.3125 16.9856 14 16.3293 14 15.4856V4.4856C14 3.6731 13.3125 2.9856 12.5 2.9856ZM1.5 3.9856H12.5C12.75 3.9856 13 4.2356 13 4.4856V5.9856H1V4.4856C1 4.2356 1.21875 3.9856 1.5 3.9856ZM12.5 15.9856H1.5C1.21875 15.9856 1 15.7668 1 15.4856V6.9856H13V15.4856C13 15.7668 12.75 15.9856 12.5 15.9856ZM4.625 10.9856C4.8125 10.9856 5 10.8293 5 10.6106V9.3606C5 9.1731 4.8125 8.9856 4.625 8.9856H3.375C3.15625 8.9856 3 9.1731 3 9.3606V10.6106C3 10.8293 3.15625 10.9856 3.375 10.9856H4.625ZM7.625 10.9856C7.8125 10.9856 8 10.8293 8 10.6106V9.3606C8 9.1731 7.8125 8.9856 7.625 8.9856H6.375C6.15625 8.9856 6 9.1731 6 9.3606V10.6106C6 10.8293 6.15625 10.9856 6.375 10.9856H7.625ZM10.625 10.9856C10.8125 10.9856 11 10.8293 11 10.6106V9.3606C11 9.1731 10.8125 8.9856 10.625 8.9856H9.375C9.15625 8.9856 9 9.1731 9 9.3606V10.6106C9 10.8293 9.15625 10.9856 9.375 10.9856H10.625ZM7.625 13.9856C7.8125 13.9856 8 13.8293 8 13.6106V12.3606C8 12.1731 7.8125 11.9856 7.625 11.9856H6.375C6.15625 11.9856 6 12.1731 6 12.3606V13.6106C6 13.8293 6.15625 13.9856 6.375 13.9856H7.625ZM4.625 13.9856C4.8125 13.9856 5 13.8293 5 13.6106V12.3606C5 12.1731 4.8125 11.9856 4.625 11.9856H3.375C3.15625 11.9856 3 12.1731 3 12.3606V13.6106C3 13.8293 3.15625 13.9856 3.375 13.9856H4.625ZM10.625 13.9856C10.8125 13.9856 11 13.8293 11 13.6106V12.3606C11 12.1731 10.8125 11.9856 10.625 11.9856H9.375C9.15625 11.9856 9 12.1731 9 12.3606V13.6106C9 13.8293 9.15625 13.9856 9.375 13.9856H10.625Z" fill="#6D6D6D" />
											</svg>
										</button>
										<img v-if="!i" src="~/assets/images/red-check.png" alt="red checkmark" class="mobile-first-seller d-none">

										<div class="d-flex  flex-row justify-content-end seller-price align-items-start">
											<button :class="{ hollow: i > 0 }" class="reserve-btn d-flex justify-content-around align-items-center" @click="reserve(seller.Provider.WebSite, seller.TotalPrice)">
												<span>رزرو</span> <font-awesome-icon :icon="['fas', 'arrow-left']" class="fa-style"/>
											</button>
											<a :href="seller.Provider.WebSite" target="_blank" rel="noreferrer">
												<button class="mobile-reserve-btn" :class="[{ 'hollow': i > 0 }, { 'long-price': seller.TotalPrice && seller.TotalPrice.toString().length > 6}]">
													<span>{{ formatMoney(seller.TotalPrice) }}</span>
													<svg
														v-if="i == 0 "
														width="15"
														height="14"
														viewBox="0 0 15 14"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M8.15625 13.8125L8.78125 13.2188C8.9375 13.0625 8.9375 12.8125 8.78125 12.6875L3.9375 7.8125H14.625C14.8125 7.8125 15 7.65625 15 7.4375V6.5625C15 6.375 14.8125 6.1875 14.625 6.1875H3.9375L8.78125 1.34375C8.9375 1.21875 8.9375 0.96875 8.78125 0.8125L8.15625 0.21875C8.03125 0.0625 7.78125 0.0625 7.625 0.21875L1.09375 6.75C0.9375 6.90625 0.9375 7.125 1.09375 7.28125L7.625 13.8125C7.78125 13.9688 8.03125 13.9688 8.15625 13.8125Z" fill="white" />
													</svg>
													<svg
														v-else
														width="13"
														height="13"
														viewBox="0 0 13 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M6.63672 12.7109L7.18359 12.1914C7.32031 12.0547 7.32031 11.8359 7.18359 11.7266L2.94531 7.46094H12.2969C12.4609 7.46094 12.625 7.32422 12.625 7.13281V6.36719C12.625 6.20312 12.4609 6.03906 12.2969 6.03906H2.94531L7.18359 1.80078C7.32031 1.69141 7.32031 1.47266 7.18359 1.33594L6.63672 0.816406C6.52734 0.679688 6.30859 0.679688 6.17188 0.816406L0.457031 6.53125C0.320312 6.66797 0.320312 6.85938 0.457031 6.99609L6.17188 12.7109C6.30859 12.8477 6.52734 12.8477 6.63672 12.7109Z" fill="#6D6D6D" />
													</svg>
												</button>
											</a>

											<div v-if="duration > 1" class="mobile-per-day text-center">
												(هر شب {{ formatMoney(seller.TotalPrice /
													duration) }})
											</div>
										</div>
									</div>
								</div>
								<hotel-price-calendar v-if="seller.PriceCalendar.length" class="price-calendar-list" :class="[roomPriceShowState.includes(i) ? 'active-price-calendar-list' : '' ]" :price-calendar="seller.PriceCalendar" />
							</div>
						</div>
					</div>

					<hr v-show="i !== aggregateSellers(roomGroup, limit).length - 1">
				</div>
				<div class="more">
					<button v-if="aggregateSellers(roomGroup, false).length > 3 && limit" class="more-seller d-flex justify-content-center" @click="addMoreSeller">
						<span><font-awesome-icon :icon="['fas', 'chevron-down']" class="fa-style" /> {{ aggregateSellers(roomGroup, false).length - 3 }} فروشنده دیگر </span>
					</button>
					<button v-if="aggregateSellers(roomGroup, false).length > 3 && !limit" class="more-seller d-flex justify-content-center" @click="hideMoreSellers">
						<span><font-awesome-icon :icon="['fas', 'chevron-up']" class="ml-1 fa-style" />بستن</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { faArrowLeft, faChevronDown, faTimes, faCheck, faUser, faBed, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Axios from 'axios';
import VueTooltip from 'v-tooltip';
import Vue from 'vue';
import HotelPriceCalendar from '~/components/hotel/HotelPriceCalendar';
library.add(faArrowLeft, faChevronDown, faTimes, faCheck, faUser, faBed, faChevronUp);
Vue.use(VueTooltip);
VueTooltip.options.defaultTemplate = '<div class="tooltip-vue" role="tooltip"><div class="tooltip-vue-arrow"></div><div class="tooltip-vue-inner"></div></div>';
VueTooltip.options.defaultArrowSelector = '.tooltip-vue-arrow, .tooltip-vue__arrow';
VueTooltip.options.defaultInnerSelector = '.tooltip-vue-inner, .tooltip-vue__inner';
export default {

	name: 'SellerListGroup',
	components: { HotelPriceCalendar },
	props: {
		roomGroup: Object,
		duration: Number
	},
	data() {
		return {
			limit: true,
			priceArray: [],
			roomPriceShowState: [],
			toggledRoomName: []
		};
	},
	computed: {
		roomTypeGroup: function () {
			if (this.roomGroup[0] && this.roomGroup[0].RoomConfigs && this.roomGroup[0].RoomConfigs.length !== 0) {
				const arr = this.roomGroup[0];
				const res = [];
				for (let i = 0; i < arr.length; i++) {
					if (!res[arr[i].GroupId]) {
						res[arr[i].GroupId] = [];
					}
					res[arr[i].GroupId].push(this.roomGroup[0].RoomConfigs[i]);
				}
				return res;
			}
			return null;
		},
		maximumPrice() {
			const res = this.priceArray;
			return res.sort((a, b) => a - b).reverse()[0];
		}
	},
	mounted() {
		this.roomGroup.Sellers.map((i) => {
			this.priceArray.push(i.TotalPrice);
		});
	},
	methods: {
		toggleRoomName(id) {
			const index = this.toggledRoomName.findIndex(item => item === id);
			if (index > -1) {
				this.toggledRoomName.splice(index, 1);
			} else {
				this.toggledRoomName.push(id);
			}
		},
		aggregateSellers(roomGroup, limit) {
			return roomGroup.Sellers.slice(0, limit ? 3 : 1000);
		},
		addMoreSeller() {
			this.limit = false;
		},
		hideMoreSellers() {
			this.limit = true;
		},
		reserve(url, price) {
			const priceInfo = {
				ClickedPrice: price,
				MaximumPrice: this.maximumPrice,
				Currency: 'IRT'
			};
			Axios.post(process.env.VUE_APP_HOTEL_BASE + '/api/ClickedPrice/Add', priceInfo);
			this.$ga.event('Hotels', 'Reserve');
			window.open(url);
		},
		collapseRoomPrice(index) {
			if (this.roomPriceShowState.includes(index)) {
				const item = this.roomPriceShowState.indexOf(index);
				if (item > -1) {
					this.roomPriceShowState.splice(item, 1);
				}
			} else {
				this.roomPriceShowState.push(index);
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-margin {
	margin-top: 21px!important;
}
.first-price {
    font-weight: 600;
}
.room-name {
  width: 100%;
}
.room-name h2 {
    max-width: 95%;
}
.room-title {
    font-size: 13px;
    line-height: 15px;
    color: #1D1D1D;
    font-weight: 700;
}
.total-price {
    font-size: 14px;
}
.per-day {
    color: #848484;
    font-size: 10px;
    font-weight: bold;
    text-align: left;
}
@media screen and (max-width: 992px) {
    .seller-title {
        width: 29% !important
    }
    .price-row {
        width: 70% !important
    }
    .show-price-calendar {
        margin-right: 10px !important;
    }
}
@media screen and (max-width: 767.98px) {
    .DiningServiceLevel-mobile {
        color: #999999 !important
    }
    .mobile-first-seller-icon {
        display: block !important
    }
    .price-row {
        width: 60% !important;
    }
    .seller-title[data-v-750e5b92] {
        width: 35% !important;
    }
    .mobile-not-first-seller-icon {
        display: none;
    }
    .show-price-calendar {
        margin-left: 3px !important;
        border: 1px solid #D7D9D9 !important;
        border-radius: 0px 18px 18px 0px !important;
        height: 32px !important
    }
    .mobile-first-seller {
        border: 1.5px solid #EB384D !important;
    }
    .show-price-calendar svg {
        width: 15px;
        margin-left: -3px
    }
    .total-price {
        display: none !important
    }
}
    .room-count {
        margin-left: 18px;
    }

    .seller-price .reserve-btn span {
        font-size: 13px;
        position: relative;
        top: -1px;
    }

    .seller-list-container {
        margin: 18px 10px;
        box-sizing: border-box;
        border-radius: 7px;
    }

    .seller-list-container hr {
        height: 1px;
        background: #E9F0F2;
        margin: 0 15px;
        border: none;
    }

    .seller-list-container .seller-price {
        float: left;
    }
    .seller-list-container .seller-price .show {
        display: none;
        font-size: 14px;
        font-weight: 600;
        color: #1C1C1C;
    }

    .seller-list-container .seller-price .per-day {
        display: block;
        color: #848484;
        font-size: 11px;
        font-weight: bold;
    }

    .seller-list-container .seller-price .mobile-per-day {
        display: none;
        color: #848484;
        font-size: 8px;
        font-weight: bold;
        text-align: left;
    }
    .room-list-seller{
        margin-bottom: 0;
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

    }
    .seller-list-header .room-count img {
        width: 11px;
        height: 13px;
        margin-right: 15px;
        margin-left: 5px;
        position: relative;
        top: -2px;
    }
    .seller-list-header .room-title img{
        width: 17px;
        height: 14px;
        margin-right: 15px;
        margin-left: 5px;
        position: relative;
        top: -2px;
    }
    .seller-list-header .room-type img {
        width: 17px;
        height: 14px;
        margin-right: 28px;
        margin-left: 5px;
        position: relative;
        top: -2px;
    }

    .seller-list-header .room-config {
        position: absolute;
        top: 11px;
        left: 15px;
        display: inherit;
    }

    .seller-list-header .bed {
        position: relative;
        padding: 3px 8px;
        border: 1px solid #B8C7DC;
        border-radius: 5px;
        height: 28px;
        display: inline-flex;
        margin-right: 5px;
    }

    .seller-list-header .bed .cross {
        margin: 0 2px;
    }

    .seller-list-header .bed .or-clause {
        margin: 0 5px;
    }
    .seller-list-header .bed .double-bed label {
        font-size: 12px;
    }

    .seller-list-header .bed .single-bed label {
        font-size: 12px;
    }

    .seller-list-header .bed .single {
        width: 14px;
        height: 16px;
    }

    .seller-list-header .bed .double {
        width: 14px;
        height: 16px;
    }

    .seller-title {
        height: 60px;
        max-height: 60px;
        display: inline-flex;
        width: 40%;
        /* width: calc(100% - 277px); */
        overflow: hidden;
        transition: max-height 0.2s cubic-bezier(0, 1, 0, 1)
    }
    .seller-complete-title {
        max-height: 100000px;
        height: auto;
    }

    .seller-bold {
        font-weight: 600!important;
    }
    .seller-complete-title h2, .seller-complete-title h3 {
        white-space: normal !important;
    }

    .seller-title h2 {
        font-size: 13px;
        text-align: right;
        color: #1C1C1C;
        font-weight: 300;
        margin-right: 15px;
        margin-top: 11px;
        margin-bottom: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }

    .seller-title h3 {
        font-style: normal;
        font-weight: normal;
        font-size: 11px;
        align-items: center;
        color: #189AA7;
        text-align: right;
        margin-right: 15px;
        margin-bottom: 9px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .seller-title h3 .check-icon {
        margin-left: 3px;
    }

      .img-box {
        width: 70px;
        height: 50px;
        object-fit: contain;
        position: absolute;
        right: 0px;
    }

    .seller-title img {
        width: 100%;
        height: auto;
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .seller-price .reserve-btn {
        display: block;
        background: #EB384D;
        border-radius: 100px;
        border: none;
        width: 75px;
        height: 33px;
        color: #fff;
        font-weight: 600;
        float: left;
        outline: none;
        cursor: pointer;
        font-size: 13px;
    }

    .seller-price .reserve-btn img {
        width: 15px;
        height: auto;
        margin-right: 10px;
        position: relative;
        top: -1px;
    }

    .seller-price .mobile-reserve-btn {
        display: none;
        background: #EB384D;
        border-radius: 100px;
        border: none;
        width: 90px;
        min-height: 32px;
        color: #fff;
        font-weight: 600;
        float: left;
        outline: none;
        cursor: pointer;
        font-size: 15px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .seller-price .mobile-reserve-btn img {
        width: 8px;
        height: auto;
        margin-right: 10px;
    }

    .more {
        height: 15px;
        background: #F5FCFC;
        border-radius: 15px -1px 0px 0px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top: 1px solid #C3D7D9;
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
        outline: none
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
    .mobile-reserve-btn {
        display: none;
    }
    .hollow {
        background: #FFFFFF !important;
        border: 1px solid #D7D9D9 !important;
        color: #6D6D6D !important;
        font-size: 15px !important;
        font-weight: 200 !important;
    }
    @media (max-width: 767.98px) {
        .seller-list-container {
            margin: 25px 10px
        }
        .more-seller {
            height: 30px
        }
        .more-seller span {
            top: -2px
        }
        .seller-title h3 {
            font-size: 10px
        }
        .seller-price {
            flex-direction: column !important;
        }
        .seller-price .reserve-btn span {
            font-size: 8px;
            position: relative;
            top: -1px;
        }

        .seller-list-container .seller-price .show {
            display: none;
        }

        .seller-price .mobile-reserve-btn {
            display: block;
            width: 94px !important
        }

        .seller-price .reserve-btn {
            display: none !important;
        }
        .seller-title h2 {
            font-size: 13px;
            margin-top: 14px;
            font-weight: 200 !important;
        }

        .seller-list-header {
            height: 43px;
        }

        .seller-list-header .room-type {
            position: absolute;
            right: 11px;
            top: 24px;
            font-size: 10px;
        }

        .seller-list-header .room-count {
            position: absolute;
            right: 11px;
            top: 6px;
            font-size: 11px;
        }
        .seller-list-header .room-count img, .room-title img {
            margin-right: 0 !important;
            width: 12px !important;
            height: auto !important;

        }

        .seller-list-header .bed .single {
            width: 6.5px;
            height: auto;
            right: 15px;
        }

        .seller-list-header .bed .single-bed label {
            font-size: 7px;
            right: 6px;
        }

        .seller-list-header .bed .double {
            width: 7.5px;
            height: auto;
            left: 4px;
        }

        .seller-list-header .bed .double-bed label {
            font-size: 7px;
            left: 12px;
        }

        .seller-list-header .bed {
            height: 17px;
            font-size: 7px;
            padding: 4px;
            padding-top: 3px!important;
        }
        .seller-list-header .room-config {
            top: 6px;
            left: 6px;
        }
        .seller-list-container .seller-price .per-day {
            display: none;
        }

        .seller-list-container .seller-price .mobile-per-day {
            display: block;
            margin-right: 6px;
        }

    }
    .seller-list-head{
        border: 1px solid #ADD5D9;
        border-radius: 0px 0px 10px 10px;
        border-top: 0px;
    }
    .first-seller {
        width: 18px;
        height: 18px;
    }
    @media only screen and (max-width: 767.98px) {
        .first-seller{
            display: none !important
        }
        .show-price-calendar {
            margin-top: -12px;
        }
    }
    .show-price-calendar {
        margin-left: 10px;
        margin-right: 30px;
        background: #FFFFFF;
        border: 1px solid #E3E3E3;
        border-radius: 17px;
        width: 37px;
        height: 33px;
        justify-content: center;
        align-items: center;
        outline: none
    }

    .price-calendar-list {
        width: 100%;
        height: 0;
        overflow: hidden;
        transition: height .6s ease-in-out;
    }
    .active-price-calendar-list {
        height: 110px;
    }
    .room-group-capacity__item {
        position: relative;
        padding: 0px 10px;
        font-weight: 600
    }
    .room-group-capacity__item:not(:first-child)::before {
        content:'';
        width: 1px;
        height: 35px;
        background: #DDE8EA;
        position: absolute;
        right: 0px;
    }
    .price-row {
        position: relative;
        width: 55%
    }
@media (max-width: 767.98px) {
  .d-mobile {
    display: block !important
  }
  .d-desktop {
    display: none !important
  }
  .seller-list-header {
    background: #F0F5F5;
    border-bottom: 1px solid #D7D9D9 !important;
    border-color: #D7D9D9 !important;
  }
  .seller-list-head {
    border-color: #D7D9D9 !important;
  }
  .more {
    border-color: #D7D9D9 !important;
    background: #F0F5F5;
  }
  .more-seller {
    color: #1D1D1D
  }
  .long-price span{
      font-size: 12px !important
  }
}
@media only screen and (max-width: 380px) {
    .img-box {
        width: 55px !important
    }
    .seller-price .mobile-reserve-btn {
        width: 80px !important;
    }
    .seller-price .mobile-reserve-btn span {
        font-size: 13px
    }
    .price-row {
        width: 63% !important
    }
    .long-price span{
      font-size: 11px !important
    }
}
</style>
<style>
 .tooltip-vue {
    display: block !important;
    z-index: 10000;
    position: absolute;
    will-change: transform;
    left: 0px;
    transform: translate3d(599px, 900px, 0px);
}

.tooltip-vue .tooltip-vue-inner {
    font-size: 11px;
    padding: 5px 10px;
    border-radius: 12px;
    color: rgb(255, 255, 255);
    background: black;
    top: 0px;
}

 .tooltip-vue-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
}

.tooltip-vue[x-placement^="top"] {
    margin-bottom: 5px;
}

.tooltip-vue[x-placement^="top"] .tooltip-vue-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.tooltip-vue[x-placement^="bottom"] {
    margin-top: 5px;
}

.tooltip-vue[x-placement^="bottom"] .tooltip-vue-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
}

.tooltip-vue[x-placement^="right"] {
    margin-left: 5px;
}

.tooltip-vue[x-placement^="right"] .tooltip-vue-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.tooltip-vue[x-placement^="left"] {
    margin-right: 5px;
}

.tooltip-vue[x-placement^="left"] .tooltip-vue-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
}

.tooltip-vue.popover .popover-inner {
    background: #f9f9f9;
    color: black;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip-vue.popover .popover-arrow {
    border-color: #f9f9f9;
}

.tooltip-vue[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
}

.tooltip-vue[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
}

</style>
