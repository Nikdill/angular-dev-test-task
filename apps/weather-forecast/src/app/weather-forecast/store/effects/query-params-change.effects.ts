import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { createEffect } from '@ngrx/effects';
import { catchError, distinctUntilChanged, filter, map, mergeMap, of } from "rxjs";
import { quaryParamsChangeAction } from "../actions/weather-forecast.actions";
import { filterTypeChecker, WeatherMode } from "../state";
@Injectable()
export class QueryParamsChangeEffect {
	qQueryParamsChange$ = createEffect(() => this.activatedRoute.queryParams.pipe(
		filter(params => !!Object.keys(params || {}).length),
		map(params => ({ filter: params.filter || '', search: params.search || ''})),
		filter(params => filterTypeChecker(params.filter) && params.search),
		distinctUntilChanged((prev, current) => prev.filter === current.filter && prev.search === current.search),
		mergeMap(params => {
			return of(quaryParamsChangeAction({ filterValue: params.filter, searchTextValue: params.search }))
		}),
		catchError(() => of(quaryParamsChangeAction({ filterValue: WeatherMode.daily, searchTextValue: '' })))
	  ));

	constructor(
		private readonly activatedRoute: ActivatedRoute,
	) {}
}
