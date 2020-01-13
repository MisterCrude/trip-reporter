import { AlertAction, IAlertState } from ".";
import AlertTypes from "./types";

export const setShowModal = (alertPayload: IAlertState): AlertAction => ({
    type: AlertTypes.ALERT_SHOW,
    payload: alertPayload,
});

export const setHideModal = (): AlertAction => ({ type: AlertTypes.ALERT_HIDE });
