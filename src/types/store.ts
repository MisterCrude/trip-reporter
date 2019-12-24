import { rootReducer } from "@src/store";

export type RootState = ReturnType<typeof rootReducer>;

export interface IAction<T, P> {
    type: T;
    payload?: P;
}
