import { WeaherItemResponse } from "libs/weather-forecast/services/src/lib/actions/get-weather-data.response";

export const weatherForecastStoreKey = 'weatherForecast';

export interface StateInterface {
	filter: string;
	searchText: string;
	weatherItems: WeaherItemResponse[];
}

export const initialState: StateInterface = {
	filter: 'hourly',
	searchText: '',
	weatherItems: []
};
