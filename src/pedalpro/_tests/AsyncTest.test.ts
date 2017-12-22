class AsyncTest {
    public async good(): Promise<string> {
        return await this.asyncFunc(true);
    }

    public async error(): Promise<string> {
        return await this.asyncFunc(false);
    }

    private async asyncFunc(goodOrError: boolean): Promise<string> {
        // anti-pattern and does not work
        // return new Promise<string>(async (resolve, reject) => {
        //     await this.wait();
        //     if (goodOrError) { 
        //         resolve("good"); 
        //     } else {
        //         reject("error"); 
        //     }
        // });

        await this.wait();
        if (!goodOrError) { throw new Error("error"); }
        return "good";
    }

    private wait(): Promise<void> {
        return new Promise<void>((resolve) => {
            // setTimeout(resolve, 100);
            resolve();
        });
    }
}

describe("Async/Promise Tests", () => {
    it ("good - Nested await in promise calls", () => {
        const uut = new AsyncTest();
        uut.good()
            .then((result => {
                expect(result).toBe("good");
            })).catch((reason) => {
                fail();
            });
    });

    it ("error - Nested await in promise calls", () => {
        const uut = new AsyncTest();
        uut.error()
            .then((result => {
                fail();
            })).catch((reason) => {
                const err: Error = reason as Error;
                expect(err.message).toBe("error");
            });
    });
});