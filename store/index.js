import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { places } from './placesReducer';

const rootReducer = combineReducers({ places });

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;
