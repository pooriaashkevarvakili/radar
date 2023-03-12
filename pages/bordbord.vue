<template>
	<div class="bord-bord">
		<div class="top-header">
			<img class="w-100 top-header__img" alt="top-header" src="~/assets/images/top-bg.png">
			<div class="top-header__btn">
				<a class="btn" href="#support">حمایت میکنم</a>
			</div>
			<div class="presell-hotel-wrapper">
				<nuxt-link to="/presell-hotels" class="presell-hotel">
					پیش فروش <span>هتل</span> با قیمت های شگفت انگیز
				</nuxt-link>
			</div>
			<div class="top-header__info-btn">
				<button class="btn">
					الان پیش خرید میکنم
				</button>
				<button class="btn">
					می خواهم بیشتر بدانم
				</button>
			</div>
		</div>
		<div class="wrapper">
			<p class="pooyesh-info__title text-right">
				پویش بُرد بُرد چیست؟
			</p>
			<div class="red-line mb-3" />
			<div class="pooyesh-info row ">
				<div class="d-flex flex-column align-items-baseline col-md-5">
					<p class="text-justify pooyesh-info__text">
						کمپین برد برد یا هدف حمایت کسب و کارهای صنعت گردشگری شکل گرفته است .با شرکت در این پویش می توانید هتل مورد علاقه تان را با قیمت هایی بسیار پایین تر از شرایط عادی پیش خرید کنید  و به هتل ها کمک کنیم تا در این ایام سخت بتوانند بهتر کارمندانشان را پشتیبانی کنندو جلوی ورشکستگی این بخش که موجب بیکاری بخشی از هوطنانمان است را بگیریم.
					</p>
				</div>
				<div class="col-md-7 d-flex flex-column align-items-center">
					<div class="hover d-flex flex-column justify-content-center align-items-center" :class="{'hidden': played}">
						<button class="hover-btn" @click="play()">
							<font-awesome-icon :icon="['fas', 'play']" class="play-icon ml-1 mt-1 fa-style" />
						</button>
						<span class="text-white video-title">تیزر دیجی کالا برای شب یلدا</span>
						<span class="video-time">00:15</span>
					</div>
					<video ref="video" class="video">
						<source src="https://aspb1.cdn.asset.aparat.com/aparat-video/dab990bd2472a9b07ca87274b26c2b868984071-240p.mp4" type="video/mp4">
						<source src="rabbit320.webm" type="video/webm">
						<p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
					</video>
				</div>
			</div>
		</div>
		<div id="support" class="support row container-fluid pt-5">
			<div class="col-md-4 d-flex justify-content-center">
				<div class="white-circle" />
				<img class="support-img" src="~/assets/images/neon-like.png" alt="support img">
			</div>
			<div class="col-md-8 d-flex flex-column align-items-baseline">
				<p class="support__title px-4">
					<img src="~/assets/images/flag-icon.png" alt="flag" class="pl-2">چرا و چگونه از این پویش حمایت کنم؟
				</p>
				<div class="red-line mb-3" />
				<ul class="list-unstyled ml-5">
					<li>
						<p class="text-justify">
							&nbsp;&nbsp;از این پویش حمایت میکنیم تا در کنار صنعت گردشگری ایران و کارمندان زحمتکش این بخش ٬ از ورشکستگی این صنعت و بیکاری بسیاری از هموطنان چلوگیری کنیم و مسيولیت اجتماعی خود را در همراهی با هموطنانمان انجام دهیم .
						</p>
					</li>
					<li>
						<p class="text-justify">
							&nbsp;&nbsp;با اشتراک پست اینستاگرامی مربوط به پویش در صفحه رادار ۳۶۱ به صورت استوری (در صفحات غیر پرایوت ) یا منشن کردن ۵ نفر از دوستانتان در کامن های این پستُ از این جرکت حمایت کنید و از جوایز حامیان بهره مند شوید .
						</p>
					</li>
				</ul>
				<p class="text-center w-100 instagram-info mb-5 pb-4">
					آدرس صفحه اینستاگرام: instagram.com/radar361com
				</p>
			</div>
		</div>
		<p class="text-center warning">
			لازم به ذکر است مجریان این پویش رادار ۳۶۱ و دیبوکینگ ٬ و همچنین حامیان این پویش هیچ کمیسیون یا سود مادی از فرآیند پیش فروش هتل ها در این کمپین نخواهند داشت
		</p>
		<div class="bord-footer d-flex flex-column align-items-center">
			<p class="bord-footer__share">
				با اشتراک پویش از این حرکت اجتماعی حمایت و در این قرعه کشی شرکت کنید :
			</p>
			<div class="justify-content-center d-flex bord-footer__star mt-4 mb-3">
				<img v-for="i in 5" :key="i" alt="star" src="~/assets/images/rounded-star.png">
			</div>
			<p class="bord-footer__reward">
				۵ اقامت ۲ شبه در هر هتل ۵ ستاره که بخواهید !
			</p>
			<img class="bord-footer__plane mt-3 mb-2" alt="bord footer" src="~/assets/images/plane-departure.png">
			<p class="bord-footer__reward">
				۵ بلیط رایگان هواپیما با حمایت مستر بلیط
			</p>
			<p class="bord-footer__info">
				با اشتراک گذاری استوری کمپین و منشن کردن رادار ۳۶۱ ٬ یا گذاشتن کامنت و منشن کردن ۵ نفر ذیل پست کمپین.
			</p>
		</div>
	</div>
</template>
<script>
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faPlay);
export default {
	layout: 'bordBord',
	data: function () {
		return {
			played: false
		};
	},
	methods: {
		play() {
			this.played = true;
			this.$refs.video.play();
			this.$refs.video.controls = true;
		}
	}
};
</script>
<style scoped>
.bord-bord {
    background: white !important;
}
.support {
    background-color: rgb(255, 203, 0);
    margin-top: 10em;

}
.support__title {
    background: #f8334d;
    color: white;
    font-size: 30px;
    font-weight: 600;
    padding: 10px;
    border-radius: 12px;
}

.pooyesh-info__title {
  margin-top: 4em;
  font-size: 35px;
  font-family: "IRANSans", sans-serif;
  color: rgb(41, 41, 41);
  font-weight: bold;
}
.support ul {
    padding-right: 14px
}
.support ul li {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.949);
  line-height: 1.9;
}
.support ul li::before {
    content: ' ';
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgb(255, 0, 58);
    right: 28px;
    margin-top: 12px;
    border-radius: 50%;
}
.red-line {
    height: 2px;
    background: rgb(255, 0, 58);
    width: 200px
}
.pooyesh-info__text {
  font-size: 20px;
  font-family: "IRANSans", sans-serif;
  color: rgba(41, 41, 41, 0.75);
  line-height: 2;
}
.top-header__btn {
    position: absolute;
    top: 10px;
    left: 10%;
}
.top-header__btn a, .top-header__info-btn button {
    font-size: 20px;
    border-radius: 50px;
    border: 1.5px solid white;
    color: white;
    padding: 3px 16px;
    margin-top: 0px;
}
.top-header__info-btn {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 70%
}
.top-header__title {
    color: white;
    position: absolute;
    top: 10%;
    font-size: 20em;
}
.top-header__img {
    box-shadow: 1px 1px 8px 2px #e0dbdb;
}
.top-header {
    height: 100vh;
}
.wrapper {
    padding: 0px 50px
}
.instagram-info {
    font-size: 20px
}
@media screen and (min-width: 768px){
    .top-header__img {
        height: 100vh;
    }
}
@media only screen and (max-width: 768px) {
    .top-header {
        height: auto;
    }
    .top-header__btn a, .top-header__info-btn button {
        font-size: 12px;
    }
    .top-header__info-btn {
        position: relative;
        z-index: 2;
        bottom: 90px;
        text-align: center;
    }
    .wrapper {
        padding: 0px 20px
    }
    .presell-hotel {
        font-size: 24px !important
    }
    .presell-hotel-wrapper {
        position: relative !important;
        z-index: 2;
        bottom: 170px;
    }
}
@media only screen and (max-width: 600px) {
    .wrapper {
        padding: 0px
    }
    .pooyesh-info__title {
        margin-top: 0em !important;
        font-size: 25px !important
    }
    .support-img {
        width: 200px !important;
    }
    .white-circle {
        width: 150px !important;
        height: 150px !important;
    }
    .support__title {
        font-size: 21px !important;
        padding: 10px 0px !important
    }
    .support__title img {
        width: 40px
    }
    .support {
        margin-top: 5em !important
    }
}
@media only screen and (max-width: 500px) {
    .top-header__info-btn {
        bottom: 78px;
    }
    .top-header__btn a, .top-header__info-btn button {
        font-size: 10px;
        padding: 3px 8px;
    }
    .presell-hotel {
        font-size: 16px !important
    }
    .presell-hotel-wrapper {
        position: relative !important;
        z-index: 2;
        bottom: 85px;
    }
}
.video-wrapper {
    width: 900px
}
.white-circle {
    background: white;
    width: 235px;
    height: 235px;
    border-radius: 50%;
}
.support-img {
    width: 300px;
    position: absolute;
    margin-right: 32px;
}
.warning {
    font-size: 18px;
    font-family: "IRANSans", sans-serif;
    color: rgba(0, 0, 0, 0.949);
    line-height: 1.6;
    text-align: center;
    margin: 11px 0px;
}
.bord-footer {
    background: #f8334d;
    padding-top: 6em
}
.bord-footer__share {
    text-align: center;
    color: white;
    font-size: 25px;
    font-weight: 600;
}
.bord-footer__star img {
    width: 40px;
    margin: 0px 5px;
}
.bord-footer__reward {
    font-size: 40px;
    font-weight: 900;
    color: white;
    text-align: center;
    font-family: "lalezar", sans-serif
}
.bord-footer__plane {
    width: 55px
}
.bord-footer__info {
    color: white;
    font-size: 18px;
    margin-top: 6em;
    margin-bottom: 2em;
    text-align: center
}
.hover {
    background: rgba(56, 54, 54, 0.7);
    position: relative;
    z-index: 2;
    top: 305px;
    margin-top: -305px;
}
.video, .hover {
    width: 537px;
    height: 305px
}
@media only screen and (max-width: 1050px) {
    .video, .hover {
        width: 400px;
        height: 228px;
    }
    .hover {
        top: 228px;
        margin-top: -228px;
    }
}
@media only screen and (max-width: 400px) {
    .video, .hover {
        width: 300px;
        height: 198px;
    }
    .hover {
        top: 198px;
        margin-top: -198px;
    }
}
.hover-btn {
    border-radius: 50%;
    background: #f8334d;
    border: none;
    width: 70px;
    height: 70px;
}
.play-icon {
    color: white;
    font-size: 2em;
}
.video-title {
    font-size: 1.5em;
}
.video-time {
    font-size: 1.1em;
    font-weight: 300;
    color: #fff;
    border-radius: 3px;
    padding: .3em .5em;
    margin-top: 1em;
    background-color: rgba(111,114,133,0.9);
}
.hidden {
    display: none !important
}
.presell-hotel {
  font-size: 36px;
  color: rgb(255, 0, 34);
  background: #ffe82a;
  border-radius: 50px;
  font-weight: 600;
  padding: 2px 35px;
}
.presell-hotel-wrapper {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 57%;
}
.presell-hotel span {
    font-weight: 900;
}
</style>
