import { HID, devices } from "node-hid";
import { ProtocolBuffer } from "./ProtocolBuffer";

let hidDevice: HID | null = null;

export class PedalProDevice {

    public get isConnected(): boolean {
        return hidDevice !== null;
    }

    public disconnect() {
        if (hidDevice !== null) {
            hidDevice.close();
            hidDevice = null;
        }
    }

    public connect() {
        if (this.isConnected) { return; }
        hidDevice = this.createHID();
    }

    public write(buffer: ProtocolBuffer): void {
        this.safeCall(() =>
            // @ts-ignore: safeCall
            hidDevice.write(buffer.data));
    }

    public read(): number[] {
        let buffer: number[];

        this.safeCall(() =>
            // @ts-ignore: safeCall
            buffer = hidDevice.readSync());

        // @ts-ignore: works fine
        return buffer;
    }

    private safeCall(operation: () => void) {
        for (let n = 0; n < 3; n++) {
            if (!hidDevice) { this.connect(); }

            try {
                operation();
                return;
            } catch (error) {
                this.disconnect();
                if (error === "") { return; }
            }
        }
    }

    private createHID(): HID {
        // VENDOR_ID  0x04d8 - Vintage Revolution (Microchip Firmware)
        // DEVICE_ID  0x0005 - PedalProEx
        // DEVICE_ID  0x0005 - PedalPro
        const vendorId = 0x04d8;
        const productId = 0x0005;

        // had to implement this workaround to get it working for Mac.
        const hidDevices = devices();
        for (let i = 0; i < hidDevices.length; i++) {
            const d = hidDevices[i];
            if (d.path &&
                d.productId === productId &&
                d.vendorId === vendorId) {

                try {
                    return new HID(d.path);
                } catch (error) {
                    throw new Error("Device could not be opened: " + error);
                }
            }
        }

        throw new Error("Device is not connected.");
    }
}