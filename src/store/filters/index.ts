import { IAction } from "@src/types/store";
import FiltersTypes from "./types";

export interface IFiltersState {
    queryString: string;
}

export type FiltersAction = IAction<keyof typeof FiltersTypes, any>;

export const initialState: IFiltersState = {
    queryString: "",
};

export default (state: IFiltersState = initialState, { type, payload }: FiltersAction): IFiltersState => {
    switch (type) {
        case FiltersTypes.FILTERS_SET:
            return {
                ...state,
                queryString: payload ? payload.toLocaleLowerCase() : "",
            };

        default:
            return state;
    }
};
