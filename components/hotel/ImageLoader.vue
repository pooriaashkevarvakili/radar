<template>
	<div class="image-loader">
		<div class="w-100 h-100 mobile-image-list__item d-flex justify-content-center align-items-center" :class="{'SkeletonBox': !loaded}">
			<img :src="image['URL125x125'] || image.URL" class="d-block w-100 h-100 mobile-image-list__item-img" alt="hotel image" @load="loadImage(index)">
			<span v-if="currentSlide == index" class="current-slide-image w-100 h-100" :style="[currentSlide == index ? {'background-image': `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`} : '']">
				<img src="~/assets/images/expand-arrows.png" alt="arrorw">
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		image: {
			type: Object,
			default() {
				return {};
			}
		},
		index: {
			type: Number,
			default: 0
		},
		currentSlide: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			loaded: false
		};
	},
	methods: {
		loadImage(val) {
			this.loaded = true;
		}
	}
};
</script>
<style scoped>
.mobile-image-list__item {
    border-radius: 5px;
    position: absolute;
    min-height: 50px;
}
.mobile-image-list__item::after {
    content: " ";
    display: block;
    padding-bottom: 100%;
}
.mobile-image-list__item-img {
    border-radius: 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
.current-slide-image {
    position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px
}
.SkeletonBox {
	display: inline-block !important;
	position: absolute;
	overflow: hidden;
	background-color: #F2F2F2;
	width: 100%;
    height: 100%;
	right: 0px;
}
 .SkeletonBox::after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	transform: translateX(100%);
	background-image: linear-gradient(90deg, rgba(255, 255, 255, .2) 60%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, .2) , rgba(255, 255, 255, 0) ) !important;
	animation: shimmer 2s infinite;
	content: '';
}
 @keyframes shimmer {
	100% {
		transform: translateX(-100%);
	}
}
.image-loader {
	position: relative;
    width: 100%;
    height: 0;
    display: inline-block;
	text-align: center;
    padding-bottom: 100%;
	min-width: 20px;
}
</style>
