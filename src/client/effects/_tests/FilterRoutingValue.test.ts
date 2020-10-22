import { FilterRoutingValue, FilterRouting } from "../../../model/Filters";

describe("Model/Filters.ts", () => {
    it ("FilterRouingValue - Bypass - all filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.Bypass);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1Left).toBe(false);
        expect(out.postFilter2Right).toBe(false);
        expect(out.postFilter2Left).toBe(false);
    });

    it ("FilterRouingValue - PreFilter1 - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PreF1);
        expect(out.preFilter1).toBe(true);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1Left).toBe(false);
        expect(out.postFilter2Right).toBe(false);
        expect(out.postFilter2Left).toBe(false);
    });

    it ("FilterRouingValue - PreFilter2 - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PreF2);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(true);
        expect(out.postFilter1Left).toBe(false);
        expect(out.postFilter2Right).toBe(false);
        expect(out.postFilter2Left).toBe(false);
    });

    it ("FilterRouingValue - PostFilter1 - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PostF1L);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1Left).toBe(true);
        expect(out.postFilter2Right).toBe(false);
        expect(out.postFilter2Left).toBe(false);
    });

    it ("FilterRouingValue - PostFilter2 (L) - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PostF2L);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1Left).toBe(false);
        expect(out.postFilter2Right).toBe(false);
        expect(out.postFilter2Left).toBe(true);
    });

    it ("FilterRouingValue - PostFilter2 (R) - all other filters props report false", () => {
        const out = new FilterRoutingValue(FilterRouting.PostF2R);
        expect(out.preFilter1).toBe(false);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1Left).toBe(false);
        expect(out.postFilter2Right).toBe(true);
        expect(out.postFilter2Left).toBe(false);
    });

    it ("FilterRouingValue - clear PreFilter2 - PreFilter1 should remain", () => {
        let out = new FilterRoutingValue(FilterRouting.PreF1F2);
        out = new FilterRoutingValue(out.setPreFilter2(false));

        expect(out.preFilter1).toBe(true);
        expect(out.preFilter2).toBe(false);
        expect(out.postFilter1Left).toBe(false);
        expect(out.postFilter2Right).toBe(false);
        expect(out.postFilter2Left).toBe(false);
    });
});