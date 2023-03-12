<template>
  <div class="container">
    <div class="d-flex mt-4 justify-content-between">
      <div>
        <residencepossibilities />
        <div class="text-right mt-4">
          <div class="d-flex">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0.8125C4.64844 0.8125 0.3125 5.1875 0.3125 10.5C0.3125 15.8516 4.64844 20.1875 10 20.1875C15.3125 20.1875 19.6875 15.8516 19.6875 10.5C19.6875 5.1875 15.3125 0.8125 10 0.8125ZM10 18.3125C5.66406 18.3125 2.1875 14.8359 2.1875 10.5C2.1875 6.20312 5.66406 2.6875 10 2.6875C14.2969 2.6875 17.8125 6.20312 17.8125 10.5C17.8125 14.8359 14.2969 18.3125 10 18.3125ZM10 5.10938C9.0625 5.10938 8.35938 5.85156 8.35938 6.75C8.35938 7.6875 9.0625 8.39062 10 8.39062C10.8984 8.39062 11.6406 7.6875 11.6406 6.75C11.6406 5.85156 10.8984 5.10938 10 5.10938ZM12.1875 15.0312V14.0938C12.1875 13.8594 11.9531 13.625 11.7188 13.625H11.25V9.71875C11.25 9.48438 11.0156 9.25 10.7812 9.25H8.28125C8.00781 9.25 7.8125 9.48438 7.8125 9.71875V10.6562C7.8125 10.9297 8.00781 11.125 8.28125 11.125H8.75V13.625H8.28125C8.00781 13.625 7.8125 13.8594 7.8125 14.0938V15.0312C7.8125 15.3047 8.00781 15.5 8.28125 15.5H11.7188C11.9531 15.5 12.1875 15.3047 12.1875 15.0312Z"
                fill="#EB384D"
              />
            </svg>
            <div class="mr-2">معرفی اقامتگاه</div>
          </div>
          <div style="direction: rtl" class="mr-3 text-right">
            اگر قصد اقامت دریکی اززیباترین ویلاهای چادگان دارید،این ویلا می
            تواند گزینه مناسبی برای شما باشد.دیدمستقیم
          </div>
          <div style="direction: rtl" class="text-right mr-3">
            به ساحل وقرارگیری در بافت سرسبزدهکده ویلایی چادگان باعث شده علاوه
            بردیدعالی ازهمه جهات،درکوتاه ترین
          </div>
          <div style="direction: rtl" class="text-right mr-3">
            باصفاوسرسبزباشد.زمان ممکن به امکانات تفریحی وساحل دسترسی داشته
            باشید.ویلابادواتاق مجزا می تواند گزینه مناسبی
          </div>
          <div style="direction: rtl" class="text-right mr-3">
            برای سفرهای خانوادگی شما به این منطقه باشد.
          </div>
        </div>
        <accommodationConditions />
      </div>
      <dateDayResidence />
    </div>
  </div>
</template>
<script>
import dateDayResidence from "./dateDayResidence.vue";
import accommodationConditions from "./accommodationConditions.vue";
import residencepossibilities from "./residencepossibilities.vue";
export default {
  components: {
    residencepossibilities,
    accommodationConditions,
    dateDayResidence,
  },
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>

<style>
.card-four {
  width: 300px;
  height: 50px;
}
.radius-one {
  border-radius: 10%;
  width: 18rem;
}
.card-one {
  width: 760px;
  height: 50px;
}
.card-three {
  width: 320px;
  height: 250px;
}
@media only screen and (max-width: 1000px) {
  .shab {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
  .possibilities {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .card-grid {
    margin-top: 0 !important;
  }
  .shab {
    display: none;
  }
  .card-one {
    width: 450px;
    height: 50px;
  }
  .card-template-one {
    display: flex;
    flex-direction: column;
  }
  .px-10 {
    padding-left: 20px !important;
    padding-right: 20px !important;
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
  .card-grid {
    margin-top: 0 !important;
  }
}
</style>