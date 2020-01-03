import { IAction } from "@src/types/store";
import { ICountry } from "@src/types/countries";
import CountriesTypes from "./types";

interface ICountriesState {
    fetching: boolean;
    hasError: boolean;
    countriesList: ICountry[];
}

export type CountriesAction = IAction<keyof typeof CountriesTypes, any>;

export const initialState: ICountriesState = {
    fetching: false,
    hasError: false,
    countriesList: [],
};

export default (state: ICountriesState = initialState, { type, payload }: CountriesAction): ICountriesState => {
    switch (type) {
        case CountriesTypes.COUNTRIES_FETCHING:
            return { ...state, hasError: false, fetching: true };

        case CountriesTypes.COUNTRIES_FETCH_SUCCESS:
            return { ...state, countriesList: payload, fetching: false };

        case CountriesTypes.COUNTRIES_FETCH_ERROR:
            return { ...state, countriesList: [], hasError: true };

        default:
            return state;
    }
};
