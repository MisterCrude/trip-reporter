import { IAction } from "@src/types/store";
import { AlertTypes as AT } from "@src/types/common";
import AlertTypes from "./types";

export interface IAlertsState {
    showAlert: AT;
    message: string;
}

export type AlertsAction = IAction<keyof typeof AlertTypes, any>;

export const initialState: IAlertsState = {
    showAlert: AT.NONE,
    message: "",
};

export default (state: IAlertsState = initialState, { type, payload }: AlertsAction): IAlertsState => {
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
