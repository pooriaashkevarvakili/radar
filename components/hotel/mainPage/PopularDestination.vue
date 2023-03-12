<template>
	<div>
		<div class="container">
			<div class="d-flex align-items-center">
				<h3 class="main-page__title">
					مقاصد گردشگری  پرطرفدار
				</h3>
				<div class="main-page__line" />
			</div>
			<div class="img-row-wrapper">
				<div class="row img-row">
					<div class="first-img">
						<nuxt-link to="/mashhad">
							<img src="~assets/images/mashhad.png" alt="Mashhad">
						</nuxt-link>
						<nuxt-link to="/mashhad" class="city-name">
							<span class="img-row__title">هتل مشهد</span>
						</nuxt-link>
						<span class="img-row__hotel-count">{{ mashhadHotelCount }} هتل</span>
					</div>
					<div class="second-img">
						<nuxt-link to="/kish">
							<img src="~assets/images/kish.png" alt="Kish">
						</nuxt-link>
						<nuxt-link to="/kish" class="city-name">
							<span class="img-row__title">هتل کیش</span>
						</nuxt-link>
						<span class="img-row__hotel-count">{{ kishHotelCount }} هتل</span>
					</div>
					<div class="third-img">
						<nuxt-link to="/tehran">
							<img src="~assets/images/tehran.png" alt="Tehran">
						</nuxt-link>
						<nuxt-link to="/tehran" class="city-name">
							<span class="img-row__title">هتل تهران</span>
						</nuxt-link>
						<span class="img-row__hotel-count">{{ tehranHotelCount }} هتل</span>
					</div>
					<div class="fourth-img">
						<nuxt-link to="/shiraz">
							<img src="~assets/images/shiraz.png" alt="shiraz">
						</nuxt-link>
						<nuxt-link to="/shiraz" class="city-name">
							<span class="img-row__title">هتل شیراز</span>
						</nuxt-link>
						<span class="img-row__hotel-count">{{ shirazHotelCount }} هتل</span>
					</div>
				</div>
			</div>
			<div class="features mt-5">
				<div>
					<div class="d-flex justify-content-center features-wrapper align-items-center">
						<img src="~/assets/images/Vector2.svg" alt="backgroung-vector">
						<div class="features-info d-flex flex-column align-items-center">
							<div v-if="selectedFeature == 1" class="d-flex flex-column align-items-center justify-content-center">
								<img src="~/assets/images/image-3.png" alt="see-all">
								<p class="features__title">
									همه رو ببین
								</p>
								<p class="feature__info">
									از هتل‌های محلی گرفته تا اقامتگاه‌های داخلی
								</p>
								<p class="feature__info">
									میلیون‌ها اتاق را در سراسر ایران کشف کنید.
								</p>
							</div>
							<div v-if="selectedFeature == 2" class="d-flex flex-column align-items-center justify-content-center">
								<img src="~assets/images/image-1.png" alt="compare-in-radar">
								<p class="features__title">
									فقط اینجا مقایسه کن
								</p>
								<p class="feature__info">
									بدون نیاز به جستجو در هر جای دیگر!
								</p>
								<p class="feature__info">
									بزرگترین مرجع سفر همین‌جاست.
								</p>
							</div>
							<div v-if="selectedFeature == 3" class="d-flex flex-column align-items-center justify-content-center">
								<img src="~assets/images/image-2.png" alt="find-cheapest">
								<h3 class="features__title">
									کمترین قیمت رو پیدا کن
								</h3>
								<h3 class="feature__info">
									شاید حتی پیدا کردن سایت یک هتل یا فروشنده
								</h3>
								<h3 class="feature__info">
									گمنام کار سختی باشه، اما ما همه‌رو پیدا می‌کنیم!
								</h3>
							</div>
							<div class="d-flex">
								<div class="features-bullet" :class="[1 == selectedFeature ? 'features-selected-bullet' : '' ]" @click="selectedFeature = 1" />
								<div class="features-bullet" :class="[2 == selectedFeature ? 'features-selected-bullet' : '' ]" @click="selectedFeature = 2" />
								<div class="features-bullet" :class="[3 == selectedFeature ? 'features-selected-bullet' : '' ]" @click="selectedFeature = 3" />
							</div>
						</div>
					</div>
				</div>
				<div class="features__text text-right d-flex flex-column">
					<div class="features__text-title">
						چرا
						<h3>رادار361</h3>
						؟
					</div>
					<p class="features__text-info mt-auto" :style="[seeAllFeatureText ? { 'max-height': '10000000px' } : {}]">
						خیلی از ما چند سال پیش را به خاطر داریم که هنوز امکان رزرو آنلاین هتل فراهم نبود و مجبور بودیم بعد از رسیدن به مقصد هتل‌مان را رزرو کنیم. اگر هم در فصل‌های پر مسافر سفر می‌کردیم، ظرفیت هتل‌های آشنا، تکمیل بود و ناچار بودیم برای پیدا کردن محل اقامت چند ساعتی در شهر بگردیم؛ درنهایت با تکیه بر بخت‌واقبال‌مان هتلی را انتخاب می‌کردیم. با گسترش دنیای اینترنت، امکان رزرو آنلاین به راحتی فراهم شد اما همه فروشندگان به طور میانگین کمتر از 50 درصد گزینه‌ها را نمایش می‌دهند، رادار 361 یک موتور جستجوی جامع هتل، اقامتگاه و پرواز است که به شما امکان جستجو و مشاهده همه هتل‌ها، اقامتگاه‌ها و پروازها را همراه با بررسی و مقایسه همه قیمت‌ها، تصاویر و نظرات ثبت‌شده‌ در وب‌سایت‌های فروشندگان مختلف می‌دهد. به کمک فیلترهای ویژه رادار 361 می‌توانید بهترین هتل، اقامتگاه و پرواز را با ارزان‌ترین قیمت پیدا و رزرو آنلاین کنید.
					</p>
					<span v-if="!seeAllFeatureText" class="see-more-feature-text" @click="seeMoreText()">نمایش بیشتر</span>
					<span v-if="seeAllFeatureText" class="see-less-feature-text" @click="seeAllFeatureText = false">نمایش کمتر</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	name: 'PopularDestination',
	data: function () {
		return {
			features: [1, 2, 3],
			selectedFeature: 1,
			seeAllFeatureText: false
		};
	},
	computed: {
		...mapGetters('Hotel', [
			'kishHotelCount', 'tehranHotelCount', 'mashhadHotelCount', 'shirazHotelCount'
		])

	},
	methods: {
		seeMoreText() {
			this.seeAllFeatureText = true;
		}
	}
};
</script>
<style scoped>
.first-img img, .second-img img, .third-img img, .fourth-img img {
    border-radius: 10px;
    width: 100%;
    height: 280px;
}
.img-row__title {
    font-size: 17px;
    line-height: 22px;
    text-align: right;
    color: white;
    float: right;
    font-weight: 600;
}
.first-img {
    width : calc(100% / 4 )
}
.second-img {
    width: calc(100% / 4 )
}
.third-img {
	padding-left: 20px;
    width: calc(100% / 4 )
}
.fourth-img {
	padding-left: 20px;
	width: calc(100% / 4 )
}
.main-page__title {
    font-size: 19px;
    line-height: 23px;
    text-align: right;
    color: #222222;
    margin: 0px !important;
    font-weight: 600;
}
.main-page__line {
    height: 3px;
    background: #F0F0F0;
    width: calc(100% - 224px);
    margin-right: 14px;
}
.img-row {
    margin-top: 30px;
    min-width: 1110px;
}
.first-img, .second-img {
    padding-left: 20px
}

@media only screen and (max-width: 768px) {
    .img-row__title {
        position: relative;
        top: 0px;
        font-size: 16px;
        line-height: 25px;
        text-align: right;
        color: #FFFFFF;
        right: 0px;
    }
	.main-page__title {
		padding-right: 12px
	}
}
@media only screen and (max-width: 600px) {
    .first-img, .second-img, .third-img, .fourth-img{
        width: 230px !important;
        padding: 0px 10px;
    }
    .first-img img, .second-img img, .third-img img, .fourth-img img  {
        height: 220px;
        object-fit: cover;
    }
    .img-row {
		min-width: 920px !important;
		margin-top: 20px
    }
    .main-page__line {
        display: none;
    }
}
.img-row-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
}
.img-row__hotel-count {
    font-size: 15px;
    color: #FFFFFF !important;
    position: relative;
    top: -35px;
    left: 19px;
    font-weight: 600;
}
.city-name {
    position: relative;
    top: -35px;
    right: 13px;
}
.features__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 31px;
    text-align: center;
    letter-spacing: -0.03em;
    color: #000000;
    margin-bottom: 10px
}
.feature__info {
    font-size: 12px;
    line-height: 19px;
    text-align: center;
    color: #828282;
    margin-bottom: 0px
}
.features {
    display: flex;
}
@media only screen and (max-width: 768px) {
    .features {
		display: none;
        align-items: center;
        flex-direction: column
    }
	.img-row-wrapper  {
		width: calc(100% + 20px);
	}
}
.features-wrapper {
    position: relative;
    margin-left: 70px;
    width: 312px;
    height: 266px
}
.features-info {
    position: absolute;
}
.features__text {
    background-image: url('../../../assets/images/bed-background.svg');
    background-repeat: no-repeat;
    position: relative;
}
.features__text-title {
    font-weight: 800;
    font-size: 19px;
    color: #1D1D1D;
    margin-top: 70px
}
.features__text-title h3 {
	display: inline-block;
	font-size: inherit;
    font-weight: inherit;
}
.features__text-info {
    font-size: 15px;
    line-height: 33px;
    color: #1D1D1D;
    overflow: hidden;
    max-height: 128px;
    margin: 0 auto;
    text-overflow: ellipsis;
    position: relative;
}
.see-more-feature-text::before {
    position: relative;
    content: '...';
    background: #fcfcfc;
    width: 50px;
    color: #1D1D1D;
    margin-left: 10px
}
.features-info img {
    width: 100px
}
.features-bullet {
    width: 7px;
    height: 7px;
    background: rgba(21, 187, 204, 0.3);
    border-radius: 50%;
    margin: 1.5px;
    margin-top: 12px;
	cursor: pointer;
}
.features-selected-bullet {
    background: #1899A7;
}
.see-more-feature-text {
    position: absolute;
    left: -12px;
    bottom: 2px;
    background: #fcfcfc;
    width: 166px;
    color: #EB384D;
    font-size: 15px;
    font-weight: 600;
	cursor: pointer
}
.see-less-feature-text {
    color: #EB384D;
    font-size: 15px;
    font-weight: 600;
	cursor: pointer;
}
</style>
