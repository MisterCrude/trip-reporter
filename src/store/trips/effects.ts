import { setState, getState } from "@src/utils/storage";
import { ITrip } from "@src/types/trip";

export const addTrip = (trip: ITrip): boolean => setState<ITrip>(trip);

// export const getTrips = (): boolean => setState<ITrip>(trip);
