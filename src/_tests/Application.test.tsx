import * as React from "react";
import * as ReactDOM from "react-dom";
import { Application } from "../Application";

/**
 * @jest-environment jsdom
 */

describe("Application.tsx", () => {
    it("Application renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Application />, div);
    });
});
