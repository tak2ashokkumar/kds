export interface CovidStatisticsObject {
    get: string;
    parameters: CovidAPIParameter;
    errors: any[];
    results: number;
    response: CovidResponseItem[];
}
export interface CovidAPIParameter {
    country: string;
}
export interface CovidResponseItem {
    continent: string;
    country: string;
    population: number;
    cases: CovidCases;
    deaths: CovidDeaths;
    tests: CovidTests;
    day: string;
    time: string;
}
export interface CovidCases {
    'new': string;
    active: number;
    critical: number;
    recovered: number;
    '1M_pop': string;
    total: number;
}
export interface CovidDeaths {
    'new': null;
    '1M_pop': string;
    total: number;
}
export interface CovidTests {
    '1M_pop': string;
    total: number;
}
