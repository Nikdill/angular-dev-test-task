import { WeatherForecastItemInterface } from "./weather-forecast-item.iterface";

export interface WeatherForecastCollectionModelData {
	cityName: string;
	weatherForecastItems: WeatherForecastItemInterface[]
}


export class WeatherForecastCollectionModel {
	constructor(public readonly cityName: string, public readonly weatherForecastItems: WeatherForecastItemInterface[]) {}
}
