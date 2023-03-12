<template>
	<div class="error-container d-flex align-items-center justify-content-center">
		<div v-if="error.message === 'Network Error'" class="network-error">
			<network-error />
		</div>
		<div v-if="error.statusCode === 404">
			<not-found :status="404" />
		</div>
		<div v-if="error.statusCode === 500 && error.message !== 'Network Error'">
			<not-found :status="500" />
		</div>
	</div>
</template>
<script>
import NetworkError from '~/components/error/network-error';
import NotFound from '~/components/error/not-found';
export default {
	components: {
		NetworkError,
		NotFound
	},
	props: ['error'],
	mounted() {
		if (!this.error.message === 'Network Error') {
			document.body.classList.add('network-error');
		}
	}
};
</script>

<style scoped>
@media (max-width: 768px) {
	::v-deep .network-error #user-satisfaction, ::v-deep .network-error .footer-row {
		display: none !important
	}
}
::v-deep .btn {
    border: 2px solid #ff536d;
    color: #ff536d;
    font-weight: 900;
    border-radius: 100px;
    margin-top: 5vh;
    cursor: pointer;
}
::v-deep .btn:hover {
    color: #ff536d;
}
::v-deep .network-error {
	height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.error-container {
	height: 100vh
}
</style>
