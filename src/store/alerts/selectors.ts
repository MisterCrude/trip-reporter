import { IAlertState } from ".";
import { RootState } from "@src/types/store";

export const getAlertState = (state: RootState): IAlertState => state.alerts;
