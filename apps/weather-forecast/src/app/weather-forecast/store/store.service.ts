import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { distinctUntilChanged, map, Observable, publishReplay, refCount } from "rxjs";
import { StateInterface, weatherForecastStoreKey, WeatherRecordInterface } from "./state";

@Injectable()
export class StoreService {

	private readonly store$: Observable<StateInterface>;

	constructor(private store: Store<{weatherForecast: StateInterface}>){
		this.store$ = this.store.select(weatherForecastStoreKey);
	}

	getAllState(): Observable<StateInterface> {
		return this.store$.pipe(
			publishReplay(1),
			refCount()
		);
	}

	getFilterState(): Observable<string> {
		return this.store$.pipe(
			map(state => state.filter),
			distinctUntilChanged(),
			publishReplay(1),
			refCount()
		)
	}

	getSearchTextState(): Observable<string> {
		return this.store$.pipe(
			map(state => state.searchText),
			distinctUntilChanged(),
			publishReplay(1),
			refCount()
		)
	}

	getWeatherForecastItems(): Observable<WeatherRecordInterface[]> {
		return this.store$.pipe(
			map(state => state.weatherItemsMap[state.filter]),
			distinctUntilChanged(),
			publishReplay(1),
			refCount()
		)
	}

	dispatch(action: Action) {
		this.store.dispatch(action);
	}
}
