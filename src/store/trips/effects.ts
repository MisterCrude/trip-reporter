import { setStateItem, setState, getState } from "@src/utils/storage";
import { COMMON } from "@src/config";
import { ITrip } from "@src/types/trip";

export const addTrip = (trip: ITrip): boolean => setStateItem<ITrip>(COMMON.STORE_DATA_NAME, trip);

export const addTrips = (trips: ITrip[]): boolean => setState<ITrip>(COMMON.STORE_DATA_NAME, trips);

export const removeTrip = (tripId: string): boolean => {
    const trips = getState<ITrip>(COMMON.STORE_DATA_NAME);

    return trips ? addTrips(trips.filter(trip => trip.id !== tripId)) : false;
};

export const fetchTrips = (): ITrip[] | undefined => getState<ITrip>(COMMON.STORE_DATA_NAME);
