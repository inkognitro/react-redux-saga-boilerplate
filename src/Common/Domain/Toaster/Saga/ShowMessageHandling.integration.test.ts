import { toasterReducer } from "Common/Domain/Toaster/Reducer";
import { createShowMessage } from "Common/Domain/Toaster/Command/ShowMessage";
import {
    ToasterState,
    ToasterStateSelector,
    ToastTypes,
} from "Common/Domain/Toaster/Types";
import { expectSaga } from "redux-saga-test-plan";
import { handleShowMessage } from "Common/Domain/Toaster/Saga/ShowMessageHandling";
import { CommonToastIds } from "Common/Domain/Toaster/Query/CommonToastIdByTypeQuery";

describe("Dispatching ShowMessage command", () => {
    it("should add a message", () => {
        const toasterStateSelector: ToasterStateSelector = (state: ToasterState) => state;
        const command = createShowMessage({
            id: "1234",
            toastType: ToastTypes.INFO,
            content: "foo",
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
                            message: "foo",
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

    it("should not add message without content", () => {
        const toasterStateSelector: ToasterStateSelector = (state: ToasterState) => state;
        const command = createShowMessage({
            id: "1234",
            toastType: ToastTypes.INFO,
            content: "",
        });
        const expectedState: ToasterState = {
            messagesToAdd: [],
            toasts: [],
        };
        return expectSaga(handleShowMessage, toasterStateSelector, command)
            .withReducer(toasterReducer)
            .hasFinalState(expectedState)
            .run(false);
    });
});
