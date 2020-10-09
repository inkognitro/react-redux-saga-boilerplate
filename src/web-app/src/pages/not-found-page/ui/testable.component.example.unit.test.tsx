import React from "react";
import renderer from 'react-test-renderer';
import { TestableComponentExample } from "./testable.component.example";

describe("TestableNotFoundWC", () => {
    it('renders correctly', () => {
        renderer.create(<TestableComponentExample />);
    });
});
