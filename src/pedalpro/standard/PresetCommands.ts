import PedalProDevice from "../PedalProDevice";
import DeviceCommand from "../DeviceCommand";

export default class PresetCommands extends DeviceCommand {
    public constructor(device: PedalProDevice) {
        super(device);
    }
}