import { WeaherHourlyItemResponse } from "../../actions/get-weather-data.response";
import { WeatherForecastByHourModelData } from "./weather-forecast-by-hour.model";

export class  WeatherForecastByHourMapper {
	mapData(rawData: WeaherHourlyItemResponse): WeatherForecastByHourModelData {
		return {
			temp: rawData.temp
		}
	}
}
