import uuid from "uuid";
import { ThunkDispatch } from "@src/types/store";
import { CountriesAction } from ".";
import { ICountry, ICountriesResponce } from "@src/types/countries";
import * as effects from "./effects";
import CountriesTypes from "./types";

export const fetchCountries = () => async (dispatch: ThunkDispatch): Promise<void> => {
    try {
        dispatch(isFetching());

        const { data: dataList } = await effects.fetchCountries();
        const countriesList: ICountry[] = dataList.map((country: ICountriesResponce) => ({
            id: uuid(),
            name: country.name,
            code: country.alpha2Code,
            transited: false,
        }));

        dispatch(fetchCountriesSuccess(countriesList));
    } catch (error) {
        dispatch(fetchCountriesError());
        console.error(error);
    }
};

export const isFetching = () => ({ type: CountriesTypes.COUNTRIES_FETCHING });

export const fetchCountriesSuccess = (countriesList: ICountry[]): CountriesAction => ({
    type: CountriesTypes.COUNTRIES_FETCH_SUCCESS,
    payload: countriesList,
});

export const fetchCountriesError = (): CountriesAction => ({
    type: CountriesTypes.COUNTRIES_FETCH_ERROR,
});
