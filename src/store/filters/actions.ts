import { FiltersAction } from ".";
import FiltersTypes from "./types";

export const setFilters = (queryString: string): FiltersAction => ({
    type: FiltersTypes.FILTERS_SET,
    payload: queryString,
});
