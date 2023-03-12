<template>
	<div class="main">
		<div v-if="footer" class="row box">
			<div class="container">
				<div v-html="footer" />
			</div>
		</div>
	</div>
</template>
<script>
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faChevronUp, faChevronDown);
export default {
	props: {
		footer: String
	}
};
</script>
<style scoped>
@import url('~/assets/css/footer-meta.css');
</style>
