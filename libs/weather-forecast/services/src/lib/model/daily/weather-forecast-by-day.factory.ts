import { WeatherForecastByDayModel, WeatherForecastByDayModelData } from "./weather-forecast-by-day.model";

export class WeatherForecastByDayFactory {
	getModelFromData(data: WeatherForecastByDayModelData): WeatherForecastByDayModel {
		return new WeatherForecastByDayModel(data.temp)
	}
}
