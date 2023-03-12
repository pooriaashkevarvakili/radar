<template>
  <div class="card shab" style="width: 19rem; height: 280px">
    <div
      style="height: 5rem; width: 16.875rem"
      class="card-text d-flex align-items-center justify-content-center mr-3 bg-light"
    >
      <span> هرشب 6000هزار تومان </span>
    </div>
    <div class="card-text text-center">
      <v-date-picker
        format="YYYY-MM-DD"
        display-format="jMMMM jD"
        class="inline-block h-full mt-2"
        v-model="date"
      >
        <template v-slot="{ inputValue }">
          <div class="flex items-center">
            <button
              class="p-2 bg-blue-100 border border-blue-200 hover:bg-blue-200 text-blue-600 rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-4 h-4 fill-current"
              >
                <path
                  d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                ></path>
              </svg>
            </button>
            <input
              :value="inputValue"
              class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500"
              readonly
            />
          </div>
        </template>
      </v-date-picker>
    </div>
    <div class="px-5">
      <div class="d-flex justify-content-between mt-3">
        <button class="text-danger border-0 p-3">+</button>
        <div class="mt-4">1</div>
        <button class="text-danger border-0 p-3">-</button>
      </div>
    </div>
    <div
      class="card-text mt-3 d-flex align-items-center justify-content-center"
    >
      <button class="border-0 w-75 text-white p-3 bg-danger">
        انتخاب تاریخ رزو
      </button>
    </div>
  </div>
</template>

<script>
const moment = require("moment-jalaali");
export default {
  data() {
    return {
      date: new Date(),
      value: 1,
      data: null,
    };
  },
  // async fetch() {
  //   const data = await Axios.get(
  //     process.env.VUE_APP_SWAGGER_API +
  //     "/api/residence/price?id=471541&checkInDate=2023-02-24&checkoutDate=2023-02-25"
  //   )
  //     .then((response) => {
  //       this.data = response.data.Result.Seller;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.errored = true;
  //     });
  //   return { data };
  // },
  computed: {
    checkInDate() {
      return this.$route.query.checkInDate
        ? moment(this.$route.query.checkInDate, "jYYYY-jMM-jDD").format(
            "YYYY-MM-DD"
          )
        : moment().format("YYYY-MM-DD");
    },
    checkOutDate() {
      return this.$route.query.checkOutDate
        ? moment(this.$route.query.checkOutDate, "jYYYY-jMM-jDD").format(
            "YYYY-MM-DD"
          )
        : moment().add(1, "day").format("YYYY-MM-DD");
    },
  },
};
</script>
<style>
.b-form-spinbutton .btn {
  color: #eb384d;
}

.radius-one {
  border-radius: 10%;
}

@media only screen and (max-width: 1300px) {
  .shab {
    display: none;
  }
}

@media only screen and (max-width: 768px) {
  .card-one {
    width: 450px;
    height: 50px;
  }

  .shab {
    display: none;
  }
}

@media (max-width: 575.98px) {
  .shab {
    display: none;
  }
}
</style>
