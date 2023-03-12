<template>
  <div class="text-right mt-3">
    <div class="d-flex">
      <svg
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.125 4.5H15V2.625C15 1.60938 14.1406 0.75 13.125 0.75H6.875C5.82031 0.75 5 1.60938 5 2.625V4.5H1.875C0.820312 4.5 0 5.35938 0 6.375V16.375C0 17.4297 0.820312 18.25 1.875 18.25H18.125C19.1406 18.25 20 17.4297 20 16.375V6.375C20 5.35938 19.1406 4.5 18.125 4.5ZM6.875 2.625H13.125V4.5H6.875V2.625ZM1.875 16.375V6.375H5V16.375H1.875ZM6.875 16.375V6.375H13.125V16.375H6.875ZM18.125 16.375H15V6.375H18.125V16.375Z"
          fill="#EB384D"
        />
      </svg>
      <div class="mr-3">امکانات</div>
    </div>
    <div class="possibilities container mt-3">
      <div
        v-for="item in code"
        :key="item.id"
        class="bg-light text-center mr-3"
      >
        <img :src="item.Icon" />
        <div>{{ item.Title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      code: null,
    };
  },
  async fetch() {
    const code = await Axios.get(
      process.env.VUE_APP_SWAGGER_API + "/api/residence/meta?id=1"
    )
      .then((response) => {
        this.code = response.data.Result.Amenities;
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
<style>
@media only screen and (max-width: 1000px) {
}
@media only screen and (max-width: 768px) {
  .possibilities {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
.possibilities {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
@media (max-width: 575.98px) {
  .possibilities {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>