import { makeObject } from "../Extensions";

class TestClass {
    public myProp: string;
}

const ExpectedString = "Level42";

describe("Extensions.ts - makeObject", () => {
    it("makeObject clones properties", () => {
        const instance = new TestClass();
        instance.myProp = ExpectedString;

        const clone = makeObject(instance);
        expect(clone).toHaveProperty("myProp", ExpectedString);
    });

    it("makeObject result can spread", () => {
        const instance = new TestClass();
        instance.myProp = ExpectedString;

        const clone = makeObject(instance);
        const spread = { ...clone };
        expect(spread).toHaveProperty("myProp", ExpectedString);
    });

    it("cast to any can spread", () => {
        const instance = new TestClass();
        instance.myProp = ExpectedString;

        // tslint:disable-next-line
        const clone = <any> instance;
        const spread = { ...clone };
        expect(spread).toHaveProperty("myProp", ExpectedString);
    });
});