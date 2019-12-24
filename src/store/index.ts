import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import app from "./app";

export const rootReducer = combineReducers({ app });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
