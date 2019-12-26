import { TripAction } from ".";
import { ITrip } from "@src/types/trip";
import TripTypes from "./types";

export const addTrip = (tripData: ITrip): TripAction => ({
    type: TripTypes.TRIP_ADD,
    payload: tripData,
});

export const removeTrip = (tripId: string): TripAction => ({
    type: TripTypes.TRIP_ADD,
    payload: tripId,
});
