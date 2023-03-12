<template>
	<div class="w-100">
		<div class="row map-container position-relative">
			<span v-if="!mapLoaded" class="map-loading">در حال بارگذاری نقشه</span>
			<client-only>
				<GmapMap
					:center="center"
					:zoom="13"
					map-type-id="terrain"
					style="width: 100%; height: 200px"
					:options="{
						fullscreenControl: false,
						mapTypeControl: false,
						scaleControl: false,
						streetViewControl: false,
						zoomControl: false,
					}"
					@click="show"
					@tilesloaded="checkIfMapLoaded"
				>
					<GmapMarker
						v-for="(m, index) in importantPlaceMarker"
						:key="index"
						:position="m.position"
						:title="m.title"
						:icon="icon"
					/>
					<GmapMarker ref="myMarker" :icon="mainIcon" :position="center" :title="(hotelDetails.Type && hotelDetails.Type.Name ? hotelDetails.Type.Name : '')+ hotelDetails.NameFa" />
				</GmapMap>
			</client-only>
			<p class="ma-alert mt-auto">
				برای مشاهده نقشه تمام صفحه، دوبار روی نقشه کلیک کنید.
			</p>
		</div>

		<div v-if="locationModal" class="custom-modal">
			<div class="modal-container">
				<div class="hotel-name">
					<p class="text-right d-flex align-items-center">
						<font-awesome-icon
							:icon="['fas', 'times']"
							style=" background: transparent; border: none; "
							@click="hide"
							class="fa-style"
						/>
						{{ hotelDetails.NameFa || hotelDetails.Meta.NameFa || '' }}
					</p>
				</div>
				<div class="position-relative ">
					<client-only>
						<GmapMap
							:center="center"
							:zoom="15"
							map-type-id="terrain"
							style="width: 100%; height: 450px"
							:options="{
								zoomControl: false,
								fullscreenControl: false,
								mapTypeControl: false,
								scaleControl: false,
								streetViewControl: false
							}"
							@tilesloaded="checkIfMapLoaded"
						>
							<GmapMarker
								v-for="(m, index) in markers"
								:key="index"
								:position="m.position"
								:title="m.title"
								:icon="icon"
							/>
							<GmapMarker ref="myMarker" :icon="mainIcon" :position="center" :title="(hotelDetails.Type? hotelDetails.Type.Name + hotelDetails.NameFa : '') || hotelDetails.Meta.NameFa || ''" />
						</GmapMap>
					</client-only>
					<button class="open-modal-btn minimize-map" @click="hide">
						<img
							alt="unzoom"
							src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M4%2C4H0v2h6V0H4V4z%20M14%2C4V0h-2v6h6V4H14z%20M12%2C18h2v-4h4v-2h-6V18z%20M0%2C14h4v4h2v-6H0V14z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
						>
						کوچک نمایی نقشه
					</button>
				</div>
				<div class="container-fluid mt-3 near-by-place">
					<div
						v-for="(chunk, index) in fragmentedNearByPlacesArray"
						:key="index"
						class="row location-places"
					>
						<div
							v-for="(place, i) in chunk"
							:key="i"
							class="col-md-4 text-right places d-flex flex-row justify-content-between"
						>
							<span>{{ place.Title }}</span>
							<span>{{ (place.Distance / 1000).toFixed(2) }} کیلومتر</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'HotelLocation',
	props: {
		hotelDetails: Object,
		showModal: Boolean,
		onlyImportantPlace: Boolean
	},
	data: function () {
		return {
			locationModal: false,
			totalIntroduction: false,
			itemsPerRow: 3,
			markers: this.hotelDetails.NearByPlaces ? this.hotelDetails.NearByPlaces.map(item => ({
				position: {
					lat: parseFloat(item.Latitude),
					lng: parseFloat(item.Longitude)
				},
				title: item.Title
			})) : [],
			importantPlaceMarker: this.importantplace && this.hotelDetails.NearByPlaces ? this.hotelDetails.NearByPlaces.filter(item => item.Important === true).map(item => ({
				position: {
					lat: parseFloat(item.Latitude),
					lng: parseFloat(item.Longitude)
				},
				title: item.Title
			})) : this.hotelDetails.NearByPlaces ? this.hotelDetails.NearByPlaces.map(item => ({
				position: {
					lat: parseFloat(item.Latitude),
					lng: parseFloat(item.Longitude)
				},
				title: item.Title
			})) : [],

			icon: {
				url: require('~/assets/images/blue-location.svg')
			},
			mainIcon: {
				url: require('~/assets/images/red-location.svg')
			},
			mapLoaded: false
		};
	},
	computed: {
		fragmentedNearByPlacesArray() {
			return this.hotelDetails.NearByPlace && this.hotelDetails.NearByPlaces.length ? this.chunk(this.hotelDetails.NearByPlaces, 3) : [];
		},
		center() {
			return {
				lat: (this.hotelDetails && this.hotelDetails.Latitude ? parseFloat(this.hotelDetails.Latitude) : (this.hotelDetails && this.hotelDetails.Meta && this.hotelDetails.Meta.Latitude && parseFloat(this.hotelDetails.Meta.Latitude))),
				lng: (this.hotelDetails && this.hotelDetails.Longitude ? parseFloat(this.hotelDetails.Longitude) : (this.hotelDetails && this.hotelDetails.Meta && this.hotelDetails.Meta.Longitude && parseFloat(this.hotelDetails.Meta.Longitude)))
			};
		},
	},
	watch: {
		showModal: function (val) {
			this.locationModal = val;
		},
		'$route.hash': function (newVal, oldVal) {
			if (oldVal.includes('map') && !newVal.includes('map')) {
				this.locationModal = false;
			}
		}
	},
	methods: {
		checkIfMapLoaded() {
			this.mapLoaded = true;
		},
		show() {
			this.locationModal = true;
			if (window.innerWidth < 768) {
				this.$router.push({ path: this.$route.fullPath, hash: this.$route.hash + '-map' });
			}
		},
		hide() {
			this.locationModal = false;
			if (window.innerWidth < 768 && this.$route.hash.includes('map')) {
				this.$router.go(-1);
			}
		},
		chunk: function (arr, len) {
			const chunks = [];
			let i = 0;
			const n = arr.length;
			while (i < n) {
				chunks.push(arr.slice(i, (i += len)));
			}
			return chunks;
		}
	}
};
</script>

<style scoped>
.hotel-name p{
  font-size: 18px;
  margin-top: 16px;
  font-weight: 600;
  line-height: 31px;
}
.hotel-name svg {
  margin-left: 7px;

}
@media screen and (max-width: 767px) {
  .hotel-name {
    position: relative;
    top: 0px;
    z-index: 10;
    background: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  }
  .hotel-name p {
    display: flex;
    align-items: center;
    padding-top: 13px;
    padding-bottom: 15px;
    padding-right: 10px;
    color: #1c1c1c;
    font-weight: 600;
    margin-top: 0px;
  }
  .hotel-name svg {
    padding-left: 4px;
    width: 14px;
  }
}
.ma-alert {
	font-size: 12px;
    line-height: 18px;
	margin-top: 10px;
    color: #858585;
	font-weight: 500;
	text-align: center;
	width: 100%
}
.location-info {
  color: #848484;
  font-weight: 600;
  font-size: 0.9em;
}
.open-modal-btn {
  position: absolute;
  top: 0px;
  color: #4466aa;
  background: white;
  border-radius: 5px;
  width: 148px;
  height: 35px;
  margin: 7px;
  font-size: 12px;
  font-weight: bold;
}

.fa-times {
  display: block;
}
::v-deep .vue-map {
  border-radius: 5px;
  background: lightgray;
}
.places span:first-child {
  font-size: 12px;
  line-height: 21px;
  color: #1c1c1c;
}

.places span:last-child {
  font-size: 12px;
  line-height: 21px;
  color: #848484;
}

.location-places .col-md-4 {
  border-left: 2px solid #e9f0f2;
}

.location-places .col-md-4:last-child .col-md-4:not(:first-child) {
  border-left: none !important;
}

.custom-modal {
  position: fixed;
  background: rgba(28, 28, 28, 0.5);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
}

.modal-container {
  border-radius: 7px;
  position: relative;
  background: white;
  width: 77%;
  padding: 3em 65px;
  padding-top: 0em;
}

@media only screen and (max-width: 767px) {
  ::v-deep .vue-map-container {
    border: none;
  }
  .open-modal-btn {
    display: none;
  }
  .location-places .col-md-4 {
    border-left: none !important;
  }
  .near-by-place {
    display: none;
  }
  .modal-container {
	padding: 0;
	width: 100% !important;
    height: 100% !important;
  }
  .minimize-map {
    display: none;
  }
  ::v-deep .custom-modal .vue-map-container {
    height: 100vh !important;
    border: none;
    margin-top:-15px
  }
  .custom-modal {
    padding: 0 !important;
  }

}
@media only screen and (min-width: 767px) {
  @media only screen and (max-width: 1000px) {
    .modal-container {
      width: 90%;
    }
    .modal-container .col-md-4 span {
      font-size: 11px;
    }
  }
}
.map-container {
	min-height: 200px;
}
.map-loading {
	position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: #d2d2d2;
    display: flex;
    align-items: center;
    justify-content: center;
	color: #757373f5;
}
</style>
