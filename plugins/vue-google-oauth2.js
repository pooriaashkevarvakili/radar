import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
	clientId: '1055578834989-7f5hjb9c4hnlhqnc2ksu4kpc22l87cbc.apps.googleusercontent.com',
	scope: 'profile email',
	prompt: 'select_account'
};
Vue.use(GAuth, gauthOption);
