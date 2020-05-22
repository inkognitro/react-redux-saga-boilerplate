import React from "react";
import { ToasterWC } from "Packages/Common/Toaster/UI/ToasterWC";
import { shallow } from "enzyme";
import { ToastTypes } from "Packages/Common/Toaster/Domain/Types";
import { LanguageIds } from "Packages/Common/Translator/Domain/Types";

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
