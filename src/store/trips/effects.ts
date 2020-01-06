import { setState, getState } from "@src/utils/storage";
import { COMMON } from "@src/config";
import { ITrip } from "@src/types/trip";

export const addTrip = (trip: ITrip): boolean => setState<ITrip>(COMMON.STORE_DATA_NAME, trip);

export const fetchTrips = (): ITrip[] => getState<ITrip[]>(COMMON.STORE_DATA_NAME) || [];
