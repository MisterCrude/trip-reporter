import { IAction } from "@src/types/store";
import { ITrip } from "@src/types/trip";
import uuid from "uuid/v1";
import TripsTypes from "./types";

type TripsState = ITrip[];

export type TripsAction = IAction<keyof typeof TripsTypes, any>;

export const initialState: TripsState = [];

export default (state: TripsState = initialState, { type, payload }: TripsAction): TripsState => {
    switch (type) {
        case TripsTypes.TRIPS_FETCH_LIST:
            return state;

        case TripsTypes.TRIPS_ADD:
            console.log(payload, uuid());
            return state;

        case TripsTypes.TRIPS_REMOVE:
            return state;

        case TripsTypes.TRIPS_EDIT:
            return state;

        case TripsTypes.TRIPS_ADD_FAVORITE:
            return state;

        case TripsTypes.TRIPS_REMOVE_FAVORITE:
            return state;

        default:
            return state;
    }
};
