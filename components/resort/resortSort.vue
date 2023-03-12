<template>
	<div id="sort-box">
		<div class="row justify-content-between align-items-end">
			<div class="desktop w-100">
				<div v-if="loaded" class="sort-option__desktop">
					<span class="sort-option__desktop__title d-flex align-items-center justify-content-center"><img class="ml-2" src="~assets/images/menu-bar.png" alt="menu bar">مرتب سازی بر اساس : </span>
					<div :class="{selectedOption: 'AverageRate' == sortOption}" @click="sortTypeSelected('AverageRate', 1)">
						بالاترین امتیاز
					</div>
					<div :class="{selectedOption: 'CommentsCount' == sortOption}" @click="sortTypeSelected('CommentsCount', 1)">
						بیشترین نظرات
					</div>
					<div :class="{selectedOption: 'MinPrice' == sortOption}" @click="sortTypeSelected('MinPrice', -1)">
						کمترین قیمت
					</div>
				</div>
				<div v-else class="sort-option__desktop sort-option-skeleton border-0">
					<span class="sort-option-skeleton__title" />
				</div>
			</div>
			<div class="mobile">
				<div class="sort-option__desktop">
					<span class="sort-option__desktop__title d-flex align-items-center justify-content-center"><img class="ml-2" src="~assets/images/menu-bar.png" alt="menu bar">مرتب سازی بر اساس : </span>
					<div :class="{selectedOption: 'AverageRate' == sortOption}" @click="sortTypeSelected('AverageRate', 1)">
						بالاترین امتیاز
					</div>
					<div :class="{selectedOption: 'CommentsCount' == sortOption}" @click="sortTypeSelected('CommentsCount', 1)">
						بیشترین نظرات
					</div>
					<div :class="{selectedOption: 'MinPrice' == sortOption}" @click="sortTypeSelected('MinPrice', -1)">
						کمترین قیمت
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { faAngleDown, faSortAmountDown, faFilter, faDollarSign, faClock } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faAngleDown, faSortAmountDown, faFilter, faDollarSign, faClock);
export default {
	name: 'Share',
	directives: {
		ClickOutside
	},
	props: {
		sortOption: String,
		loaded: Boolean
	},
	data: function () {
		return {
			showOption: false
		};
	},
	mounted: function () {
		this.$nextTick(function () {
			this.setSortAtfirst();
		});
	},
	methods: {
		setSortAtfirst() {
			this.sortTypeSelected('AverageRate', 1);
		},
		sortTypeSelected(type, order) {
			this.$emit('selectedSort', type, order);
		},
		close() {
			this.showOption = false;
		}
	}

};
</script>
<style scoped>
@media /*(min-width: 320px) and*/ (max-width: 575.98px) {
    #sort-box {
        width: 97% !important
    }
}

#sort-box {
    width: 100% !important;
    height: unset !important
}
.sort-option__desktop {
    width: calc(100% - 300px);
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    display: flex;
    font-size: 13px;
    white-space: nowrap;
    align-items: center;
    /* justify-content: space-around; */
    margin-bottom: 10px;
    height: 52px;
    color: #656565
}
.sort-option__desktop span {
    background: #FAFAFA;
    border-left: 1px solid #CCCCCC;
    color: #666666;
    height: 100%;
    width: calc((100% /5) + 50px);
    border-radius: 0px 5px 5px 0px;
    font-weight: 600;
}
.sort-option__desktop div {
    height: 52px;
    display: flex;
    align-items: center;
    width: calc((100% - 50px )/4);
    justify-content: center;
    position: relative;
}
.sort-option__desktop div:not(:last-child)::after {
    content: ' ';
    position: absolute;
    background: #DDDDDD;
    height: 30px;
    width: 1px;
    left: 0px;
}
.sort-option__desktop div:hover {
    cursor: pointer;
}
.selectedOption {
    border-bottom: 2px solid #EB384D;
    color: #EB384D;
    font-weight: 600;
}

.sort-option-skeleton {
    border: none !important
}
@media only screen and (max-width: 767.98px) {
    .desktop {
        display: none !important
    }
    .mobile {
        display: block !important;
    }
    .unload-mobile-skeleton {
        display: flex !important;
    }
    #sort-box {
        margin-top: 0px;
    }
    .sort-option__desktop {
        width: 100% !important;
        overflow: auto;
        height: 48px;
        border-radius: 0px;
    }
    .sort-option__desktop__title {
        display: none !important;
    }
    .sort-option__desktop div {
        min-width: 120px;
    }
    .selectedOption {
        border: none  !important;
    }
}
@media only screen and (min-width: 768px) {
    .mobile {
        display: none !important;
    }
    .sort-option__desktop {
        width: 100%;
    }
    #sort-box {
        margin-top: 0;
    }
    .sort-option__skeleton-desktop {
        display: flex !important;
        border: none !important
    }
}

@media only screen and (min-width: 768px) {
    .sort-option__skeleton {
        border: none !important;
    }
}

.sort-option-skeleton__title {
    width: 240px !important;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
    background-color: #E8E8E8 !important;
    border-left: none !important;
}
.sort-option-skeleton__title::after {
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
    .sort-option-skeleton__title {
        width: 80% !important;
        height: 23px !important;
        border-radius: 20px !important;
    }
    .sort-option__skeleton {
        background: none !important;
        margin:0px 5px;
        display: none !important;
    }
}
</style>
