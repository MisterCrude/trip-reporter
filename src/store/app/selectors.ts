import { RootState } from "@src/types/store";

export const getShowModal = (state: RootState): boolean => state.app.showModal;
