<template>
	<div id="link-box" class="row">
		<input id="link-box-input" v-model="phoneNO" placeholder="شماره موبایل: ۰۹۱۲۱۲۳۴۵۶۷" onfocus="this.placeholder = ''" onblur="this.placeholder = 'شماره موبایل: ۰۹۱۲۱۲۳۴۵۶۷'">
		<button id="link-btn" @click="send">
			دریافت لینک
		</button>
	</div>
</template>

<script>
import Axios from 'axios';
export default {
	name: 'GetLink',
	data: function () {
		return {
			phoneNO: ''
		};
	},
	methods: {
		send: function () {
			const phone = this.phoneNO;
			sendSMS(phone);
		}
	}
};

function sendSMS(phone) {
	if (phone.length !== 11 || phone.substring(0, 2) !== '09' || isNaN(phone)) {
		alert('شماره موبایل باید در قالب ۰۹xxxxxxxxx باشد');
		return;
	}
	Axios.get(`${process.env.VUE_APP_FLIGHT_API}/api/share/${phone}`).then((res) => {
		alert('لینک با موفقیت ارسال شد!');
	}).catch((err) => {
		alert(err);
	});
}
</script>
<style scoped>
#link-box {
    height: 52px;
    width: 432px;
    background-color: #FFFFFF;
    border-radius:8px;
    margin-bottom: 32px;
    box-shadow:0px 0px 10px rgba(0, 0, 0, 0.1);
}
#link-box-input {
    width: 220px;
    height: 40px;
    margin: 5px 25px;
    font-size: 15px;
    font-weight: 600;
    outline: none;
    border: none;
    text-align: right;
}
#link-box-input::placeholder:hover {
    color: #0F131C
}
#link-btn {
    width: 162px;
    height: 52px;
    background-color: #3DD8A8;
    border-radius: 8px 0px 8px 8px;
    font-size: 18px;
    text-align: center;
    color: #FFFFFF;
    font-weight: 600;
    outline: none;
    border: none;
    cursor: pointer;
    display: block;
    padding-bottom: 2px;
    transition: box-shadow 0.3s;
}
#link-btn:hover {
    -webkit-box-shadow: 10px 0 10px rgba(61, 216, 168, 0.2);
    box-shadow: 10px 0 10px rgba(61, 216, 168, 0.2);
}

@media (min-width: 992px) and (max-width: 1199.98px) {
    #link-btn {
        margin-right: 0px;
    }
}
@media (min-width: 767px) and (max-width: 991.98px) {
    #link-box {
        width: 360px;
    }
    #link-box-input {
        margin: 5px 10px 5px 0px;
        width: 210px;
        font-size: 17px;
    }
    #link-btn {
        margin-right: 0px;
        width: 140px;
        font-size: 20px;
    }
}
@media (min-width: 576px) and (max-width: 767.98px) {
    #link-box {
        display: none;
    }
}
@media /*(min-width: 320px) and*/ (max-width: 575.98px) {
    #link-box {
        display: none;
    }
}
</style>
