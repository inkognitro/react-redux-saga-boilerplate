import {
    applyMiddleware,
    combineReducers,
    createStore as createReduxStore,
    Reducer,
    Store,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";
import {
    ToasterState,
    ToasterStateSelector,
    toasterReducer,
    createToasterSaga,
} from "Packages/Common/Toaster/Domain";
import { TranslatorState, translatorReducer } from "Packages/Common/Translator/Domain";
import { designReducer, DesignState } from "Packages/Common/Design/Domain";

type AppServices = {
    store: Store
    sagaTask: any
};

function createRootReducer(): Reducer {
    return combineReducers({
        design: designReducer,
        translator: translatorReducer,
        toaster: toasterReducer,
    });
}

function createRootSaga(): () => Generator {
    const toasterStateSelector: ToasterStateSelector = (state: RootState) => state.toaster;
    const toasterSaga = createToasterSaga(toasterStateSelector);
    return function* rootSaga(): Generator {
        yield spawn(toasterSaga);
    };
}

export function createAppServices(): AppServices {
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(createRootReducer(), applyMiddleware(sagaMiddleware));
    const rootSaga = createRootSaga();
    const sagaTask = sagaMiddleware.run(rootSaga);
    return {
        store,
        sagaTask,
    };
}

export type RootState = {
    design: DesignState
    translator: TranslatorState
    toaster: ToasterState
};
