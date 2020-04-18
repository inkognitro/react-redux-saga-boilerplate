"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Reducer_1 = require("Common/Domain/Toaster/Event/Reducer");
const ShowMessage_1 = require("Common/Domain/Toaster/Command/ShowMessage");
const Types_1 = require("Common/Domain/Toaster/Types");
const redux_saga_test_plan_1 = require("redux-saga-test-plan");
const ShowMessageHandling_1 = require("Common/Domain/Toaster/Saga/Callables/ShowMessageHandling");
const CommonToastIdByTypeQuery_1 = require("Common/Domain/Toaster/Query/CommonToastIdByTypeQuery");
describe('Dispatching ShowMessage command', () => {
    it('should add a message', () => {
        const toasterStateSelector = (state) => state;
        const command = ShowMessage_1.createShowMessage({
            id: '1234',
            toastType: Types_1.ToastTypes.INFO,
            content: 'foo',
        });
        const expectedState = {
            messagesToAdd: [],
            toasts: [
                {
                    id: CommonToastIdByTypeQuery_1.CommonToastIds.INFO,
                    type: Types_1.ToastTypes.INFO,
                    messages: [
                        {
                            id: '1234',
                            content: 'foo',
                            canBeClosedManually: true,
                            automaticCloseDelayInMs: null,
                            isIntroAnimationRunning: false
                        }
                    ],
                    isIntroAnimationRunning: true,
                }
            ],
        };
        return redux_saga_test_plan_1.expectSaga(ShowMessageHandling_1.handleShowMessage, toasterStateSelector, command)
            .withReducer(Reducer_1.toasterReducer)
            .hasFinalState(expectedState)
            .run(false);
    });
    it('should not add message without content', () => {
        const toasterStateSelector = (state) => state;
        const command = ShowMessage_1.createShowMessage({
            id: '1234',
            toastType: Types_1.ToastTypes.INFO,
            content: '',
        });
        const expectedState = {
            messagesToAdd: [],
            toasts: [],
        };
        return redux_saga_test_plan_1.expectSaga(ShowMessageHandling_1.handleShowMessage, toasterStateSelector, command)
            .withReducer(Reducer_1.toasterReducer)
            .hasFinalState(expectedState)
            .run(false);
    });
});
//# sourceMappingURL=ShowMessageHandling.integration.test.js.map