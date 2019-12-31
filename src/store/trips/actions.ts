import { TripsAction } from ".";
import { ITrip } from "@src/types/trip";
import TripsTypes from "./types";

export const addTrip = (tripData: ITrip): TripsAction => ({
    type: TripsTypes.TRIPS_ADD,
    payload: tripData,
});

export const removeTrip = (tripId: string): TripsAction => ({
    type: TripsTypes.TRIPS_ADD,
    payload: tripId,
});
