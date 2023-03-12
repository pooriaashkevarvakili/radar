<template>
  <div>
    <div class="main-page">
      <div class="homepage-view">
        <div class="curve-background">
          <div class="container text-right header-bg"></div>
          <div class="search-container">
            <resort-search
              ref="SearchHotel"
              :check-in-date="new Date().toDateString()"
              :check-out-date="
                new Date(new Date().getTime() + 86400000).toDateString()
              "
              :city-hotel-list="cityList"
              :home-search="true"
              hotel-title="جستجوی مقصد (شهر/استان)"
              @searchResort="searchResort"
            />
          </div>
          <!-- <div class="container d-flex justify-content-between main-ad-banner">

          </div> -->
          <div
            class="container d-none justify-content-between main-ad-banner-mobile"
          ></div>
        </div>
      </div>
      <linksResidence />
      <imagesApi />
      <accommodationFacilitiesResidence />
      <travelDate />
      <residenseRules />
      <residenceMap />
      <residenceProgreess />
      <div class="container">
        <div class="text-right">
          <!-- <residenceComments /> -->
        </div>
      </div>
      <residencePages />
    </div>
  </div>
</template>
<script>
import residencePages from "./residencePages.vue";
import residenceComments from "./residenceComments.vue";
import imagesApi from "./imagesApi.vue";
import travelDate from "./travelDate.vue";
import linksResidence from "./linksResidence.vue";
import residenceProgreess from "./residenceProgreess.vue";
import residenceMap from "./residenceMap.vue";
import residenseRules from "./residenseRules.vue";
import accommodationFacilitiesResidence from "./accommodationFacilitiesResidence.vue";
import { faHotel, faPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { mapState } from "vuex";
import LazyHydrate from "vue-lazy-hydration";
import ResortSearch from "./ResortSearchTwo.vue";
import Message from "../../components/Message.vue";
import SearchSegment from "../../components/searchSegment";
import ResortStore from "~/store/Resort";
import faq from "~/components/faq";
library.add(faHotel, faPlane, faPlus);

export default {
  layout: "mainPage",
  components: {
    ResortSearch,
    travelDate,
    Message,
    residenseRules,
    residenceComments,
    imagesApi,
    residenceMap,
    residencePages,
    linksResidence,
    residenceProgreess,
    PopularDestination: () =>
      import("../../components/hotel/mainPage/PopularDestination"),
    RecommendedHotel: () =>
      import("../../components/hotel/mainPage/RecommendedHotel.vue"),
    CheapestHotels: () =>
      import("../../components/hotel/mainPage/CheapestHotels.vue"),
    RadarInfo: () => import("../../components/hotel/mainPage/RadarInfo.vue"),
    LazyHydrate,
    SearchSegment,
    faq,
    accommodationFacilitiesResidence,
  },

  data() {
    return {
      sellersLogoArray: [],
      date: new Date(),
      TotalCount: 0,
      Page: 1,
      Size: 10,
      TotalPages: 0,
      Items: [],
    };
  },
  middleware: "cityRedirect",
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "جستجو، مقایسه و رزرو اقامتگاه، بومگردی و اجاره ویلا از بین تمامی فروشندگان آنلاین کشور در موتور جستجوی رادار361 | ارزانترین رزرو اقامتگاه در سراسر کشو",
        },
      ],
      title: "رادار361 | جستجو و رزرو اقامتگاه بومگردی، اجاره ویلا و سوییت",
    };
  },
  computed: {
    ...mapState(["selectedMenu"]),

    cityList() {
      // return ResortStore.of(this.$store).state.defaultCities;
    },
    faqTitle() {
      return "<h3>سوالات متداول شما درباره رزرو اقامتگاه</h3>";
    },
    faqContent() {
      return [
        {
          Question:
            "<h3>انتخاب اقامتگاه بوم گردی برای اقامت در سفر چه مزایایی دارد؟</h3>",
          Answer:
            "<p>اقامت در اقامتگاه بومگردی تجربه‌های متفاوت و مزایای زیادی را می‌تواند به همراه داشته باشد. از جمله این مزایا شامل تجربه سبک زندگی روستایی، صرفه جویی در هزینه‌های سفر، حفظ محیط زیست، آشنایی با آداب و رسوم محلی، توسعه ارتباطات و آشنایی با افراد جدید، کمک به جوامع روستایی و محلی، کمک به تولید اقتصاد اقامتگاه، لذت چشیدن و پختن غذاهای محلی و... هستند.</p>",
        },
        {
          Question: "<h3>آیا اقامتگاه‌های بوم گردی دارای مجوز هستند؟</h3> ",
          Answer:
            "<p>خوب است بدانید که تمامی اقامتگاه‌های بومگردی مجوز دارند و تحت نظر میراث فرهنگی هستند. هر ماه از  محیط اقامتگاه بازرسی می‌شود و نحوه ارائه خدمات و بهداشت آنها کنترل می‌شود. همچنین صدور مجوز اقامتگاه بومگردی به عهده میراث فرهنگی است.</p>",
        },
        {
          Question: "<h3>تفاوت اقامتگاه سنتی با اقامتگاه بومگردی چیست؟</h3>",
          Answer:
            "<p>اقامتگاه سنتی و بوم گردی از لحاظ معماری و شکل ظاهری بیشتر شبیه هم هستند و تفاوت عمده‌ای با یگدیگر ندارند؛ اما شاید خدمات و امکانات آنها با همدیگر فرق کند. برای مثال ممکن است یک اقامتگاه بومگردی، خدمات سرویس بهداشتی به صورت اختصاصی در اتاق‌ها را نداشته باشد؛ اما یک اقامتگاه سنتی، سرویس بهداشتی به صورت خصصوصی هم داشته باشد. البته ناگفته نماند که باز هم بستگی به فضای بزرگ بودن اقامتگاه‌ها دارد.</p>",
        },
        {
          Question: "<h3>چرا از رادار اقامتگاه بوم گردی رزرو کنیم؟</h3> ",
          Answer:
            "<p>رادار361 موتور جستجوی جامع و هوشمند در بستر گردشگری، رزرو هتل، اقامتگاه و بلیط هواپیماست. با کمک گرفتن از موتور جستجوی رادار در یک لیست کامل می‌توانید تمامی اقامتگاه‌های موجود به همراه قیمت و فروشنده‌های مقصد را به راحتی مشاهده کنید و بعد از بررسی، اقدام به رزرو کنید. همچنین قبل از رزرو می‌توانید نظرات دیگران در مورد اقامتگاه را بخوانید، تا آگاهانه رزرو اقامتگاه بومگردی را انجام دهید.</p>",
        },
        {
          Question:
            "<h3>چگونه در بین اقامتگاه‌های بوم گردی، اقامتگاه مورد نظر خود را پیدا کنیم؟</h3>",
          Answer:
            "<p>همانطور که می‌دانید در گوشه کنار محله‌های ایران، اقامتگاه‌های متفاوتی وجود دارد و با توجه به سلیقه هر شخص متفاوت است. برای پیدا کردن اقامتگاه مورد نظر خود، می‌توانید یک سری فاکتورها نظیر مکان اقامتگاه، خدمات و امکانات آنها، چگونگی رزرو آنها با قیمت مناسب، تجربه‌های زندگی روستایی نظیر پختن غذای محلی و یا کار در کارهای مزرعه و... را در نظر داشته باشید.</p>",
        },
        {
          Question: "<h3>تاییدیه رزرو اقامتگاه چیست؟</h3>",
          Answer:
            "<p>تاییدیه سندی است که مشخص می‌کند شما آن اقامتگاه را رزرو کرده‌اید. در تاییدیه رزرو اقامتگاه، مشخصاتی از قبیل نام و نام خانوادگی، تاریخ ورود و خروج، مشخصات و اطلاعات در مورد اقامتگاه ثبت شده است. بعد از اینکه اقامتگاه خود را به صورت آنلاین رزرو کردید، تاییدیه رزرو (واچر) اقامتگاه از طریق ایمیل برای شما ارسال می‌شود. بعد از رفتن به اقامتگاه، به مسئول اقامتگاه بوم گردی نشان می‌دهید و اتاق اقامتگاه خود را تحویل می‌گیرید.</p>",
        },
        {
          Question:
            "<h3>برای ورود به اقامتگاه‌های بوم گردی چه مدارکی لازم است؟</h3>",
          Answer:
            "<p>برای ورود به اقامتگاه سنتی، حتما باید مدارک شناسایی از قبیل شناسامه، کارت ملی و تاییدیه رزرو اقامتگاه را به همراه خود داشته باشید و به مدیریت اقامتگاه نشان دهید، تا کلید اتاق خود را دریافت کنید.</p>",
        },
      ];
    },
  },
  beforeMount() {
    try {
      ResortStore.of(this.$store).loadDefaultCities();
      this.$store.dispatch("Hotel/getAllMainPageRequest");
    } catch (err) {
      this.$nuxt.error(err);
    }
  },

  mounted: function () {
    this.$root.$emit("tabChanged", "Hotel");
    this.shuffle();
  },
  methods: {
    shuffle: function () {
      const array = [
        "alaeddin",
        "eghamat24",
        "jainjas",
        "jabama",
        "snapptrip",
        "hotelyar",
        "egardesh",
      ];
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      this.sellersLogoArray = array;
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
<style scoped>
@import url("~/assets/css/main-pages.css");

.iran-hotelOnline {
  margin-left: 75px;
}

.hotelyar {
  background-image: url("../../assets/images/hotel-provider/hotelyar.svg");
  background-size: 90px;
  width: 90px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
}

.font-size-all {
  font-size: 14px;
}

.boom {
  margin-top: -15px;
}

.snapptrip {
  background-image: url("../../assets/images/hotel-provider/snapptrip.svg");
  background-size: 90px;
  width: 90px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
}

.jainjas {
  background-image: url("../../assets/images/hotel-provider/jainjas.svg");
  background-size: 90px;
  width: 90px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
}

.eghamat24 {
  background-image: url("../../assets/images/hotel-provider/eghamat24.svg");
  background-size: 90px;
  width: 90px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
}

.alaeddin {
  background-image: url("../../assets/images/hotel-provider/alaeddin.svg");
  background-size: 130px;
  width: 130px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
}

.egardesh {
  background-image: url("../../assets/images/hotel-provider/egardesh.svg");
  background-size: 90px;
  width: 90px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
}

.px-10 {
  padding-left: 100px !important;
  padding-right: 100px !important;
}

.codedeveloper {
  border-radius: 20%;
  width: 100px;
  height: 30px;
  margin-right: 15px;
}

.jabama {
  background-image: url("../../assets/images/hotel-provider/jabama.svg");
  background-size: 130px;
  width: 130px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
}

@media (min-width: 767px) and (max-width: 991.98px) {
  .eghamat {
    background-size: 110px;
  }

  .iranhotel {
    background-size: 110px;
  }

  .shab {
    display: none;
  }

  .iran-hotel-All {
    display: none;
  }
}

@media (max-width: 575.98px) {
  .eghamat {
    background-size: 90px;
  }

  .iranhotel {
    background-size: 90px;
  }

  .iran-hotel-All {
    display: none;
  }
}

::v-deep .background-image {
  background-image: url("../../assets/images/resort-bg.jpg");
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 0;
  top: 57px;
  background-size: cover;
}

@media only screen and (max-width: 768px) {
  ::v-deep .background-image {
    background-image: url("../../assets/images/resort-bg.jpg");
    background-size: 100% 173px;
    height: 173px;
    top: 67px;
  }

  .card-one {
    margin-right: 0 !important;
  }

  .boom {
    margin-top: 5px;
  }

  .comment {
    display: flex;
    flex-direction: column;
  }

  .card-two {
    display: flex;
    flex-direction: column;
  }

  .iran-hotel-All {
    display: none;
  }

  .shab {
    display: none;
  }

  .px-9 {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .possibilities {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .px-10 {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

.page-enter-active .background-image {
  transition: all 0.3s ease;
}

.page-leave-active .background-image {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.card-nine {
  width: 760px;
  height: 290;
}

.page-enter .background-image,
.page-leave .background-image {
  opacity: 0;
}
</style>
