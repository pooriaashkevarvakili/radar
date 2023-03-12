<template>
  <div>
    <div class="mt-5 card">
      <div class="row mt-3">
        <div class="col-2">
          <div class="d-flex flex-column">
            <div>
              <div class="d-flex">
                <div class="circle-three
                                  rounded-circle
                               
                                  d-flex
                                  align-items-center
                                  justify-content-center
                                ">
                  {{ code?.length && code[0].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[0].Name }}</div>
              <div class="text-right">{{ code?.length && code[0].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[0].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-2">
        <img :src="code?.length && code[0].Logo" style="width: 80px; height: 50px" alt="" />
      </div>
    </div>
    <div class="mt-3 card">
      <div class="row mt-3">
        <div class="col-2">
          <div class="d-flex flex-column">
            <div>
              <div class="d-flex">
                <div class="circle-three
                                  rounded-circle
                                  d-flex
                                  align-items-center
                                  justify-content-center
                                ">
                  {{ code?.length && code[1].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[1].Name }}</div>
              <div class="text-right">{{ code?.length && code[0].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[1].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-2">
        <img :src="code?.length && code[1].Logo" style="width: 80px; height: 50px" alt="" />
      </div>
    </div>

    <div class="mt-3 card">
      <div class="row mt-3">
        <div class="col-2">
          <div class="d-flex flex-column">
            <div>
              <div class="d-flex">
                <div class="circle-three
                                  rounded-circle
                                  d-flex
                                  align-items-center
                                  justify-content-center
                                ">
                  {{ code?.length && code[2].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[2].Name }}</div>
              <div class="text-right">{{ code?.length && code[2].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[2].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-3">
        <img :src="code?.length && code[2].Logo" style="width: 80px; height: 50px" alt="" />
      </div>
    </div>
    <residenceCommentsOne :code="code" />
  </div>
</template>

<script>
import residenceCommentsOne from "./residenceCommentsOne.vue";
import Axios from "axios";
export default {
  components: { residenceCommentsOne },
  data() {
    return {
      code: null,
      loading: false,
    };
  },
  async fetch() {
    const code = await Axios.get(
      process.env.VUE_APP_SWAGGER_API +
      "/api/residence/comments?id=1&page=1&size=20"
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

<style>
.circle-three {
  width: 50px;
  height: 49.91px;
  color: #1899a7;
  border: 5px solid #eeeeee;
}
</style>