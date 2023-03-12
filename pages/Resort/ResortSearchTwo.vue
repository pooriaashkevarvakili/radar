<template>
    <div class="container search" :class="homeSearch ? 'home-page' : ''">
        <div class="home-page__container d-flex">
            <p v-if="cityInputIsEmpty" :class="homeSearch ? 'home-empty-input-text' : 'empty-input-text'">
                لطفا شهر یا استان مورد نظر خود را انتخاب کنید!
            </p>
            <div id="search-box" :class="{ 'hotel-search-box': !homeSearch }">
                <div class="search-box-border-left search-box-border-bottom city-box-search d-flex align-items-center"
                    :class="{ 'empty-input': cityInputIsEmpty }">
                    <resort-city-input ref="origin" class="w-100" :lists="CityHotelList" :history-list="history"
                        :error="error" :selected-destination="selectedDestination" @setValue="setValue"
                        @checkInpputIsEmptiy="checkInpputIsEmptiy" @closeDatePicker="closeDatePicker" />
                </div>
                <div class="search-box-border-left search-box-border-bottom date-box-search flex-grow-1">
                    <client-only>
                        <hotel-datepicker ref="datepicker" :start-date="CheckInDate" :end-date="CheckOutDate"
                            title=" تاریخ ورود و خروج" :is-home-page="homeSearch" tabindex="0" @closeCapacity="close" />
                    </client-only>
                </div>
                <div v-if="homeSearch" class="submit-box mr-auto">
                    <div v-click-outside="close" class="select-box-search" tabindex="0" @focusout="open = false">
                        <div class="select mr-auto">
                            <div class="selected d-flex align-items-center" :class="{ open: open }" @click="open = !open">
                                <img class="capacity-icon" src="~assets/images/capacity-icon.svg" alt="capacity">
                                {{ capacityOptions.filter((item) => item.value == selectedCapacity)[0].label }}
                                <img src="~assets/images/angle-down.svg" class="capacity-angle-down mt-1 d-none"
                                    alt="angle down">
                            </div>
                            <div class="items" :class="{ selectHide: !open }">
                                <div v-for="(capacity, index) in capacityOptions" :key="index" class="item"
                                    @click="setSelectedCapacity(capacity.value); open = false;">
                                    {{ capacity.label }}
                                </div>
                            </div>
                        </div>
                        <div class="mobile-select mr-auto d-none">
                            <div class="selected d-flex align-items-center" :class="{ open: open }" @click="open = !open">
                                <img class="capacity-icon" src="~assets/images/capacity-icon.svg" alt="capacity">
                                {{ mobileCapacityOptions.filter((item) => item.value == selectedCapacity)[0].label }}
                                <img src="~assets/images/angle-down.svg" class="capacity-angle-down mt-1 d-none"
                                    alt="angle down">
                            </div>
                            <div v-if="open" class="capacity-mobile-wrapper" @click.self="open = false">
                                <div class="capacity-mobile">
                                    <span class="capacity-mobile__title">ظرفیت اقامتگاه را انتخاب کنید</span>
                                    <div v-for="(capacity, index) in mobileCapacityOptions" :key="index"
                                        class="capacity-mobile__item d-flex align-items-center"
                                        @click="setSelectedCapacity(capacity.value); open = false;">
                                        <span class="capacity-mobile__item__checkbox"
                                            :class="{ 'capacity-mobile__item__selected-checkbox': selectedCapacity === capacity.value }">
                                            <span v-if="selectedCapacity === capacity.value" />
                                        </span>
                                        {{ capacity.label }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="homeSearch" id="search-box-button" class=" d-flex justify-content-center align-items-center">
                    <button type="submit" style="outline:none;width:55px;height:55px;border:0" @click="searchOrEdit">
                        <div v-if="searchLoading" class="spinner">
                            <div class="bounce1" />
                            <div class="bounce2" />
                            <div class="bounce3" />
                        </div>
                        <div v-else id="search-icon" class="align-items-center d-flex justify-content-center">
                            <div class=" ml-1"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#EB384D"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <div v-if="!homeSearch" class="hotel-search-submit-box">
                <div class="select-box-search" @blur="open = false">
                    <div class="select">
                        <div class="selected d-flex align-items-center" :class="{ open: open }" @click="open = !open">
                            {{ capacityOptions.filter((item) => item.value == selectedCapacity)[0].label }}
                        </div>
                        <div class="items" :class="{ selectHide: !open }">
                            <div v-for="(capacity, index) in capacityOptions" :key="index" class="item"
                                @click="setSelectedCapacity(capacity.value); open = false;">
                                {{ capacity.label }}
                            </div>
                        </div>
                    </div>
                    <img class="mobi" src="~assets/images/chevron-down.svg" alt="arrow">
                </div>
                <div id="search-box-button" class=" d-flex justify-content-center align-items-center">
                    <button type="submit" class="search-btn" style="outline:none" @click="searchOrEdit">
                        <div v-if="searchLoading" class="search-loader" />
                        <div v-else id="search-icon" class="align-items-center d-flex justify-content-center m-0">
                            <img src="~assets/images/search-icon-red.svg" alt="search">
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <transition name="fade">
            <p v-if="cityInputIsEmpty" class="d-none empty-input-warning">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.7188 9.27075C17.7188 4.4895 13.7812 0.552002 9 0.552002C4.18359 0.552002 0.28125 4.4895 0.28125 9.27075C0.28125 14.0872 4.18359 17.9895 9 17.9895C13.7812 17.9895 17.7188 14.0872 17.7188 9.27075ZM9 11.0286C9.87891 11.0286 10.6172 11.7668 10.6172 12.6458C10.6172 13.5598 9.87891 14.2629 9 14.2629C8.08594 14.2629 7.38281 13.5598 7.38281 12.6458C7.38281 11.7668 8.08594 11.0286 9 11.0286ZM7.45312 5.22778C7.41797 4.98169 7.62891 4.77075 7.875 4.77075H10.0898C10.3359 4.77075 10.5469 4.98169 10.5117 5.22778L10.2656 10.009C10.2305 10.2551 10.0547 10.3958 9.84375 10.3958H8.12109C7.91016 10.3958 7.73438 10.2551 7.69922 10.009L7.45312 5.22778Z"
                        fill="#EB384D" />
                </svg>
                لطفا مقادیر ضروری را وارد کنید
            </p>
        </transition>
    </div>
</template>
<script>
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import ClickOutside from 'vue-click-outside';
import ResortCityInput from '~/components/resort/resortCityInput.vue';
import HotelDatepicker from '~/components/hotel/hotelDatePicker';
library.add(faSearch);
const moment = require('moment-jalaali');
export default {
    name: 'SearchHotel',
    directives: {
        ClickOutside
    },
    components: {
        ResortCityInput,
        HotelDatepicker
    },
    props: {
        CheckInDate: String,
        CheckOutDate: String,
        CityHotelList: Array,
        homeSearch: Boolean,
        hotelTitle: String
    },
    data: function () {
        return {
            history: [],
            hotelLoader: [],
            searchLoading: false,
            cityInputIsEmpty: false,
            error: false,
            selectedCapacity: 'all',
            capacityOptions: [
                { value: 'all', label: 'همه' },
                { value: '1', label: 'یک نفره' },
                { value: '2', label: 'دو نفره' },
                { value: '3', label: 'سه نفره' },
                { value: '4', label: 'چهار نفره' }
            ],
            mobileCapacityOptions: [
                { value: 'all', label: 'همه ظرفیت ها' },
                { value: '1', label: 'یک نفره' },
                { value: '2', label: 'دو نفره' },
                { value: '3', label: 'سه نفره' },
                { value: '4', label: 'چهار نفره' }
            ],
            open: false
        };
    },
    computed: {
        selectedDestination() {
            return this.$route.params.origin ? this.$route.params.origin : '';
        }
    },
    watch: {
        // '$route.query': function (val) {
        // 	if (val.capacity) {
        // 		this.selectedCapacity = val.capacity;
        // 		this.searchLoading = false;
        // 	}
        // }
        '$route.query': function (val) {
            this.searchLoading = false;
        },
        open: function (val) {
            if (val === true) {
                this.toggleBodyClass('addClass', 'body-overflow');
            } else {
                this.toggleBodyClass('removeClass', 'body-overflow');
            }
        }

    },
    beforeMount: function () {
        if (this.$route.query.capacity) {
            this.selectedCapacity = this.$route.query.capacity;
        } else {
            this.selectedCapacity = 'all';
        }
    },
    methods: {
        checkInpputIsEmptiy(val) {
            this.cityInputIsEmpty = val;
        },
        close() {
            this.open = false;
        },
        setSelectedCapacity(val) {
            this.selectedCapacity = val;
        },
        searchOrEdit: function () {
            const dates = this.$refs.datepicker;
            if (this.$refs.origin.id === '') {
                this.cityInputIsEmpty = true;
                return false;
            }
            this.$parent.homepageSearched = true;
            const start = new Date(dates.$refs.datepicker.dates.start.getGregorianDate());
            const end = new Date(dates.$refs.datepicker.dates.end.getGregorianDate());
            if (this.$refs.origin.nameEn.toLowerCase() !== this.$route.params.city || moment(start).format('jYYYY-jMM-jDD') !== this.$route.query.checkInDate || moment(end).format('jYYYY-jMM-jDD') !== this.$route.query.checkOutDate) {
                this.searchLoading = true;
            }
            if (this.$refs.origin.selectedCity.Type === 'اقامتگاه') {
                this.$emit('searchResort', 'singleResort/' + this.$refs.origin.id, moment(start).format('jYYYY-jMM-jDD'), moment(end).format('jYYYY-jMM-jDD'), this.selectedCapacity);
            } else {
                this.$emit('searchResort', this.$refs.origin.nameEn.toLowerCase(), moment(start).format('jYYYY-jMM-jDD'), moment(end).format('jYYYY-jMM-jDD'), this.selectedCapacity);
            }
        },
        setValue: function () {
            this.$refs.datepicker.$refs.datepicker.focusInput();
        },
        closeDatePicker() {
            this.$refs.datepicker.close();
        }
    }
};
</script>
<style scoped>
@import url('../../assets/css/accommondationSearchOne.css');
</style>
