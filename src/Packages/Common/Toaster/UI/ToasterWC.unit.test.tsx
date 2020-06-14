import React from "react";
import renderer from 'react-test-renderer';
import { ToasterWC } from "./ToasterWC";
import { ToastTypes } from "../Domain/Types";

describe("ToasterWC", () => {
    it('renders correctly', () => {
        renderer.create(
            <ToasterWC
                toasts={[
                    {
                        id: "foo",
                        type: ToastTypes.INFO,
                        messages: [
                            {
                                id: "foo123",
                                canBeClosedManually: true,
                                automaticCloseDelayInMs: null,
                                content: {
                                    translationId: 'foo',
                                    fallback: 'bar',
                                },
                            },
                        ],
                    },
                ]}
                onRemoveMessage={() => {}}
            />,
        );
    });
});
