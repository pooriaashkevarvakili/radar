<template>
  <div>
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
                  {{ code?.length && code[6].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[6].Name }}</div>
              <div class="text-right">{{ code?.length && code[6].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[6].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-3">
        <img :src="code?.length && code[6].Logo" style="width: 80px; height: 50px" alt="" />
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
                  {{ code?.length && code[7].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[7].Name }}</div>
              <div class="text-right">{{ code?.length && code[7].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[7].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-3">
        <img :src="code?.length && code[7].Logo" style="width: 80px; height: 50px" alt="" />
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
                  {{ code?.length && code[8].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[8].Name }}</div>
              <div class="text-right">{{ code?.length && code[8].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[8].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-3">
        <img :src="code?.length && code[8].Logo" style="width: 80px; height: 50px" alt="" />
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
                  {{ code?.length && code[9].SourceId }}
                </div>
              </div>
              <div>{{ code?.length && code[9].Name }}</div>
              <div class="text-right">{{ code?.length && code[9].Date }}</div>
            </div>
          </div>
        </div>
        <div class="col-10">
          <div class="d-flex mr-5">
            {{ code?.length && code[9].Description }}
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end px-3">
        <img :src="code?.length && code[9].Logo" style="width: 80px; height: 50px" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["code"],
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