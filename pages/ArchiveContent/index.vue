<template>
	<div class="container">
		<div class="home">
			<div v-show="wpContent.length == 0 && error == false" id="loader" />
			<div v-show="error != false" id="error">
				<p>متاسفانه خطایی رخ داده است</p>
			</div>
			<div v-show="wpContent.length != 0" class="archive">
				<ul>
					<a v-for="data in wpContent" :key="data.id" :href="'/flights/' + data.slug"><li><h1>{{ data.title.rendered }}</h1></li></a>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Axios from 'axios';
export default {
	name: 'ArchiveContent',
	async asyncData({ params, error, payload }) {
		try {
			const res = await Axios.get('https://blog.radar361.com/wp-json/wp/v2/posts', { headers: { accept: 'application/vnd.radar361.v1.1+json' } });
			return { wpContent: res.data, error: false };
		} catch (e) {
			return { error: true };
		}
	},
	mounted: function () {
		this.$root.$emit('tabChanged', 'Flight');
	}
};
</script>
<style scoped>
.archiveContent p {
    text-align: right;
    padding-right: 90px;
}
.archive ul {
    list-style: none;
    text-align: right;
    padding: 0;
}
.archive ul a {
    text-decoration: none;
}
.archive ul li {
    background-color: #fff;
    padding: 10px;
    margin: 10px 0;
}
.archive ul li h1 {
    font-size: 16px;
}
#error p {
    text-align: center;
    color: red;
    padding-top: 20vh;
    height: 50vh;
    font-weight: 900;
}
</style>
