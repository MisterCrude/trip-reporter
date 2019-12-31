import { IAction } from "@src/types/store";
import { ICounty } from "@src/types/countries";
import CountriesTypes from "./types";

type CountriesState = ICounty[];

export type CountriesAction = IAction<keyof typeof CountriesTypes, any>;

// TODO true-myth
export const initialState: CountriesState = [];

export default (state: CountriesState = initialState, { type, payload }: CountriesAction): CountriesState => {
    switch (type) {
        case CountriesTypes.COUNTRIES_FETCHING:
            return state;

        default:
            return state;
    }
};
