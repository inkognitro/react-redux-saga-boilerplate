import React from "react";
import {Toaster} from 'Common/UI/Toaster/Toaster';
import { shallow } from 'enzyme';

describe('Toaster', () => {
    it('should render', () => {
        shallow(
            <Toaster
                toasts={[]}
                onRemoveMessage={() => {}}
            />
        );
    });
});