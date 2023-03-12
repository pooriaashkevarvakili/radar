<template>
  <div class="mt-3">
    <div class="px-10">
      <div class="text-right d-flex">
        <svg
          width="23"
          height="20"
          viewBox="0 0 23 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.25 6.25H16.5V2.5C16.5 1.13281 15.3672 0 14 0H2.75C1.34375 0 0.25 1.13281 0.25 2.5V8.75C0.25 10.1562 1.34375 11.25 2.75 11.25H4V13.2812C4 13.5938 4.19531 13.75 4.46875 13.75C4.54688 13.75 4.625 13.75 4.74219 13.6719L7.75 11.9922V15C7.75 16.4062 8.84375 17.5 10.25 17.5H14L18.2188 19.9219C18.3359 20 18.4141 20 18.5312 20C18.7656 20 19 19.8438 19 19.5312V17.5H20.25C21.6172 17.5 22.75 16.4062 22.75 15V8.75C22.75 7.38281 21.6172 6.25 20.25 6.25ZM4 9.375H2.75C2.39844 9.375 2.125 9.10156 2.125 8.75V2.5C2.125 2.1875 2.39844 1.875 2.75 1.875H14C14.3125 1.875 14.625 2.1875 14.625 2.5V8.75C14.625 9.10156 14.3125 9.375 14 9.375H8.49219L8.0625 9.64844L5.875 10.8984V9.375H4ZM20.875 15C20.875 15.3516 20.5625 15.625 20.25 15.625H17.125V17.1484L14.8984 15.8984L14.4688 15.625H10.25C9.89844 15.625 9.625 15.3516 9.625 15V11.25H14C15.3672 11.25 16.5 10.1562 16.5 8.75V8.125H20.25C20.5625 8.125 20.875 8.4375 20.875 8.75V15Z"
            fill="#EB384D"
          />
        </svg>
        <div class="mr-3">نظرات کاربران</div>
      </div>
      <div class="d-flex justify-content-between mt-3 px-2">
        <div class="fough">
          <div class="d-flex align-items-center justify-content-center">
            <div
              class="circle-one d-flex align-items-center justify-content-center"
            >
              {{ data?.length && data[2].Rate }}
            </div>

            <div class="mr-2">
              <div>فوق العاده</div>
              <div>ازبین154نفر</div>
            </div>
          </div>
        </div>
        <div class="iran-hotel-All">
          <div class="font-size-all">
            <p class="text-muted">اسنپ تریپ (8.710جاباماس)(8.710)</p>
            <p class="iran-hotelOnline text-muted">ایران هتل انلاین(8.1/10)</p>
          </div>
        </div>
        <div class="ml-10 nazar">
          <button
            style="width: 200px; height: 50px"
            class="btn btn-outline-danger"
          >
            <font-awesome-icon :icon="['fas', 'plus']" />

            <span class="mr-3">ثبت نظرجدید</span>
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-between px-2">
        <div class="d-flex flex-column emtiaz">
          <div>امتیاز مسافران</div>
          <div class="text-right d-flex flex-column">
            <div class="d-flex">
              <input type="checkbox" />
              <label class="mt-2 mr-3">فوق العاده</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" />
              <label class="mt-2 mr-3">خیلی خوب</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" />
              <label class="mt-2 mr-3">متوسط</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" />
              <label class="mt-2 mr-3">ضعیف</label>
            </div>
            <div class="d-flex">
              <input type="checkbox" />
              <label class="mt-2 mr-3">خیلی ضعیف</label>
            </div>
          </div>
        </div>
        <div class="w-50">
          <div class="emtiaz-one">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 50%"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="emtiazTwo">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 50%"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="emtiaz-three mt-3">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 50%"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="emtiaz-four mt-3">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 50%"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="emtiaz-five mt-3">
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style="width: 50%"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        <div class="bazeh">
          <div>بازه ثبت نظر</div>
          <div class="text-right">
            <input type="checkbox" />
            <label>بهار</label>
          </div>
          <div class="text-right">
            <input type="checkbox" />
            <label>تابستان</label>
          </div>
          <div class="text-right">
            <input type="checkbox" />
            <label>پاییز</label>
          </div>
          <div class="text-right">
            <input type="checkbox" />
            <label>زمستان</label>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="d-flex justify-content-between">
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  data() {
    return {
      data: null,
      loading: false,
      value: 85,
      max: 50,
      valueOne: 36,
      maxOne: 36,
      valueTwo: 29,
      maxTwo: 29,
      valueThree: 32,
      maxThree: 32,
      valueFour: 20,
      maxFour: 20,
    };
  },
  async fetch() {
    const data = await Axios.get(
      process.env.VUE_APP_SWAGGER_API +
        "/api/residence/comments?id=1&page=1&size=20"
    )
      .then((response) => {
        this.data = response.data.Result;
      })
      .catch((error) => {
        console.log(error);
        errored = true;
      });

    return { data };
  },
};
</script>
<style>
.circle-one {
  background-color: #1899a7;
  width: 60px;
  height: 60px;
  color: #fff;
  border-radius: 20%;
}

.emtiazTwo {
  margin-top: 30px;
}

.emtiaz-four {
  position: relative;
  top: 10px;
}

.emtiaz-five {
  position: relative;
  top: 20px;
}

.emtiaz-one {
  margin-top: 30px;
}

.iran-hotelOnline {
  margin-left: 75px;
}

.hover-red {
  color: #6c757d;
}

.hover-red:hover {
  color: #dc3545;
  cursor: pointer;
}

.font-size-all {
  font-size: 14px;
}

.bazeh {
  margin-left: 60px;
}

@media (min-width: 767px) and (max-width: 991.98px) {
  .iran-hotel-All {
  }

  .bazeh {
    display: none;
  }
}

@media (max-width: 575.98px) {
  .iran-hotel-All {
  }

  .bazeh {
    display: none;
  }
}

@media only screen and (max-width: 768px) {
  .iran-hotel-All {
    display: none;
  }

  .fough {
    position: relative;
    top: 0px;
  }

  .bazeh {
    display: none;
  }

  .nazar {
    position: relative;
    bottom: 40px;
  }

  .emtiaz {
    margin-top: 10px;
  }

  .emtiaz-three {
    position: relative;
    top: 10px;
  }

  .emtiazTwo {
    margin-top: 40px;
  }

  .emtiaz-four {
    position: relative;
    top: 10px;
  }

  .emtiaz-one {
    position: relative;
    top: 20px;
  }

  .emtiaz-five {
    position: relative;
    top: 20px;
  }
}
</style>