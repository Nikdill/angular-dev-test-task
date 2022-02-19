import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { changeFilterAction, searchTextInputAction } from '../store/actions/weather-forecast.actions';
import { filterTypeChecker, WeatherRecordInterface } from '../store/state';
import { StoreService } from '../store/store.service';

@Component({
	selector: 'bp-weather-table',
	templateUrl: './weather-table.component.html',
	styleUrls: ['./weather-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherTableComponent {

	weatherForecastItems$: Observable<WeatherRecordInterface[]>;

	searchTextState$: Observable<string>;

	filterState$: Observable<string>;

	constructor(private storeService: StoreService) {
		this.searchTextState$ = this.storeService.getSearchTextState();
		this.filterState$ = this.storeService.getFilterState();
		this.weatherForecastItems$ = this.storeService.getWeatherForecastItems();
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

