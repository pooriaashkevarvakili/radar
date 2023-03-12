import { Module } from 'vuex-module-accessor';
import { LoginApi, SignUpApi, UserApi } from '../user-service/index';
const Cookie = process.client ? require('js-cookie') : undefined;
export default class UserModule extends Module<UserModuleState> {
	/**
	 * Creates an instance of UserModule
	 *
	 * @memberof UserModule
	 */
	constructor() {
		super(UserModuleState);
	}

	/**
	 * set login modal step
	 * @param {string} step
	 */
	set step(payload: string) {
		this.state.step = payload;
	}

	/**
	 * set user phoneNumber
	 * @param {string} phone
	 */
	set phoneNumber(phone: string) {
		this.state.phoneNumber = phone;
	}

	/**
     * Mutation - set user sign in status
     * 
     * @param {boolean} payload
     * @memberof RootModule
     */
    set isUserSigendIn(payload: boolean) {
        this.state.isUserSignedIn = payload;
    }

    /**
     * Mutation - set user info
     * 
     * @param {object} payload
     * @memberof RootModule
     */
    set userInfo(payload: object) {
        this.state.userInfo = payload;
    }

	/**
     * Mutation - set user detail from api
     * 
     * @param {object} payload
     * @memberof RootModule
     */
    set userDetail(payload: object) {
        this.state.userDetail = payload;
    }

	/**
     * Mutation - set token
     * 
     * @param {string} payload
     * @memberof RootModule
     */
    set token(payload: string | null) {
        this.state.token = payload;
    }

	/**
	 * send phone number in first step of login
	 * @param {string} phone
	 */
	loginFirstStep(phone: string) {
		new LoginApi().apiLoginGetSmsTokenPhoneGet(phone).then((res) => {
			if (res.status === 200) {
				this.step = 'register1'
			}
		})
	}

	/**
	 * verify sms and check if user is available
	 * @param {string} phone
	 */
	verifySms(code: string) {
		new SignUpApi().apiSignUpPhoneNumberPhoneNumberIsAvailableGet(this.state.phoneNumber).then((response: any) => {
			new LoginApi().apiLoginVerifySmsPost({phoneNumber: this.state.phoneNumber, token: code}).then((res: any) => {
				if (res.status === 200) {
					this.token = res.data.token;
					if (!response.data) {
						if (res.data.userDetails.completedInformation) {
							this.step = 'loggedIn';
						} else {
							this.step = 'register2'
						}
						this.userDetail = res.data.userDetails;
						localStorage.setItem('token', res.data.token);
						if (typeof Cookie !== 'undefined') {
							// Cookie.set('token', res.data.token); // saving token in cookie for server rendering
						}
					} else {
						this.step = 'register2'
					}
				}
			})

		})

	}

	/**
	 * send phone number in first step of login
	 * @param {string} phone
	 */
	signUpUser(payload: {firstName: string, lastName: string, email: string}) {
		new SignUpApi().apiSignUpPost({ firstName: payload.firstName, lastName: payload.lastName, email: payload.email, phoneNumber: this.state.phoneNumber}).then((res: any) => {
			if (res.status === 200) {
				this.step = 'loggedIn';
				this.userDetail = res.data.userDetails;
			} else if(res.status === 204) {
				this.step = 'loggedIn';
				this.getUserDetail();
			}
		})
	}

	/**
	 * send phone number in first step of login
	 * @param {string} phone
	 */
	getUserDetail() {
		new UserApi().apiUserGetUserGet({headers: {'Authorization': 'Bearer ' + this.state.token}}).then((res) => {
			this.userDetail = res.data;
		})
	}

	logoutUser() {
		this.token = null;
		localStorage.removeItem('token');
		this.userDetail = {}
	}

	nuxtClientInit() {
		if (localStorage.getItem('token')) {
			this.token = localStorage.getItem('token');
			this.getUserDetail();
		}
	}
}

class UserModuleState {
	/**
	 * Login modal current step
	 */
	step: string = 'first';
	phoneNumber: string = '';
    isUserSignedIn: boolean = false
    userInfo: object = {}
	userDetail: object = {};
	token: string | null = ''
}