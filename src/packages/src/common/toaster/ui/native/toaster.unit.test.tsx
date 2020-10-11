import 'react-native';
import React from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Toaster } from "./toaster";

it('renders correctly', () => {
    renderer.create(
        <Provider store={createStore(() => {})}>
            <Toaster toasts={[]} />
        </Provider>,
    );
});
