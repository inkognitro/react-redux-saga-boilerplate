import { expectSaga } from 'redux-saga-test-plan';
import { v4 as uuidV4 } from 'uuid';
import { createShowMessage } from '../../command';
import { CommonToastIds } from '../../query';
import { toasterReducer } from '../../reducer';
import { ToasterState, ToasterStateSelector, ToastTypes, ToasterSettings } from '../../types';
import { handleShowMessage } from './show.message.handling';

describe('Dispatching ShowMessage command', () => {
    it('should add a message', () => {
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
            id: '1234',
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
                            id: '1234',
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
