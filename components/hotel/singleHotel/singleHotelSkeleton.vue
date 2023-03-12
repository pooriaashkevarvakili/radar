<template>
	<div>
		<div class="single-hotel-rooms__skeleton">
			<div class="single-hotel-rooms__skeleton-section single-hotel-rooms__skeleton-header w-100" />
			<div class="single-hotel-rooms__skeleton-body d-flex align-items-center justify-content-between">
				<div class="single-hotel-rooms__skeleton-section title" />
				<div class="d-flex price-and-calendar">
					<div class="single-hotel-rooms__skeleton-section title" />
					<div class="single-hotel-rooms__skeleton-section price-calendar" />
					<div class="single-hotel-rooms__skeleton-section reserve-btn" />
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.title {
    width: 100px;
    height: 35px;
}
.price-calendar {
    border-radius: 20px;
    width: 170px;
    height: 40px;
    margin-left: 50px;
    margin-right: 30px;
}
.reserve-btn {
    border-radius: 20px;
    width: 85px;
    height: 40px;
}
.single-hotel-rooms__skeleton {
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    border-radius: 15px;
    padding-bottom: 20px;
}
.single-hotel-rooms__skeleton-header {
    height: 64px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
}
.single-hotel-rooms__skeleton-body {
    border-top: 1px solid #E3E3E3;
    border-bottom: 1px solid #E3E3E3;
    min-height: 60px;
    padding-left: 40px;
    padding-right: 35px;
    background: white;
}
.single-hotel-rooms__skeleton-section {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
    background-color: #F2F2F2;
}
 .single-hotel-rooms__skeleton-section::after {
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
 @keyframes shimmer {
    100% {
        transform: translateX(-100%);
    }
}
@media only screen and (max-width: 768px) {
    .price-calendar {
        display: none
    }
    .reserve-btn {
        width: 110px;
        height: 32px;
        margin-right: 10px;
    }
    .single-hotel-rooms__skeleton-body {
        padding: 0px 10px;
    }
    .title {
        height: 32px;
    }
    .price-and-calendar {
        width: 60% !important;
        justify-content: space-between;
    }
    .single-hotel-rooms__skeleton-header {
        height: 43px;
    }
    .single-hotel-rooms__skeleton {
        background: #F0F5F5;
        margin: 0px 10px;
    }
}
</style>
