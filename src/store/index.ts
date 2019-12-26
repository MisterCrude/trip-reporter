import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import app from "./app";
import trip from "./trip";

export const rootReducer = combineReducers({ app, trip });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
