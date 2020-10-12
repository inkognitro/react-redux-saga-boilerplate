import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Toaster } from './toaster';
import { ToastTypes } from '../../domain';

describe('Toaster', () => {
    it('renders correctly', () => {
        renderer.create(
            <Provider store={createStore(() => {})}>
                <Toaster
                    toasts={[
                        {
                            id: 'foo',
                            type: ToastTypes.INFO,
                            messages: [
                                {
                                    id: 'foo123',
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
                />
            </Provider>
        );
    });
});
