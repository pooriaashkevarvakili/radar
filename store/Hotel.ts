import HotelModule from '~/lib/modules/Hotel'
import { ModuleAccessor } from 'vuex-module-accessor';

export default new ModuleAccessor(new HotelModule(), 'Hotel/');