import {createStore, applyMiddleware} from "redux";
import {rootReducer} from "../store/reducers";
import {thunk} from 'redux-thunk'

// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk));
