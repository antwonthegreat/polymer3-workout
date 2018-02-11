///<reference path='../../node_modules/redux-thunk/index.d.ts' />

import {createStore, applyMiddleware,compose} from 'redux';
import {reducer} from "./reducers/reducer";
import * as thunk from '../../node_modules/redux-thunk/lib/index';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, {}, composeEnhancers(applyMiddleware((thunk as any).default)));

export { store as appState };
export type RootState = {}