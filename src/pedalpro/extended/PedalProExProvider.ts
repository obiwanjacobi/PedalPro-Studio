import PedalProDevice from "../PedalProDevice";
import PedalProProvider from "../standard/PedalProProvider";

export default class PedalProExProvider extends PedalProProvider {

    public constructor(device: PedalProDevice) {
        super(device);
    }
}