import React, { FC } from 'react';
import renderer from 'react-test-renderer';

const Foo: FC = () => <>Foo</>;

describe('Foo', () => {
    it('renders correctly', () => {
        renderer.create(<Foo />);
    });
});
