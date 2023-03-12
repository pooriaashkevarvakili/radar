<template>
	<div class="mobile-header d-none">
		<div class="logo-wrapper">
			<button class="menu-button">
				<font-awesome-icon :icon="['fas', 'bars']" class="user-icon fa-style" @click.stop="menu = true" />
			</button>
			<nuxt-link to="/">
				<img src="~/assets/images/radar-logo-white-without-text.svg" alt="white logo">
			</nuxt-link>
		</div>
		<div class="mobile-header__title" @click="$emit('openSearchBox')">
			<slot name="content" />
		</div>
		<div class="mr-auto ml-3 text-white">
			<font-awesome-icon :icon="['fas', 'pen']" @click="$emit('openSearchBox')" class="fa-style"/>
		</div>
		<mobile-menu v-show="menu" @clickOutside="closeEvent" :visible="menu" @openRegisterModal="registerModal = true" />
		<register v-show="registerModal" @closeRegisterModal="registerModal = false" />
	</div>
</template>
<script>
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import ClickOutside from 'vue-click-outside';
import Register from '~/components/register';
import MobileMenu from '~/components/layouts/mobileMenu';

library.add(faBars);
export default {
	components: {
		MobileMenu,
		Register
	},
	directives: {
		ClickOutside
	},
	data() {
		return {
			menu: false,
			registerModal: false
		};
	},
	methods: {
		closeEvent() {
			this.menu = false;
		}
	}
};
</script>
<style scoped>
.mobile-header .menu-button{
	background: none;
	border: none;
	outline: none;
	margin-left: 5px;
	color: white
}
.mobile-header .logo-wrapper {
	background: #EB384D;
	height: 72px;
	width: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.mobile-header__title {
	margin-right: 10px;
}
.mobile-header__title-name {
	font-weight: bold;
	font-size: 15px;
	line-height: 23px;
	text-align: right;
	color: #FFFFFF;
}
.mobile-header__title-date {
	font-size: 12px;
	line-height: 19px;
	text-align: right;
	font-weight: 600;
	color: #FCCAD0;
}
@media only screen and (max-width: 768px) {
	.mobile-header {
		display: flex !important;
		background: #F54A5E;
		width: 100%;
		min-height: 72px;
		align-items: center;
	}
}
</style>
