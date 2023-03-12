<template>
	<div class="contact-us">
		<img class="w-100 contact-us-top-img" src="~/assets/images/contact-us.svg" alt="contact us">
		<img class="w-100 contact-us-top-img-mobile d-none" src="~/assets/images/contact-us-mobile.svg" alt="contact us">
		<h3 class="title">
			نظرات و پیشنهادات
		</h3>
		<form class="contact-us-form d-flex flex-column">
			<input v-model="name" type="text" placeholder="نام کامل">
			<input v-model="email" type="text" placeholder="ایمیل">
			<textarea v-model="message" placeholder="متن خود را وارد کنید" />
			<button @click.prevent="submit">
				ارسال
			</button>
		</form>
		<div class="radar-contact">
			<h3 class="title radar-contact-title">
				تماس با ما
			</h3>
			<div class="d-flex flex-column radar-contact__detail">
				<div class="d-flex justify-content-between radar-contact__detail__row">
					<div class="d-flex">
						<span> آدرس:&nbsp;</span>
						<span> اصفهان، میدان آزادی، خیابان ملاصدرا، کوچه پانزدهم، پلاک ۲۵  </span>
					</div>
					<div class="d-flex">
						<span>شماره تلفن:&nbsp;</span>
						<a href="tel:021-61169111"> 021-61169111</a>
					</div>
				</div>
				<div class="d-flex justify-content-between radar-contact__detail__row">
					<div class="d-flex">
						<span>ایمیل:&nbsp;</span>
						<a href="mailto:info@radar361.com">info@radar361.com</a>
					</div>
					<div class="d-flex">
						<span>تبلیغات:&nbsp;</span>
						<a href="tel:09371871952">09371871952</a>
					</div>
				</div>
			</div>
		</div>
		<h3 class="title social-media-title">
			رادار در صفحات اجتماعی
		</h3>
		<div class="social-media d-flex justify-content-between">
			<a href="https://t.me/radar361">
				<img src="~/assets/images/social-media/telegram.svg" alt="telegram icon">
			</a>
			<a href="https://www.instagram.com/radar361com">
				<img src="~/assets/images/social-media/instagram.svg" alt="instagram icon">
			</a>
			<a href="https://www.linkedin.com/company/radar361">
				<img src="~/assets/images/social-media/linkedin.svg" alt="linkedin icon">
			</a>
			<a href="https://twitter.com/radar361">
				<img src="~/assets/images/social-media/twitter.svg" alt="twitter icon">
			</a>
		</div>
		<div v-show="successMessage" id="success-massage">
			پیام شما با موفقیت دریافت شد
		</div>
	</div>
</template>

<script>
import Axios from 'axios';
export default {
	name: 'ContactUs',

	data: function () {
		return {
			name: '',
			email: '',
			message: '',
			btndisabled: false,
			successMessage: false
		};
	},
	methods: {
		submit: function () {
			const that = this;
			this.btndisabled = true;
			const form = new FormData();
			form.append('name', this.name);
			form.append('email', this.email);
			form.append('text', this.message);
			Axios.post('https://flight.radar361.com/api/contactUs', form, { headers: { accept: 'application/vnd.radar361.v1.1+json' } }).then((res) => {
				that.successMessage = true;
				that.btndisabled = false;
				if (res.data.Result) {
					alert('پیام شما با موفقیت ثبت شد.');
				}
			}).catch((err) => {
				alert(err.response.data.Message);
				that.btndisabled = false;
			});
		}
	},
	head() {
		return {
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: ' ارتباط با سایت جستجو و رزرو هتل و پرواز رادار361'
				},
				{
					hid: 'keywords',
					name: 'keywords',
					content: 'تماس با ما, شماره رادار , سایت رادار'
				}
			],
			title: 'رادار361 | تماس با ما'
		};
	}
};
</script>
<style scoped>
.title {
	font-weight: 500;
	font-size: 24px;
	line-height: 38px;
	text-align: right;
	color: #000000;
	position: relative;
	margin: 50px 160px 35px 160px;
}
.title::after {
    content: '';
    width: calc(100% - 195px);
    height: 3px;
    position: absolute;
    left: 1px;
    background: #F0F0F0;
    top: 18px;
}
.contact-us-form {
	background: #ECEBED;
	border: 1px solid #D1D1D1;
	box-sizing: border-box;
	border-radius: 10px;
	margin: 0px 160px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 60px 0px;
}
.contact-us-form input, .contact-us-form button, .contact-us-form textarea {
	width: 468px;
}
.contact-us-form input, .contact-us-form textarea {
	background: #FFFFFF;
	border: 1px solid #D1D1D1;
	box-sizing: border-box;
	border-radius: 9px;
	min-height: 55px;
	padding: 13.5px;
	font-size: 16px;
}
.contact-us-form textarea {
	min-height: 277px
}
.contact-us-form input:nth-child(2) {
	margin: 10px 0px
}
.contact-us-form button {
	background: #EB384D;
	border-radius: 10px;
	color: white;
	font-size: 18px;
	line-height: 28px;
	border: none;
	padding: 13.5px 0px;
	margin-top: 20px
}
::placeholder {
	font-size: 16px;
	line-height: 28px;
	text-align: right;
	color: rgba(153, 153, 153, 0.5);
}
.radar-contact {
	margin-top: 100px;
	background: #FFFFFF;
	border-top: 1px solid #D1D1D1;
	border-bottom: 1px solid #D1D1D1;
}
.radar-contact__detail {
	margin: 0px 160px
}
.radar-contact__detail__row {
	font-size: 20px;
	font-weight: 400
}
.radar-contact__detail__row span:first-child{
	color: #666666
}
.radar-contact__detail__row span:last-child{
	color: #1D1D1D
}
.radar-contact__detail__row:first-child {
	margin-bottom: 35px
}
.radar-contact__detail__row:last-child {
	margin-bottom: 80px
}
.social-media {
	max-width: 800px;
	margin: 0 auto;
	margin-bottom: 100px
}
.social-media a {
	width: 140px;
	height: 140px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ECEBED;
	border: 1px solid #D1D1D1;
	border-radius: 10px;
}
#success-massage {
    width: 100%;
    height: 62px;
    background-color: #BBF2E1;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 600;
    color: #3DD8A8;
    text-align: center;
    padding-top: 18px;
    margin-bottom: 120px;
}
.social-media-title::after {
	width: calc(100% - 245px);
}
.radar-contact-title {
	/* width: calc(100% - 115px); */
}
.contact-us-top-img {
	min-height: 360px;
}
@media only screen and (max-width: 768px) {
	.contact-us-top-img {
		display: none;
	}
	.contact-us-top-img-mobile {
		display: block !important;
		top: 70px;
		margin-bottom: 80px;
		position: relative;
	}
	.title {
		font-weight: 500;
		font-size: 18px;
		margin: 20px;
		text-align: center
	}
	.title::after {
		width: 100%;
		top: 40px
	}
	.contact-us-form {
		margin: 0px;
		background: none;
		border: 0px;
		padding: 20px
	}
	.contact-us-form input, .contact-us-form button, .contact-us-form textarea {
		width: 100%;
	}
	.contact-us-form input:focus, .contact-us-form button:focus, .contact-us-form textarea:focus {
		outline: none
	}
	.contact-us-form input, .contact-us-form textarea {
		font-size: 14px
	}
	::placeholder {
		font-size: 14px
	}
	.contact-us-form button {
		font-size: 20px
	}
	.radar-contact {
		margin: 0px;
		margin-top: 60px;
		border: none;
		padding-top: 20px;
		margin-bottom: 35px
	}
	.radar-contact__detail {
		margin: 0px 20px;
		flex-wrap: wrap;
	}
	.radar-contact__detail__row div {
		display: flex;
		flex-direction: column;
		font-size: 12px;
		text-align: right;
		line-height: 19px;
	}
	.radar-contact__detail__row div:first-child {
		text-align: right;
		width: 60%
	}
	.radar-contact__detail__row div:last-child {
		text-align: right;
		width: 30%
	}
	.radar-contact__detail__row:first-child {
		margin-bottom: 15px;
	}
	.radar-contact__detail__row:last-child {
		margin-bottom: 30px
	}
	.social-media {
		flex-wrap: wrap;
		width: 170px;
		margin-bottom: 40px;
	}
	.social-media a {
		width: 50%;
		border: none;
		background: none;
		height: 80px
	}
	.social-media a img {
		width: 51px
	}
}
</style>
