<template>
	<div class="custom-container pb-4">
		<div v-if="title" class="title d-flex" v-html="title" />
		<h3 v-else class="title">
			{{ 'سوالات متداول' }}
		</h3>
		<div class="faqs">
			<div v-for="(item, index) in faq" :key="index" class="faq-box">
				<div class="faq-question d-flex align-items-center justify-content-between" @click="selectedFaq = index" :class="{'selected-faq': selectedFaq === index}" >
					<div v-html="item.Question" />
					<span class="icon-wrapper">
						<font-awesome-icon v-if="selectedFaq !== index" :icon="['fas', 'chevron-down']" class="see-more__icon fa-style" />
						<font-awesome-icon v-else :icon="['fas', 'chevron-up']" @click.stop="selectedFaq = ''" class="fa-style"/>
					</span>
				</div>
				<div v-show="selectedFaq === index" class="faq-answer">
					<div v-html="item.Answer" />
				</div>
			</div>
		</div>
		<div v-if="faq.length" class="schema-faq-code" itemscope="" itemtype="https://schema.org/FAQPage">
			<div v-for="(item, index) in faq" :key="index" itemscope="" itemprop="mainEntity" itemtype="https://schema.org/Question">
				<div itemprop="name" v-html="item.Question" />
				<div itemscope="" itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
					<div itemprop="text" v-html="item.Answer" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faChevronUp, faChevronDown);
export default {
	props: {
		faq: Array,
		title: String
	},
	data() {
		return {
			selectedFaq: ''
		};
	}
};
</script>
<style scoped>
::v-deep p, ::v-deep h1, ::v-deep h2, ::v-deep h3, ::v-deep h4, ::v-deep h5, ::v-deep h6 {
    margin-bottom: 0px;
    font-size: 1em;
    text-align: right
}
.title {
    font-weight: 600;
    font-size: 15px;
    line-height: 23px;
    text-align: right;
    color: #1D1D1D;
    margin-top: 30px;
    margin-bottom: 20px
}
::v-deep .title h2, ::v-deep .title h3 {
    font-weight: unset;
    font-size: unset;
    line-height: unset;
}
.faqs {
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    margin-bottom: 30px;
}
.faq-question {
    padding: 15px 30px;
    background: white;
    font-size: 14.5px;
    color: #1D1D1D;
    position: relative;
    cursor: pointer
}
.faq-question:hover {
    background: #F6F6F6
}
.faq-question::after {
    content: '';
    width: calc(100% - 60px);
    height: 1px;
    position: absolute;
    background-color: #DDDDDD;
    bottom: -1px;
    z-index: 1
}
.faq-question.selected-faq::after {
    width: 100%;
    right: 0px
}
.faq-answer {
    text-align: right;
    padding: 15px 30px
}
.faq-box:first-child .faq-question {
    border-radius: 5px 5px 0px 0px;
}
.faq-box:last-child .faq-question:not(.selected-faq) {
    border-radius: 5px;
}
.icon-wrapper {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon-wrapper:hover {
    background: #ebebeb;
}
@media (max-width: 575.98px) {
    .custom-container {
        padding: 0px !important;
    }
    .faqs {
        border-radius: 0px;
        border-left: 0px;
        border-right: 0px;
    }
    .faq-box:first-child .faq-question {
        border-radius: 0px
    }
    .faq-box:last-child .faq-question:not(.selected-faq) {
        border-radius: 0px
    }
    .faq-answer, .faq-question {
        padding: 15px 10px
    }
    .faq-question::after {
        width: calc(100% - 20px);
    }
    .faq-question.selected-faq::after {
        width: 100%;
        right: 0px
    }
}
.schema-faq-code {
    display: none
}
</style>
