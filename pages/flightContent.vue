<template>
	<div class="main-page">
		<div class="homepage-view">
			<div class="curve-background">
				<div class="container text-right">
					<div
						class="advertise d-flex w-100 align-items-baseline justify-content-center"
					>
						<div class="title">
							<h1 class="m-0">
								بلیط هواپیما {{ cityNameFa }}
							</h1>
						</div>
					</div>
				</div>
				<div class="search-container">
					<div class="category d-flex ">
						<nuxt-link to="/">
							<svg
								class="desktop-img"
								width="33"
								height="30"
								viewBox="0 0 33 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M31.8683 4.60057C32.3203 4.60057 32.7723 4.20506 32.7723 3.69655V1.88851C32.7723 1.43651 32.3203 0.984497 31.8683 0.984497H1.1317C0.623186 0.984497 0.227678 1.43651 0.227678 1.88851V3.69655C0.227678 4.20506 0.623186 4.60057 1.1317 4.60057H1.97921V26.297H1.1317C0.623186 26.297 0.227678 26.749 0.227678 27.201V29.0091C0.227678 29.5176 0.623186 29.9131 1.1317 29.9131H14.692V25.393C14.692 24.941 15.0875 24.489 15.596 24.489H17.404C17.856 24.489 18.308 24.941 18.308 25.393V29.9131H31.8683C32.3203 29.9131 32.7723 29.5176 32.7723 29.0091V27.201C32.7723 26.749 32.3203 26.297 31.8683 26.297H30.9643V4.60057H31.8683ZM14.692 7.14312C14.692 6.80411 15.031 6.4086 15.37 6.4086H17.5735C17.9125 6.4086 18.308 6.80411 18.308 7.14312V9.34666C18.308 9.68567 17.9125 10.0247 17.5735 10.0247H15.37C15.031 10.0247 14.692 9.68567 14.692 9.34666V7.14312ZM14.692 12.5672C14.692 12.2282 15.031 11.8327 15.37 11.8327H17.5735C17.9125 11.8327 18.308 12.2282 18.308 12.5672V14.7708C18.308 15.1098 17.9125 15.4488 17.5735 15.4488H15.37C15.031 15.4488 14.692 15.1098 14.692 14.7708V12.5672ZM7.45982 7.14312C7.45982 6.80411 7.79883 6.4086 8.13783 6.4086H10.3414C10.6804 6.4086 11.0759 6.80411 11.0759 7.14312V9.34666C11.0759 9.68567 10.6804 10.0247 10.3414 10.0247H8.13783C7.79883 10.0247 7.45982 9.68567 7.45982 9.34666V7.14312ZM10.3414 15.4488H8.13783C7.79883 15.4488 7.45982 15.1098 7.45982 14.7708V12.5672C7.45982 12.2282 7.79883 11.8327 8.13783 11.8327H10.3414C10.6804 11.8327 11.0759 12.2282 11.0759 12.5672V14.7708C11.0759 15.1098 10.6804 15.4488 10.3414 15.4488ZM11.0759 22.6809C11.0759 19.6864 13.4489 17.2568 16.5 17.2568C19.4946 17.2568 21.9241 19.6864 21.9241 22.6809H11.0759ZM25.5402 14.7708C25.5402 15.1098 25.1447 15.4488 24.8057 15.4488H22.6021C22.2631 15.4488 21.9241 15.1098 21.9241 14.7708V12.5672C21.9241 12.2282 22.2631 11.8327 22.6021 11.8327H24.8057C25.1447 11.8327 25.5402 12.2282 25.5402 12.5672V14.7708ZM25.5402 9.34666C25.5402 9.68567 25.1447 10.0247 24.8057 10.0247H22.6021C22.2631 10.0247 21.9241 9.68567 21.9241 9.34666V7.14312C21.9241 6.80411 22.2631 6.4086 22.6021 6.4086H24.8057C25.1447 6.4086 25.5402 6.80411 25.5402 7.14312V9.34666Z" fill="#B2B2B2" />
							</svg>
							هتل
						</nuxt-link>
						<nuxt-link to="/flights" class="selected-menu">
							<svg
								class="desktop-img"
								width="30"
								height="30"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0.928968 20.2666C0.823558 20.1608 0.718148 19.9387 0.602197 19.7272C0.496787 19.2935 0.602197 18.8705 0.813017 18.5426C1.13979 18.2147 1.56143 17.8974 2.20443 17.6859C2.63661 17.5801 3.1742 17.4743 3.8172 17.358C4.99779 17.2522 6.17839 17.358 6.71598 17.358H6.82139L12.2922 11.3291L2.5509 6.99962L1.57197 7.99742C1.2452 8.3253 0.602197 8.3253 0.285967 7.99742C-0.0408044 7.66953 -0.146214 7.02434 0.285967 6.70704L3.93315 3.04743C4.36533 2.61378 5.00833 2.40224 5.65134 2.50801L8.32875 3.03685L10.0469 1.31282C10.3737 0.984937 11.0167 0.984937 11.3329 1.31282C11.6597 1.6407 11.7651 2.28589 11.3329 2.6032L10.4791 3.35416L13.3779 3.89358L15.2015 2.16955C15.4123 1.95801 15.7155 1.95802 15.8445 1.95801C16.1264 1.958 16.3014 2.07425 16.4875 2.28589C16.8203 2.66442 16.9197 3.25897 16.4875 3.57628L15.6337 4.32724L19.07 4.97243H19.2808C22.928 0.66763 26.7966 -0.411214 28.9364 0.128208C29.1472 0.233977 29.3686 0.339746 29.5794 0.456092C29.7902 0.66763 29.9062 0.889744 29.9062 1.10128C30.3384 3.25897 29.3686 7.13011 25.0784 10.7897V10.8955L25.7214 14.3436L26.5752 13.4868C26.902 13.1589 27.545 13.1589 27.8612 13.4868C28.188 13.8147 28.2934 14.4599 27.8612 14.7772L26.0376 16.607L26.5752 19.5157L27.429 18.6589C27.7558 18.331 28.3988 18.331 28.715 18.6589C29.0313 18.9868 29.1472 19.632 28.715 19.9493L26.9969 21.6733L27.5345 24.3704C27.6399 25.0156 27.429 25.6608 26.9969 26.0945L23.3497 29.7541C23.0229 30.082 22.3799 30.082 22.0637 29.7541C21.7369 29.4262 21.6601 28.8671 22.0637 28.4637L25.7109 24.8041L23.1389 11.2339C23.0334 10.483 23.2443 9.8378 23.7819 9.40415C27.8612 5.85031 28.072 2.83589 28.072 1.97916V1.8734H27.9666C27.1128 1.8734 24.1086 2.08493 20.5669 6.17819C20.1347 6.71761 19.3863 6.92915 18.6378 6.82338L5.21915 4.22147L3.82774 5.72339L13.7047 10.0282C13.9155 10.134 14.0314 10.2397 14.1368 10.3561C14.6744 10.8955 14.6744 11.7522 14.2423 12.2916L8.12847 18.9657C7.8017 19.2935 7.38006 19.3993 6.94788 19.3993C6.5157 19.3993 5.33511 19.2935 4.0491 19.2935C3.83828 19.2935 3.72233 19.2935 3.51151 19.3993H3.18474L7.8017 21.7685C7.90711 21.8743 8.01252 21.8743 8.12847 21.9801C8.23388 22.0858 8.33929 22.1916 8.33929 22.308L10.7005 26.9406L10.8059 26.507C10.8059 26.2954 10.8059 26.1791 10.9113 25.9676C11.0167 24.7829 10.9113 23.5983 10.8059 23.0589C10.8059 22.6253 10.9113 22.2022 11.2381 21.8743L17.8894 15.7397C18.427 15.2003 19.2808 15.3061 19.8184 15.8455C19.9238 15.9512 20.0293 16.1734 20.1452 16.3849L22.1796 21.9801C22.285 22.1916 22.3114 22.469 22.1796 22.731C22.0584 22.9719 21.8983 23.0804 21.642 23.1647C21.2738 23.2857 20.9543 23.2273 20.6361 23.006C20.4876 22.9028 20.3455 22.6253 20.3455 22.6253L18.6273 17.781L12.7243 23.1647V23.2705C12.8298 23.8099 12.8298 24.9945 12.7243 26.1791C12.7243 26.8243 12.6189 27.3637 12.3976 27.7974C12.1868 28.4426 11.9654 28.8762 11.5438 29.1935C11.217 29.5214 10.7953 29.6272 10.3632 29.4051C10.1523 29.2993 9.93098 29.1935 9.82557 29.0772C9.72016 29.0772 9.72016 28.9714 9.61475 28.8656L6.82139 23.3762L1.2452 20.4676C1.13979 20.3724 1.03438 20.3724 0.928968 20.2666Z" fill="#EB384D" />
							</svg>
							هواپیما
						</nuxt-link>
					</div>
					<flight-search
						ref="Search"
						:city-list="cities"
						:default-date="new Date().toDateString()"
						:disabled="false"
						:show-reverse="true"
						:show-currency="true"
						:show-icon-search="true"
						:show-icon-edit="false"
						:home-search="true"
						:selected-destination="cityNameEn"
						@searchFlights="searchFlights"
					/>
				</div>
			</div>
		</div>
		<div class="mt-3">
			<ahvaz v-if="cityNameEn === 'AWZ'" />
			<tehran v-if="cityNameEn === 'THR'" />
			<shiraz v-if="cityNameEn === 'SYZ'" />
			<bandar-abbas v-if="cityNameEn === 'BND'" />
			<mashhad v-if="cityNameEn === 'MHD'" />
			<isfahan v-if="cityNameEn === 'IFN'" />
			<sary v-if="cityNameEn === 'SRY'" />
			<kish v-if="cityNameEn === 'KIH'" />
			<qeshm v-if="cityNameEn === 'GSM'" />
			<yazd v-if="cityNameEn === 'AZD'" />
			<abadan v-if="cityNameEn === 'ABD'" />
			<tabriz v-if="cityNameEn === 'TBZ'" />
			<kermanshah v-if="cityNameEn === 'KSH'" />
			<rasht v-if="cityNameEn === 'RAS'" />
		</div>
		<div class="faq-container">
			<faq :faq="faqContent" :title="faqTitle" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import VCalendar from 'v-calendar';
import FlightSearch from '../components/flight/FlightSearch';
import Ahvaz from '../components/flight/landings/Ahvaz';
import Tehran from '../components/flight/landings/Tehran';
import Shiraz from '../components/flight/landings/shiraz';
import BandarAbbas from '../components/flight/landings/BandarAbbas';
import Mashhad from '../components/flight/landings/Mashhad';
import Isfahan from '../components/flight/landings/Isfahan';
import Sary from '../components/flight/landings/Sary';
import Kish from '../components/flight/landings/Kish';
import qeshm from '../components/flight/landings/qeshm';
import yazd from '../components/flight/landings/yazd';
import Abadan from '../components/flight/landings/Abadan';
import Tabriz from '../components/flight/landings/Tabriz';
import Kermanshah from '../components/flight/landings/kermanshah';
import Rasht from '../components/flight/landings/Rasht';
import faq from '~/components/faq';
const moment = require('moment-jalaali');
export default {
	layout: 'mainPage',
	name: 'Content',
	components: {
		FlightSearch,
		Ahvaz,
		Tehran,
		Shiraz,
		BandarAbbas,
		Mashhad,
		Isfahan,
		Sary,
		Kish,
		qeshm,
		yazd,
		Abadan,
		Tabriz,
		Kermanshah,
		Rasht,
		faq
	},
	async fetch({ store }) {
		await store.dispatch('Flight/loadCities');
	},
	data: function () {
		return {
			notFound: '/images/notFound.png'
		};
	},
	computed: {
		...mapState('Flight', ['cities']),
		date: function () {
			let gregDate;
			if (this.$route.query.date !== undefined) {
				const date = this.$route.query.date.split('-');
				gregDate = new VCalendar.JDate(date[0], date[1] - 1, date[2]).getGregorianDate();
			} else {
				gregDate = new Date();
			}
			return gregDate.getFullYear() + '-' + (gregDate.getMonth() + 1) + '-' + gregDate.getDate();
		},
		cityNameEn() {
			return this.$route.params.slug;
		},
		cityNameFa() {
			if (this.cities && this.cities[0] && this.cities[0].list && this.cities[1] && this.cities[1].list && this.cities[0].list.concat(this.cities[1].list).find(i => i.id === this.cityNameEn.toUpperCase())) {
				return this.cities[0].list.concat(this.cities[1].list).find(i => i.id === this.cityNameEn.toUpperCase()).label;
			} else {
				this.$nuxt.error({ statusCode: 404, message: 'چنین صفحه ای وجود ندارد!' });
				return null;
			}
		},
		faqTitle() {
			return 	'<h3>سوالات متداول شما درباره خرید بلیط هواپیما ' + this.cityNameFa + '</h3>';
		},
		faqContent() {
			return [
				{
					Question: '<h3>چرا از رادار361 بلیط هواپیما بخریم؟</h3>',
					Answer: '<p> رادار361 یک جستجوگر و نمایش دهنده انواع خطوط پروازی در مسیرهای مختلف و همینطور انواع هتل‌ها و اقامتگاه‌هاست.  رادار361 برای تهیه بلیط هوپیما می‌تواند بهترین انتخاب باشد چرا که این سایت جامع‌ترین پرواز‌های هواپیمایی در مسیر مورد نظر شما را در اختیار دارد. کافی است اطلاعات مختصر خواسته شده در بخش پرواز را در کادر مربوطه وارد کنید. سایت رادار در عرض چند ثانیه تمام پروازهای شرکت‌های هواپیمایی و تامین کنندگان بلیط هواپیما را در مقابلتان قرار می‌دهد.<br/>با استفاده از وب سایت رادار361 دیگر نیازی به جستجو در وب سایت‌های پیشنهادی گوگل نخواهید داشت. در این سایت تمام پروازها در ساعت و روز مورد نظر شما با آخرین تخفیفات و ارزانترین قیمت در اختیار شماست. به این ترتیب براحتی می‌توانید خرید بلیط هواپیما را انجام دهید.</p>'
				},
				{
					Question: '<h3>بهترین سایت خرید بلیط هواپیما چه سایتی است؟</h3>',
					Answer: '<p>همانطور که می‌دانید امروزه وب سایت‌های خرید بلیط هواپیما با یک جستجوی ساده در اینترنت به وفور یافت می‌شود. اما کمتر کسی از ویژگی‌های یک سایت خوب جهت خرید بلیط هواپیما اطلاع دارد. بهترین سایت خرید بلیط هواپیما در واقع سایتی است که بتواند گزینه‌های مختلفی از شرکت‌های هواپیمایی در مسیر مورد نظرتان را در اختیار شما قرار دهد تا بتوانید با امکان قیاس ارزانترین قیمت را انتخاب کنید. در سایت رادار361 جامع‌ترین فهرست فروشندگان و تامین کنندگان بلیط هواپیما را در اختیار خواهید داشت. </p>'
				},
				{
					Question: '<h3>آیا امکان کنسل کردن بلیط پرواز وجود دارد؟</h3>',
					Answer: '<p>قوانین کنسلی بلیط پرواز بسته به اینکه چه نوع بلیطی را تهیه نموده اید (سیستمی یا چارتری) متفاوت خواهد بود. حتما باید قبل از خرید بلیط هواپیما از قوانین مربوط به کنسلی پرواز شرکت هواپیمایی یا چارتر کننده مطلع شوید. اما به طور معمول بلیط‌های سیستمی را به راحتی می‌توانید کنسل کنید و با توجه به قوانین و محاسبات شرکت هواپیمایی مربوطه جریمه مورد نظر را بپردازید. اما در مورد بلیط‌های چارتری امکان کنسلی وجود ندارد. گرچه برخی چارتر کننده‌ها قوانین خاصی برای کنسلی دارند که بهتر است این موضوع را قبل از خرید بلیط هواپیما در نظر بگیرید.</p>'
				},
				{
					Question: '<h3>تفاوت بلیط سیستمی و چارتری چیست؟</h3>',
					Answer: '<p>بلیط  سیستمی به نوعی از بلیط اطلاق می‌شود که قیمت نهایی آن را شرکت هواپیمایی تعیین می‌کند و چارتر کننده هیچ دخل و تصرفی در تعیین قیمت آن ندارد. قیمت این نوع بلیط ثابت است و معمولا به صورت فصلی یا سالانه تغییر می‌کند.<br/> قبل از تعریف بلیط چارتر باید به معرفی چارترکننده پرداخت. چارتر کننده یا اجاره کننده در واقع تمام یا قسمتی از صندلی‌های هواپیما را از یک شرکت هواپیمایی اجاره می‌کند و بهای آنرا به شرکت مربوطه می‌پردازد. بنابراین در صورت به فروش نرسیدن به موقع بلیط چارتر، چارتر کننده دچار زیان می‌شود و همین موضوع سبب می‌شود که این نوع بلیط معمولا با قیمتی پایین به فروش برسد. قیمت بلیط چارتری با توجه به نزدیکی به زمان پرواز می‌تواند تغییرات چشمگیری داشته باشد و ارزانتر ارائه شود.</p>'
				},
				{
					Question: '<h3>چه اطلاعاتی در بلیط هواپیما درج می شود؟</h3>',
					Answer: '<p>بلیط هواپیما از دو بخش اطلاعات پرواز و اطلاعات بلیط تشکیل شده است. در قسمت اطلاعات پرواز مبدا، مقصد، تاریخ پرواز، ساعت پرواز و ساعت رسیدن درج شده است. در بخش اطلاعات بلیط نیز می‌توانید نوع ایرلاین، مدل هواپیما، نوع کلاس و میزان بار مجاز را ببینید. در زیر لوگو شرکت هواپیمایی هم شماره پرواز و شماره بلیط درج شده است.</p>'
				},
				{
					Question: '<h3>برای اخذ بلیط هواپیما چه مدارکی را باید ارائه دهیم؟</h3>',
					Answer: '<p>بسته به اینکه خرید بلیط هواپیما داخلی یا خارجی مد نظر شماست بالطبع مدارک ارائه شده نیز متفاوت خواهد بود. اما خرید بلیط هواپیما داخلی روند پیچیده‌ای ندارد. در خرید آنلاین بلیط هواپیما یک کارت بانکی اعتباری و مشخصات مندرج در کارت ملی کفایت می‌کند و در زمان ورود به فرودگاه نیز با ارائه کارت ملی می‌توانید بلیط خود را تحویل بگیرید.</p>'
				}
			];
		}

	},
	mounted() {
		this.$root.$emit('tabChanged', 'Flight');
	},
	methods: {
		searchFlights: function (originId, destinationId, date) {
			this.$router.push({ path: '/flights/' + originId + '-' + destinationId, query: { date: moment(date.toString(), 'jYYYY-jMM-jDD').format('jYYYY-jMM-jDD') } });
		}
	},

	head() {
		return {
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'برای پیدا کردن و خرید ارزانترین بلیط هواپیما' + ' ' + this.cityNameFa + ' ' + '، بلیط هواپیما' + ' ' + this.cityNameFa + ' ' + 'رفت و برگشت و کلیه پروازهای داخلی به ' + ' ' + this.cityNameFa + ' ' + 'از بین فروشندگان مختلف می‌توانید از رادار۳۶۱ استفاده کنید. بهترین قیمت پروازهای سیستمی و چارتری' + ' ' + this.cityNameFa + ' ' + ' را با رادار۳۶۱ پیدا کنید.'
				},
				{
					hid: 'og:title',
					name: 'og:title',
					property: 'og:title',
					content: `رادار361 | بلیط هواپیما ${this.cityNameFa}، بلیط ارزان ${this.cityNameFa}، چارتر ${this.cityNameFa}`
				},
				{
					itemprop: 'name',
					content: `رادار361 | بلیط هواپیما ${this.cityNameFa}، بلیط ارزان ${this.cityNameFa}، چارتر ${this.cityNameFa}`
				},
				{
					hid: 'og:description',
					name: 'og:description',
					property: 'og:description',
					content: 'برای پیدا کردن و خرید ارزانترین بلیط هواپیما' + ' ' + this.cityNameFa + ' ' + '، بلیط هواپیما' + ' ' + this.cityNameFa + ' ' + 'رفت و برگشت و کلیه پروازهای داخلی به ' + ' ' + this.cityNameFa + ' ' + 'از بین فروشندگان مختلف می‌توانید از رادار۳۶۱ استفاده کنید. بهترین قیمت پروازهای سیستمی و چارتری' + ' ' + this.cityNameFa + ' ' + ' را با رادار۳۶۱ پیدا کنید.'
				},
				{
					property: 'og:url',
					content: 'https://radar361.com/flights' + this.$route.params.slug
				},
				{
					property: 'og:site_name',
					content: 'radar361'
				},
				{
					property: 'og:type',
					content: 'website'
				},
				{
					name: 'twitter:card',
					content: 'summary'
				},
				{
					name: 'twitter:site',
					content: '@radar361'
				},
				{
					itemprop: 'image',
					content: 'https://radar361.com/Radar361.png'
				},
				{
					property: 'og:image',
					content: 'https://radar361.com/Radar361-cover.png'
				},
				{
					property: 'og:image:width',
					content: '400'
				},
				{
					property: 'og:image:height',
					content: '300'
				},
				{
					name: 'twitter:image:src',
					content: 'https://radar361.com/Radar361.png'
				},
				{
					name: 'twitter:url',
					content: 'https://radar361.com/flights' + this.$route.params.slug
				},
				{
					name: 'twitter:title',
					content: `رادار361 | بلیط هواپیما ${this.cityNameFa}، بلیط ارزان ${this.cityNameFa}، چارتر ${this.cityNameFa}`
				},
				{
					name: 'twitter:description',
					content: 'برای پیدا کردن و خرید ارزانترین بلیط هواپیما' + ' ' + this.cityNameFa + ' ' + '، بلیط هواپیما' + ' ' + this.cityNameFa + ' ' + 'رفت و برگشت و کلیه پروازهای داخلی به ' + ' ' + this.cityNameFa + ' ' + 'از بین فروشندگان مختلف می‌توانید از رادار۳۶۱ استفاده کنید. بهترین قیمت پروازهای سیستمی و چارتری' + ' ' + this.cityNameFa + ' ' + ' را با رادار۳۶۱ پیدا کنید.'
				}
			],
			title: `رادار361 | بلیط هواپیما ${this.cityNameFa}، بلیط ارزان ${this.cityNameFa}، چارتر ${this.cityNameFa}`
		};
	}
};
</script>
<style scoped>
@import url('~/assets/css/main-pages.css');
</style>
<style scoped>
::v-deep .flight-landing {
    text-align: right;
    line-height: 30px
}
::v-deep .white-back {
    background: white
}
::v-deep .flight-landing h2, ::v-deep.flight-landing h3 {
    margin-bottom: 40px;
    padding-top: 40px;
    font-weight: 600;
    position: relative;
	color: #424242;
}
::v-deep .flight-landing h2::after, ::v-deep .flight-landing h3::after {
    content: " ";
    display: block;
    background-color: #EB384D;
    height: 5px;
    width: 80%;
    max-width: 200px;
    margin: 10px 0;
}
::v-deep .flight-landing .list li{
    display: flex;
}
::v-deep .flight-landing p {
    font-size: 18px;
    font-weight: 300;
	color: #424242;
}
::v-deep .flight-landing .list li span, ::v-deep .flight-landing .list li p {
    display: contents;
}
::v-deep .flight-landing .list li span {
    font-weight: 600;
    font-size: 18px;
}
::v-deep .flight-landing .links {
    display: flex;
    flex-wrap: wrap;
}
::v-deep .flight-landing .links a {
    width: 33%;
    font-size: 20px;
    margin: 5px 0px
}
::v-deep .flight-landing .links a::before {
    content: " ";
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: #EB384D;
    margin-left: 15px;
    border-radius: 50%;
    vertical-align: middle;
}
::v-deep .advertise {
	color: #424242
}
@media only screen and (max-width: 768px) {
    ::v-deep .flight-landing .links a{
        width: 100%
    }
	::v-deep .flight-landing {
		padding: 0px 10px;
	}
}
</style>
