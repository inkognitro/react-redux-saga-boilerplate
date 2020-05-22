import { toasterReducer } from "Packages/Common/Toaster/Domain/Reducer";
import { createShowMessage } from "Packages/Common/Toaster/Domain/Command/ShowMessage";
import {
    ToasterState,
    ToasterStateSelector,
    ToastTypes,
} from "Packages/Common/Toaster/Domain/Types";
import { expectSaga } from "redux-saga-test-plan";
import { handleShowMessage } from "Packages/Common/Toaster/Domain/Saga/Flow/ShowMessageHandling";
import { CommonToastIds } from "Packages/Common/Toaster/Domain/Query/CommonToastIdByTypeQuery";
import uuidV4 from "uuid/v4";

describe("Dispatching ShowMessage command", () => {
    it("should add a message", () => {
        const toasterStateSelector: ToasterStateSelector = (state: ToasterState) => state;
        const translationId = uuidV4();
        const command = createShowMessage({
            id: "1234",
            toastType: ToastTypes.INFO,
            content: {
                translationId,
                fallback: 'foo',
            },
        });
        const expectedState: ToasterState = {
            messagesToAdd: [],
            toasts: [
                {
                    id: CommonToastIds.INFO,
                    type: ToastTypes.INFO,
                    messages: [
                        {
                            id: "1234",
                            content: {
                                translationId,
                                fallback: 'foo',
                            },
                            canBeClosedManually: true,
                            automaticCloseDelayInMs: null,
                            isIntroAnimationRunning: false,
                        },
                    ],
                    isIntroAnimationRunning: true,
                },
            ],
        };
        return expectSaga(handleShowMessage, toasterStateSelector, command)
            .withReducer(toasterReducer)
            .hasFinalState(expectedState)
            .run(false);
    });
});
