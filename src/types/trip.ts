export interface ITrip {
    id: string;
    name: string;
    started: string;
    finished: string;
    duration: number;
    description: string;
    friends: Array<string>;
    visitedCountries: Array<string>;
    transitedCountries: Array<string>;
}
