import { WeaherDailyItemResponse, WeaherHourlyItemResponse } from "libs/weather-forecast/services/src/lib/actions/get-weather-data.response";
import { WeatherForecastCollectionModel } from "libs/weather-forecast/services/src/lib/model/weather-forecast-collection.model";

export const weatherForecastStoreKey = 'weatherForecast';

export type WeatherItemResponse = WeaherHourlyItemResponse | WeaherDailyItemResponse

export function filterTypeChecker (filterValue: any): filterValue is WeatherMode  {
	return Object.values(WeatherMode).includes(filterValue);
}

export enum WeatherMode {
	daily = 'daily',
	hourly = 'hourly'
}

type WeatherModeType = keyof typeof WeatherMode;

export interface StateInterface {
	filter: WeatherMode;
	searchText: string;
	weatherItemsMap: {
		[key in WeatherModeType]: WeatherForecastCollectionModel[]
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
