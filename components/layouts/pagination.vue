<template>
  <div>
    <client-only>
      <paginate
        :force-page="forcePage - 1"
        :page-count="pageCount"
        :click-handler="clickHandler"
        :container-class="'pagination-container'"
        :prev-text="prev"
        :next-text="next"
        :page-range="7"
        :margin-pages="0"
        :prev-class="'prev-btn'"
        :page-class="'page-item'"
        :next-class="'next-btn'"
      />
    </client-only>
  </div>
</template>

<script>
import Vue from "vue";
let paginate;
if (process.client) {
  paginate = require("vuejs-paginate");
  Vue.component("paginate", paginate);
}
export default {
  props: {
    pageCount: {
      type: Number,
      default: 0,
    },
    forcePage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      prev:
        '<span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.17773 11.301C6.02539 11.4364 5.88151 11.4364 5.74609 11.301L0.439453 5.96899C0.287109 5.83358 0.287109 5.69816 0.439453 5.56274L5.74609 0.230713C5.88151 0.0952962 6.02539 0.0952962 6.17773 0.230713L6.68555 0.738525C6.82096 0.873942 6.82096 1.01782 6.68555 1.17017L2.75 5.10571H11.4082C11.6113 5.10571 11.7129 5.20728 11.7129 5.4104V6.12134C11.7129 6.32446 11.6113 6.42603 11.4082 6.42603H2.75L6.68555 10.3616C6.82096 10.5139 6.82096 10.6578 6.68555 10.7932L6.17773 11.301Z" fill="#B3B3B3" /></svg> قبلی </span>',
      next:
        '<span> بعدی <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.34766 0.256104L5.83984 0.738525C5.71289 0.865479 5.71289 1.0686 5.83984 1.17017L9.77539 5.10571H1.11719C0.939453 5.10571 0.8125 5.25806 0.8125 5.4104V6.12134C0.8125 6.29907 0.939453 6.42603 1.11719 6.42603H9.77539L5.83984 10.387C5.71289 10.4885 5.71289 10.6917 5.83984 10.8186L6.34766 11.301C6.44922 11.428 6.65234 11.428 6.7793 11.301L12.0859 5.99438C12.2129 5.86743 12.2129 5.6897 12.0859 5.56274L6.7793 0.256104C6.65234 0.12915 6.44922 0.12915 6.34766 0.256104Z" fill="white"/></svg></span>',
      page: 1,
    };
  },
  methods: {
    clickHandler(page) {
      this.$emit("loadMoreComments", page);
    },
  },
  computed: {},
};
</script>
<style scoped>
.pagination-container {
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 3px 3px 15px 15px;
  padding: 25px 30px;
  display: flex;
  list-style: none;
  direction: ltr;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
}
::v-deep .page-item {
  min-width: 40px;
  min-height: 40px;
  margin: 0px 5px;
  color: #333333;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .next-btn {
  margin-left: auto;
}
::v-deep .prev-btn {
  margin-right: auto;
}
::v-deep .prev-btn,
::v-deep .next-btn {
  border-radius: 8px;
  padding: 8px 25px;
  font-size: 16px;
  background: #15bbcc;
  color: white;
}
::v-deep .prev-btn svg path,
::v-deep .next-btn svg path {
  fill: white;
}
::v-deep .prev-btn.disabled svg path,
::v-deep .next-btn.disabled svg path {
  fill: #b3b3b3;
}
::v-deep .prev-btn span,
::v-deep .next-btn span {
  color: white;
}
::v-deep .prev-btn.disabled,
::v-deep .next-btn.disabled {
  background: #f2f2f2;
}
::v-deep .prev-btn.disabled span,
::v-deep .next-btn.disabled span {
  color: #b3b3b3;
}
::v-deep .page-item.active {
  background: #f2f2f2;
  border-radius: 8px;
}
@media only screen and (max-width: 768px) {
  ::v-deep .next-btn,
  ::v-deep .prev-btn {
    position: absolute;
    top: 0px;
  }
  ::v-deep .next-btn {
    right: 30px;
  }
  ::v-deep .prev-btn {
    left: 30px;
  }
  .pagination-container {
    padding-top: 45px;
    margin-top: 15px;
  }
  ::v-deep .page-item {
    margin: 0px;
  }
}
</style>
