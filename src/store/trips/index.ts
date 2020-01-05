import { IAction } from "@src/types/store";
import { ITrip } from "@src/types/trip";
import TripsTypes from "./types";

interface TripsState {
    tripsList: ITrip[];
    hasError: boolean;
}

export type TripsAction = IAction<keyof typeof TripsTypes, any>;

export const initialState: TripsState = {
    tripsList: [],
    hasError: false,
};

export default (state: TripsState = initialState, { type, payload }: TripsAction): TripsState => {
    switch (type) {
        case TripsTypes.TRIPS_ADD:
            return { ...state, tripsList: [...state.tripsList, payload], hasError: false };

        default:
            return state;
    }
};
