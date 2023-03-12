<template>
	<div class="wrapper" :class="{'flight-message': type === 'flight'}">
		<div :class="{ 'closed ': massageClose }" class="message">
			<img src="~assets/images/notification-icon.svg" alt="note">
			<div id="massage-width">
				تمام نتایج آخرین بار در <span>{{ randomTime() }}</span> ثانیه گذشته
				بروزرسانی شده‌اند!
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		isMobileSize: Boolean,
		type: String
	},
	data: function () {
		return {
			massageClose: false
		};
	},
	mounted: function () {
		const that = this;
		setTimeout(function () {
			that.massageClose = true;
		}, 300);
	},
	methods: {
		randomTime: function () {
			return (Math.random() * 4 + 1).toFixed(2);
		}
	}
};
</script>
<style scoped>
.closed {
   opacity: 0;
  -webkit-transition: 1.5s;
  transition: 1.5s;
}
.wrapper {
	position: relative;
}
.message {
  background: #FAFFFF;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  position: absolute;
  top: -210px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #15BBCC;
  font-size: 14px;
}
.message img {
	margin-left: 10px;
}
@media (max-width: 767.98px) {
	.message {
		margin-bottom: 5px;
		margin-top: 5px;
		position: unset
	}
	.flight-message .message {
		top: -25px;
	}
}

</style>
