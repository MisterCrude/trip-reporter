import { AppAction } from ".";
import AppTypes from "./types";

export const triggerModal = (modalState?: boolean): AppAction => ({
    type: AppTypes.APP_TRIGGER_MODAL,
    payload: modalState,
});
