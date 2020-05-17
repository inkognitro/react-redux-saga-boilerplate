import React from "react";
import {Toaster} from "Packages/Common/UI/Web/Toaster/Toaster";
import {shallow} from "enzyme";
import {ToastTypes} from "Packages/Common/Domain/Toaster/Types";
import {LanguageIds} from "Packages/Common/Domain/Translator/Types";

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
