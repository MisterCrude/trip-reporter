import { ICountry } from "@src/types/countries";
import { IFriend } from "@src/types/common";

export interface ITrip {
    id: string;
    name: string;
    started: string;
    finished: string;
    duration: number;
    description: string;
    friends: Array<IFriend>;
    visitedCountries: Array<ICountry>;
    transitedCountries: Array<string>;
}
