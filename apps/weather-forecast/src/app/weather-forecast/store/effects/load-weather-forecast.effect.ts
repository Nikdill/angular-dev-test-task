import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { WeatherForecastService } from "libs/weather-forecast/services/src/lib/weather-forecast.service";
import { catchError, distinctUntilChanged, filter, iif, map, mergeMap, of } from "rxjs";
import { quaryParamsChangeAction, weatherItemsLoadedAction, weatherItemsOnLoadErrorAction } from "../actions/weather-forecast.actions";
import { filterTypeChecker, WeatherMode } from "../state";
@Injectable()
export class LoadWeatherForecastEffect {
	loadWeatherForecast$ = createEffect(() => this.actions$.pipe(
		ofType(quaryParamsChangeAction),
		map(action => ({
			search: (action.searchTextValue || '').trim().toLocaleLowerCase(),
			filter: (action.filterValue || '').trim().toLocaleLowerCase()
		})),
		filter(state => filterTypeChecker(state.filter) && state.search.length > 2),
		distinctUntilChanged((prev, curr) => prev.filter === curr.filter && prev.search === curr.search),
		mergeMap(state => {
			return iif(
				() => state.filter === WeatherMode.daily,
				this.weatherForecastService.getDailyWeatherData(state.search),
				this.weatherForecastService.getHourlyWeatherData(state.search)
			)
			.pipe(
				map(weatherRecord =>  weatherRecord ? weatherItemsLoadedAction({ weatherRecord }) : weatherItemsOnLoadErrorAction()),
				catchError(() => of(weatherItemsOnLoadErrorAction()))
			)
		})
	  ));

	constructor(
		private readonly actions$: Actions,
		private readonly weatherForecastService: WeatherForecastService,
	) {}
}
