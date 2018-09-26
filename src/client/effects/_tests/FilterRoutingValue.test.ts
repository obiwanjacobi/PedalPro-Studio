import { FilterRoutingValue, FilterRouting } from "../../../model/Filters";

describe("Model/Filters.ts", () => {
    it ("FilterRouingValue - Bypass - all filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.Bypass);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1).toBe(false);
        expect(out.postFilter2).toBe(false);
        expect(out.postFilter2Left).toBe(false);
        expect(out.postStereo).toBe(false);
    });

    it ("FilterRouingValue - PreFilter1 - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PreF1);
        expect(out.preFilter1).toBe(true);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1).toBe(false);
        expect(out.postFilter2).toBe(false);
        expect(out.postFilter2Left).toBe(false);
        expect(out.postStereo).toBe(false);
    });

    it ("FilterRouingValue - PreFilter2 - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PreF2);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(true);
        expect(out.postFilter1).toBe(false);
        expect(out.postFilter2).toBe(false);
        expect(out.postFilter2Left).toBe(false);
        expect(out.postStereo).toBe(false);
    });

    it ("FilterRouingValue - PostFilter1 - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PostF1L);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1).toBe(true);
        expect(out.postFilter2).toBe(false);
        expect(out.postFilter2Left).toBe(false);
        expect(out.postStereo).toBe(false);
    });

    it ("FilterRouingValue - PostFilter2 (L) - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PostF2);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1).toBe(false);
        expect(out.postFilter2).toBe(false);
        expect(out.postFilter2Left).toBe(true);
        expect(out.postStereo).toBe(false);
    });

    it ("FilterRouingValue - PostFilter2 (R) - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PostF2R);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1).toBe(false);
        expect(out.postFilter2).toBe(true);
        expect(out.postFilter2Left).toBe(false);
        expect(out.postStereo).toBe(false);
    });

    it ("FilterRouingValue - clear PreFilter2 - PreFilter1 should remain", () => {
        let out = new FilterRoutingValue(FilterRouting.PreF1F2);
        out = new FilterRoutingValue(out.setPreFilter2(false));

        expect(out.preFilter1).toBe(true);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1).toBe(false);
        expect(out.postFilter2).toBe(false);
        expect(out.postFilter2Left).toBe(false);
        expect(out.postStereo).toBe(false);
    });
});