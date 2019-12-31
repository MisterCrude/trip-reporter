import { CountriesAction } from ".";
import CountriesTypes from "./types";

export const fetchCountries = (): CountriesAction => ({
    type: CountriesTypes.COUNTRIES_FETCHING,
});
