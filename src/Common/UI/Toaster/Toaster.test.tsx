import React from "react";
import {Toaster} from 'Common/UI/Toaster/Toaster';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
//@ts-ignore
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Toaster', () => {
    it('does render', () => {
        shallow(
            <Toaster
                toasts={[]}
                onRemoveMessage={() => console.log('remove message')}
            />
        );
    });
});