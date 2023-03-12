<template>
	<div class="register-modal-wrapper">
		<div v-click-outside="close" class="register-modal">
			<div class="register-modal__header">
				<span class="register-modal__header__icon">
					<svg
						v-if="step === 'first' || step === 'loggedIn'"
						width="11"
						height="11"
						viewBox="0 0 11 11"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						@click="$emit('closeRegisterModal')"
					>
						<path d="M6.96875 5L10.3438 1.65625C10.5312 1.46875 10.5312 1.125 10.3438 0.9375L9.5625 0.15625C9.375 -0.03125 9.03125 -0.03125 8.84375 0.15625L5.5 3.53125L2.125 0.15625C1.9375 -0.03125 1.59375 -0.03125 1.40625 0.15625L0.625 0.9375C0.4375 1.125 0.4375 1.46875 0.625 1.65625L4 5L0.625 8.375C0.4375 8.5625 0.4375 8.90625 0.625 9.09375L1.40625 9.875C1.59375 10.0625 1.9375 10.0625 2.125 9.875L5.5 6.5L8.84375 9.875C9.03125 10.0625 9.375 10.0625 9.5625 9.875L10.3438 9.09375C10.5312 8.90625 10.5312 8.5625 10.3438 8.375L6.96875 5Z" fill="black" />
					</svg>
					<svg
						v-else
						width="9"
						height="14"
						viewBox="0 0 9 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						@click="backBtnClick"
					>
						<path d="M1.25 0.21875L0.625 0.8125C0.5 0.96875 0.5 1.21875 0.625 1.34375L6.28125 7L0.625 12.6875C0.5 12.8125 0.5 13.0625 0.625 13.2188L1.25 13.8125C1.40625 13.9688 1.625 13.9688 1.78125 13.8125L8.34375 7.28125C8.46875 7.125 8.46875 6.90625 8.34375 6.75L1.78125 0.21875C1.625 0.0625 1.40625 0.0625 1.25 0.21875Z" fill="black" />
					</svg>

				</span>
				<span v-if="step === 'first'">ورود / ثبت نام</span>
				<span v-if="step === 'register1'">ثبت نام در رادار۳۶۱</span>
				<span v-if="step === 'register2'">تکمیل ثبت نام</span>
				<span v-if="step === 'login'">ورود با رمز یکبار مصرف</span>
			</div>
			<div class="register-modal__body d-flex align-items-center my-auto">
				<div v-if="step === 'first'" class="d-flex flex-column align-items-center w-100">
					<img src="~assets/images/login/smartphone.svg" alt="smartphone">
					<p class="register-modal__body__text">
						برای ورود یا ثبت نام، شماره موبایل خود را وارد کنید:
					</p>
					<input v-model="phoneNumber" class="register-modal__body__input" type="number" placeholder="09xxxxxxxxx">
					<button class="register-modal__body__button" @click="loginFirstStep">
						ورود/ ثبت نام
						<img src="~assets/images/login/arrow-left.svg" alt="arrow left">
					</button>
					<span class="register-modal__body__text">یا:</span>
					<button class="google-login" @click="handleClickSignIn">
						<img src="~assets/images/login/google-icon.svg" alt="google icon">
						ورود از طریق گوگل (Gmail)
					</button>
				</div>
				<div v-if="step === 'loggedIn'" class="d-flex flex-column align-items-center w-100">
					<img src="~assets/images/login/google-login.svg" alt="gppgle login">
					<p class="d-flex flex-column text-center register-modal__body__text">
						<span>سلام {{ userDetail.firstName + ' ' + userDetail.lastName }}!</span>
						<span>به رادار۳۶۱ خوش آمدی.</span>
					</p>
				</div>
				<div v-if="step === 'register1'" class="d-flex flex-column align-items-center w-100">
					<img src="~assets/images/login/register1.svg" alt="register step1">
					<p class="register-modal__body__text">
						کد تایید هویت 5 رقمی برای شماره موبایل {{ phoneNumber }} ارسال شد.
					</p>
					<input v-model="code" class="register-modal__body__input" type="number" placeholder="کد ۵ رقمی دریافت شده را وارد کنید.">
					<button class="register-modal__body__button mb-3" @click="verifySms">
						بررسی کد تایید
						<img src="~assets/images/login/arrow-left.svg" alt="arrow left">
					</button>
					<button class="edit-phone-number" @click.stop="editPhoneNumber">
						ویرایش شماره موبایل
					</button>
					<button class="resend-code" :disabled="timerCount > 0" @click="loginFirstStep">
						ارسال مجدد تا {{ formattedTime }} دیگر
					</button>
				</div>
				<div v-if="step === 'register2'" class="d-flex flex-column mx-auto align-items-cenetr">
					<div class="d-flex flex-column w-100">
						<label class="text-right input-label">نام</label>
						<input v-model="firstName" class="register-modal__body__input mx-auto" type="text" placeholder="نام">
					</div>
					<div class="d-flex flex-column w-100">
						<label class="text-right input-label">نام خانوادگی</label>
						<input v-model="lastName" class="register-modal__body__input" type="text" placeholder="نام خانوادگی">
					</div>
					<div class="d-flex flex-column w-100">
						<label class="text-right input-label">ایمیل(اختیاری)</label>
						<input v-model="email" class="register-modal__body__input" type="text" placeholder="*****">
					</div>
					<button class="register-modal__body__button mb-3 mt-4" @click="signUpUser">
						تکمیل ثبت نام و ورود
						<img src="~assets/images/login/arrow-left.svg" alt="arrow left">
					</button>
				</div>
				<div v-if="step === 'login'" class="d-flex flex-column mx-auto align-items-cenetr">
					<img src="~assets/images/login/register1.svg" alt="register step1">
					<p class="register-modal__body__text">
						رمز یکبار مصرف برای شماره موبایل 09140405004 ارسال شد.
					</p>
					<input class="register-modal__body__input" type="number" placeholder="کد ۵ رقمی دریافت شده را وارد کنید.">
					<button class="register-modal__body__button mb-3" @click="step = 'loggedIn'">
						بررسی رمز و ورود
					</button>
					<button class="google-login w-50">
						ویرایش شماره موبایل
					</button>
					<button class="resend-code" :disabled="timerCount > 0" @click="loginFirstStep">
						ارسال مجدد تا {{ formattedTime }} دیگر
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import UserStore from '~/store/User';
export default {
	directives: {
		ClickOutside
	},
	data() {
		return {
			code: '',
			firstName: '',
			lastName: '',
			email: '',
			timerCount: 180
		};
	},
	computed: {
		step: {
			get() {
				return UserStore.of(this.$store).state.step;
			},
			set(val) {
				console.log(val);
			}
		},
		phoneNumber: {
			get() {
				return UserStore.of(this.$store).state.phoneNumber;
			},
			set(val) {
				UserStore.of(this.$store).phoneNumber = val;
			}
		},
		formattedTime() {
			const mins = ~~((this.timerCount % 3600) / 60);
			const sec = ~~this.timerCount % 60;
			return mins + ':' + sec;
		},
		userInfo() {
			return UserStore.of(this.$store).state.userInfo;
		},
		userDetail() {
			return UserStore.of(this.$store).state.userDetail;
		}
	},
	watch: {
		timerCount: {
			handler(value) {
				if (value > 0 && this.step === 'register1') {
					setTimeout(() => {
						this.timerCount--;
					}, 1000);
				}
			},
			immediate: true // This ensures the watcher is triggered upon creation
		}

	},
	methods: {
		backBtnClick() {
			switch (this.step) {
				case 'register1':
					this.step = 'first';
					break;
				case 'register2':
					this.step = 'register1';
					break;
				case 'login':
					this.step = 'first';
					break;
			}
		},
		close() {
			this.$emit('closeRegisterModal');
		},
		loginFirstStep() {
			UserStore.of(this.$store).loginFirstStep(this.phoneNumber);
		},
		verifySms() {
			UserStore.of(this.$store).verifySms(this.code);
		},
		signUpUser() {
			UserStore.of(this.$store).signUpUser({ firstName: this.firstName, lastName: this.lastName, email: this.email });
		},
		editPhoneNumber() {
			UserStore.of(this.$store).step = 'first';
		},
		async handleClickSignIn() {
			try {
				const googleUser = await this.$gAuth.signIn();
				if (!googleUser) {
					return null;
				}
				console.log('googleUser', googleUser);
				console.log('getId', googleUser.getId());
				console.log('getBasicProfile', googleUser.getBasicProfile());
				console.log('getAuthResponse', googleUser.getAuthResponse());
				console.log(
					'getAuthResponse',
					this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
				);
				UserStore.of(this.$store).isUserSigendIn = this.$gAuth.isAuthorized;
				UserStore.of(this.$store).userInfo = googleUser.getBasicProfile();
				if (this.$gAuth.isAuthorized) {
					UserStore.of(this.$store).step = 'loggedIn';
				}
			} catch (error) {
				// on fail do something
				console.error(error);
				return null;
			}
		}
	}
};
</script>
<style scoped>
:focus-visible {
    outline: none;
}
input, button {
    max-width: 300px;
    width: 300px
}
.register-modal-wrapper {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0px;
	right: 0px;
	z-index: 12;
	background: rgba(28, 28, 28, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
}
.register-modal {
    position: relative;
    width: 500px;
    height: 600px;
    background: white;
    z-index: 20;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
}
.register-modal__header {
    display: flex;
    justify-content: center;
    padding: 15px 0px;
    border-bottom: 1px solid #E6E6E6;
    font-weight: 500;
    font-size: 22px;
    line-height: 50px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
}
.register-modal__header__icon {
    position: absolute;
    right: 20px;
    cursor: pointer;
}
.register-modal__body {
    padding: 35px 60px 50px 60px;
}
.register-modal__body__text {
    font-size: 14px;
    line-height: 30px;
    color: #000000;
    margin-top: 40px;
    margin-bottom: 20px
}
.register-modal__body__input {
    background: #F2F2F2;
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 13px 15px;
    border: none;
    font-size: 14px
}
.register-modal__body__input:focus {
	border: 1px solid #1899A7;
	background: white;
}
.register-modal__body__button {
    background: #EB384D;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 14px;
    line-height: 30px;
    padding: 10px 0px;
    border: none
}
.register-modal__body__button:focus, .google-login:focus, .resend-code:focus {
    outline: none;
}
.google-login {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 14px;
    line-height: 30px;
    padding: 10px 0px;
    border: none
}
.resend-code {
    width: 100%;
    font-size: 14px;
    line-height: 30px;
    padding: 10px 0px;
    border: none;
	background: #EB384D;
    border-radius: 8px;
    color: #FFFFFF;
;
    margin-top: 40px
}
.resend-code:disabled {
	color: #B3B3B3;
	background: #F2F2F2;
}
::placeholder {
    color: #B3B3B3;
    font-size: 14px
}
.input-label {
    color: #000000;
    font-size: 14px;
    line-height: 30px
}
.edit-phone-number {
	background: #FFFFFF;
	box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	border: none;
	width: 150px;
	padding: 10px 0px;
	font-size: 14px
}
@media only screen and (max-width: 768px) {
    .register-modal {
        width: 100%;
        height: 100%;
        left: 0px;
        position: fixed;
        top: 0;
		border-radius: 0px;
    }
    .register-modal__body {
        padding: 0px 30px
    }
    .register-modal__body__text {
        text-align: justify
    }
	.register-modal__header {
		border-bottom: 0px
	}
}
</style>
