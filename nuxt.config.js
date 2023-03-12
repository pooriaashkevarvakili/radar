import axios from 'axios';
export default {

	mode: 'universal',
	/*
  ** Headers of the page
  */
	env: {
		VUE_APP_HOTEL_BASE: process.env.VUE_APP_HOTEL_BASE || 'https://hotel.radar361.com',
		VUE_APP_META: process.env.VUE_APP_META || 'https://hoteldev.atighgasht.com',
		VUE_APP_DBOOKING: process.env.VUE_APP_DBOOKING || 'https://dev.dbooking.ir',
		VUE_APP_FLIGHT_API: process.env.VUE_APP_FLIGHT_API || 'https://flight.dev.radar361.com',
		VUE_APP_USER_API: process.env.VUE_APP_USER_API || 'https://users.dev.radar361.com',
		VUE_APP_SWAGGER_API: process.env.VUE_APP_SWAGGER_API || 'https://hotel.dev.radar361.com'
	},

	head: {
		meta: [
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1,user-scalable=no' },
			{ name: 'p:domain_verify', content: '81c0e60a7ec9c8db6b6c5a89ed4fb9ec' },
			{ name: 'google-site-verification', content: 'GYZOGWr5whnE0sXrzU-XnBfbMg1QSXGuM9-55PfScvA' },
			{ name: 'og:site_name', content: 'Radar361' },
			{ name: 'apple-mobile-web-app-capabl', content: 'yes' },
			...(process.env.MODE === 'dev'
				? [{
					hid: 'robots',
					name: 'robots',
					content: 'noindex, nofollow'
				}]
				: [])
		],
		link: [
			{
				rel: 'icon',
				type: 'image/svg',
				href: 'logo-favicon.svg'
			},
			{
				rel: 'apple-touch-icon',
				href: 'Radar361.png'
			},
			{
				rel: 'apple-touch-startup-image',
				href: 'Radar361.png'
			},
			{ rel: 'manifest', href: '/manifest.json' }
		]
	},
	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#fff' },
	/*
  ** Global CSS
  */

	css: [
		{ src: '~/assets/css/bootstrap.css' },
		{ src: '~assets/css/font.css' },
		{ src: '~/assets/css/styles.css' },
		{ src: '~/assets/css/common.css' }
	],
	/*
  ** Plugins to load before mounting the App
  */
	plugins: [

		'~/plugins/fontawesome.js',
		'~/plugins/Functions.js',
		{ src: '~/plugins/vue-google-oauth2', ssr: false },

		{ src: '~/plugins/RayChat.js', ssr: false },
		// { src: '~/plugins/clarity.js', ssr: false },
		{ src: '~/plugins/VGoogleMap.js', ssr: false },
		{ src: '~plugins/VCalendar.js', ssr: false },
		{ src: '~plugins/Vslider.js', ssr: false },
		{ src: '~plugins/VueStickyDirective.js', ssr: false },
		{ src: '~plugins/VueSweetAlert.js', ssr: false },
		{ src: '~plugins/nuxtClientInit.js', ssr: false },
		{ src: '~plugins/yektanet.js', ssr: false },
	],
	/*
  ** Nuxt.js dev-modules
  */
	buildModules: [

		['@nuxtjs/google-analytics', {
			id: 'UA-113491511-2',
			debug: {
				enabled: false,
				sendHitTask: true
			}
		}],
		'@nuxt/typescript-build',
		'@nuxtjs/pwa',
		['nuxt-compress', {
			gzip: {
				cache: true
			},
			brotli: {
				threshold: 10240
			}
		}]
	],
	/*
  ** Nuxt.js modules
  */
	workbox: {
		offlinePage: '/offline-page.html',
		offlineAssets: ['/no-internet.png', '~assets/css/font.css'],
		enabled: true,
		swURL: 'custom-sw.js'
	},
	modules: [

		// Doc: https://bootstrap-vue.js.org
		// 'bootstrap-vue/nuxt',
		'nuxt-fontawesome',
		[
			'nuxt-fontawesome', {
				imports: [
					{
						set: '@fortawesome/free-solid-svg-icons',
						icons: ['fas']
					},
					{
						set: '@fortawesome/free-brands-svg-icons',
						icons: ['fab']
					}
				]
			}
		],
		['nuxt-twa-module', {
			/* module options */
			defaultUrl: 'https://radar361.com/',
			hostName: 'radar361.com/',
			applicationId: 'com.radar361',
			launcherName: 'Radar361',
			versionCode: 1,
			versionName: '1.0',
			statusBarColor: '#EB384D',
			// The sha256Fingerprints by is an array with one SHA-256 key string.
			// But if you have multiple you can add them to the array. More information about the website asociation:
			// https://developer.android.com/training/app-links/verify-site-associations#web-assoc
			sha256Fingerprints: ['C9:01:6D:BF:CE:EF:A1:10:83:5C:30:EE:2A:5F:6E:34:0C:F5:30:80:B3:2D:E9:95:55:3E:36:0A:86:8A:D6:42'],
			/* optional */
			/* overwrite default location for icon */
			iconPath: '/static/Radar361.png',
			/* Overwrite folder where to put .wellknown */
			distFolder: '.nuxt/dist/client'
		}],
		['vue-scrollto/nuxt',
			// Or if you have custom options...
			['vue-scrollto/nuxt', { duration: 300 }]
		]
	],
	/*
  ** Build configuration
  */
	build: {
		/*
	** You can extend webpack config here
	*/
		transpile: ['vue-radial-progress'],
		extend(config, { isDev, isClient }) {
			config.module.rules.push({
				parser: {
					amd: false
				}
			});
			config.module.rules.forEach((rule) => {
				if (String(rule.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
					// add a second loader when loading images
					rule.use.push({
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [
									{ removeViewBox: false },
									{ removeDimensions: true }
								]
							}
						}
					});
				}
			});
		}
	},
	hooks: {
		listen() {
			axios.delete('https://napi.arvancloud.com/cdn/4.0/domains/radar361.com/caching?purge=all&protocol=http%2Chttps&domains=radar361.com', { headers: { Authorization: 'Apikey 4d5a6ab6-fb69-4656-8fa8-95e018720c16', 'content-type': 'multipart/form-data' } });
		}
	},
	router: {
		extendRoutes(routes, resolve) {
			routes.push(
				{
					path: '/',
					name: 'home',
					component: resolve(__dirname, 'pages/index.vue'),
					props: {
						category: 'Hotel'
					}
				},
				{
					path: '/flights',
					name: 'homeFlights',
					component: resolve(__dirname, 'pages/Flights/index.vue'),
					meta: {
						title: 'بلیط هواپیما ارزان - رادار 361',
						metaTags: [
							{
								name: 'description',
								content:
									'هوشمند و بدون واسطه ارزان ترین پروازها و تامین کنندگان را بررسی و ارزان ترین بلیط هواپیما را تهییه کنید.'
							},
							{
								name: 'keywords',
								content:
									'بلیط هواپیما ارزان, بلیط هواپیما, قیمت بلیط هواپیما, بلیط ارزان, پرواز ارزان'
							},
							{
								property: 'og:description',
								content:
									'هوشمند و بدون واسطه ارزان ترین پروازها و تامین کنندگان را بررسی و ارزان ترین بلیط هواپیما را تهییه کنید.'
							}
						]
					},
					props: {
						category: 'Flight'
					}
				},
				{
					path: '/resort',
					name: 'ًResort',
					component: resolve(__dirname, 'pages/Resort/index.vue'),
					props: {
						category: 'Resort'
					}
				},
				{
					path: '/resort/:city',
					name: 'ResortCity',
					component: resolve(__dirname, 'pages/Resort/ResortCity.vue')
				},
				{
					path: '/resort/singleResort/:resort',
					name: 'signleResortPage',
					component: resolve(__dirname, 'pages/Resort/singleResort.vue')
				},
				{
					name: 'flight',
					path: '/flights/:origin([A-Z]{3})-:destination([A-Z]{3})',
					component: resolve(__dirname, 'pages/Flights/Flights.vue')
				},
				{
					name: 'FlightContent',
					path: '/flights/:slug',
					component: resolve(__dirname, 'pages/flightContent.vue')
				},
				{
					path: '/:origin',
					name: 'CityHotels',
					component: resolve(__dirname, 'pages/Hotels/index.vue')
				},
				{
					path: '/:origin/:hotelType(type.*)',
					name: 'hotelTypePage',
					component: resolve(__dirname, 'pages/Hotels/index.vue')
				},
				{
					path: '/:origin/:hotel',
					name: 'hotels',
					component: resolve(__dirname, 'pages/singleHotel/index.vue')
				},
				{
					path: '/Error',
					component: resolve(__dirname, 'layouts/error.vue'),
					props: { error: { statusCode: 404, message: 'چنین صفحه ای وجود ندارد!' } }
				},
				{
					path: '/iranHotels',
					component: resolve(__dirname, 'pages/iranHotels.vue')
				},
				{
					path: '*',
					component: resolve(__dirname, 'layouts/error.vue'),
					props: { error: { statusCode: 404, message: 'چنین صفحه ای وجود ندارد!' } }
				}
			);
		},
		middleware: 'pageRedirect'
	},
	generate: {
		routes() {
			const cities = axios.get(process.env.VUE_APP_HOTEL_BASE + '/api/City/meta')
				.then((res) => {
					return res.data.map((origin) => {
						return {
							route: '/' + origin.NameEn,
							payload: origin
						};
					});
				});
			/*
		let hotelTypes = axios.get(process.env.VUE_APP_META + '/api/HotelsAdmin/GetHotels/meta' , { 'headers': { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodGwiOiIzIiwic3BjIjoiYWQifQ.sd0bj7UwFwAnuGCES5a7B4zwSPYYNijIRs1zAx8REjU' }})
		.then((res) => {
		  return res.data.map((hotelType) => {
			return {
			  route: '/' + hotelType.CityNameEn + '/' + hotelType.HotelType.Name ,
			  payload: hotelType
			}
		  })
		})
		*/
			return Promise.all([cities]).then((values) => {
				return [...values[0]];
			});
		}
	}
};
