import { HID } from "node-hid";
import { ProtocolBuffer } from "./ProtocolBuffer";

export class PedalProDeviceUsb {
    private hidDevice: HID | null = null;

    public static throwIfNotValidPresetIndex(presetIndex: number) {
        if (!PedalProDeviceUsb.isValidPresetIndex(presetIndex)) {
            throw new RangeError("Argument presetIndex is not in range of 0-399.");
        }
    }

    public static isValidPresetIndex(presetIndex: number): boolean {
        return presetIndex >= 0 && presetIndex < 400;
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

        // VENDOR_ID  0x04d8
        // DEVICE_ID  0x0005
        this.hidDevice = new HID(0x04d8, 0x0005);
    }   

    public write(buffer: ProtocolBuffer): void {
        if (this.hidDevice !== null) {
            this.hidDevice.write(buffer.data);
        } else {
            this.ThrowNotConnected();
        }
    }

    public readSync(): number[] {
        if (this.hidDevice !== null) {
            return this.hidDevice.readSync();
        }

        return [];
    }

    public async read(): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            if (this.hidDevice !== null) {
                this.hidDevice.read((error, data) => {
                    if (data) { resolve(data); }
                    if (error) { reject(new Error("Error reading Usb data")); }
                    reject(new Error("No result."));
                });
            } else {
                reject(new Error("Device not connected."));
            }
        });
    }

    private ThrowNotConnected() {
        throw new Error("PedalPro not connected");
    }
}

/**
 * Use the module export mechanism to make this a singelton.
 */
export let PedalProDevice = new PedalProDeviceUsb();