import DataBuffer from "./DataBuffer";

const ProtocolBufferSize = 65;

export class ProtocolBuffer extends DataBuffer {

    public static isCommandDone(command: number, response: number[]): boolean {
        return response &&
            response.length >= 2 &&
            response[0] === command;
    }

    public constructor() {
        super(ProtocolBufferSize);
    }

    public isCommandSuccess(response: number[]): boolean {
        return ProtocolBuffer.isCommandDone(this.command, response);
    }

    public get command(): number {
        if (this.data.length < 2) { return 0; }
        return this.data[1];
    }

    /**
     * Prepares the buffer for the read-vut command
     * that returns device identifiaction data.
     */
    public setVintageUnitTypeCmd() {
        this.clear();
        this.data[1] = 0x22;    // read vut command
        // this.data[2] = 0;       // payload
        // this.data[3] = 0x00;    // address hi
        this.data[4] = 0x10;    // address lo
    }

    /**
     * Prepares the buffer for read-vut command for the master FW 
     * that serves as a verion identification for the device.
     */
    public setMasterVersionCmd() {
        this.clear();
        this.data[1] = 0x22;    // read vut command
        // this.data[2] = 0;       // payload
        this.data[3] = 0x7F;    // address hi
        this.data[4] = 0x40;    // address lo
    }
}