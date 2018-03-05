import { Percent } from "./Types";

export default interface Dsp {
    enabled: boolean;
    input: Percent;
    dry: Percent;
    wet: Percent;
}