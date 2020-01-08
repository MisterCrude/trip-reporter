import { ICountry } from "@src/types/countries";

export interface ITrip {
    id: string;
    name: string;
    started: string;
    finished: string;
    duration: number;
    description: string;
    friends: Array<string>;
    visitedCountries: Array<ICountry>;
    transitedCountries: Array<string>;
}
