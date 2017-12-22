import { PedalProDevice } from "../PedalProDevice";
import { ProtocolBuffer } from "../ProtocolBuffer";

describe("PedalProDevice.ts - Device is Connected!", () => {
    it("Can connect to Usb", () => {
        PedalProDevice.connect();
        expect(PedalProDevice.isConnected).toBe(true);
    });

    it("Singleton is not null", () => {
        expect(PedalProDevice).not.toBeNull();
    });

    it ("read reads data from Usb", () => {
        PedalProDevice.connect();
        // send out command to be able to read response
        const buffer = new ProtocolBuffer();
        buffer.setLoadPresetCmd(0);
        PedalProDevice.write(buffer);

        PedalProDevice.read()
            .then((result) => {
                expect(result.length).toBeGreaterThan(0);
            })
            .catch((reason) => {
                console.error(reason.message);
            });
    });
});
