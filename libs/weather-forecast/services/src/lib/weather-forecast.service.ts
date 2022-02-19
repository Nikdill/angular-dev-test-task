import {Injectable} from "@angular/core";

import {catchError, switchMap, map } from "rxjs/operators";
import {Observable, of} from "rxjs";

import { WeatherForecastApiService } from "./weather-forecast-api.service";
import { GetGeoDataItem } from "./actions/get-geo-data.response";
import { WeatherForecastFactory } from "./model/weather-forecast-collection.factory";
import { WeatherForecastByHourFactory } from "./model/hourly/weather-forecast-by-hour.factory";
import { WeatherForecastCollectionModel } from "./model/weather-forecast-collection.model";
import { WeatherForecastByDayFactory } from "./model/daily/weather-forecast-by-day.factory";


@Injectable()
export class WeatherForecastService {
	constructor(private readonly weatherForecastApiService: WeatherForecastApiService) {}

	public getGeoData(cityName: string): Observable<GetGeoDataItem[]> {
		return this.weatherForecastApiService.getGeoData(cityName).pipe(catchError(() => of([])));
	}

	public getDailyWeatherData(cityName: string): Observable<WeatherForecastCollectionModel | null> {
		return this.getGeoData(cityName).pipe(switchMap(citiesLocationData => {
			const cityLocation = (citiesLocationData || []).pop();
			let result$: Observable<WeatherForecastCollectionModel | null> = of(null);

			if(cityLocation) {
				result$ = this.weatherForecastApiService.getWeatherData(
					cityLocation.lat,
					cityLocation.lon,
					[ 'current','minutely','hourly','alerts' ]
				).pipe(
					map(response =>
						new WeatherForecastFactory().getModelFromData({
							cityName: cityLocation.name,
							weatherForecastItems: (response?.daily || [])
							.slice(0, 7)
							.map(item => new WeatherForecastByDayFactory().getModelFromData(item))
						})
					),
					catchError(() => of(null))
				)
			}

			return result$;
		}))
	}

	public getHourlyWeatherData(cityName: string): Observable<WeatherForecastCollectionModel | null> {
		return this.getGeoData(cityName).pipe(switchMap(citiesLocationData => {
			const cityLocation = (citiesLocationData || []).pop();
			let result$: Observable<WeatherForecastCollectionModel | null> = of(null);

			if(cityLocation) {
				result$ = this.weatherForecastApiService.getWeatherData(
					cityLocation.lat,
					cityLocation.lon,
					[ 'current','minutely','daily','alerts' ]
				).pipe(
					map(response =>
						new WeatherForecastFactory().getModelFromData({
							cityName: cityLocation.name,
							weatherForecastItems: (response?.hourly || [])
							.filter((_, i) => (i + 1) % 3 === 0)
							.slice(0, 8)
							.map(item => new WeatherForecastByHourFactory().getModelFromData(item))
						})
					),
					catchError(() => of(null))
				)
			}

			return result$;
		}))
	}
}
