<template>
  <div>
    <a
      v-if="$route.path === '/'"
      href="http://visit.searchfan.ir/account/visit?bk=radar1400we"
      rel="nofollow"
      target="_blank"
      ><img src="../../assets/images/search fan.jpg"
    /></a>
    <a
      v-else-if="$route.path === '/flights/'"
      href="http://visit.searchfan.ir/account/visit?bk=blit1400air"
      rel="nofollow"
      target="_blank"
      ><img src="../../assets/images/search fan.jpg"
    /></a>
    <a
      v-else-if="$route.path === '/mashhad/'"
      href="http://visit.searchfan.ir/account/visit?bk=hotel1200mash"
      rel="nofollow"
      target="_blank"
      ><img src="../../assets/images/search fan.jpg"
    /></a>
    <a
      v-else-if="$route.path === '/kish/'"
      href="http://visit.searchfan.ir/account/visit?bk=kish1400se"
      rel="nofollow"
      target="_blank"
      ><img src="../../assets/images/search fan.jpg"
    /></a>
    <a
      v-else-if="$route.path === '/flights/MHD/'"
      href="http://visit.searchfan.ir/account/visit?bk=radar12google"
      rel="nofollow"
      target="_blank"
      ><img src="../../assets/images/search fan.jpg"
    /></a>
        <a
      v-if="$route.path === '/tehran/'"
      href="http://visit.searchfan.ir/account/visit?bk=tehran1400hotel"
      rel="nofollow"
      target="_blank"
      ><img src="../../assets/images/search fan.jpg"
    /></a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
img {
  width: 100px;
}
</style>