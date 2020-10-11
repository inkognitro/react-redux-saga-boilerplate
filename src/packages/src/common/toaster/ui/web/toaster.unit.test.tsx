import React from "react";
import renderer from 'react-test-renderer';
import { Toaster } from "./toaster";
import { ToastTypes } from "../../domain";

describe("Toaster", () => {
    it('renders correctly', () => {
        renderer.create(
            <Toaster
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
            />,
        );
    });
});
