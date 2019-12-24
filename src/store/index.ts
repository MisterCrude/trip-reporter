import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import app from "./app";

export const rootReducer = combineReducers({ app });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
