import { RootState } from "@src/types/store";
import { ModalTypes } from "@src/types/app";

export const getShowModal = (state: RootState): ModalTypes => state.app.showModal;
