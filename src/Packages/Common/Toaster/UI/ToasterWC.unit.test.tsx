import React from "react";
import { LanguageIds } from "Packages/Common/Translator";
import { shallow } from "enzyme";
import { ToasterWC } from "./ToasterWC";
import { ToastTypes } from "../Domain/Types";

describe("ToasterWC", () => {
    it("should render", () => {
        shallow(
            <ToasterWC
                translatorState={{
                    currentLanguageId: LanguageIds.EN,
                    translations: {},
                }}
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
