import { WeatherForecastByHourModel, WeatherForecastByHourModelData } from "./weather-forecast-by-hour.model";

export class WeatherForecastByHourFactory {
	getModelFromData(data: WeatherForecastByHourModelData): WeatherForecastByHourModel {
		return new WeatherForecastByHourModel(data.temp)
	}
}
