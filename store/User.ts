import UserModule from '~/lib/modules/User'
import { ModuleAccessor } from 'vuex-module-accessor';

export default new ModuleAccessor(new UserModule(), 'User/');