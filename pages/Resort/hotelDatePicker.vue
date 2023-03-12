<template>
  <div
    v-click-outside="close"
    class="hotel-datepicker"
    :class="[
      isHomePage || singleHotel ? '' : 'city-page-datepicker',
      singleHotel ? 'single-hotel-page-datepicker' : '',
    ]"
  >
    <div
      class="d-flex align-items-center dates-wrapper h-100"
      @click="openDatepicker"
    >
      <div class="start-date d-flex align-items-center">
        <img
          v-if="!singleHotel"
          class="calendar-icon"
          src="~assets/images/calendar.svg"
          alt="calendar-icon"
        />
        <span class="date-text d-desktop">{{ formatedStartDate }}</span>
        <span class="date-text d-mobile">{{ formatedMobileStartDate }}</span>
        <span
          v-if="isHomePage || singleHotel"
          class="mr-auto change-day-arrows"
        >
          <span class="arrow-day" @click.stop="goToHotelPreviousStartDay">
            <svg
              class="arrow"
              width="7"
              height="13"
              viewBox="0 0 7 13"
              :fill="singleHotel ? '#1A6168' : '#888888'"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.65625 0.816406L0.109375 1.33594C0 1.47266 0 1.69141 0.109375 1.80078L5.05859 6.75L0.109375 11.7266C0 11.8359 0 12.0547 0.109375 12.1914L0.65625 12.7109C0.792969 12.8477 0.984375 12.8477 1.12109 12.7109L6.86328 6.99609C6.97266 6.85938 6.97266 6.66797 6.86328 6.53125L1.12109 0.816406C0.984375 0.679688 0.792969 0.679688 0.65625 0.816406Z"
              />
            </svg>
          </span>
          <span class="arrow-day" @click.stop="goToHotelNextStartDay">
            <svg
              class="arrow"
              width="7"
              height="13"
              viewBox="0 0 7 13"
              :fill="singleHotel ? '#1A6168' : '#888888'"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.31641 12.7109L6.86328 12.1914C6.97266 12.0547 6.97266 11.8359 6.86328 11.7266L1.91406 6.75L6.86328 1.80078C6.97266 1.69141 6.97266 1.47266 6.86328 1.33594L6.31641 0.816406C6.17969 0.679688 5.98828 0.679688 5.85156 0.816406L0.109375 6.53125C0 6.66797 0 6.85938 0.109375 6.99609L5.85156 12.7109C5.98828 12.8477 6.17969 12.8477 6.31641 12.7109Z"
              />
            </svg>
          </span>
        </span>
      </div>
      <img
        class="mobile-arrow-right-icon"
        src="/images/datepicker-arrow.svg"
        alt="datepicker"
      />
    </div>
    <datepicker
      ref="datepicker"
      type="hotel"
      :calendar-date="calendarDate"
      :start-date="startDate"
      :end-date="endDate"
      :month-count="monthCount ? monthCount : maxMonthCount"
      :price-calendar="priceCalendar"
      @setDates="setDates"
      @addMoreMonths="addMoreMonths"
    >
      <template #default="{ item }">
        <slot :item="item" />
      </template>
      <template v-if="!priceCalendar" v-slot:header>
        <span class="mobile-duration"> {{ duration }} شب اقامت </span>
      </template>
      <template v-if="slotExists" v-slot:footer>
        <slot name="price-calendar" />
      </template>
      <template v-else v-slot:footer>
        <div class="desktop-duration">{{ duration }} شب اقامت</div>
      </template>
    </datepicker>
  </div>
</template>
<script>
import VCalendar from "v-calendar";
import ClickOutside from "vue-click-outside";
import Datepicker from "~/components/DatePicker";
const moment = require("moment-jalaali");
export default {
  components: {
    Datepicker,
  },
  directives: {
    ClickOutside,
  },
  props: {
    startDate: {
      type: String,
      default: "",
    },
    endDate: {
      type: String,
      default: "",
    },
    isHomePage: Boolean,
    singleHotel: Boolean,
    priceCalendar: Boolean,
    monthCount: Number,
  },
  data() {
    return {
      selectedStartDate: {},
      selectedEndDate: {},
      maxMonthCount: 2,
      duration: 0,
    };
  },
  computed: {
    slotExists() {
      return !!this.$slots;
    },
    calendarDate() {
      const checkIn = new Date(this.startDate);
      const checkOut = new Date(this.endDate);
      const jDateCheckIn = new VCalendar.JDate();
      const jDateCheckOut = new VCalendar.JDate();
      jDateCheckIn.setGregorianDate(
        checkIn.getFullYear(),
        checkIn.getMonth(),
        checkIn.getDate()
      );
      jDateCheckOut.setGregorianDate(
        checkOut.getFullYear(),
        checkOut.getMonth(),
        checkOut.getDate()
      );
      return {
        start: jDateCheckIn,
        end: jDateCheckOut,
      };
    },
    formatedMobileStartDate() {
      moment.loadPersian({ dialect: "persian-modern" });
      return this.selectedStartDate
        ? JSON.stringify(this.selectedStartDate) === "{}"
          ? ""
          : moment(this.selectedStartDate.getGregorianDate())
              .format("dddd")
              .slice(0, 1) +
            " " +
            moment(this.selectedStartDate.getGregorianDate()).format("jD") +
            " " +
            moment(this.selectedStartDate.getGregorianDate()).format("jMMMM")
        : "";
    },
    formatedMobileEndDate() {
      moment.loadPersian({ dialect: "persian-modern" });
      return JSON.stringify(this.selectedEndDate) === "{}"
        ? ""
        : moment(this.selectedEndDate.getGregorianDate())
            .format("dddd")
            .slice(0, 1) +
            " " +
            moment(this.selectedEndDate.getGregorianDate()).format("jD") +
            " " +
            moment(this.selectedEndDate.getGregorianDate()).format("jMMMM");
    },
    formatedStartDate() {
      moment.loadPersian({ dialect: "persian-modern" });
      return this.selectedStartDate
        ? JSON.stringify(this.selectedStartDate) === "{}"
          ? ""
          : moment(this.selectedStartDate.getGregorianDate()).format("dddd") +
            " " +
            moment(this.selectedStartDate.getGregorianDate()).format("jD") +
            " " +
            moment(this.selectedStartDate.getGregorianDate()).format("jMMMM")
        : "";
    },
    formatedEndDate() {
      moment.loadPersian({ dialect: "persian-modern" });
      return this.selectedEndDate
        ? JSON.stringify(this.selectedEndDate) === "{}"
          ? ""
          : moment(this.selectedEndDate.getGregorianDate()).format("dddd") +
            " " +
            moment(this.selectedEndDate.getGregorianDate()).format("jD") +
            " " +
            moment(this.selectedEndDate.getGregorianDate()).format("jMMMM")
        : "";
    },
    shouldSelectEndDate() {
      return this.$refs.datepicker && this.$refs.datepicker.shouldSelectEndDate
        ? this.$refs.datepicker.shouldSelectEndDate
        : false;
    },
  },
  watch: {
    selectedStartDate: function () {
      this.$refs.datepicker.shouldSelectEndDate = true;
      const timeDiff =
        new Date(this.selectedEndDate.getGregorianDate()) -
        new Date(this.selectedStartDate.getGregorianDate());
      this.duration = Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
    selectedEndDate() {
      if (this.singleHotel) {
        this.$emit("searchForRoom");
      }
      const timeDiff =
        new Date(this.selectedEndDate.getGregorianDate()) -
        new Date(this.selectedStartDate.getGregorianDate());
      this.duration = Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
  },
  methods: {
    addMoreMonths() {
      this.maxMonthCount += 2;
    },
    openDatepicker() {
      this.$refs.datepicker.openDatePicker();
    },
    close() {
      this.$refs.datepicker.close();
    },
    setDates(val) {
      this.selectedStartDate = val.start;
      this.selectedEndDate = val.end;
    },
    goToHotelNextStartDay() {
      if (
        this.$refs.datepicker.dates.start.getTime() >=
        this.$refs.datepicker.dates.end.getTime() - 86400000 * 1
      ) {
        this.$refs.datepicker.dates.end = new VCalendar.JDate(
          this.$refs.datepicker.dates.end.getTime() + 86400000 * 1
        );
      }
      this.$refs.datepicker.dates.start = new VCalendar.JDate(
        this.$refs.datepicker.dates.start.getTime() + 86400000 * 1
      );
      if (this.singleHotel) {
        this.$emit("searchForRoom");
      }
    },
    goToHotelPreviousStartDay() {
      if (
        this.$refs.datepicker.dates.start.getTime() <=
        this.$refs.datepicker.minDate.getTime()
      ) {
        return;
      }
      this.$refs.datepicker.dates.start = new VCalendar.JDate(
        this.$refs.datepicker.dates.start.getTime() - 86400000 * 1
      );
      if (this.singleHotel) {
        this.$emit("searchForRoom");
      }
    },
    goToHotelNextEndDay() {
      this.$refs.datepicker.dates.end = new VCalendar.JDate(
        this.$refs.datepicker.dates.end.getTime() + 86400000 * 1
      );
      if (this.singleHotel) {
        this.$emit("searchForRoom");
      }
    },
    goToHotelPreviousEndDay() {
      if (
        this.$refs.datepicker.dates.end.getTime() <=
          this.$refs.datepicker.dates.start.getTime() + 86400000 * 1 ||
        this.$refs.datepicker.dates.end.getTime() <=
          this.$refs.datepicker.minDate.getTime()
      ) {
        if (
          this.$refs.datepicker.dates.start.getTime() <=
          this.$refs.datepicker.minDate.getTime()
        ) {
          return;
        }
        this.$refs.datepicker.dates.start = new VCalendar.JDate(
          this.$refs.datepicker.dates.start.getTime() - 86400000 * 1
        );
      }
      this.$refs.datepicker.dates.end = new VCalendar.JDate(
        this.$refs.datepicker.dates.end.getTime() - 86400000 * 1
      );
      if (this.singleHotel) {
        this.$emit("searchForRoom");
      }
    },
  },
};
</script>
<style scoped>
.d-mobile {
  display: none;
}
.dates-wrapper {
  padding-left: 15px;
}
.hotel-datepicker {
  width: 100%;
  height: 58px;
  cursor: pointer;
}
.hotel-datepicker:focus {
  outline: none;
}
.start-date::after {
  content: " ";
  width: 2px;
  height: 25px;
  position: absolute;
  background-color: #e0e0e0;
  left: 0px;
}
.start-date,
.end-date {
  width: 50%;
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
}
.dates-wrapper:focus {
  outline: none;
}
.arrow-day {
  width: 25px;
  height: 25px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e6e6e6;
  border-radius: 10px;
}
.arrow-day svg {
  fill: #000000;
}
.arrow-day:first-child {
  margin-left: 5px;
}
.desktop-duration {
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #424242;
  margin: 5px 10px;
  border-top: 1px solid #f1f6f8;
  padding-top: 5px;
}
.mobile-arrow-right-icon {
  display: none;
}
.date-box {
  margin-bottom: 10px;
  display: flex;
}
.date-box .footer-start-date,
.date-box .footer-end-date {
  width: 50%;
}
.footer-end-date img,
.footer-start-date img {
  margin-left: 15px;
}
.footer-start-date span:first-child,
.footer-end-date span:first-child {
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  text-align: right;
  color: #aaa;
}
.footer-start-date span:last-child,
.footer-end-date span:last-child {
  font-style: normal;
  font-weight: 300;
  text-align: right;
  font-size: 13px;
  color: #1d1d1d;
}
.calendar-icon {
  margin-left: 12px;
}
.city-page-datepicker .start-date,
.city-page-datepicker .end-date {
  height: 100%;
  align-items: center;
}
.start-date .calendar-icon,
.end-date .calendar-icon {
  width: 18px;
}
.city-page-datepicker .start-date::after {
  height: 100%;
  width: 1px;
}
.city-page-datepicker.hotel-datepicker {
  height: 56px;
}
.single-hotel-page-datepicker .dates-wrapper {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  padding: 3px;
  cursor: pointer;
  font-size: 14px;
  color: #1a6168;
}
.single-hotel-page-datepicker.hotel-datepicker {
  width: 100%;
}
.change-day-arrows {
  display: flex;
}
.date-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media only screen and (max-width: 768px) {
  .d-desktop {
    display: none;
  }
  .d-mobile {
    display: block;
  }
  .start-date {
    width: 48%;
    padding-right: 20px;
  }
  .end-date {
    width: unset;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 5px;
  }
  .hotel-datepicker {
    width: 100%;
    height: 100%;
  }
  .hotel-datepicker:not(.single-hotel-page-datepicker) .change-day-arrows {
    display: none;
  }
  .end-date .calendar-icon {
    display: none;
  }
  .start-date::after {
    display: none;
  }
  .start-date,
  .end-date {
    padding-left: 5px;
    width: 50%;
  }
  .mobile-arrow-right-icon {
    display: block;
    height: 56px;
  }
  .mobile-duration {
    font-size: 14px !important;
    background: #f4f4f4 !important;
    border-radius: 10px;
    width: 99px;
    height: 35px;
    margin-top: 0;
    margin-bottom: 5px;
    position: absolute;
    padding-top: 5px;
    top: 12px;
    left: 24px;
    font-weight: 500 !important;
    font-size: 16px !important;
    line-height: 25px;
    color: #999 !important;
  }
  .single-hotel-page-datepicker .dates-wrapper {
    height: 50px !important;
  }
  .single-hotel-page-datepicker .mobile-arrow-right-icon {
    display: none !important;
  }
  .single-hotel-page-datepicker .start-date {
    border-left: 1px solid #e3e3e3;
    height: 40px;
  }
}
</style>
