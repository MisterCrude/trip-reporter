import { IAction } from "@src/types/store";
import { ModalTypes } from "@src/types/app";
import AppTypes from "./types";

interface IAppState {
    showModal: ModalTypes;
}

export type AppAction = IAction<keyof typeof AppTypes, any>;

export const initialState: IAppState = {
    showModal: ModalTypes.NONE,
};

export default (state: IAppState = initialState, { type, payload }: AppAction): IAppState => {
    switch (type) {
        case AppTypes.APP_TRIGGER_MODAL:
            return {
                ...state,
                showModal: payload.map((payload: any) => payload).unwrapOr(ModalTypes.NONE),
            };

        default:
            return state;
    }
};
