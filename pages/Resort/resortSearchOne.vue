<template>
  <div>
    <div>
      <p v-if="cityInputIsEmpty">
        لطفا شهر یا استان مورد نظر خود را انتخاب کنید!
      </p>
      <div id="search-box" :class="{ 'hotel-search-box': !homeSearch }">
        <div class="flex-grow-1">
          <client-only>
            <hotel-datepicker
              ref="datepicker"
              :start-date="CheckInDate"
              :end-date="CheckOutDate"
              title=" تاریخ ورود و خروج"
              :is-home-page="homeSearch"
              tabindex="0"
              @closeCapacity="close"
            />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import ClickOutside from "vue-click-outside";
import ResortCityInput from "~/components/resort/resortCityInput.vue";
import HotelDatepicker from "./hotelDatePicker.vue";
library.add(faSearch);
const moment = require("moment-jalaali");
export default {
  name: "SearchHotel",
  directives: {
    ClickOutside,
  },
  components: {
    ResortCityInput,
    HotelDatepicker,
  },
  props: {
    CheckInDate: String,
    CheckOutDate: String,
    CityHotelList: Array,
    homeSearch: Boolean,
    hotelTitle: String,
  },
  data: function () {
    return {
      history: [],
      hotelLoader: [],
      searchLoading: false,
      cityInputIsEmpty: false,
      error: false,
      selectedCapacity: "all",

      open: false,
    };
  },
  computed: {
    selectedDestination() {
      return this.$route.params.origin ? this.$route.params.origin : "";
    },
  },
  watch: {
    "$route.query": function (val) {
      this.searchLoading = false;
    },
    open: function (val) {
      if (val === true) {
        this.toggleBodyClass("addClass", "body-overflow");
      } else {
        this.toggleBodyClass("removeClass", "body-overflow");
      }
    },
  },
  beforeMount: function () {
    if (this.$route.query.capacity) {
      this.selectedCapacity = this.$route.query.capacity;
    } else {
      this.selectedCapacity = "all";
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
      if (this.$refs.origin.id === "") {
        this.cityInputIsEmpty = true;
        return false;
      }
      this.$parent.homepageSearched = true;
      const start = new Date(
        dates.$refs.datepicker.dates.start.getGregorianDate()
      );
      const end = new Date(dates.$refs.datepicker.dates.end.getGregorianDate());
      if (
        this.$refs.origin.nameEn.toLowerCase() !== this.$route.params.city ||
        moment(start).format("jYYYY-jMM-jDD") !==
          this.$route.query.checkInDate ||
        moment(end).format("jYYYY-jMM-jDD") !== this.$route.query.checkOutDate
      ) {
        this.searchLoading = true;
      }
      if (this.$refs.origin.selectedCity.Type === "اقامتگاه") {
        this.$emit(
          "searchResort",
          "singleResort/" + this.$refs.origin.id,
          moment(start).format("jYYYY-jMM-jDD"),
          moment(end).format("jYYYY-jMM-jDD"),
          this.selectedCapacity
        );
      } else {
        this.$emit(
          "searchResort",
          this.$refs.origin.nameEn.toLowerCase(),
          moment(start).format("jYYYY-jMM-jDD"),
          moment(end).format("jYYYY-jMM-jDD"),
          this.selectedCapacity
        );
      }
    },
    setValue: function () {
      this.$refs.datepicker.$refs.datepicker.focusInput();
    },
    closeDatePicker() {
      this.$refs.datepicker.close();
    },
  },
};
</script>
  <style scoped>
@import url("../../assets/css/accomoddationSearch.css");
</style>
  