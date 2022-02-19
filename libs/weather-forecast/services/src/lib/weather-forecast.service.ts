import {Injectable} from "@angular/core";

import {catchError, switchMap, map } from "rxjs/operators";
import {Observable, of} from "rxjs";

import { WeatherForecastApiService } from "./weather-forecast-api.service";
import { GetGeoDataItem } from "./actions/get-geo-data.response";
import { WeaherDailyItemResponse, WeaherHourlyItemResponse } from "./actions/get-weather-data.response";


@Injectable()
export class WeatherForecastService {
	constructor(private readonly weatherForecastApiService: WeatherForecastApiService) {}

	public getGeoData(cityName: string): Observable<GetGeoDataItem[]> {
		return this.weatherForecastApiService.getGeoData(cityName).pipe(catchError(() => of([])));
	}

	public getDailyWeatherData(cityName: string): Observable<{cityName: string; weatherItems: WeaherDailyItemResponse[]} | null> {
		return this.getGeoData(cityName).pipe(switchMap(citiesLocationData => {
			const cityLocation = (citiesLocationData || []).pop();
			let result$: Observable<{cityName: string; weatherItems: WeaherDailyItemResponse[]} | null> = of(null);

			if(cityLocation) {
				result$ = this.weatherForecastApiService.getWeatherData(
					cityLocation.lat,
					cityLocation.lon,
					[ 'current','minutely','hourly','alerts' ]
				).pipe(
					map(response => ({cityName: cityLocation.name, weatherItems: (response?.daily || []).slice(0, 7)})),
					catchError(() => of(null))
				)
			}

			return result$;
		}))
	}

	public getHourlyWeatherData(cityName: string): Observable<{cityName: string; weatherItems: WeaherHourlyItemResponse[]} | null> {
		return this.getGeoData(cityName).pipe(switchMap(citiesLocationData => {
			const cityLocation = (citiesLocationData || []).pop();
			let result$: Observable<{cityName: string; weatherItems: WeaherHourlyItemResponse[]} | null> = of(null);

			if(cityLocation) {
				result$ = this.weatherForecastApiService.getWeatherData(
					cityLocation.lat,
					cityLocation.lon,
					[ 'current','minutely','daily','alerts' ]
				).pipe(
					map(response => ({cityName: cityLocation.name, weatherItems: (response?.hourly || []).filter((_, i) => (i + 1) % 3 === 0).slice(0, 8)})),
					catchError(() => of(null))
				)
			}

			return result$;
		}))
	}
}
