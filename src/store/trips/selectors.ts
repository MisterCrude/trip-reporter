import { RootState } from "@src/types/store";
import { ITrip } from "@src/types/trip";

export const getTripsList = (state: RootState): ITrip[] => state.trips.tripsList;
