import axios from "axios";
import { ICountriesResponce } from "@src/types/countries";
import { RESOURCES } from "@src/config";

export const fetchCountries = async (): Promise<{ data: ICountriesResponce[] }> =>
    await axios.get(RESOURCES.COUNTRIES.URL, { headers: RESOURCES.COUNTRIES.HEADERS });
