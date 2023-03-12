<template>
  <div>
    <div class="container">
      <div class="d-flex mt-3 comment justify-content-between">
        <div class="d-flex justify-content-start">
          <nuxt-link to="/">صفحه اصلی</nuxt-link>
          <img class="mt-2" style="width: 12px; height: 12px" src="~assets/images/left-arrow.svg" alt="hotel-icon" />
          <nuxt-link to="/resort">اقامتگاه</nuxt-link>
          <img class="mt-2" style="width: 12px; height: 12px" src="~assets/images/left-arrow.svg" alt="hotel-icon" />
          <nuxt-link to="/isfahan">استان {{ code?.length && code[4].NameFa }}</nuxt-link>
          <img class="mt-2" style="width: 12px; height: 12px" src="~assets/images/left-arrow.svg" alt="hotel-icon" />
          <nuxt-link to="/isfahan">شهر {{ code?.length && code[4].NameFa }}
          </nuxt-link>
        </div>

        <linksResidenceOne />
      </div>
    </div>

    <div class="container mt-5">
      <div class="d-flex boom">
        <h4>اقامتگردی بوم گردی</h4>
        <div class="bg-warning d-flex justify-content-center codedeveloper">
          <span>کد</span>
          <span class="mr-1">128345</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import linksResidenceOne from "./linksResidenceOne.vue";
import Axios from "axios";

export default {
  components: { linksResidenceOne },
  data() {
    return {
      code: null,
      errored: false,
    };
  },
  async fetch() {
    const code = await Axios.get(
      process.env.VUE_APP_SWAGGER_API + "/api/residence/defaultCities"
    )
      .then((response) => {
        this.code = response.data.Result;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      });

    return { code };
  },
};
</script>

<style>
.card-four {
  width: 15rem !important;
  height: 84px !important;
}

.boom {
  margin-top: -15px;
}

.px-10 {
  padding-left: 100px !important;
  padding-right: 100px !important;
}

.codedeveloper {

  width: 100px;
  height: 30px;
  margin-right: 15px;
}

@media only screen and (max-width: 800px) {
  .card-four {
    max-width: 40rem !important;
  }
}

@media only screen and (max-width: 600px) {
  .card-four {
    max-width: 35rem !important;
  }
}

@media only screen and (max-width: 550px) {
  .card-four {
    max-width: 32rem !important;
  }
}

@media only screen and (max-width: 580px) {
  .card-four {
    max-width: 33rem !important;
  }
}

@media only screen and (max-width: 530px) {
  .card-four {
    max-width: 31rem !important;
  }
}

@media only screen and (max-width: 520px) {
  .card-four {
    max-width: 30rem !important;
  }
}

@media only screen and (max-width: 510px) {
  .card-four {
    max-width: 29rem !important;
  }
}

@media only screen and (max-width: 490px) {
  .card-four {
    max-width: 28rem !important;
  }
}

@media only screen and (max-width: 470px) {
  .card-four {
    max-width: 27rem !important;
  }
}

@media only screen and (max-width: 450px) {
  .card-four {
    max-width: 26rem !important;
  }
}

@media only screen and (max-width: 430px) {
  .card-four {
    max-width: 25rem !important;
  }
}

@media only screen and (max-width: 420px) {
  .card-four {
    max-width: 23rem !important;
  }
}

@media only screen and (max-width: 390px) {
  .card-four {
    max-width: 22rem !important;
  }
}

@media only screen and (max-width: 370px) {
  .card-four {
    max-width: 21rem !important;
  }
}

@media only screen and (max-width: 350px) {
  .card-four {
    max-width: 19rem !important;
  }
}

@media only screen and (max-width: 330px) {
  .card-four {
    max-width: 18rem !important;
  }
}

@media only screen and (max-width: 300px) {
  .card-four {
    max-width: 16rem !important;
  }
}

@media only screen and (max-width: 900px) {
  .comment {
    display: flex;
    flex-direction: column;
  }

  .card-four {
    width: 44rem !important;
  }
}

@media only screen and (max-width: 768px) {
  .comment {
    display: flex;
    flex-direction: column;
  }

  .boom {
    margin-top: 5px;
  }

  .px-10 {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
</style>