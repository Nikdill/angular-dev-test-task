import { WeatherForecastCollectionModel, WeatherForecastCollectionModelData } from "./weather-forecast-collection.model";

export class WeatherForecastFactory {
	getModelFromData(data: WeatherForecastCollectionModelData): WeatherForecastCollectionModel {
		return new WeatherForecastCollectionModel(data.cityName, data.weatherForecastItems)
	}
}
