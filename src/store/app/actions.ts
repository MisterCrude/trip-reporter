import { Maybe } from "true-myth";
import { AppAction } from ".";
import AppTypes from "./types";

export const setShowModal = (modalState: boolean): AppAction => ({
    type: AppTypes.APP_TRIGGER_MODAL,
    payload: Maybe.of(modalState),
});
