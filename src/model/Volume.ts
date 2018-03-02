import { Percent } from "./Types";

export default interface Volume {
    enabled: boolean;
    levelL: Percent;
    levelR: Percent;
}