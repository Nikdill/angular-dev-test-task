import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { GetGeoDataResponse } from 'libs/weather-forecast/services/src/lib/actions/get-geo-data.response';
import { GetWeatherDataResponse } from 'libs/weather-forecast/services/src/lib/actions/get-weather-data.response';

type Exclude = 'current' | 'minutely'| 'daily'| 'hourly' |'alerts';

@Injectable()
export class WeatherForecastApiService {

	private apiKey = '2a759f17591e8b1b27f4b73fa052e740';

	constructor(private http: HttpClient) {}

	public getGeoData(cityName: string, limit = 1): Observable<GetGeoDataResponse> {
		return this.http.get<GetGeoDataResponse>(
			`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${this.apiKey}`
		);
	}

	public getWeatherData(lat: number, lon: number, exclude: Exclude[] = []): Observable<GetWeatherDataResponse> {
		return this.http.get<GetWeatherDataResponse>(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude.join(',')}&appid=${this.apiKey}`
		);
	}
}
