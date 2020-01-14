import { IFiltersState } from ".";
import { RootState } from "@src/types/store";

export const getFilters = (state: RootState): IFiltersState => state.filters;
