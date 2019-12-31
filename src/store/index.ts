import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import app from "./app";
import trips from "./trips";
import countries from "./countries";

export const rootReducer = combineReducers({ app, trips, countries });

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
