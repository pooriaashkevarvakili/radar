<template>
	<div id="app">
		<div class="header-row w-100" :class="{'main-page': mainPage, 'hotel-search-header': !mainPage, 'active': active && mainPage}">
			<div class="custom-container">
				<div class="mobile-nav">
					<div class="logo">
						<span class="hamburger-menu">
							<img
								alt="responsive"
								src="~/assets/images/menu.svg"
								@click.stop="toggleMenu"
							>
						</span>
						<a
							href="https://radar361.com/"
						><img
							alt="رزرو هتل در رادار361"
							src="~/assets/images/logo-radar.svg"
							@click="changeTab('Hotel')"
						>
						</a>
						<span class="login-icon">
							<font-awesome-icon :icon="['fas', 'user']" class="user-icon fa-style" @click="toggleRegisterModal" />
						</span>
					</div>
					<div class="login">
						<font-awesome-icon :icon="['fas', 'user']" class="user-icon fa-style" />
					</div>
				</div>
				<div class="main-nav">
					<h2 v-if="mainPage" class="radar-logo" @click="changeTab('Hotel')">
						<a
							title="رادار361 - موتور جستجوی هتل، بلیط هواپیما و اقامتگاه"
							href="https://radar361.com/"
						>

							رادار361 - موتور جستجوی هتل، بلیط هواپیما و اقامتگاه
						</a>
					</h2>
					<h2 v-if="!mainPage" class="inner-page-radar-logo">
						<a
							:title="$route.name === 'flight' ? 'رادار361 - بلیط هواپیما' : 'رادار361 - رزرو هتل' "
							href="https://radar361.com/"
						>
							{{ $route.name === 'flight' ? 'رادار361 - بلیط هواپیما' : 'رادار361 - رزرو هتل' }}
						</a>
					</h2>
					<div class="nav-item d-flex w-100">
						<nuxt-link
							class="category-hotel"
							:class="{ 'category-color': selectedMenu == 'Hotel' }"
							to="/"
							exact
						>
							هتل
							<div class="circle-icon" />
						</nuxt-link>
						<nuxt-link
							class="category-flight"
							:class="{ 'category-color': selectedMenu == 'Flight' }"
							to="/flights"
						>
							هواپیما
						</nuxt-link>
						<div class="circle-icon" />
						<nuxt-link
							class="category-resort"
							:class="{ 'category-color': selectedMenu == 'Resort' }"
							to="/resort"
						>
							اقامتگاه
						</nuxt-link>
						<div class="radar-info">
							<nuxt-link to="/contactUs" class="advertise">
								تبلیغات
							</nuxt-link>
							<div class="circle-icon d-inline-block mx-2" />
							<nuxt-link to="/howitwork" class="advertise">
								رادار چگونه کار می‌کند؟
							</nuxt-link>
							<div class="circle-icon mx-2 d-none" />
							<div v-if="!userDetail.username" class="d-none advertise" @click.stop="registerModal = true">
								ورود/ثبت نام
							</div>
							<div v-else class="d-inline-block user" @click="showLogOut = !showLogOut">
								<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M6.03516 7.19531C6.28125 7.44141 6.69141 7.44141 6.9375 7.19531L12.2695 1.89062C12.5156 1.61719 12.5156 1.20703 12.2695 0.960938L11.6406 0.332031C11.3945 0.0859375 10.9844 0.0859375 10.7109 0.332031L6.5 4.54297L2.26172 0.332031C1.98828 0.0859375 1.57812 0.0859375 1.33203 0.332031L0.703125 0.960938C0.457031 1.20703 0.457031 1.61719 0.703125 1.89062L6.03516 7.19531Z" fill="#EB384D" />
								</svg>
								{{ userDetail.firstName + ' ' + userDetail.lastName }}
							</div>
							<div v-if="showLogOut" class="d-flex justify-content-end">
								<button class="btn logout-btn" @click="logout">خروج</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<mobile-menu v-show="menu" :visible="menu" @clickOutside="closeEvent" @openRegisterModal="registerModal = true" />
		<register v-if="registerModal" @closeRegisterModal="toggleRegisterModal" />
	</div>
</template>
<script>
import ClickOutside from 'vue-click-outside';
import { faTimes, faBars, faUser, faCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Register from '~/components/register';
import MobileMenu from '~/components/layouts/mobileMenu';
import UserStore from '~/store/User';
library.add(faTimes, faBars, faUser, faCircle, faUser);

export default {
	components: {
		Register,
		MobileMenu
	},
	directives: {
		ClickOutside
	},
	props: {
		mainPage: Boolean
	},
	data: function () {
		return {
			menu: false,
			active: false,
			registerModal: false,
			showLogOut: false
		};
	},
	computed: {
		selectedMenu: function () {
			return this.$store.state.selectedMenu;
		},
		userDetail() {
			return UserStore.of(this.$store).state.userDetail;
		}
	},
	watch: {
		'$route.name': {
			handler: function (search) {
				this.menu = false;
				if (this.$route.name === 'Flights' || this.$route.name === 'flightLanding' || this.$route.name === 'FlightContent') {
					this.$store.commit('setSelectedMenu', 'Flight');
				} else if (this.$route.name === 'Resort' || this.$route.name === 'ResortCity') {
					this.$store.commit('setSelectedMenu', 'Resort');
				} else if (this.$route.name === 'CityHotels' || this.$route.name === 'Hotels' || this.$route.name === 'index') {
					this.$store.commit('setSelectedMenu', 'Hotel');
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		toggleRegisterModal() {
			this.registerModal = !this.registerModal;
		},
		closeEvent() {
			this.menu = false;
		},
		toggleMenu() {
			this.menu = !this.menu;
		},
		logout() {
			this.showLogOut = false;
			UserStore.of(this.$store).logoutUser();
		}
	}
};
</script>

<style scoped>
.main-page {
  position: absolute;
  z-index: 2;
  background: white;
  box-shadow: none !important;
  height: 57px;
  border-bottom: 1px solid #EEEEEE;
  transition: all 0.35s ease
}
a {
	color: unset !important
}
.main-nav .nav-item .radar-info .go-to-blog {
  border: 1px solid #EB384D;
  color: #EB384D;
  border-radius: 39px;
  font-weight: 300;
  font-size: 16px;
  line-height: 25px;
  width: 61px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  margin-top: -5px !important;
  background-color: white;
  display: inline-block;
  text-align: center
}
.hotel-search-header .go-to-blog {
	background-color: #EB384D !important;
	color: white !important;
	border-color: white !important;
}
.main-nav .nav-item .radar-info .go-to-blog:focus {
	outline: none;
}

.mobile-nav {
  display: none;
}
.hotel-search-header {
  background-color: #EB384D!important;
  box-shadow: none!important;
}
.hotel-search-header .category-flight, .hotel-search-header .category-hotel, .hotel-search-header .category-color, .hotel-search-header .category-resort
 {
  color: #fff !important;
}
.nav-item a  {
  margin-top: 0px !important
}
.hotel-search-header .circle-icon {
  background-color: #fff!important;
}
.hotel-search-header .main-nav .nav-item .radar-info, .hotel-search-header .main-nav .nav-item .radar-info .user-icon {
  color: #fff!important;
}
.hotel-search-header .main-nav a {
  margin-top: 8px;
}
.login-btn {
	font-size: 15px;
    color: #656565 !important;
}
@media only screen and (max-width: 768px) {
	.hamburger-menu:hover, .hamburger-menu:focus, .login-icon:hover, .login-icon:focus {
		background: #F2F2F2;
		border-radius: 50%;
	}
	.hamburger-menu, .login-icon {
		width: 45px;
		height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
  .active {
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 2;
	transition: all 0.35s ease;
  }
  .category-hotel, .category-flight {
    display: none
  }
  .main-page {
    position: fixed;
    width: 100%;
    background-color: white;
    border-bottom: none !important;
    padding-left: 0px !important;
    height: 67px;
  }
  .radar-info {
    display: none !important;
  }
  .main-nav {
    display: none!important;
  }
  .mobile-nav {
    display: block!important;
    position: relative;
    width: 100%;
  }
  .mobile-nav .logo {
	width: 100%;
    position: absolute;
    top: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
	padding: 0px 5px;
  }
  .mobile-nav .logo .user-icon {
	font-size: 20px;
	color: #656565;
  }
  .mobile-nav .login {
	display: none;
    width: 18px;
    height: 20px;
    position: absolute;
    left: 30px;
    top: 25px;
    color: #EB384D;
  }
}
.main-nav {
  text-align: right;
  display: inline-flex;
  width: 100%;
  position: relative;
  height: 57px;
}
.main-nav .nav-item {
  margin-top: 17px;
  margin-right: 33px;
  display: inline-flex;
}
.main-nav .nav-item .radar-info {
  cursor: pointer;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 23px;
  color: #EB384D;
  position: relative;
  margin-right: auto;
  margin-top: -5px;
}
.main-nav .nav-item .category-hotel {
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 23px;
  text-align: center;
  /* color: #FFFFFF; */
  display: inline-flex;
  margin-right: 7px
}
.circle-icon {
  background: #EB384D!important;
  width: 6px;
  height: 6px;
  border-radius: 100px;
  margin-right: 25px;
  margin-left: 25px;
  margin-top: 11px;
}
.category-color {
  font-size: 16px!important;
  color: #EB384D !important;
  position: relative;
}
.category-flight.category-color::after {
	left: -15px
}
.category-hotel.category-color::after {
	left: 26px;
}
.category-resort.category-color::after {
	left: -10px;
}
.radar-info .user-icon {
  display: none;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 20px;
  text-align: right;
  color: #EB384D;
  margin-right: 14px;
  position: relative;
  top: 2px;
}
.main-page .main-nav {
  padding: 0px 35px;
}
.main-page .advertise {
	font-size: 15px;
	color: #EB384D !important;
	font-weight: unset
}
.advertise {
	font-size: 15px;
	color: white !important
}
.main-page .radar-logo a {
	text-indent: -99999em;
	display: block;
}
.main-page .radar-logo {
	background-image: url('../../assets/images/logo-radar.svg');
	width: 142px;
    height: 43px;
    display: block;
    margin-bottom: 0px;
    margin-top: 7px;
	background-repeat: no-repeat;
}
.inner-page-radar-logo {
	background-image: url('../../assets/images/radar-logo-white.svg');
	width: 142px;
    height: 43px;
    display: block;
    margin-bottom: 0px;
    margin-top: 7px;
	background-repeat: no-repeat;
}
.inner-page-radar-logo a {
	text-indent: -99999em;
	display: block;
}
.user {
	background: #FFE6E8;
	border: 1px solid #EB384D;
	box-sizing: border-box;
	border-radius: 20px;
	font-size: 14px;
	color: #EB384D;
	padding: 5px 15px
}
.logout-btn {
	background: white;
}
</style>
