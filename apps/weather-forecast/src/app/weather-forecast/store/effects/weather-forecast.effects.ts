import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { WeatherForecastService } from "libs/weather-forecast/services/src/lib/weather-forecast.service";
import { catchError, iif, map, mergeMap, of, take, tap } from "rxjs";
import { changeFilterAction, searchTextAction, weatherItemsLoadedAction } from "../actions/weather-forecast.actions";
import { StoreService } from "../store.service";
@Injectable()
export class WeatherForecastEffects {
	loadWeatherForecast$ = createEffect(() => this.actions$.pipe(
		tap((data) => {
			debugger;
		}),
		ofType(changeFilterAction, searchTextAction),
		mergeMap(_ => this.storeService.getAllState().pipe(take(1))),
		mergeMap(state => {
			return iif(
				() => state.filter === 'daily',
				this.weatherForecastService.getDailyWeatherData(state.searchText),
				this.weatherForecastService.getHourlyWeatherData(state.searchText)
			)
			.pipe(
				tap(() => {
					this.router.navigate([''], { queryParams: {
						fitler: state.filter,
						search: state.searchText
					} })
				}),
				map(weatherItems => weatherItemsLoadedAction({ weatherItems })),
				catchError(() => of(weatherItemsLoadedAction({ weatherItems: state.weatherItems || [] })))
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
