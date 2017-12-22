import PedalProReadPreset from "../PedalProReadPreset";
import { PedalProDevice } from "../PedalProDevice";

describe("PedalProReadPreset.ts", () => {
    it("Can read preset 0 over Usb", () => {
        const device = PedalProDevice;
        device.connect();
        
        const command = new PedalProReadPreset(device);
        command.read(0)
            .then((buffer) => {
                expect(buffer.name).toHaveLength(10);
                expect(buffer.name).toBe("Bypass    ");
            })
            .catch((error) => {
                console.error(error);
            });
    });
});
