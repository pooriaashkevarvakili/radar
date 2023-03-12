<template>
  <div>
    <div class="footer-row">
      <div class="container">
        <div class="col-link-list">
          <div class="row">
            <div
              v-if="selectedMenu === 'Hotel'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                first-col
              "
            >
              <div class="footer-title">
                <img src="~/assets/images/hotel-footer-icon.svg" alt="icon" />
                <span>هتل‌های محبوب</span>
              </div>
              <nuxt-link class="footer-links" to="/tehran/esteghlal">
                هتل استقلال تهران
              </nuxt-link>
              <nuxt-link class="footer-links" to="/mashhad/darvishi">
                هتل درویشی مشهد
              </nuxt-link>
              <nuxt-link class="footer-links" to="/kish/toranj">
                هتل ترنج کیش
              </nuxt-link>
              <nuxt-link class="footer-links" to="/shiraz/bozorg">
                هتل بزرگ شیراز
              </nuxt-link>
              <nuxt-link class="footer-links" to="/isfahan/abbasi">
                هتل عباسی اصفهان
              </nuxt-link>
            </div>
            <div
              v-if="selectedMenu === 'Hotel'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                second-col
              "
            >
              <div class="footer-title">
                <img
                  src="~/assets/images/map-marker-footer-icon.svg"
                  alt="icon"
                />
                <span>شهرهای محبوب</span>
              </div>
              <nuxt-link class="footer-links" to="/mashhad">
                <span>مشهد</span> / رزرو هتل مشهد
              </nuxt-link>
              <nuxt-link class="footer-links" to="/isfahan">
                <span>اصفهان</span> / رزرو هتل اصفهان
              </nuxt-link>
              <nuxt-link class="footer-links" to="/kish">
                <span>کیش</span> / رزرو هتل کیش
              </nuxt-link>
              <nuxt-link class="footer-links" to="/tehran">
                <span>تهران</span> / رزرو هتل تهران
              </nuxt-link>
              <nuxt-link class="footer-links" to="/qeshm">
                <span>قشم</span> / رزرو هتل قشم
              </nuxt-link>
            </div>
            <div
              v-if="selectedMenu === 'Hotel'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                mobile-first-col
              "
            >
              <div class="footer-title" @click="toggleFirstMenu()">
                <img src="~/assets/images/hotel-footer-icon.svg" alt="icon" />
                <span>هتل‌های محبوب</span>
                <img
                  class="angle-down"
                  src="~/assets/images/footer-angle-down.svg"
                  alt="icon"
                />
              </div>
              <div v-show="firstMenu" class="box">
                <div class="first-box">
                  <nuxt-link class="footer-links" to="/tehran/esteghlal">
                    هتل استقلال تهران
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/mashhad/darvishi">
                    هتل درویشی مشهد
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/kish/toranj">
                    هتل ترنج کیش
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/shiraz/bozorg">
                    هتل بزرگ شیراز
                  </nuxt-link>
                </div>
                <div class="second-box">
                  <nuxt-link class="footer-links" to="/isfahan/abbasi">
                    هتل عباسی اصفهان
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div
              v-if="selectedMenu === 'Hotel'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                mobile-second-col
              "
            >
              <div class="footer-title" @click="toggleSecondMenu()">
                <img
                  src="~/assets/images/map-marker-footer-icon.svg"
                  alt="icon"
                />
                <span>شهرهای محبوب</span>
                <img
                  class="angle-down"
                  src="~/assets/images/footer-angle-down.svg"
                  alt="icon"
                />
              </div>
              <div v-show="secondMenu" class="box">
                <div class="fisrt-box">
                  <nuxt-link class="footer-links" to="/mashhad">
                    رزرو هتل مشهد
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/isfahan">
                    رزرو هتل اصفهان
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/kish">
                    رزرو هتل کیش
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/tehran">
                    رزرو هتل تهران
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/qeshm">
                    رزرو هتل قشم
                  </nuxt-link>
                </div>
                <div class="second-box">
                  <nuxt-link class="footer-links" to="/shiraz">
                    رزرو هتل شیراز
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/yazd">
                    رزرو هتل یزد
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/tabriz">
                    رزرو هتل تبریز
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/ramsar">
                    رزرو هتل رامسر
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/bandar-abbas">
                    رزرو هتل بندرعباس
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div
              v-if="selectedMenu === 'Hotel'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                popular-city
              "
            >
              <nuxt-link class="footer-links" to="/shiraz">
                <span>شیراز</span> / رزرو هتل شیراز
              </nuxt-link>
              <nuxt-link class="footer-links" to="/yazd">
                <span>یزد</span> / رزرو هتل یزد
              </nuxt-link>
              <nuxt-link class="footer-links" to="/tabriz">
                <span>تبریز</span> / رزرو هتل تبریز
              </nuxt-link>
              <nuxt-link class="footer-links" to="/ramsar">
                <span>رامسر</span> / رزرو هتل رامسر
              </nuxt-link>
              <nuxt-link class="footer-links" to="/bandar-abbas">
                <span>بندرعباس</span> / رزرو هتل بندرعباس
              </nuxt-link>
            </div>
            <div
              v-if="selectedMenu === 'Flight'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
              "
            >
              <div class="footer-title">
                <span>شهرهای محبوب</span>
              </div>
              <nuxt-link class="footer-links" to="/flights/THR">
                بلیط هواپیما تهران
              </nuxt-link>
              <nuxt-link class="footer-links" to="/flights/IFN">
                بلیط هواپیما اصفهان
              </nuxt-link>
              <nuxt-link class="footer-links" to="/flights/KIH">
                بلیط هواپیما کیش
              </nuxt-link>
              <nuxt-link class="footer-links" to="/flights/MHD">
                بلیط هواپیما مشهد
              </nuxt-link>
              <nuxt-link class="footer-links" to="/flights/SYZ">
                بلیط هواپیما شیراز
              </nuxt-link>
              <nuxt-link class="footer-links" to="/flights/GSM">
                بلیط هواپیما قشم
              </nuxt-link>
              <nuxt-link class="footer-links" to="/flights/TBZ">
                بلیط هواپیما تبریز
              </nuxt-link>
              <nuxt-link class="footer-links" to="/flights/AWZ">
                بلیط هواپیما اهواز
              </nuxt-link>
              <nuxt-link class="footer-links" to="/flights/BND">
                بلیط هواپیما بندرعباس
              </nuxt-link>
            </div>
            <div
              v-if="selectedMenu === 'Resort'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                first-col
              "
            >
              <div class="footer-title">
                <span>شهرهای محبوب</span>
              </div>
              <nuxt-link class="footer-links" to="/resort/mashhad/">
                هتل آپارتمان مشهد
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/tehran/">
                اجاره سوئیت تهران
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/kish/">
                اجاره سوئیت کیش
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/kashan/">
                اقامتگاه بومگردی کاشان
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/chabahar/">
                اجاره سوئیت چابهار
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/isfahan/">
                اجاره سوئیت اصفهان
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/shiraz/">
                اجاره سوئیت شیراز
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/yazd/">
                اجاره سوئیت یزد
              </nuxt-link>
            </div>
            <div
              v-if="selectedMenu === 'Resort'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                second-col
              "
            >
              <div class="footer-title">
                <span>اجاره ویلا</span>
              </div>
              <nuxt-link class="footer-links" to="/resort/mazandaran/">
                اجاره ویلا شمال
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/ramsar/">
                اجاره ویلا رامسر
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/damavand/">
                اجاره ویلا دماوند
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/chalus/">
                اجاره ویلا چالوس
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/namakabrud/">
                اجاره ویلا نمک آبرود
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/masal/">
                اجاره ویلا ماسال
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/rasht/">
                اجاره ویلا رشت
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/mahmudabad/">
                اجاره ویلا محمودآباد
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/chadegan/">
                اجاره ویلا چادگان
              </nuxt-link>
            </div>
            <div
              v-if="selectedMenu === 'Resort'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                mobile-first-col
              "
            >
              <div class="footer-title">
                <span>شهرهای محبوب</span>
              </div>
              <nuxt-link class="footer-links" to="/resort/mashhad/">
                هتل آپارتمان مشهد
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/tehran/">
                اجاره سوئیت تهران
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/kish/">
                اجاره سوئیت کیش
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/kashan/">
                اقامتگاه بومگردی کاشان
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/chabahar/">
                اجاره سوئیت چابهار
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/isfahan/">
                اجاره سوئیت اصفهان
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/shiraz/">
                اجاره سوئیت شیراز
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/yazd/">
                اجاره سوئیت یزد
              </nuxt-link>
            </div>
            <div
              v-if="selectedMenu === 'Resort'"
              class="
                col-md-3 col-sm-7
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                mobile-second-col
              "
            >
              <div class="footer-title">
                <span>اجاره ویلا</span>
              </div>
              <nuxt-link class="footer-links" to="/resort/mazandaran/">
                اجاره ویلا شمال
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/ramsar/">
                اجاره ویلا رامسر
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/damavand/">
                اجاره ویلا دماوند
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/chalus/">
                اجاره ویلا چالوس
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/namakabrud/">
                اجاره ویلا نمک آبرود
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/masal/">
                اجاره ویلا ماسال
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/rasht/">
                اجاره ویلا رشت
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/mahmudabad/">
                اجاره ویلا محمودآباد
              </nuxt-link>
              <nuxt-link class="footer-links" to="/resort/chadegan/">
                اجاره ویلا چادگان
              </nuxt-link>
            </div>
            <div
              class="
                col-md-3 col-sm-5
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                download-app
              "
            >
              <div class="footer-title">
                <img src="~/assets/images/app-footer-icon.svg" alt="icon" />
                <h1>دانلود اپلیکیشن رادار۳۶۱</h1>
              </div>
              <p>
                با اپلیکیشن رادار، قیمت‌های هتل و هواپیما را ساده‌تر بررسی کنید.
              </p>
              <div class="box-download">
                <a href="#"
                  ><img src="~/assets/images/cafe-bazar.png" alt="Cafebazaar"
                /></a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.radar361"
                  target="_blank"
                  rel="noreferrer"
                  ><img src="~/assets/images/play-store.png" alt="PlayStore"
                /></a>
                <a
                  href="https://sibapp.com/applications/radar361"
                  target="_blank"
                  rel="noreferrer"
                  ><img src="~/assets/images/SibApp.png" alt="sibapp"
                /></a>
              </div>
              <div class="mobile-box">
                <a href="#"
                  ><img src="~/assets/images/cafe-bazar.png" alt="Cafebazaar"
                /></a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.radar361"
                  target="_blank"
                  rel="noreferrer"
                  ><img src="~/assets/images/play-store.png" alt="PlayStore"
                /></a>
                <a
                  href="https://sibapp.com/applications/radar361"
                  target="_blank"
                  rel="noreferrer"
                  ><img src="~/assets/images/SibApp.png" alt="saibapp"
                /></a>
              </div>
            </div>
            <div
              class="
                col-md-3 col-sm-5
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                fast-access
              "
            >
              <div class="footer-title">
                <img
                  src="~/assets/images/fast-access-footer-icon.svg"
                  alt="icon"
                />
                <span>دسترسی سریع</span>
              </div>
              <div class="box-footer">
                <nuxt-link class="footer-links" to="/"> صفحه اصلی </nuxt-link>
                <nuxt-link class="footer-links" to="/ContactUs">
                  تماس با ما
                </nuxt-link>
                <nuxt-link class="footer-links" to="/privacy">
                  حریم خصوصی
                </nuxt-link>
                <nuxt-link class="footer-links" to="/howitwork">
                  رادار چگونه کار می‌کند؟
                </nuxt-link>
                <nuxt-link class="footer-links" to="/iranhotels">
                  هتل های ایران
                </nuxt-link>
              </div>
              <div class="mobile-box">
                <div class="first-box">
                  <nuxt-link class="footer-links" to="/"> صفحه اصلی </nuxt-link>
                  <nuxt-link class="footer-links" to="/ContactUs">
                    تماس با ما
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/iranhotels">
                    هتل های ایران
                  </nuxt-link>
                </div>
                <div class="second-box">
                  <nuxt-link class="footer-links" to="/privacy">
                    حریم خصوصی
                  </nuxt-link>
                  <nuxt-link class="footer-links" to="/howitwork">
                    رادار چگونه کار می‌کند؟
                  </nuxt-link>
                </div>
              </div>
            </div>

            <!-- <div class="col-md-6 col-sm-5 px-0 d-flex flex-column align-items-center align-items-sm-start newsletter" >
              <div class="footer-title">
                <img src="~/assets/images/newsletter-footer-icon.svg" alt="icon"/>
                <span>اشتراک در خبرنامه</span>
              </div>
              <p>از آخرین اخبار و تخفیف‌های هیجان‌انگیز رادار 361 باخبر شوید.</p>
              <form class="news-form">
                <input type="email" class="news-input" placeholder="ایمیل خود را وارد کنید"/>
                <input type="submit" class="news-submit" value="اشتراک"/>
              </form>
            </div> -->
            <div
              class="
                col-md-3 col-sm-5
                px-0
                d-flex
                flex-column
                align-items-center align-items-sm-start
                social
              "
            >
              <div class="footer-title">
                <img src="~/assets/images/share-footer-icon.svg" alt="icon" />
                <span>رادار ۳۶۱ در شبکه‌های اجتماعی</span>
              </div>
              <p>در شبکه‌های اجتماعی همراه ما باشید.</p>
              <div class="social-icon">
                <a href="https://t.me/radar361" class="footer-links"
                  ><img
                    class="telegram"
                    src="~/assets/images/telegram-footer-icon.svg"
                    alt="icon"
                /></a>
                <a
                  href="https://www.instagram.com/radar361com"
                  class="footer-links"
                  ><img
                    src="~/assets/images/instagram-footer-icon.svg"
                    alt="icon"
                /></a>
                <a
                  href="https://www.linkedin.com/company/radar361/"
                  class="footer-links"
                  ><img
                    src="~/assets/images/linkedin-footer-icon.svg"
                    alt="icon"
                /></a>
              </div>
            </div>
            <div
              class="
                col-md-3 col-sm-5
                d-flex
              "
            >
              <search-fan />
            </div>
            <div class="col-md-12 about">
              <hr />
              <p>
                رادار361 "Radar361" یک جستجوگر هتل، اقامتگاه و بلیط هواپیما
                می‌باشد که سایت‌ها و آژانس‌های فروشنده و تامین‌کننده را جستجو
                کرده و امکان مقایسه و خرید
                <a href="https://radar361.com/flights/"> بلیط هواپیما</a> ارزان
                و رزرو هتل و
                <a href="https://radar361.com/resort/">رزرو اقامتگاه</a> را
                فراهم می‌نماید. اگر بخواهیم ساده‌تر بیان کنیم زمانی که شما به
                دنبال خرید بلیط هواپیما،
                <a href="https://radar361.com">رزرو هتل</a> و یا اجاره ویلا
                هستید وارد یک سایت فروش آنلاین شده، جستجو کرده و بلیط خود را
                رزرو می‌نمایید اما با کمک متاسرچ یا همان جستجوگر رادار361
                می‌توانید ده‌ها و حتی صدها آژانس مسافرتی آنلاین و وب‌سایت فروش
                بلیط و رزرواسیون هتل را یک‌جا جستجو کرده و همچنین می‌توانید قیمت
                فروشنده‌ها را مقایسه کرده و در نهایت ارزانترین آن‌ها خرید کنید.
                رادار361 به صورت کامل و 100 درصد تمامی پروازهای داخلی، هتل‌ها و
                اقامتگاه‌ها و ویلاها را پوشش داده و با یک کلیک تمامی این
                فروشنده‌ها را جستجو می‌کند، از آژانس‌های چارتر کننده تا
                آژانس‌های کوچک‌تر! لطفا توجه کنید که
                <a href="https://radar361.com">رادار361</a> ، فروش و یا رزرو
                بلیط هواپیما، هتل و اقامتگاه را انجام نمی‌دهد، بلکه شما را به
                سایت فروشنده اصلی متصل می‌کند و سپس شما قادر خواهید بود که بلیط
                هواپیما، هتل و یا اقامتگاه بومگردی خود را رزرو نمایید.
              </p>
              <p>
                در یک کلام، از بین صدها آژانس مسافرتی، ارزان ترین بلیط هواپیما،
                هتل و اقامتگاه را برای سفرتان پیدا کنید.
              </p>
            </div>
            <div class="mobile-copy-right w-100">
              <div class="social-icon">
                <a href="https://t.me/radar361" class="footer-links"
                  ><img
                    class="telegram"
                    src="~/assets/images/telegram-footer-icon-red.svg"
                    alt="icon"
                /></a>
                <a
                  href="https://www.instagram.com/radar361com"
                  class="footer-links"
                  ><img
                    src="~/assets/images/instagram-footer-icon-red.svg"
                    alt="icon"
                /></a>
                <a
                  href="https://www.linkedin.com/company/radar361/"
                  class="footer-links"
                  ><img
                    src="~/assets/images/linkedin-footer-icon-red.svg"
                    alt="icon"
                /></a>
              </div>
            </div>
          </div>
        </div>
        <img
          class="arrow-top"
          src="~/assets/images/arrow-top.svg"
          alt="icon"
          @click="scrollToTop()"
        />
      </div>
    </div>
    <script
      id="ua-script-yn-1493-adv"
      data-analyticsobject="yektanet"
      type="text/javascript"
      :src="
        'https://cdn.yektanet.com/rg_woebegone/scripts_v2/yn-1493-adv/rg.complete.js?v=' +
        time
      "
      async
    />
  </div>
</template>

<script>
import {
  faInstagram,
  faTelegram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import SearchFan from "./SearchFan.vue";
library.add(faTelegram, faInstagram, faLinkedin);
export default {
  components: { SearchFan },
  data: function () {
    return {
      firstMenu: true,
      secondMenu: true,
      time: Math.floor(new Date().getTime() / 1000 / 60),
    };
  },
  computed: {
    selectedMenu: function () {
      return this.$store.state.selectedMenu;
    },
  },
  methods: {
    scrollToTop: function () {
      window.scrollTo(0, 0);
    },
    toggleFirstMenu: function () {
      if (this.firstMenu) {
        this.firstMenu = false;
      } else {
        this.firstMenu = true;
      }
    },
    toggleSecondMenu: function () {
      if (this.secondMenu) {
        this.secondMenu = false;
      } else {
        this.secondMenu = true;
      }
    },
  },
};
</script>
<style scoped>
.footer-row {
  height: 100%;
  background-color: #f5f7f7;
  padding-top: 15px;
  clear: both;
  position: relative;
}
.first-col {
  display: block;
}
.mobile-first-col {
  display: none !important;
}
.second-col {
  display: block;
}
.mobile-second-col {
  display: none !important;
}
.footer-title {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  text-align: right;
  color: #444444;
  margin-bottom: 20px;
  margin-top: 35px;
}
.footer-title h1 {
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
}
.footer-title span {
  margin-right: 11px;
}
.footer-links {
  font-weight: 500;
  font-size: 14px;
  display: block;
  text-align: right;
  margin-bottom: 5px;
  cursor: pointer;
  text-decoration: none !important;
  line-height: 32px;
  color: #888888;
}
.footer-links span {
  color: #444444;
  font-weight: 600;
}
.footer-links:hover {
  color: #1c1c1c !important;
}
#footer-logo-radar361 {
  height: 41px;
  width: 84px;
  display: block;
  margin: 0px auto 11px auto;
}
.popular-city {
  margin-top: 79px;
}
.download-app p {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  text-align: right;
  color: #888888;
}
.download-app .box-download {
  display: block !important;
  text-align: right;
}
.download-app .box-download img {
  margin-bottom: 10px;
}
.download-app .mobile-box {
  display: none !important;
}
.fast-access .box-footer {
  display: block !important;
}
.fast-access .mobile-box {
  display: none !important;
}
.newsletter p {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 25px;
  text-align: right;
  color: #888888;
  margin-bottom: 18px;
}
.newsletter .news-form {
  width: 450px;
  position: relative;
}
.newsletter .news-form .news-input {
  background: #ffffff;
  border: 1px solid #d1d1d1;
  box-sizing: border-box;
  border-radius: 27px;
  height: 54px;
  width: 100%;
  outline: none;
  padding-right: 22px;
}
.newsletter .news-form .news-input::placeholder {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  text-align: right;
  color: #aaaaaa;
}
.newsletter .news-form .news-submit {
  background: #ff4c67;
  border-radius: 39px 0px 0px 39px;
  height: 54px;
  width: 154px;
  color: #fff;
  border: none;
  position: absolute;
  left: 0;
  outline: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 27px;
}
.social-icon {
  display: inline-flex;
}
.social-icon a {
  margin-left: 26px;
}
.telegram-instagram-color {
  color: #848484 !important;
}
.telegram-instagram-color:hover {
  color: #1c1c1c !important;
}
.linkedin-color {
  width: 20px !important;
  height: 20px;
  margin-right: 30px;
  color: #ffffff;
  background-color: #848484;
  padding: 2px 3px;
  border-radius: 3px;
  cursor: pointer;
}
.linkedin-color:hover {
  background-color: #1c1c1c;
}
.footer-text {
  height: 130px;
  font-size: 12px;
  font-weight: 900;
  text-align: justify;
  color: #c4c4c4;
  margin: 65px 0px 40px 0px;
}
.footer-left-cols {
  width: 100%;
}
.col-link-list {
  width: 100%;
}
.about p {
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  color: #888888;
  margin: 0;
}
.about hr {
  margin: 19px 0 !important;
  border-top: 1px solid #ececec;
}
.about a {
  color: #ff536d !important;
  font-weight: 600;
}
.copy-right {
  background: #dbdbdb;
  height: 70px;
  margin-top: 14px;
  display: block;
}
.copy-right p {
  font-size: 15px;
  line-height: 35px;
  text-align: center;
  color: #888888;
  font-weight: 600;
  padding-top: 17px;
}
.arrow-top {
  position: absolute;
  left: 43px;
  bottom: 112px;
  cursor: pointer;
}
.mobile-copy-right {
  display: none;
}
@media (max-width: 767.98px) {
  .first-col {
    display: none !important;
  }
  .mobile-first-col {
    display: block !important;
  }
  .mobile-first-col .box {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  .mobile-first-col .box .first-box {
    /* margin-left: 80px; */
  }
  .second-col {
    display: none !important;
  }
  .popular-city {
    display: none !important;
  }
  .mobile-second-col {
    display: block !important;
  }
  .mobile-second-col .box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .mobile-second-col .box .fisrt-box {
    /* margin-left: 93px; */
  }
  .footer-row {
    height: 100%;
    padding-top: 0;
    text-align: -webkit-center;
  }
  .footer-row .container {
    padding: 0 !important;
  }
  .footer-left-cols {
    width: 100%;
  }
  .footer-title {
    margin-top: 0;
    font-size: 20px;
    margin-bottom: -1px;
    width: 100%;
    padding: 17px 30px;
    position: relative;
    border-bottom: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    background: #ffffff;
  }
  .first-col .footer-title,
  .second-col .footer-title {
    margin-top: 0;
    font-size: 20px;
    margin-bottom: 10px;
    height: 65px;
    background: #ffffff;
    width: 100%;
    padding: 17px 30px;
    position: relative;
  }
  .footer-links {
    width: 100%;
    padding-right: 20px;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    text-align: right;
    color: #4f4f4f;
  }
  .first-col .footer-links,
  .second-col .footer-links {
    width: 100%;
    margin-right: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    text-align: right;
    color: #4f4f4f;
    padding: 0 67px;
  }
  .download-app {
    background: #f5f5f5;
    padding: 25px 30px !important;
    margin: 0;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
  .download-app .footer-title {
    background: none !important;
    padding: 0 !important;
    border: none;
    margin-bottom: 15px !important;
  }
  .download-app p {
    font-style: normal;
    font-weight: normal;
    font-size: 11px !important;
    line-height: 20px;
    text-align: right;
    color: #4f4f4f;
  }
  .download-app .box-download {
    display: none !important;
  }
  .download-app .mobile-box {
    display: block !important;
    display: inline-flex;
  }
  .download-app .mobile-box img:first-child {
    margin-left: 5px;
  }
  .fast-access {
    padding: 25px 30px !important;
    background: #f5f5f5;
  }
  .fast-access .footer-title {
    background: none;
    border: none;
    padding: 0 !important;
  }
  .fast-access .box-footer {
    display: none !important;
  }
  .fast-access .mobile-box {
    display: flex !important;
    width: 100%;
  }
  .fast-access .mobile-box a {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 40px;
    text-align: right;
    color: #4f4f4f;
  }
  .fast-access .mobile-box .first-box {
    margin-left: 86px;
    padding-right: 10px;
  }
  .footer-title span {
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 30px;
    text-align: right;
    color: #1d1d1d;
  }
  .footer-title img {
    width: 17px;
    height: 15px;
  }
  .second-col img {
    width: 12px;
    height: 15px;
  }
  .footer-title .angle-down {
    position: absolute;
    top: 20px;
    left: 32px;
    width: 13px;
    height: 25px;
  }
  .newsletter .news-form {
    width: 100%;
  }
  .newsletter {
    padding: 25px 20px !important;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    margin: 0 !important;
    background: #f5f5f5;
  }
  .newsletter .footer-title {
    background: none !important;
    padding: 0 !important;
    border: none;
    margin-bottom: 15px !important;
  }
  .newsletter p {
    display: none;
  }
  .newsletter .news-form .news-input {
    height: 55px;
    border-radius: 10px !important;
  }
  .newsletter .news-form .news-submit {
    border-radius: 10px 0px 0px 10px;
    width: 110px;
    height: 55px;
  }
  .social {
    display: none !important;
    border-bottom: 3px solid #e8e8e8;
    padding: 30px 70px;
  }
  .social p {
    font-size: 18px;
    color: #888888;
    margin-bottom: 20px;
  }
  .social-icon a:last-child {
    margin-left: 0;
  }
  .social-icon a img {
    width: 31px;
    height: 40px;
  }
  .social-icon a .telegram {
    width: 34px;
    height: 40px;
  }
  .about {
    padding: 20px 20px;
    background: #f5f5f5;
  }
  .about p {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 27px;
    text-align: right;
    color: #828282;
  }
  .about hr {
    display: none;
  }
  .arrow-top {
    display: none;
  }
  .mobile-copy-right {
    display: block;
    height: 120px;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    color: #828282;
    background: #f5f5f5;
    padding: 15px 43px;
  }
  .mobile-copy-right p {
    margin-bottom: 10px;
  }
  .mobile-copy-right p span {
    color: #4f4f4f !important;
    font-weight: 600 !important;
  }
  .copy-right {
    display: none;
  }
}
</style>
