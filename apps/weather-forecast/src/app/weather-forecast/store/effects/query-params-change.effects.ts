import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, distinctUntilChanged, filter, map, merge, mergeMap, of, tap } from "rxjs";
import { changeFilterAction, changeUrlQueryParamsAction, quaryParamsChangeAction, searchTextAction } from "../actions/weather-forecast.actions";
import { filterTypeChecker, WeatherMode } from "../state";
import { StoreService } from "../store.service";
@Injectable()
export class QueryParamsChangeEffect {
	queryParamsChange$ = createEffect(() => this.activatedRoute.queryParams.pipe(
		filter(params => !!Object.keys(params || {}).length),
		map(params => ({ filter: (params.filter || '').trim().toLocaleLowerCase(), search: (params.search || '').trim()})),
		filter(params => filterTypeChecker(params.filter) && params.search),
		distinctUntilChanged((prev, current) => prev.filter === current.filter && prev.search === current.search),
		map(params => ({
				search: (params.search || '').trim(),
				filter: params.filter
			})
		),
		mergeMap(params => of(quaryParamsChangeAction({ filterValue: params.filter, searchTextValue: params.search }))),
		catchError(() => of(quaryParamsChangeAction({ filterValue: WeatherMode.daily, searchTextValue: '' })))
	  ));

	  changeControls$ = createEffect(() => merge(
		this.actions$.pipe(
			ofType(changeFilterAction),
			concatLatestFrom(_ => this.storeService.getSearchTextState()),
			map(([action, searchText]) => ({
					search: (searchText || '').trim(),
					filter: action.filterValue
				})
			)
			),
			this.actions$.pipe(
				ofType(searchTextAction),
				concatLatestFrom(_ => this.storeService.getFilterState()),
				map(([action, filterState]) => ({
						search: (action.searchTextValue || '').trim(),
						filter: filterState
					})
				)
				),
	  ).pipe(
		tap(params => this.router.navigate([''], { queryParams: {
			filter: params.filter,
			search: params.search
		} })),
		mergeMap(_=> of(changeUrlQueryParamsAction())),
		catchError(() => of(changeUrlQueryParamsAction()))
	  ));

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly actions$: Actions,
		private readonly storeService: StoreService,
		private readonly router: Router
	) {}
}
