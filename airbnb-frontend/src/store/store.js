import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { stayReducer } from './stay.reducer.js';
import { orderReducer } from './order.reducer.js';
import { userReducer } from './user.reducer.js';
import { hostReducer } from './host.reducer.js';

const rootReducer = combineReducers({
  stayReducer,
  orderReducer,
  userReducer,
  hostReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
