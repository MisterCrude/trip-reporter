import { IAction } from "@src/types/store";
import { ITrip } from "@src/types/trip";
import TripsTypes from "./types";

interface TripsState {
    tripsList: ITrip[];
    hasError: boolean;
    active: string;
}

export type TripsAction = IAction<keyof typeof TripsTypes, any>;

export const initialState: TripsState = {
    tripsList: [],
    hasError: false,
    active: "",
};

export default (state: TripsState = initialState, { type, payload }: TripsAction): TripsState => {
    switch (type) {
        case TripsTypes.TRIPS_ADD:
            return { ...state, tripsList: [payload, ...state.tripsList], hasError: false };

        case TripsTypes.TRIPS_ADD_LIST:
            return { ...state, tripsList: payload, hasError: false };

        case TripsTypes.TRIPS_SET_ACTIVE:
            return { ...state, active: payload };

        case TripsTypes.TRIPS_REMOVE:
            return { ...state, tripsList: state.tripsList.filter(trip => trip.id !== payload), hasError: false };

        case TripsTypes.TRIPS_ERROR:
            return { ...state, tripsList: [], hasError: true };

        default:
            return state;
    }
};
