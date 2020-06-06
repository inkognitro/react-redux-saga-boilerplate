import React from "react";
import { shallow } from "enzyme";
import { ToasterWC } from "./ToasterWC";
import { ToastTypes } from "../Domain/Types";

describe("ToasterWC", () => {
    it("should render", () => {
        shallow(
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
