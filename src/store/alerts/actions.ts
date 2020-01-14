import { AlertsAction, IAlertsState } from ".";
import AlertTypes from "./types";

export const setShowAlert = (alertPayload: IAlertsState): AlertsAction => ({
    type: AlertTypes.ALERT_SHOW,
    payload: alertPayload,
});

export const setHideAlert = (): AlertsAction => ({ type: AlertTypes.ALERT_HIDE });
