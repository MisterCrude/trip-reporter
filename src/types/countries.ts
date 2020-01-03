export interface ICountry {
    id: string;
    name: string;
    code: string;
    transited: boolean;
}

export interface ICountriesResponce {
    [key: string]: any | { name: string; alpha2Code: string };
}
