import uuid from "uuid/v1";
import { IAction } from "@src/types/store";
import { ITrip } from "@src/types/trip";
import TripTypes from "./types";

interface IAppState {
    trips: ITrip[];
}

export type TripAction = IAction<keyof typeof TripTypes, any>;

export const initialState: IAppState = {
    // TODO true-myth
    trips: [],
};

export default (state: IAppState = initialState, { type, payload }: TripAction): IAppState => {
    switch (type) {
        case TripTypes.TRIP_FETCH_LIST:
            return state;

        case TripTypes.TRIP_ADD:
            console.log(payload, uuid());
            return state;

        case TripTypes.TRIP_REMOVE:
            return state;

        case TripTypes.TRIP_EDIT:
            return state;

        case TripTypes.TRIP_ADD_FAVORITE:
            return state;

        case TripTypes.TRIP_REMOVE_FAVORITE:
            return state;

        default:
            return state;
    }
};
