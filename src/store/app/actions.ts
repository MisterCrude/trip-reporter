import { Maybe } from "true-myth";
import { AppAction } from ".";
import { ModalTypes } from "@src/types/app";
import AppTypes from "./types";

export const setShowModal = (modalState: ModalTypes): AppAction => ({
    type: AppTypes.APP_TRIGGER_MODAL,
    payload: Maybe.of(modalState),
});
