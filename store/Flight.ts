import FlightModule from "~/lib/modules/Flight";
import { ModuleAccessor } from 'vuex-module-accessor';

export default new ModuleAccessor(new FlightModule(), "flight/");