<template>
  <div>
    <div v-if="code && code.length" class="image-slider-wrapper position-relative">
      <div v-for="(image, i) in code && code.Result" :key="i">
        <img v-if="i == index" :src="image.URL770" :alt="
          image.Caption
            ? image.Caption
            : `رزرو ${hotelType + ' ' + hotelNameFa + ' ' + cityNameFa}`
        " :class="name" class="w-100 image-slider-wrapper__img" />
      </div>
      <button class="btn previous-btn" @click="showPreviousImage">
        <svg viewBox="0 0 24 24" width="24px" height="24px">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </button>
      <button class="btn next-btn" @click="showNextImage">
        <svg viewBox="0 0 24 24" width="24px" height="24px">
          <title>Arrow Right</title>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
      <div v-if="name == 'small-slider'" class="slider-bullet-container">
        <div class="d-flex flex-row-reverse">
          <div v-for="i in code.slice(0, 5).length" :key="i" class="slider-img-bullet"
            :class="[i - 1 == index % 5 ? 'current-slider-img-bullet' : '']" />
        </div>
      </div>
      <div v-if="name == 'small-slider'" class="slider-index d-inline-flex justify-content-center">
        {{ index + 1 }}/{{ code.length }}
      </div>
    </div>
    <div v-else class="image-slider-wrapper w-100">
      <div class="w-100 no-image">تصویری موجود نیست</div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  props: {
    // images: Array,
    imageIndex: Number,
    name: String,
    cityNameFa: String,
    hotelType: String,
    hotelNameFa: String,
  },
  data: function () {
    return {
      index: 0,
      code: null,
    };
  },
  async fetch() {
    const code = await Axios.get(
      process.env.VUE_APP_SWAGGER_API + "/api/residence/images?id=1"
    )
      .then((response) => {
        this.code = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
    return { code };
  },
  watch: {
    imageIndex: function (val) {
      this.index = val;
    },
  },
  methods: {
    showPreviousImage() {
      if (this.index === 0) {
        this.index = this.code.length - 1;
      } else {
        this.index--;
      }
    },
    showNextImage() {
      if (this.index === this.code.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    },
  },
};
</script>
<style scoped>
.big-slider {
  width: 100%;
  height: 380px !important;
  background-color: #bbb;
  border-radius: 15px;
  object-fit: cover;
}

.image-slider-wrapper {
  /* height: 380px; */
}

.small-slider {
  width: 100%;
  height: 220px !important;
  background-color: #bbb;
  border-radius: 0px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

.previous-btn {
  position: absolute;
  z-index: 2;
  left: 10px;
  top: calc(50% - 20px);
}

.next-btn {
  position: absolute;
  z-index: 2;
  right: 10px;
  top: calc(50% - 20px);
}

.next-btn,
.previous-btn {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  width: 35px !important;
  height: 35px !important;
  color: white;
  border-color: transparent;
  display: flex;
  justify-content: center;
  padding: 0px;
  align-items: center;
}

.next-btn:focus,
.previous-btn:focus {
  box-shadow: none !important;
}

.previous-btn svg,
.next-btn svg {
  fill: #fff !important;
}

.slider-bullet-container {
  z-index: 2;
  position: absolute;
  top: 195px;
  right: 145px;
}

.slider-img-bullet {
  background: rgba(0, 0, 0, 0.6);
  margin: 0px 2.5px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.current-slider-img-bullet {
  background: white;
}

.slider-index {
  height: 23px;
  width: 33px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 3px;
  position: absolute;
  bottom: 15px;
  left: 15px;
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
  align-items: center;
}

.no-image {
  background-color: #eeeeee;
  border-radius: 15px;
  max-width: 645px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 505px;
}

@media only screen and (max-width: 768px) {
  .slider-image {
    border-radius: 0px !important;
    height: 260px !important;
  }

  .image-slider-wrapper {
    height: 260px !important;
    background: #bbbbbb;
  }

  .image-slider-wrapper__img {
    height: 260px;
    object-fit: cover;
  }

  .next-btn,
  .previous-btn {
    top: calc(50% - 50px) !important;
  }

  .no-image {
    height: 100%;
    border-radius: 0px;
  }
}
</style>
