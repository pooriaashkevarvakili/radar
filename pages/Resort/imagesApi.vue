<template>
  <div class=" container ">

    <!-- <VueSlickCarousel :arrows="true" :dots="true">
      <div v-for="item in code && code.Result" :key="item.id">
        <img :src="item.URL770" />
      </div>

    </VueSlickCarousel> -->
    <HotelImages />


  </div>
</template>
<script>
// import VueSlickCarousel from 'vue-slick-carousel'
// import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// // optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import HotelImages from "./HotelImages.vue";
import ImageLoader from "~/components/hotel/ImageLoader";
import SingleHotelImageSlider from "~/components/hotel/singleHotel/singleHotelImageSlider";
import Axios from "axios";
export default {
  components: {
    HotelImages, ImageLoader, SingleHotelImageSlider
  },

  data() {
    return {
      slide: 0,
      sliding: null,

      imageIndex: 0,
      code: null,
      showAllImages: false,
      showAllSingleHotelImage: false,
      selectedMenu: "hotelImage",
    };
  },
  methods: {

  },

  async fetch() {
    const code = await Axios.get(
      process.env.VUE_APP_SWAGGER_API + "/api/residence/images?id=1"
    )
      .then((response) => {
        this.code = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });
    return { code };
  },
};
</script>

<style >
.grid-img {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 6px;
}

.hotel-image-list__item__img {
  background-size: cover;
  border-radius: 5px;
  background-color: #bbbbbb;
}

.see-less-image {
  font-size: 14px;
  color: #eb384d;
  font-weight: 600;
  text-align: left;
  direction: ltr;
  margin-left: 20px;
}

.img-wrapper img {
  margin: auto;
  width: 200px;
  height: 100px;
  background-image: linear-gradient(gray 100%, transparent 0);
}

.carousel-wrapper {
  width: 400px;
  height: 150px;


}

.VueCarousel-slide {
  text-align: center;
}

.single-hotel-see-more-image {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: white;
  font-weight: 600;
  position: relative;
  margin-top: calc(50% - 20px);
}

.mobile-image-list {
  direction: ltr;
  padding: 0px 6px 0px 10px;
  margin: 13px 7px;
  height: calc(100vh - 426px);
  overflow: auto;
}

.mobile-image-list__item__img {
  background-size: cover;
  border-radius: 5px;
  height: 0px !important;
  padding-bottom: 100%;
  position: relative;
}

@media only screen and (max-width: 1300px) {
  .grid-img {
    display: none;
  }
}

@media only screen and (max-width: 1000px) {
  .grid-img {
    display: none;
  }
}

@media only screen and (max-width: 768px) {}
</style>