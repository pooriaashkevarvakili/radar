
import { Module } from 'vuex-module-accessor';
import UserModule from '~/store/User';

export default class RootModule extends Module<RootModuleState> {
    /**
     * Creates an instance of RootModule
     *
     * @memberof RootModule
     */
    constructor() {
        super(RootModuleState);
    }
    /**
     * Mutation - Updates the value of selected menu
     * 
     * @param {string} payload
     * @memberof RootModule
     */
    set selectedMenu (payload: string) {
        this.state.selectedMenu = payload;
    }
    init() {
        console.log(34567);
    }
}

class RootModuleState {
    /**
     * Current selected menu
     * 
     * @type {string}
     * @memberof RootModuleState
     */
    selectedMenu: string = 'Hotel'
}