import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { WeatherForecastCollectionModel } from 'libs/weather-forecast/services/src/lib/model/weather-forecast-collection.model';
import { mapTo, merge, Observable } from 'rxjs';
import { changeFilterAction, searchTextInputAction, weatherItemsLoadedAction, weatherItemsOnLoadErrorAction } from '../store/actions/weather-forecast.actions';
import { filterTypeChecker } from '../store/state';
import { StoreService } from '../store/store.service';

@Component({
	selector: 'bp-weather-table',
	templateUrl: './weather-table.component.html',
	styleUrls: ['./weather-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherTableComponent {

	weatherForecastItems$: Observable<WeatherForecastCollectionModel[]>;

	searchTextState$: Observable<string>;

	filterState$: Observable<string>;

	notFoundMessage$: Observable<boolean>;

	constructor(
		private storeService: StoreService,
		private readonly actions$: Actions,
		) {
		this.searchTextState$ = this.storeService.getSearchTextState();
		this.filterState$ = this.storeService.getFilterState();
		this.weatherForecastItems$ = this.storeService.getWeatherForecastItems();
		this.notFoundMessage$ = merge(
			this.actions$.pipe(ofType(weatherItemsLoadedAction),mapTo(false)),
			this.actions$.pipe(ofType(weatherItemsOnLoadErrorAction),mapTo(true))
		)
	}

	onSearch(event: EventTarget | null) {
		const searchTextValue = event && (event as HTMLInputElement).value;
		if(searchTextValue) {
			this.storeService.dispatch(searchTextInputAction({ searchTextValue }))
		}

	}

	onFilterChange(event: EventTarget | null) {
		const filterValue = event && (event as HTMLSelectElement).value;
		if(filterTypeChecker(filterValue)) {
			this.storeService.dispatch(changeFilterAction({ filterValue }))
		}
	}
}

