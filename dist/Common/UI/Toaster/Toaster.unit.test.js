"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Toaster_1 = require("Common/UI/Toaster/Toaster");
const enzyme_1 = require("enzyme");
const Types_1 = require("Common/Domain/Toaster/Types");
describe('Toaster', () => {
    it('should render', () => {
        enzyme_1.shallow(react_1.default.createElement(Toaster_1.Toaster, { toasts: [
                {
                    id: 'foo',
                    type: Types_1.ToastTypes.INFO,
                    messages: [
                        {
                            id: 'foo123',
                            canBeClosedManually: true,
                            automaticCloseDelayInMs: null,
                            content: 'bar',
                        },
                    ],
                }
            ], onRemoveMessage: () => { } }));
    });
});
//# sourceMappingURL=Toaster.unit.test.js.map