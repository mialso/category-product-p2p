import { applyMiddleware, createStore } from 'redux';

import { rootReducer } from './reducers';
import { middlewares } from './middleware';

export function configureStore(initState) {
    const items = [ ...middlewares ];
    const middlewareEnhancer = applyMiddleware(...items);

    const store = createStore(rootReducer, initState, middlewareEnhancer);
    return store;
}
