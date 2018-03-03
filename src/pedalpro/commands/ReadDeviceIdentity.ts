import PedalProDevice from "../PedalProDevice";
import DeviceIdentity, { PedalProDeviceModel } from "../DeviceIdentity";
import { ProtocolBuffer } from "../ProtocolBuffer";

export default class ReadDeviceIdentity {
    private readonly device: PedalProDevice;

    public constructor(device: PedalProDevice) {
        this.device = device;
    }

    public read(): DeviceIdentity {
        const deviceId: DeviceIdentity = {
            model: PedalProDeviceModel.Unspecified,
            name: "",
            vendor: "Vintage Revolution",
            version: ""
        };

        this.readVut(deviceId);

        return deviceId;
    }

    private readVut(deviceId: DeviceIdentity): void {

        const buf = new ProtocolBuffer();
        buf.setVintageUnitTypeCmd();
        this.device.write(buf);

        const vutData = this.device.read();
        if (vutData && vutData.length > 0) {
            let id = vutData[1];
            if (id > 0 && id < 5) {
                deviceId.model = <PedalProDeviceModel> id;
            } else {
                id = vutData[2];
                deviceId.model =  (id === 1) ?
                    deviceId.model = PedalProDeviceModel.PedalProEx :
                    deviceId.model = PedalProDeviceModel.PedalPro;
            }
        }
    }
}