import { RootState } from "@src/types/store";
import { ITrip } from "@src/types/trip";

export const getTripsList = (state: RootState): ITrip[] => state.trips.tripsList;

export const getActiveTrip = (state: RootState): string => state.trips.active;
