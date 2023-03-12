<template>
	<div class="skeleton-loader w-100  d-flex justify-content-between">
		<div class="hotel-img SkeletonBox image-skeleton" />
		<div class="d-flex flex-column justify-content-between pr-2 hotel-info">
			<div class="d-flex justify-content-between">
				<div class="SkeletonBox hotel-title mt-3 mb-2" />
				<div class="SkeletonBox hotel-rate mt-3 ml-2" />
			</div>
			<div v-if="type === 'resort'" class="pl-2 mb-2 seller-desktop text-right">
				<div class="capacity-skeleton SkeletonBox" />
			</div>
			<div v-else class="d-flex justify-content-between pl-2 mb-2 seller-desktop">
				<div v-for="i in 4" :key="i" class=" SkeletonBox cheapest-seller" />
			</div>
			<div class="flex-column d-none seller-mobile ml-2">
				<hr class="w-100">
				<div class="d-flex pb-2 align-items-center justify-content-between">
					<div class="d-flex flex-column">
						<div class="SkeletonBox hotel-provider" />
						<div class="SkeletonBox hotel-star mt-2" />
					</div>
					<div class="SkeletonBox seller-list" />
				</div>
			</div>
		</div>
		<div class="seller d-flex flex-column align-items-center mr-auto ">
			<div class="SkeletonBox hotel-price mt-4 mb-5" />
			<div class="SkeletonBox seller-list mb-3 mt-auto" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'SkeletonBox',
	props: {
		maxWidth: {
			default: 100,
			type: Number
		},
		minWidth: {
			default: 80,
			type: Number
		},
		height: {
			default: '1em',
			type: String
		},
		width: {
			default: null,
			type: String
		},
		presell: Boolean,
		type: {
			type: String,
			default: ''
		}
	},
	computed: {
		computedWidth() {
			return this.width || `${Math.floor((Math.random() * (this.maxWidth - this.minWidth)) + this.minWidth)}%`;
		}
	}
};
</script>

<style scoped >
.hotel-provider {
  width: 70px;
  height: 14px;
  border-radius: 5px;
}
.SkeletonBox {
	display: inline-block;
	position: relative;
	vertical-align: middle;
	overflow: hidden;
	background-color: #F2F2F2;
}
 .SkeletonBox::after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transform: translateX(100%);
	background-image: linear-gradient(90deg, rgba(255, 255, 255, .2) 60%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, .2) , rgba(255, 255, 255, 0) );
	animation: shimmer 2s infinite;
	content: '';
}
.image-skeleton {
  background-color: #E0E0E0;
}
.skeleton-loader {
  width: 100%;
  height: 180px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  overflow: hidden;
  margin: 0;
  /* border: .5px solid #e4e4e4; */
  margin-top: 11px;
  background: white
}
.hotel-img {
    height: 100%;
    width: 240px;
    position: relative;
    cursor: default;
}
.hotel-title {
  height: 33px;
  width: 100px;
  border-radius: 10px;
}
.hotel-rate {
  width: 57px;
  height: 33px;
  border-radius: 10px;

}
.hotel-star {
  height: 14px;
  width: 100px;
  border-radius: 5px;
}
.hotel-capacity, .hotel-address {
  height: 12px;
  width: 150px
}
.seller {
  width: 172px;
  border-right: 2px solid #e9f0f2;
}
.hotel-price {
  height: 14px;
  width: 130px;
  border-radius: 5px;
}
.hotel-seller {
  height: 12px;
  width: 130px
}
.seller-list {
  width: 120px;
  height: 38px;
  border-radius: 20px
}
.hotel-info {
  width: calc(100% - 250px - 170px);
}
.capacity-skeleton {
  width: 100px;
  height: 30px;
  border-radius: 5px;
}

@media (max-width: 767.98px) {
  .hotel-rate {
    height: 30px
  }
  .skeleton-loader {
    height: 180 !important;
  }
  .hotel-title {
    height: 30px;
    width: 152px;
  }
  .seller-list {
    width: 90px !important;
    font-size: 10px !important;
    height: 34px !important;
  }
  .hotel-img {
    height: 180px;
    width: 130px;
  }
  .seller-desktop {
    display: none !important
  }
  .seller-mobile {
    display: flex !important
  }
  .seller {
    display: none !important;
    height: 65px;
    border-top: 2px solid #e9f0f2;
    width: 100%;
    flex-direction: row !important;
    align-items: center;
    justify-content: space-between !important;
    padding:1em
  }
  .hotel-info {
    width: calc(100% - 130px);
  }
  .hotel-seller {
    display: none !important
  }
  .hotel-price, .seller-list {
    margin: 0px !important
  }
}
@media (max-width: 991.98px) and (min-width: 767px) {
  .skeleton-loader {
    height: 120px;
  }
  .seller {
    display: none !important
  }
  .hotel-img {
    width: 220px
  }
}
.cheapest-seller {
    border-radius: 5px;
    min-height: 50px;
    width: calc((100% - 40px) / 4);
}
@media (min-width: 767px) {
  .hotel-title {
    width: 200px
  }
}
hr {
  border: 0;
  border-top: 1px solid rgba(0,0,0,.1);
}
</style>
