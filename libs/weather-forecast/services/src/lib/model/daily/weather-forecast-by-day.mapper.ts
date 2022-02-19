import { WeaherDailyItemResponse } from "../../actions/get-weather-data.response";
import { WeatherForecastByDayModelData } from "./weather-forecast-by-day.model";

export class  WeatherForecastByDayMapper {
	mapData(rawData: WeaherDailyItemResponse): WeatherForecastByDayModelData {
		return {
			temp: {
				day: rawData.temp.day,
				eve: rawData.temp.eve,
				max: rawData.temp.max,
				min: rawData.temp.min,
				morn: rawData.temp.morn,
				night: rawData.temp.night,
			}
		}
	}
}
