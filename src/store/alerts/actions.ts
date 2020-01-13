import { AlertAction, IAlertState } from ".";
import AlertTypes from "./types";

export const setShowAlert = (alertPayload: IAlertState): AlertAction => ({
    type: AlertTypes.ALERT_SHOW,
    payload: alertPayload,
});

export const setHideAlert = (): AlertAction => ({ type: AlertTypes.ALERT_HIDE });
