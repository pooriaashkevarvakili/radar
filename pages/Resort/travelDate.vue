<template>
  <div class="text-right mt-5">
    <div class="px-10 mt-3">
      <div>
        <div class="mr-3 mt-3 d-flex text-right">
          <svg
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.625 14.875H8.375C8.6875 14.875 9 14.6016 9 14.25V10.5C9 10.1875 8.6875 9.875 8.375 9.875H4.625C4.27344 9.875 4 10.1875 4 10.5V14.25C4 14.6016 4.27344 14.875 4.625 14.875ZM15.875 3H14V1.125C14 0.8125 13.6875 0.5 13.375 0.5H12.125C11.7734 0.5 11.5 0.8125 11.5 1.125V3H6.5V1.125C6.5 0.8125 6.1875 0.5 5.875 0.5H4.625C4.27344 0.5 4 0.8125 4 1.125V3H2.125C1.07031 3 0.25 3.85938 0.25 4.875V18.625C0.25 19.6797 1.07031 20.5 2.125 20.5H15.875C16.8906 20.5 17.75 19.6797 17.75 18.625V4.875C17.75 3.85938 16.8906 3 15.875 3ZM15.875 18.3906C15.875 18.5469 15.7578 18.625 15.6406 18.625H2.35938C2.20312 18.625 2.125 18.5469 2.125 18.3906V6.75H15.875V18.3906Z"
              fill="#EB384D"
            />
          </svg>
          <div class="mr-3">تاریخ سفر خود راانتخاب کنید</div>
        </div>
        <div class="d-flex mr-3 mt-3">
          <div
            class="
              search-box-border-left search-box-border-bottom
              date-box-search
              flex-grow-1
            "
          >
            <resort-search
              ref="SearchHotel"
              :check-in-date="new Date().toDateString()"
              :check-out-date="
                new Date(new Date().getTime() + 86400000).toDateString()
              "
              :home-search="true"
              hotel-title="جستجوی مقصد (شهر/استان)"
              @searchResort="searchResort"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ResortSearch from "./resortSearch.vue";
export default {
  components: {
    ResortSearch,
  },
  props: {
    homeSearch: Boolean,
    CheckInDate: String,
    CheckOutDate: String,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    close() {
      this.open = false;
    },
    searchResort(id, CheckInDate, CheckOutDate, capacity) {
      this.$router.push({
        path: "/resort/" + id,
        query: {
          checkInDate: CheckInDate,
          checkOutDate: CheckOutDate,
          capacity,
        },
      });
    },
  },
};
</script>
<style>
@import url("../../assets/css/accomoddationSearch.css");
</style>