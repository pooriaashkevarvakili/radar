<template>
	<div class="main">
		<div v-if="flightFooter" class="row box">
			<div class="container">
				<div v-html="flightFooter" />
			</div>
		</div>
		<div v-else class="row box">
			<div class="container">
				<h1 class="h4">بلیط هواپیما تهران مشهد</h1>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	props: {
		origin: String,
		destination: String
	},
	computed: {
		...mapState('Flight', ['flightFooter'])
	}
};
</script>
<style scoped>
@import url('~/assets/css/footer-meta.css');
</style>
