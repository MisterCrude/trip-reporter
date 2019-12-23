export interface ITrip {
    id: string;
    name: string;
    visitedCountries: any;
    started: string;
    finished: string;
    duration: number;
    description: string;
    friends: Array<string>;
    transitCountries: Array<string>;
}
