import { ProtocolBuffer } from "./ProtocolBuffer";
export declare const PresetCount: number;
export declare class PedalProDeviceUsb {
    private hidDevice;
    static throwIfNotValidPresetIndex(presetIndex: number): void;
    static isValidPresetIndex(presetIndex: number): boolean;
    readonly isConnected: boolean;
    disconnect(): void;
    connect(): void;
    write(buffer: ProtocolBuffer): void;
    readSync(): number[];
    read(): Promise<number[]>;
    private ThrowNotConnected();
}
/**
 * Use the module export mechanism to make this a singelton.
 */
export declare let PedalProDevice: PedalProDeviceUsb;
