import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { ToasterNC } from "./ToasterNC";

it('renders correctly', () => {
    renderer.create(<ToasterNC />);
});
