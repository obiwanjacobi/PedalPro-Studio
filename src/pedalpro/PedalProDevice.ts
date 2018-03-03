import { HID } from "node-hid";
import { ProtocolBuffer } from "./ProtocolBuffer";
import PedalProDeviceIdentity from "./PedalProDeviceIdentity";

export const PresetCount: number = 400;

export default class PedalProDevice {
    public Id?: PedalProDeviceIdentity;

    private hidDevice: HID | null = null;

    public static throwIfNotValidPresetIndex(presetIndex: number) {
        if (!PedalProDevice.isValidPresetIndex(presetIndex)) {
            throw new RangeError("Argument presetIndex is not in range of 0-399.");
        }
    }

    public static isValidPresetIndex(presetIndex: number): boolean {
        return presetIndex >= 0 && presetIndex < PresetCount;
    }

    public get isConnected(): boolean {
        return this.hidDevice !== null;
    }

    public disconnect() {
        if (this.hidDevice !== null) {
            this.hidDevice.close();
            this.hidDevice = null;
        }
    }

    public  connect() {
        if (this.isConnected) { return; }

        try {
            // VENDOR_ID  0x04d8 - Vintage Revolution
            // DEVICE_ID  0x0005 - PedalPro
            this.hidDevice = new HID(0x04d8, 0x0005);
        } catch (error) {
            throw new Error("Device is not connected.");
        }
    }

    public write(buffer: ProtocolBuffer): void {
        this.safeCall( () =>
            // @ts-ignore: safeCall
            this.hidDevice.write(buffer.data));
    }

    public read(): number[] {
        let buffer: number[];

        this.safeCall( () =>
            // @ts-ignore: safeCall
            buffer = this.hidDevice.readSync());

        // @ts-ignore: works fine
        return buffer;
    }

    private safeCall(operation: () => void) {
        for (let n = 0; n < 3; n++) {
            try {
                if (!this.hidDevice) { this.connect(); }
                operation();
                return;
            } catch (error) {
                this.disconnect();
                if (error === "") { return; }
            }
        }
    }
}