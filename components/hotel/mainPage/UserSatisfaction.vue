<template>
	<div id="user-satisfaction">
		<span>چه قدر رادار تصمیماتتان را تغییر داده است؟!</span>
		<ul>
			<li @click="submitVote(5)">
				<div class="very-happy" />
			</li>
			<li @click="submitVote(4)">
				<div class="happy" />
			</li>
			<li @click="submitVote(3)">
				<div class="poker" />
			</li>
			<li @click="submitVote(2)">
				<div class="sad" />
			</li>
			<li @click="submitVote(1)">
				<div class="very-sad" />
			</li>
		</ul>
	</div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
	methods: {
		async submitVote(voteId) {
			if (typeof Cookie !== 'undefined') {
				if (!Cookie.get('satisfactionId')) {
					const id = parseInt(Math.random() * (10000000000000 - 1) + 1);
					Cookie.set('satisfactionId', id);
					const res = await this.$store.dispatch('Hotel/sendUserVote', {
						id: id,
						voteId: voteId
					});
					if (res.status === 200) {
						this.$swal({
							icon: 'success',
							showConfirmButton: false,
							text: 'نظر شما با موفقیت ثبت شد.',
							timer: 2000
						});
					}
				} else {
					this.$swal({
						icon: 'error',
						showConfirmButton: false,
						text: 'شما قبلا نظر دادید!',
						timer: 2000
					});
				}
			}
		}
	}
};
</script>
<style scoped>
#user-satisfaction {
	text-align: center;
	background: #f9f9f9;
	height: 75px;
	border-top: 1px solid #d1d1d1;
	border-bottom: 1px solid #d1d1d1;
}
#user-satisfaction span {
	font-size: 17px;
	line-height: 20px;
	font-weight: bold;
	text-align: right;
	color: #fe415d;
	position: relative;
	top: -10px;
}
#user-satisfaction ul {
	display: inline-flex;
	list-style: none;
	padding: 19.8px;
}
#user-satisfaction ul li {
	margin-left: 25px;
	cursor: pointer;
}
.very-happy {
	width: 32px;
	height: 32px;
	background-image: url("~assets/images/very-happy-emoji-mask.svg");
	filter: grayscale(100%);
	background-size: contain;
}
.very-happy:hover {
	filter: grayscale(0);
	transform: scale(1.1);
}
.happy {
	width: 32px;
	height: 32px;
	background-image: url("~assets/images/happy-emoji-mask.svg");
	filter: grayscale(100%);
	background-size: contain;
}
.happy:hover {
	filter: grayscale(0);
	transform: scale(1.1);
}
.poker {
	width: 32px;
	height: 32px;
	background-image: url("~assets/images/poker-emoji-mask.svg");
	filter: grayscale(100%);
	background-size: contain;
}
.poker:hover {
	filter: grayscale(0);
	transform: scale(1.1);
}
.sad {
	width: 32px;
	height: 32px;
	background-image: url("~assets/images/sad-emoji-mask.svg");
	filter: grayscale(100%);
	background-size: contain;
}
.sad:hover {
	filter: grayscale(0);
	transform: scale(1.1);
}
.very-sad {
	width: 32px;
	height: 32px;
	background-image: url("~assets/images/very-sad-emoji-mask.svg");
	filter: grayscale(100%);
	background-size: contain;
}
.very-sad:hover {
	filter: grayscale(0);
	transform: scale(1.1);
}
@media (max-width: 768px) {
	#user-satisfaction {
		height: 140px;
		padding: 30px 0px;
		border-bottom: none !important;
	}
	#user-satisfaction span {
		top: 0 !important;
	}
	#user-satisfaction ul {
		padding: 0;
		padding-top: 20px;
	}
	#user-satisfaction ul li:first-child {
		margin-right: 25px;
	}
	.very-happy {
		background-image: url("~assets/images/very-happy-emoji-mask.svg");
	}
	.happy {
		background-image: url("~assets/images/happy-emoji-mask.svg");
	}
	.poker {
		background-image: url("~assets/images/poker-emoji-mask.svg");
	}
	.sad {
		width: 32px;
		height: 32px;
		background-image: url('~assets/images/sad-emoji-mask.svg');
		filter: grayscale(100%);
		background-size: contain;
	}
	.sad:hover {
		filter: grayscale(0);
		transform: scale(1.1);
	}
	.very-sad {
		background-image: url("~assets/images/very-sad-emoji-mask.svg");
	}
}
</style>
