import { IAlertsState } from ".";
import { RootState } from "@src/types/store";

export const getAlertState = (state: RootState): IAlertsState => state.alerts;
