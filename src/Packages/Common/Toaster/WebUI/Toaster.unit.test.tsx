import React from "react";
import {Toaster} from "Packages/Common/Toaster/WebUI/Toaster";
import {shallow} from "enzyme";
import {ToastTypes} from "Packages/Common/Toaster/Domain/Types";
import {LanguageIds} from "Packages/Common/Translator/Domain/Types";

describe("Toaster", () => {
    it("should render", () => {
        shallow(
            <Toaster
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
