import { WeaherDailyItemResponse, WeaherHourlyItemResponse } from "libs/weather-forecast/services/src/lib/actions/get-weather-data.response";

export const weatherForecastStoreKey = 'weatherForecast';

export type WeatherItemResponse = WeaherHourlyItemResponse | WeaherDailyItemResponse

export function filterTypeChecker (filterValue: any): filterValue is WeatherMode  {
	return Object.values(WeatherMode).includes(filterValue);
}

export enum WeatherMode {
	daily = 'daily',
	hourly = 'hourly'
}

export interface WeatherRecordInterface {
	cityName: string;
	weatherItems: WeatherItemResponse[];
}

type WeatherModeType = keyof typeof WeatherMode;

export interface StateInterface {
	filter: WeatherMode;
	searchText: string;
	weatherItemsMap: {
		[key in WeatherModeType]: WeatherRecordInterface[]
	}
}

export const initialState: StateInterface = {
	filter: WeatherMode.daily,
	searchText: '',
	weatherItemsMap: {
		daily: [],
		hourly: []
	},
};
