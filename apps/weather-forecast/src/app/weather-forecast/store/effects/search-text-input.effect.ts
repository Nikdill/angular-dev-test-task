import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, of } from "rxjs";
import { searchTextAction, searchTextInputAction } from "../actions/weather-forecast.actions";
@Injectable()
export class SearchTextInputEffect {
	searchTextInput$ = createEffect(() => this.actions$.pipe(
		ofType(searchTextInputAction),
		debounceTime(1000),
		map(({ searchTextValue }) => searchTextValue.trim()),
		distinctUntilChanged(),
		mergeMap(searchTextValue => {
			return of(searchTextAction({ searchTextValue }))
		}),
		catchError(() => of(searchTextAction({ searchTextValue: '' })))
	  ));

	constructor(
		private readonly actions$: Actions,
	) {}
}
