import React from 'react';
import store from 'App/Redux/store'
import {addToastMessage} from "App/Redux/Common/Toasts/actions";

const addToast = (type, message) => store.dispatch(addToastMessage(type, message));

export {addToast};