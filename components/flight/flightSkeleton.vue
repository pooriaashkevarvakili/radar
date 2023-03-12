<template>
	<div class="flight-card d-flex">
		<div class="d-flex flight-card__info d-flex justify-content-between p-2">
			<div class="d-flex flex-column justify-content-between">
				<div class="flight-card__rate skeleton" />
				<div class="skeleton flight-card__logo" />
			</div>
			<div class="skeleton flight-price__mobile align-self-center" />
		</div>
		<div class="d-flex flex-column justify-content-between flight-rate-wrapper">
			<div class="skeleton flight-rate" />
			<div class="skeleton flight-rate" />
		</div>
		<div class="flight-price skeleton" />
		<div class="flight-card-price skeleton h-100 d-flex flex-column align-items-center justify-content-center" />
	</div>
</template>

<style scoped>
.flight-card {
    width: 100%;
    height: 157px;
    position: relative;
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    border-radius: 10px;
    background: white;
    margin: 5px 0px;
}
.flight-card::before {
    content: ' ';
    width: 20px;
    height: 10px;
    border-radius: 0px 0px 20px 20px;
    background: #F8F8F8;
    border: 1px solid #CCCCCC;
    border-top: none;
    position: absolute;
    left:210px;
    z-index: 3;
    top: -1px
}
.flight-card::after {
    content: ' ';
    width: 20px;
    height: 10px;
    border-radius: 20px 20px 0px 0px;
    background: #F8F8F8;
    border: 1px solid #CCCCCC;
    border-bottom: none;
    position: absolute;
    left: 210px;
    z-index: 3;
    bottom: -1px
}
.flight-card__rate{
    width: 30px;
    height: 24px;
    border-radius: 5px
}
.flight-card__logo {
    border-radius: 5px;
    height: 40px;
    width: 40px
}
.flight-card__flight-number {
    font-size: 12px;
    color: #828282;
}
.flight-card-time__arrival {
    font-weight: 600;
    font-size: 30px;
    color: #1D1D1D;
}
.flight-card-time__origin {
    font-size: 13px;
    color: #828282;
}
.flight-card-aircraft {
    font-weight: 500;
    font-size: 11px;
    color: #828282;
    text-align: center
}
.flight-card-price {
    width: 220px;
    border-right: 4px dotted #F0F4F5;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.sellers {
    width: 120px;
    height: 38px;
    background-color: #EB384D;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 800;
    border-radius: 100px;
    text-align: center;
}
.card-airline-min-price {
    margin-bottom: 20px
}
.card-airline-min-price span:first-child {
    font-weight: 600;
    font-size: 24px;
    color: #1D1D1D;
}
.card-airline-min-price span:last-child {
    font-weight: 300;
    font-size: 13px;
    color: #828282;
}
.flight-rate-wrapper {
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.flight-rate {
    width: 50px;
    height: 27px;
    border-radius: 5px;
}
.flight-price {
    width: 310px;
    height: 40px;
    margin: auto
}
.flight-price__mobile {
    width: 80%;
    height: 30px;
    border-radius: 5px
}
@media only screen and (min-width: 768px) {
    .flight-card__rate {
        display: none !important
    }
    .flight-card__logo {
        display: none !important
    }
    .flight-price__mobile {
        display: none !important
    }
}
@media only screen and (max-width: 768px) {
    .flight-card {
        flex-direction: column !important;
        height: 160px;
        padding: 0px
    }
    .flight-card__info {
        border-bottom: 4px dotted #F0F4F5;
        height: calc(100% - 58px)
    }
    .flight-card::before {
        right: -1px;
        top: 88px;
        height: 20px;
        width: 10px;
        border-radius: 20px 0 0 20px;
        border-right: none;
        border-top: 1px solid #CCCCCC
    }
    .flight-card::after {
        left: -1px;
        top: 88px;
        height: 20px;
        width: 10px;
        border-radius: 0px 20px 20px 0px;
        border-left: none;
        border-bottom: 1px solid #CCCCCC
    }
    .flight-card-price {
        border-right: none;
        width: 100%;
        flex-direction: row !important;
        height: 55px !important;
        justify-content: space-between !important;
        padding: 0px 30px;
        margin-top: auto;
    }
    .card-airline-min-price span:first-child {
        font-size: 24px;
        color: #EB384D;
    }
    .sellers {
        width: 107px;
        height: 36px
    }
    .flight-card-mobile-rate {
        display: block !important;
        background: #F1F9FA;
        height: 27px;
        color: #15BBCC;
        font-weight: 600;
        font-size: 12px;
        padding: 4px 6px;
        border-radius: 5px
    }
    .flight-price, .flight-rate-wrapper{
        display: none !important
    }
}
.skeleton {
    background: #E8E8E8;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
}
.skeleton::after {
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

</style>
