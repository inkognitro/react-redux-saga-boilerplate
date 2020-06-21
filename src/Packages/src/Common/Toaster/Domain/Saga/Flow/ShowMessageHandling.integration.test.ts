import { expectSaga } from "redux-saga-test-plan";
import uuidV4 from "uuid/v4";
import { ToasterSettings } from "Packages/Common/Toaster/Domain";
import { toasterReducer } from "../../Reducer";
import { createShowMessage } from "../../Command/ShowMessage";
import {
    ToasterState,
    ToasterStateSelector,
    ToastTypes,
} from "../../Types";
import { handleShowMessage } from "./ShowMessageHandling";
import { CommonToastIds } from "../../Query/CommonToastIdByTypeQuery";

describe("Dispatching ShowMessage command", () => {
    it("should add a message", () => {
        const toasterSettings: ToasterSettings = {
            toastMessageOutroAnimationTimeInMs: 0,
            toastOutroAnimationTimeInMs: 0,
            toastMessageIntroAnimationTimeInMs: 0,
            toastIntroAnimationTimeInMs: 0,
            asyncToastWaitingTimeInMs: 0,
        };
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
        return expectSaga(handleShowMessage, toasterSettings, toasterStateSelector, command)
            .withReducer(toasterReducer)
            .hasFinalState(expectedState)
            .run(false);
    });
});
