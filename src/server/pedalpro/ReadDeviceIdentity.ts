import { PedalProDevice } from "./PedalProDevice";
import { PedalProDeviceIdentity, PedalProDeviceModel } from "./PedalProDeviceIdentity";
import { ProtocolBuffer } from "./ProtocolBuffer";
import { DeviceStdProfile } from "./standard/DeviceStdProfile";
import { DeviceExProfile } from "./extended/DeviceExProfile";

export class ReadDeviceIdentity {
    private readonly device: PedalProDevice;

    public constructor(device: PedalProDevice) {
        this.device = device;
    }

    public read(): PedalProDeviceIdentity {
        const deviceId: PedalProDeviceIdentity = {
            device: "",
            vendor: "Vintage Revolution",
            version: "",
            model: PedalProDeviceModel.Unspecified,
            supported: false,
            presetCount: 0,
        };

        this.readVut(deviceId);
        this.readMasterVersion(deviceId);
        this.setDeviceInfo(deviceId);

        return deviceId;
    }

    private setDeviceInfo(deviceId: PedalProDeviceIdentity): void {
        switch (deviceId.model) {
            case PedalProDeviceModel.PedalPro:
            deviceId.device = "PedalPro";
            deviceId.presetCount = DeviceStdProfile.presetCount;
            break;

            case PedalProDeviceModel.PedalProEx:
            deviceId.device = "PedalPro-Ex";
            deviceId.presetCount = DeviceExProfile.presetCount;
            break;

            // case PedalProDeviceModel.Pedalino:
            // deviceId.device = "Pedalino";
            // break;

            default:
            deviceId.device = "Unknown";
            deviceId.supported = false;
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
                deviceId.supported = 
                    deviceId.model === PedalProDeviceModel.PedalPro ||
                    deviceId.model === PedalProDeviceModel.PedalProEx;
            } else {
                id = vutData[2];
                if (id === 1) {
                    deviceId.model = PedalProDeviceModel.PedalProEx;
                    deviceId.supported = vutData[3] === 1;
                } else {
                    deviceId.model = PedalProDeviceModel.PedalPro;
                    deviceId.supported = true;
                }
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