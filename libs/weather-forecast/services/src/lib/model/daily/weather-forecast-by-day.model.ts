import { WeatherForecastItemInterface } from "../weather-forecast-item.iterface";

interface WeatherForecastByDayTempData {
	day: number;
	eve: number;
	max: number;
	min: number;
	morn: number;
	night: number;
}

export interface WeatherForecastByDayModelData {
	temp: WeatherForecastByDayTempData;
}

export class WeatherForecastByDayModel implements WeatherForecastItemInterface {

	constructor(private readonly temp: WeatherForecastByDayTempData) {}

	get headerTitles(): string[] {
		return [
			'City Name',
			'Mo',
			'Tu',
			'We',
			'Th',
			'Fr',
			'Sa',
			'Su'
		]
	}

	get temperature(): number {
		return this.temp.day;
	}
}
