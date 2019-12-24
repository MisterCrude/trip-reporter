import { IAction } from "@src/types/store";
import AppTypes from "./types";

interface IAppState {
    showModal: boolean;
}

export type AppAction = IAction<keyof typeof AppTypes, any>;

export const initialState: IAppState = {
    showModal: false,
};

export default (state: IAppState = initialState, { type, payload }: AppAction): IAppState => {
    switch (type) {
        case AppTypes.APP_TRIGGER_MODAL:
            return {
                ...state,
                // TODO use true-myths here
                showModal: payload ? payload : !state.showModal,
            };

        default:
            return state;
    }
};
