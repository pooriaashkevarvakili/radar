<template>
  <div class="container mt-2">
    <div class="d-flex justify-content-between">
      <nuxt-link class="border-radius text-light btn btn-primary text-white" to="/">بعد</nuxt-link>

      <div class="d-flex align-items-center justify-content-center">
        <button class="  border-0">1</button>
        <button class="  border-0">2</button>
        <button class="  border-0">3</button>
        <button class=" border-0">4</button>
        <button class=" border-0">5</button>
      </div>

      <nuxt-link class="border-radius text-light btn btn-primary text-white" to="/">قبل</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
  }
};
</script>

<style>
.border-radius {
  border-radius: 10%;
  width: 100px;
  height: 40px;
}
</style>