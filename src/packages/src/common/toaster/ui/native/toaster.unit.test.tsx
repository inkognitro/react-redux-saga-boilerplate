import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Toaster } from "./ToasterNC";

it('renders correctly', () => {
    renderer.create(<Toaster toasts={[]} onRemoveMessage={() => {}} />);
});
