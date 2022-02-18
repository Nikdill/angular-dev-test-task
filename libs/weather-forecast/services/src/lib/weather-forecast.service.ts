import {Injectable} from "@angular/core";
import {WeatherForecastApiService} from "@bp/weather-forecast/services";
import {catchError, switchMap, map} from "rxjs/operators";
import {Observable, of } from "rxjs";

import {GetGeoDataItem} from "./actions/get-geo-data.response";
import { WeaherItemResponse } from "./actions/get-weather-data.response";

@Injectable()
export class WeatherForecastService {
	constructor(private readonly weatherForecastApiService: WeatherForecastApiService) {}

	public getGeoData(cityName: string): Observable<GetGeoDataItem[]> {
		return this.weatherForecastApiService.getGeoData(cityName).pipe(catchError(() => of([])));
	}

	public getDailyWeatherData(cityName: string): Observable<WeaherItemResponse[]> {
		return this.getGeoData(cityName).pipe(switchMap(citiesLocationData => {
			const cityLocation = (citiesLocationData || []).pop();
			let result$: Observable<WeaherItemResponse[]> = of([]);

			if(cityLocation) {
				result$ = this.weatherForecastApiService.getWeatherData(
					cityLocation.lat,
					cityLocation.lon,
					[ 'current','minutely','hourly','alerts' ]
				).pipe(
					map(response => response?.daily || []),
					catchError(() => of([]))
				)
			}

			return result$;
		}))
	}

	public getHourlyWeatherData(cityName: string): Observable<WeaherItemResponse[]> {
		return this.getGeoData(cityName).pipe(switchMap(citiesLocationData => {
			const cityLocation = (citiesLocationData || []).pop();
			let result$: Observable<WeaherItemResponse[]> = of([]);

			if(cityLocation) {
				result$ = this.weatherForecastApiService.getWeatherData(
					cityLocation.lat,
					cityLocation.lon,
					[ 'current','minutely','daily','alerts' ]
				).pipe(
					map(response => response?.hourly || []),
					catchError(() => of([]))
				)
			}

			return result$;
		}))
	}
}
