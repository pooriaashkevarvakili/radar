import ResortModule from '~/lib/modules/Resort'
import { ModuleAccessor } from 'vuex-module-accessor';

export default new ModuleAccessor(new ResortModule(), 'Resort/');