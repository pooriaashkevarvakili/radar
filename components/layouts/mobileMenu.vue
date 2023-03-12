<template>
	<div class="menu-wrapper" @click.self="close">
		<div class="menu d-flex flex-column">
			<div class="menu__login-btn d-none">
				<button v-if="!userDetail.username" @click.stop="$emit('openRegisterModal')">
					ثبت نام / ورود
				</button>
				<div v-else class="d-flex justify-content-between align-items-center user" @click="showUserActions = !showUserActions">
					<span>{{ userDetail.firstName + ' ' + userDetail.lastName }}</span>
					<svg
						v-if="!showUserActions"
						width="12"
						height="7"
						viewBox="0 0 12 7"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M11.5098 0.890625L11.0273 0.382812C10.9004 0.255859 10.6973 0.255859 10.5957 0.382812L6 4.97852L1.37891 0.382812C1.27734 0.255859 1.07422 0.255859 0.947266 0.382812L0.464844 0.890625C0.337891 0.992188 0.337891 1.19531 0.464844 1.32227L5.77148 6.62891C5.89844 6.75586 6.07617 6.75586 6.20312 6.62891L11.5098 1.32227C11.6367 1.19531 11.6367 0.992188 11.5098 0.890625Z" fill="black" />
					</svg>
					<svg
						v-else
						width="12"
						height="8"
						viewBox="0 0 12 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M0.490234 6.74023C0.354818 6.60482 0.354818 6.46094 0.490234 6.30859L5.82227 1.00195C5.95768 0.849609 6.0931 0.849609 6.22852 1.00195L11.5605 6.30859C11.696 6.46094 11.696 6.60482 11.5605 6.74023L11.0527 7.24805C10.9173 7.40039 10.7734 7.40039 10.6211 7.24805L6.02539 2.65234L1.42969 7.24805C1.27734 7.40039 1.13346 7.40039 0.998047 7.24805L0.490234 6.74023Z" fill="black" />
					</svg>
				</div>
				<div v-if="userDetail.username" class="user-action menu__login-btn border-0 mt-2 p-0" @click="logoutUser">
					<button>خروج از حساب</button>
				</div>
			</div>
			<div class="menu__items-list">
				<nuxt-link to="/" class="d-flex align-items-center menu__items-listــitem">
					<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.4375 2.5C15.6562 2.5 15.875 2.30859 15.875 2.0625V1.1875C15.875 0.96875 15.6562 0.75 15.4375 0.75H0.5625C0.316406 0.75 0.125 0.96875 0.125 1.1875V2.0625C0.125 2.30859 0.316406 2.5 0.5625 2.5H0.972656V13H0.5625C0.316406 13 0.125 13.2188 0.125 13.4375V14.3125C0.125 14.5586 0.316406 14.75 0.5625 14.75H7.125V12.5625C7.125 12.3438 7.31641 12.125 7.5625 12.125H8.4375C8.65625 12.125 8.875 12.3438 8.875 12.5625V14.75H15.4375C15.6562 14.75 15.875 14.5586 15.875 14.3125V13.4375C15.875 13.2188 15.6562 13 15.4375 13H15V2.5H15.4375ZM7.125 3.73047C7.125 3.56641 7.28906 3.375 7.45312 3.375H8.51953C8.68359 3.375 8.875 3.56641 8.875 3.73047V4.79688C8.875 4.96094 8.68359 5.125 8.51953 5.125H7.45312C7.28906 5.125 7.125 4.96094 7.125 4.79688V3.73047ZM7.125 6.35547C7.125 6.19141 7.28906 6 7.45312 6H8.51953C8.68359 6 8.875 6.19141 8.875 6.35547V7.42188C8.875 7.58594 8.68359 7.75 8.51953 7.75H7.45312C7.28906 7.75 7.125 7.58594 7.125 7.42188V6.35547ZM3.625 3.73047C3.625 3.56641 3.78906 3.375 3.95312 3.375H5.01953C5.18359 3.375 5.375 3.56641 5.375 3.73047V4.79688C5.375 4.96094 5.18359 5.125 5.01953 5.125H3.95312C3.78906 5.125 3.625 4.96094 3.625 4.79688V3.73047ZM5.01953 7.75H3.95312C3.78906 7.75 3.625 7.58594 3.625 7.42188V6.35547C3.625 6.19141 3.78906 6 3.95312 6H5.01953C5.18359 6 5.375 6.19141 5.375 6.35547V7.42188C5.375 7.58594 5.18359 7.75 5.01953 7.75ZM5.375 11.25C5.375 9.80078 6.52344 8.625 8 8.625C9.44922 8.625 10.625 9.80078 10.625 11.25H5.375ZM12.375 7.42188C12.375 7.58594 12.1836 7.75 12.0195 7.75H10.9531C10.7891 7.75 10.625 7.58594 10.625 7.42188V6.35547C10.625 6.19141 10.7891 6 10.9531 6H12.0195C12.1836 6 12.375 6.19141 12.375 6.35547V7.42188ZM12.375 4.79688C12.375 4.96094 12.1836 5.125 12.0195 5.125H10.9531C10.7891 5.125 10.625 4.96094 10.625 4.79688V3.73047C10.625 3.56641 10.7891 3.375 10.9531 3.375H12.0195C12.1836 3.375 12.375 3.56641 12.375 3.73047V4.79688Z" fill="#EB384D" />
					</svg>
					<span>هتل</span>
				</nuxt-link>
				<nuxt-link to="/resort" class="d-flex align-items-center menu__items-listــitem">
					<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.78125 3.82422L2.75 7.98047V12.4375C2.75 12.6836 2.94141 12.875 3.1875 12.875H6.25C6.46875 12.875 6.66016 12.6836 6.66016 12.4375V9.8125C6.66016 9.59375 6.87891 9.375 7.09766 9.375H8.84766C9.09375 9.375 9.28516 9.59375 9.28516 9.8125V12.4375C9.28516 12.6836 9.50391 12.875 9.72266 12.875H12.8125C13.0312 12.875 13.25 12.6836 13.25 12.4375V7.95312L8.19141 3.82422C8.13672 3.76953 8.05469 3.74219 8 3.74219C7.91797 3.74219 7.83594 3.76953 7.78125 3.82422ZM15.7383 6.64062L8.82031 0.925781C8.60156 0.761719 8.30078 0.652344 8 0.652344C7.67188 0.652344 7.37109 0.761719 7.15234 0.925781L0.234375 6.64062C0.152344 6.69531 0.0976562 6.80469 0.0976562 6.88672C0.0976562 6.96875 0.152344 7.05078 0.179688 7.10547L0.890625 7.95312C0.945312 8.03516 1.02734 8.0625 1.13672 8.0625C1.21875 8.0625 1.30078 8.03516 1.35547 7.98047L7.78125 2.70312C7.83594 2.64844 7.91797 2.62109 8 2.62109C8.05469 2.62109 8.13672 2.64844 8.19141 2.70312L14.6172 7.98047C14.6719 8.03516 14.7539 8.0625 14.8359 8.0625C14.9453 8.0625 15.0273 8.03516 15.082 7.95312L15.793 7.10547C15.8477 7.05078 15.875 6.96875 15.875 6.88672C15.875 6.80469 15.8203 6.69531 15.7383 6.64062Z" fill="#EB384D" />
					</svg>
					<span>اقامتگاه</span>
				</nuxt-link>
				<nuxt-link to="/flights" class="d-flex align-items-center menu__items-listــitem">
					<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.25 6H10.1055L7.23438 0.996094C7.17969 0.859375 6.98828 0.75 6.85156 0.75H5.07422C4.77344 0.75 4.55469 1.05078 4.63672 1.32422L5.97656 6H3.1875L1.98438 4.44141C1.90234 4.33203 1.79297 4.25 1.65625 4.25H0.5625C0.261719 4.25 0.0429688 4.52344 0.125 4.79688L1 7.75L0.125 10.7305C0.0429688 11.0039 0.261719 11.25 0.5625 11.25H1.65625C1.79297 11.25 1.90234 11.1953 1.98438 11.0859L3.1875 9.5H5.97656L4.63672 14.2031C4.55469 14.4766 4.77344 14.75 5.07422 14.75H6.85156C7.01562 14.75 7.15234 14.668 7.23438 14.5312L10.1055 9.5H13.25C14.207 9.5 15.875 8.73438 15.875 7.75C15.875 6.79297 14.207 6 13.25 6Z" fill="#EB384D" />
					</svg>
					<span>پرواز</span>
				</nuxt-link>
			</div>
			<div class="menu__radar-items d-flex flex-column text-right">
				<a href="https://blog.radar361.com/" target="_blank">مجله رادار۳۶۱</a>
				<nuxt-link to="/howitwork">
					رادار چگونه کار می‌کند؟
				</nuxt-link>
				<nuxt-link to="/howitwork">
					درباره ما
				</nuxt-link>
				<nuxt-link to="/contactUs">
					تماس با ما
				</nuxt-link>
			</div>
			<div class="menu__radar-social-media w-100 d-flex align-items-center justify-content-between">
				<a
					href="https://t.me/radar361"
				>
					<font-awesome-icon :icon="['fab', 'telegram']" class="fa-style"/>
				</a>
				<a
					href="https://www.linkedin.com/company/radar361/"
				>
					<font-awesome-icon :icon="['fab', 'linkedin']" class="fa-style"/>
				</a>
				<a href="https://www.instagram.com/radar361com">
					<font-awesome-icon :icon="['fab', 'instagram']" class="fa-rotate-270 fa-style" />
				</a>
				<a href="https://twitter.com/radar361">
					<font-awesome-icon :icon="['fab', 'twitter']" class="fa-style"/>
				</a>
			</div>
			<div class="menu-footer d-flex align-items-center justify-content-center">
				<span>61169111 (021)</span>
				<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M16.0312 11.3125L12.5312 9.8125C12.4375 9.78125 12.3125 9.75 12.2188 9.75C12.0312 9.75 11.7812 9.875 11.6562 10.0312L10.0938 11.9375C8.03125 10.9375 5.53125 8.46875 4.5625 6.40625L6.46875 4.84375C6.625 4.71875 6.75 4.46875 6.75 4.25C6.75 4.1875 6.71875 4.0625 6.6875 3.96875L5.1875 0.46875C5.0625 0.21875 4.75 0.03125 4.46875 0.03125C4.4375 0.03125 4.375 0.03125 4.3125 0.03125L1.0625 0.78125C0.75 0.84375 0.5 1.1875 0.5 1.5C0.5 9.53125 6.96875 16 15 16C15.3125 16 15.6562 15.75 15.7188 15.4375L16.4688 12.1875C16.4688 12.125 16.4688 12.0625 16.4688 12.0312C16.4688 11.75 16.2812 11.4375 16.0312 11.3125Z" fill="#F9FEFF" />
				</svg>
			</div>
		</div>
	</div>
</template>
<script>
import { faTelegram, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import ClickOutside from 'vue-click-outside';
import UserStore from '~/store/User';
library.add(faTelegram, faLinkedin, faInstagram, faTwitter);
export default {
	directives: {
		ClickOutside
	},
	props: {
		visible: {
			type: Boolean
		}
	},
	data() {
		return {
			showUserActions: false
		};
	},
	computed: {
		userDetail() {
			return UserStore.of(this.$store).state.userDetail;
		}
	},
	methods: {
		close() {
			this.$emit('clickOutside');
		},
		logoutUser() {
			UserStore.of(this.$store).logoutUser();
		}
	}
};
</script>
<style scoped>
.menu-wrapper {
	height: 100%;
	width: 100%;
	position: fixed;
	z-index: 4;
	top: 0;
	right: 0;
	overflow-x: hidden;
	transition: 0.5s;
	clear: both;
	box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
	background: #F2F2F2;
	display: flex;
	flex-direction: column;
	align-items: baseline;
	pointer-events: all;
	background: rgb(41 50 51 / 50%)
}
.menu {
	width: 250px;
	background-color: #fff;
	height: 100%;
	position: relative;
}
.menu__login-btn {
	font-size: 14px;
	padding: 21.5px 20px;
	border-bottom: 5px solid #F2F2F2;
	width: 100%;
	text-align: right;
	background: white;
}
.menu__login-btn button {
	background: none;
	border: none;
	color: #EB384D;
	line-height: 30px;
	padding: 0px
}
.menu__items-list {
	padding: 15px 20px;
	color: #000000;
	font-size: 15px;
	font-weight: 500;
	width: 100%;
	border-bottom: 5px solid #F2F2F2;
	background: white;
}
.menu__items-listــitem {
	line-height: 30px;
	font-weight: 600;
}
.menu__items-listــitem:not(:last-child) {
	margin-bottom: 20px;
}
.menu__items-listــitem span{
	margin-right: 15px
}
.menu__radar-items {
	background: white;
	width: 100%
}
.menu__radar-items a {
	padding: 14.5px 20px;
	color: #000000;
	font-size: 14px;
	font-weight: 600
}
.menu-footer {
	position: absolute;
	bottom: 0px;
	background: #15BBCC;
	color: #F9FEFF;
	font-size: 16px;
	font-weight: 500;
	width: 100%;
	padding: 18px 0px;
	text-align: center
}
.menu-footer svg {
	margin-right: 10px
}
.menu__radar-social-media {
	padding: 0px 37px;
	margin-top: auto;
    margin-bottom: 70px;
}
.menu__radar-social-media svg {
	font-size: 25px;
	color: #EB384D;
}
.user {
	font-weight: 500;
	font-size: 14px;
	color: #000000;
}
</style>
