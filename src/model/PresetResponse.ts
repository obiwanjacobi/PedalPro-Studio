import Fault from "./Fault";
import Preset from "./Preset";
import DeviceIdentity from "./DeviceIdentity";

export default interface PresetResponse {
    fault?: Fault;
    device: DeviceIdentity;
    presets: Preset[];
}