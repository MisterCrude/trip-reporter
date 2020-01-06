import { ThunkDispatch } from "@src/types/store";
import { TripsAction } from ".";
import * as effects from "./effects";
import { ITrip } from "@src/types/trip";
import TripsTypes from "./types";
import uuid from "uuid";

export const fetchTrips = () => (dispatch: ThunkDispatch): void => {
    const trips = effects.fetchTrips();

    dispatch(trips ? addTripsSuccess(trips) : tripError());
};

export const addTrip = (trip: Exclude<ITrip, "id">) => (dispatch: ThunkDispatch): void => {
    const tripData = { id: uuid(), ...trip };
    const isAdded = effects.addTrip(tripData);

    dispatch(isAdded ? addTripSuccess(tripData) : tripError());
};

export const addTripsSuccess = (tripsData: ITrip[]): TripsAction => ({
    type: TripsTypes.TRIPS_ADD_LIST,
    payload: tripsData,
});

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
