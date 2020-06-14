import React from "react";
import renderer from 'react-test-renderer';
import { TestableComponentExample } from "./TestableComponentExample";

describe("TestableNotFoundWC", () => {
    it('renders correctly', () => {
        renderer.create(<TestableComponentExample />);
    });
});
