import { RootState } from "@src/types/store";
import { ICountry } from "@src/types/countries";

export const getCountriesList = (state: RootState): ICountry[] => state.countries.countriesList;

export const getFetchStatus = (state: RootState): boolean => state.countries.fetching;

export const getErrorStatus = (state: RootState): boolean => state.countries.hasError;
