<template>
	<div>
		<Header :class="{'city-page-mobile': cityPage}" :main-page="false" />
		<nuxt />
		<user-satisfaction />
		<Footer />
	</div>
</template>

<script>
import Header from '~/components/layouts/Header';
import Footer from '~/components/layouts/Footer';
import UserSatisfaction from '~/components/hotel/mainPage/UserSatisfaction.vue';
export default {
	components: {
		Header,
		Footer,
		UserSatisfaction
	},
	data: function () {
		return {
			// selectedMenu: "Hotel",
			refreshSelectedMenu: false
		};
	},

	computed: {
		selectedMenu: function () {
			return this.$store.state.selectedMenu;
		},
		cityPage: function () {
			return this.$route.params.origin || this.$route.path === '/presell-hotels' || this.$route.name === 'ResortCity';
		}
	},
	head: {
		link: [
			{
				rel: 'icon',
				href: '/logo-favicon.svg'
			}
		]
	}

};
</script>
<style>
.icon {
  display: none;
  float: left;
  font-size: 25px;
  color: #FF4C67;
  cursor: pointer;
}
.container {
  padding-right: 0px;
  padding-left: 0px;
}
.row {
  margin-right: 0px;
  margin-left: 0px;
}
::placeholder {
  color: #444444;
}
#box-result {
    width: 33%;
    height: 35px;
    margin-top: 10px;
}
.box-carts {
    width: calc(100% - 300px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: auto
}
.share-mobile {
    display: none;
}
.share-mobile .row.justify-content-between {
    display: block;
}
div.loader {
    width: 100px;
    margin: 40px auto;
    height: 100px;
    background: url("../assets/images/loader.gif") no-repeat;
}
.flights {
    width: 100%;
    margin-bottom: 20px
}
#no-result {
  margin: 10px 0;
  height: calc(100vh - 580px)
}
#no-result-for-day {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 31px;
  text-align: center;
  color: #EB384D;
  margin-top: 14px;
}
#go-another-day {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: rgba(15, 19, 28, 0.54);
  text-align: center;
	margin-top: 16px;
}
@media (min-width: 767px) and (max-width: 991.98px) {
  .box-carts {
    width: calc(100% - 255px) !important
  }
}
@media (max-width: 767.98px) {
  .price {
    font-size: 12px;
  }
}
@media (max-width: 575.98px) {
  .price {
    font-size: 13px;
  }
}
.reversed {
  transition: none !important;
}

/* .menu {
  padding: 10px;
  clear: both;
  background-color: #fff;
  position: absolute;
  width: 100%;
  z-index: 2;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0px 1px 6px 1px #d9d2d2;
}
.menu a {
  color: #666666;
  padding:10px 5px;
  width: 100%;
  text-align: right
}
.menu a:first-child {
  border-bottom: 1px solid #e7e7e7
}
.menu-icon {
  width: 25px;
  margin-left: 10px
} */

@media (min-width: 1150px) {
  .container {
    max-width: 1150px;
  }
}
@media (max-width: 767.98px) {
  .contact {
    margin-top: 0;
    font-size: 16px;
    display: none;
  }
  .clear-history {
    color: #08b6c5;
    margin-left: 4%;
  }
  .icon {
    display: block;
  }
}
@media (max-width: 575.98px) {
  .container {
    max-width: none;
  }
  .container {
    max-width: 100%;
    padding: 0 20px;
  }

  .clear-history {
    width: 105px;
    height: 35px;
    margin-left: 0px;
    background: #F4F4F4;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
    line-height: 23px;
    color: #EB384D;
    padding: 5px 10px;
    text-align: center;
  }
}
@media (max-width: 767.98px) {
  .city-page-mobile {
    display: none;
  }
  .share-row {
      display: none;
  }
  #box-result {
      height: 27px;
      width: 97%;
  }
  .box-carts {
      width: 88% !important;
      margin: auto;
  }
  .share-mobile {
      display: block;
  }
  #no-result {
      width: 100% !important;
      height: auto !important;
      margin: 0px 0px 30px 0px !important;
  }
  #no-result-for-day {
      font-size: 22px !important;
  }
  #go-another-day {
      font-size: 17px;
  }
  .flights {
      margin-top: 0px;
  }
}
@media /*(min-width: 320px) and*/ (max-width: 575.98px) {
  .share-row {
      display: none;
  }
  #box-result {
      width: 100%;
      height: 27px;
  }
  .box-carts {
      width: 100% !important;
      margin: auto;
  }
  .share-mobile {
      display: block;
  }
  #no-result {
      width: 100% !important;
      height: auto !important;
      margin: 50px 0px 0px 0px !important;
  }
  #no-result-for-day {
      font-size: 20px !important;
  }
  #go-another-day {
      font-size: 16px;
  }
}
</style>
