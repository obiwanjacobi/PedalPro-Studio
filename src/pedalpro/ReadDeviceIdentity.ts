import PedalProDevice from "./PedalProDevice";
import PedalProDeviceIdentity, { PedalProDeviceModel } from "./PedalProDeviceIdentity";
import { ProtocolBuffer } from "./ProtocolBuffer";

export default class ReadDeviceIdentity {
    private readonly device: PedalProDevice;

    public constructor(device: PedalProDevice) {
        this.device = device;
    }

    public read(): PedalProDeviceIdentity {
        const deviceId: PedalProDeviceIdentity = {
            device: "",
            vendor: "Vintage Revolution",
            version: "",
            model: PedalProDeviceModel.Unspecified
        };

        this.readVut(deviceId);
        this.readMasterVersion(deviceId);
        this.setDeviceName(deviceId);

        return deviceId;
    }

    private setDeviceName(deviceId: PedalProDeviceIdentity): void {
        switch (deviceId.model) {
            case PedalProDeviceModel.PedalPro:
            deviceId.device = "PedalPro";
            break;

            case PedalProDeviceModel.PedalProEx:
            deviceId.device = "PedalPro-Ex";
            break;

            case PedalProDeviceModel.Pedalino:
            deviceId.device = "Pedalino";
            break;

            default:
            deviceId.device = "Unspported";
            break;
        }
    }

    private readVut(deviceId: PedalProDeviceIdentity): void {

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

    private readMasterVersion(deviceId: PedalProDeviceIdentity): void {
        const buf = new ProtocolBuffer();
        buf.setMasterVersionCmd();
        this.device.write(buf);

        const vutData = this.device.read();
        if (vutData && vutData.length > 0) {
            deviceId.version = `${vutData[1]}.${vutData[2]}`;
        }
    }
}