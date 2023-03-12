<template>
  <div>
    <div class="mt-3 card">
      <div class="row mt-3">
        <div class="col-2">
          <div class="d-flex flex-column">
            <div>
              <div class="d-flex">
                <div class="
                  circle-three
                          rounded-circle
                          d-flex
                          align-items-center
                          justify-content-center
                        ">
                  {{ code?.length && code[3].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[3].Name }}</div>
              <div class="text-right">{{ code?.length && code[0].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[3].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-3">
        <img :src="code?.length && code[3].Logo" style="width: 80px; height: 50px" alt="" />
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
                  {{ code?.length && code[4].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[4].Name }}</div>
              <div class="text-right">{{ code?.length && code[0].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[4].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-3">
        <img :src="code?.length && code[4].Logo" style="width: 80px; height: 50px" alt="" />
      </div>
    </div>
    <div class="mt-3 card">
      <div class="row mt-3">
        <div class="col-2">
          <div class="d-flex flex-column">
            <div>
              <div class="d-flex">
                <div class="
                  circle-three
                          rounded-circle
                          d-flex
                          align-items-center
                          justify-content-center
                        ">
                  {{ code?.length && code[5].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[5].Name }}</div>
              <div class="text-right">{{ code?.length && code[5].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[5].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-3">
        <img :src="code?.length && code[5].Logo" style="width: 80px; height: 50px" alt="" />
      </div>
    </div>
    <residenceCommentsTwo :code="code" />
  </div>
</template>

<script>
import residenceCommentsTwo from "./residenceCommentsTwo.vue";
export default {
  props: ["code"],
  components: { residenceCommentsTwo },
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