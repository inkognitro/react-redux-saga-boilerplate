import React from 'react';
import store from 'App/Redux/store'
import {addToast as createAddToastAction} from "App/Redux/Common/Toasts/actions";

const addToast = (type, message) => store.dispatch(createAddToastAction(type, message));

export {addToast};