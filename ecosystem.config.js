module.exports = {
	apps: [
		{
			name: 'radar-web', // App name that shows in `pm2 ls`
			exec_mode: 'cluster', // enables clustering
			instances: 'max', // or an integer
			script: './node_modules/nuxt/bin/nuxt.js', // The magic key
			args: 'start',
			env: {
				PORT: '3000',
				VUE_APP_HOTEL_BASE: 'https://hotel.radar361.com',
				VUE_APP_META: 'https://hotel.atighgasht.com',
				VUE_APP_FLIGHT_API: 'https://flight.radar361.com'
			}
		},
		{
			name: 'radardev', // App name that shows in `pm2 ls`
			exec_mode: 'cluster', // enables clustering
			instances: 'max', // or an integer
			script: './node_modules/nuxt/bin/nuxt.js', // The magic key
			args: 'start',
			env: {
				PORT: '3003',
				VUE_APP_HOTEL_BASE: 'https://hoteldev.radar361.com',
				VUE_APP_META: 'https://hoteldev.atighgasht.com',
				VUE_APP_FLIGHT_API: 'https://flight.dev.radar361.com'
			}
		}
	]
};
