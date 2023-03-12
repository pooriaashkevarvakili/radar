<template>
	<div>
		<Header :main-page="true" />
		<nuxt />
		<user-satisfaction />
		<Footer />
	</div>
</template>
<script>
import Header from '~/components/layouts/Header';
import Footer from '~/components/layouts/Footer';
import Faq from '~/components/faq';
import UserSatisfaction from '~/components/hotel/mainPage/UserSatisfaction.vue';
export default {
	components: {
		Header,
		Footer,
		UserSatisfaction,
		Faq
	},
	data() {
		return {
		};
	}
};
</script>
<style>
.home-page .home-page__container{
  background: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1150px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);
}
.homepage-view {
	/* height: 688px; */
	transition: padding-top 0.3s;
	position: relative;
	overflow: hidden;
	/* background: #F7F7F7; */
}
.advertise {
	font-weight: 600;
	font-size: 24px;
	color: #FFFFFF;
	text-align: right;
	opacity: 1;
	transition: opacity 0.1s;
	margin-bottom: 64px;
}
.advertise-display {
    opacity: 0;
}
.category {
	margin-right: 35px;
	position: relative;
	z-index: 10;
	bottom: 19px;
}
.category a {
	background: #FDFDFD;
	width: 90px;
	height: 90px;
	font-weight: normal;
	font-size: 14px;
	line-height: 22px;
	text-align: center;
	color: #B2B2B2;
	border-radius: 8px;
	margin-left: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
	filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.12));
}
.selected-menu::after {
	position: absolute;
	content: '';
	width: 0;
	height: 0;
	border-left: 17px solid transparent;
	border-right: 17px solid transparent;
	border-top: 17px solid white;
	bottom: -17px
}
.category a img {
	display: block;
	margin: 14px auto 0 auto;
}
.search {
	position: relative;
	margin-bottom: 27px;
}
#header-logo-radar361 {
	margin-top: 8px;
}
::v-deep .faq-container {
	border-bottom: 1px solid #d1d1d1;
}
@media only screen and (max-width: 1100px) {
	.home-page .home-page__container {
		/* margin: 0px 20px; */
	}
	#hotelpage .home-page__container {
		margin: 0px;
		padding: 0px !important;
		box-shadow: none !important;
	}
}
@media only screen and (min-width: 1000px) {
	.curve-background {
		padding-top: 120px
	}
}
@media only screen and (max-width: 1000px) {
	.advertise {
		flex-direction: column !important;
	}
}
@media screen and (max-width: 900px) {
	.category {
		margin-right: 6%;
	}
}
.selected-menu {
	color: #EB384D !important;
}
@media (max-width: 767.98px) {
	.category {
		margin-right: 10%;
		margin-bottom: -15px;
		z-index: 1;
	}
	.category a {
		width: 80px;
		height: 80px
	}
	.home-page__container {
		padding: 20px 15px !important;
	}
	.homepage-view {
		padding-top: 70px;
		/* min-height: 740px */
	}
	.advertise {
		font-weight: 600 !important;
	}
	.advertise {
		line-height: 40px;
		font-size: 19px;
		flex-direction: column !important;
	}
}
@media (max-width: 575.98px) {
	.homepage-view {
		padding-top: 160px;
	}
	::v-deep .faq-container .title{
		padding: 0px 10px
	}
}
@media (max-width: 400px) {
	.advertise {
		font-size: 16px !important
	}
}
html[iranhotels-page] .faq-container{
	display: none;
}
</style>
