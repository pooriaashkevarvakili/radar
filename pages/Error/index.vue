<template>
	<div class="Error-position">
		<div>
			چنین صفحه‌ای وجود ندارد!
		</div>
		<router-link class="btn" to="/">
			رفتن به صفحه اصلی
		</router-link>
	</div>
</template>
<script>
export default {
	name: 'Error'
};
</script>
<style scoped>
.Error-position {
    height: calc(100vh - 75px);
    padding-top: 35vh;
    text-align: center;
    font-size: 20px;
    font-weight: 900;
}
.btn {
    border: 2px solid #ff536d;
    color: #ff536d;
    font-weight: 900;
    border-radius: 100px;
    margin-top: 5vh;
    cursor: pointer;
}
.btn:hover {
    color: #ff536d;
}
</style>
