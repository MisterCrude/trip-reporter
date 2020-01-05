import { ThunkDispatch } from "@src/types/store";
import { TripsAction } from ".";
import * as effects from "./effects";
import { ITrip } from "@src/types/trip";
import TripsTypes from "./types";
import uuid from "uuid";

export const fetchTrips = () => (dispatch: ThunkDispatch): void => {};

export const addTrip = (trip: Exclude<ITrip, "id">) => (dispatch: ThunkDispatch): void => {
    const tripData = { id: uuid(), ...trip };
    const isAdded = effects.addTrip(tripData);

    if (isAdded) {
        dispatch(addTripSuccess(tripData));
    } else {
        dispatch(tripError());
    }
};

export const addTripSuccess = (tripData: ITrip): TripsAction => ({
    type: TripsTypes.TRIPS_ADD,
    payload: tripData,
});

export const removeTrip = (tripId: string): TripsAction => ({
    type: TripsTypes.TRIPS_ADD_LIST,
    payload: tripId,
});

export const tripError = (): TripsAction => ({
    type: TripsTypes.TRIPS_ERROR,
});
