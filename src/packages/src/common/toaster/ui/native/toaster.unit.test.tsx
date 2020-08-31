import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Toaster } from "./toaster";

it('renders correctly', () => {
    renderer.create(<Toaster toasts={[]} onRemoveMessage={() => {}} />);
});
