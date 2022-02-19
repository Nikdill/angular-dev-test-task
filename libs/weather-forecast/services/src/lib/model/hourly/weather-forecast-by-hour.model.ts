import { WeatherForecastItemInterface } from "../weather-forecast-item.iterface";

export interface WeatherForecastByHourModelData {
	temp: number;
}


export class WeatherForecastByHourModel  implements WeatherForecastItemInterface {

	constructor(private readonly temp: number) {}

	get headerTitles(): string[] {
		return [
			'City Name',
			'03:00',
			'06:00',
			'09:00',
			'12:00',
			'15:00',
			'18:00',
			'21:00',
			'24:00',
		]
	}

	get temperature(): number {
		return this.temp;
	}
}
