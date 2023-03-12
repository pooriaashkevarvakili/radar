<template>
  <div class="text-right">
    <div class="px-10 mt-3">
      <div>
        <div class="d-flex mt-3 text-right">
          <svg
            width="15"
            height="21"
            viewBox="0 0 15 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 0.5C3.32031 0.5 0 3.89844 0 8C0 10.8125 0.898438 11.6719 5.89844 19.6406C6.64062 20.8125 8.32031 20.8125 9.0625 19.6406C14.0625 11.6719 15 10.8125 15 8C15 3.85938 11.6016 0.5 7.5 0.5ZM7.5 18.625C2.5 10.6562 1.875 10.1484 1.875 8C1.875 4.91406 4.375 2.375 7.5 2.375C10.5859 2.375 13.125 4.91406 13.125 8C13.125 10.1484 12.5 10.5781 7.5 18.625ZM4.375 8C4.375 9.75781 5.74219 11.125 7.5 11.125C9.21875 11.125 10.625 9.75781 10.625 8C10.625 6.28125 9.21875 4.875 7.5 4.875C5.74219 4.875 4.375 6.28125 4.375 8Z"
              fill="#EB384D"
            />
          </svg>

          <div class="mr-3">موقعیت مکانی</div>
        </div>
        <div class="d-flex">
          استان اصفهان شهرستان چادگان،خیابان گلها،ویلای سوم
        </div>
        <div>
          <!-- <font-awesome-icon
            :icon="['fas', 'times']"
            style="background: transparent; border: none"
            @click="mapModal = false"
            class="fa-style"
          /> -->
          <!-- {{ code && code.NameFa }} -->
        </div>
        <div>
          <!-- {{ code && code.Description }} -->
        </div>
        <!-- <div class="container">
          <div class="d-flex flex-column">
            <div>Longitude:{{ code && code.Longitude }}</div>
            <div>Phone: {{ code && code.Phone }}</div>
            <div>CommentsCount: {{ code && code.CommentsCount }}</div>
            <div>AverageRate: {{ code && code.AverageRate }}</div>
            <div>latitude: {{ code && code.Latitude }}</div>
          </div>
        </div> -->

        <div>
          <client-only>
            <div class="position-relative">
              <GmapMap
                class="map mt-3"
                map-type-id="terrain"
                :center="{ lat: 46.074942, lng: 38.0659 }"
                :zoom="7"
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="center = m.position"
                />
              </GmapMap>
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  props: {
    meta: {
      type: Object,
      default() {
        return {};
      },
    },
    priceLoader: Boolean,
    city: {
      type: String,
      default: "",
    },
    accommodationName: {
      type: String,
      default: "",
    },
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    cityNameFa: {
      type: String,
      default: "",
    },
    nearestPlaces: {
      type: Array,
      default() {
        return [];
      },
    },
    rateLevel: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default() {
        return [];
      },
    },
    hotelType: {
      type: Object,
      default() {
        return {};
      },
    },
    nameFa: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    checkInHour: {
      type: String,
      default: "",
    },
    checkOutHour: {
      type: String,
      default: "",
    },
    cheaperSeller: {
      type: Object,
      default() {
        return {};
      },
    },
    buttonTitle: {
      type: String,
      default: "",
    },
    frequentlyAskedQuestions: {
      type: Array,
      default() {
        return [];
      },
    },
    footer: {
      type: String,
      default: "",
    },
    loading: Boolean,
    commentsCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    similarHotels: {
      type: Array,
      default() {
        return [];
      },
    },
    commentsTotalPage: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      code: null,
    };
  },
  computed: {
    markers() {},
  },
  async fetch() {
    const code = await Axios.get(
      process.env.VUE_APP_SWAGGER_API + "/api/residence/meta?id=1"
    )
      .then((response) => {
        this.code = response.data.Result;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    return { code };
  },
};
</script>

<style scoped>
.map {
  width: 1140px;
  height: 300px;
}

@media only screen and (max-width: 1500px) {
  .map {
    width: 1140px;
    height: 300px;
  }
}

@media only screen and (max-width: 1300px) {
  .map {
    width: 500px;
    height: 300px;
  }
}

@media only screen and (max-width: 1000px) {
  .map {
    width: 500px;
    height: 300px;
  }
}

@media only screen and (max-width: 900px) {
  .map {
    width: 500px;
    height: 300px;
  }
}

@media only screen and (max-width: 800px) {
  .map {
    width: 500px;
    height: 300px;
  }
}

@media only screen and (max-width: 768px) {
  .map {
    width: 500px;
    height: 300px;
  }
}

@media only screen and (max-width: 640px) {
  .map {
    width: 450px !important;
    height: 300px !important;
  }
}
</style>