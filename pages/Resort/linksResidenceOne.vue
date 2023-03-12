<template>
  <div class="card px-2 col-md-3">
    <div class="d-flex mt-3 justify-content-between">
      <div class="d-flex">
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.125 0.375H2.875C1.25781 0.375 0 1.67773 0 3.25V16.1875C0 17.8047 1.25781 19.0625 2.875 19.0625H7.1875V22.8359C7.1875 23.2852 7.68164 23.5547 8.04102 23.2852L13.6562 19.0625H20.125C21.6973 19.0625 23 17.8047 23 16.1875V3.25C23 1.67773 21.6973 0.375 20.125 0.375Z"
            fill="#D9D9D9"
          />
        </svg>

        <div>{{ data?.length && data[2].Rate }} نظر</div>
      </div>

      <div class="d-flex card-title">
        <div class="text-success">8.3/10</div>
        <div>فوق العاده</div>
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
.card-foghlade {
  width: 16.875rem;
  height: 3.25rem;
}

.codedeveloper {
  border-radius: 20%;
  width: 100px;
  height: 30px;
  margin-right: 15px;
}

@media only screen and (max-width: 750px) {
  .comment {
    display: flex;
    flex-direction: column;
  }

  .boom {
    margin-top: 5px;
  }

  .card-foghlade {
    width: 42rem !important;
    height: 3.25rem !important;
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

  .card-foghlade {
    width: 45rem !important;
    height: 3.25rem !important;
  }
}
</style>