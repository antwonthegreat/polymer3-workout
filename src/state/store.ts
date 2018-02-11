import {createStore} from 'redux';
import {reducer} from "./reducers/reducer"

const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export { store as appState };
export type RootState = {}