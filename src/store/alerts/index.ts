import { IAction } from "@src/types/store";
import { AlertTypes as AT } from "@src/types/common";
import AlertTypes from "./types";

export interface IAlertState {
    showAlert: AT;
    message: string;
}

export type AlertAction = IAction<keyof typeof AlertTypes, any>;

export const initialState: IAlertState = {
    showAlert: AT.NONE,
    message: "",
};

export default (state: IAlertState = initialState, { type, payload }: AlertAction): IAlertState => {
    switch (type) {
        case AlertTypes.ALERT_SHOW:
            return {
                ...state,
                ...payload,
            };

        case AlertTypes.ALERT_HIDE:
            return initialState;

        default:
            return state;
    }
};
