import { HID } from "node-hid";
import { ProtocolBuffer } from "./ProtocolBuffer";

export default class PedalProDevice {
    private hidDevice: HID | null = null;

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
            // DEVICE_ID  0x0005 - PedalProEx
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
            if (!this.hidDevice) { this.connect(); }

            try {
                operation();
                return;
            } catch (error) {
                this.disconnect();
                if (error === "") { return; }
            }
        }
    }
}