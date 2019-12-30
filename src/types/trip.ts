export interface ITrip {
    id: string;
    name: string;
    started: string;
    finished: string;
    duration: number;
    description: string;
    friends: Array<string>;
    visitedCountries: Array<string>; // TODO list of country codes
    transitedCountries: Array<string>; // TODO list of country codes
}

export interface ICountyPair {
    name: string;
    code: string;
}
