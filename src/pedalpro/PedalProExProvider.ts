import PedalProDevice from "./PedalProDevice";
import PedalProProvider from "./PedalProProvider";

export default class PedalProExProvider extends PedalProProvider {

    public constructor(device: PedalProDevice) {
        super(device);
    }
}