import { ThunkDispatch as TDispatch } from "redux-thunk";
import { rootReducer } from "@src/store";

export type RootState = ReturnType<typeof rootReducer>;

export interface IAction<T, P> {
    type: T;
    payload?: P;
}

export type ThunkDispatch = TDispatch<RootState, undefined, IAction<any, any>>;
