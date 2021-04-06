import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import listsReducer from './lists';
import picksReducer from './picks';
import locationReducer from './location';
import modalReducer from './modal';
import mediaReducer from './media';


const rootReducer = combineReducers({
    session: sessionReducer,
    lists: listsReducer,
    picks: picksReducer,
    location: locationReducer,
    modal: modalReducer,
    media: mediaReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const componseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = componseEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
    return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;
