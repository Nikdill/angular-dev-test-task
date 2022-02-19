import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { WeatherForecastService } from "libs/weather-forecast/services/src/lib/weather-forecast.service";
import { catchError, iif, map, mergeMap, of, take, tap } from "rxjs";
import { changeFilterAction, quaryParamsChangeAction, searchTextAction, weatherItemsLoadedAction, weatherItemsOnLoadErrorAction } from "../actions/weather-forecast.actions";
import { StoreService } from "../store.service";
@Injectable()
export class LoadWeatherForecastEffect {
	loadWeatherForecast$ = createEffect(() => this.actions$.pipe(
		ofType(quaryParamsChangeAction, changeFilterAction, searchTextAction),
		mergeMap(_ => this.storeService.getAllState().pipe(take(1))),
		mergeMap(state => {
			const searchText = (state.searchText || '').trim().toLocaleLowerCase();
			return iif(
				() => !!searchText && state.filter === 'daily',
				this.weatherForecastService.getDailyWeatherData(searchText),
				this.weatherForecastService.getHourlyWeatherData(searchText)
			)
			.pipe(
				tap(() => {
					this.router.navigate([''], { queryParams: {
						filter: state.filter,
						search: searchText
					} })
				}),
				map(weatherRecord =>  weatherRecord ? weatherItemsLoadedAction({ weatherRecord }) : weatherItemsOnLoadErrorAction()),
				catchError(() => of(weatherItemsOnLoadErrorAction()))
			)
		})
	  ));

	constructor(
		private readonly actions$: Actions,
		private readonly weatherForecastService: WeatherForecastService,
		private readonly storeService: StoreService,
		private readonly router: Router,
	) {}
}
