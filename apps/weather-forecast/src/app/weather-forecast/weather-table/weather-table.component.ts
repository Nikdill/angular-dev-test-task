import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeaherItemResponse } from 'libs/weather-forecast/services/src/lib/actions/get-weather-data.response';
import { WeatherForecastService } from 'libs/weather-forecast/services/src/lib/weather-forecast.service';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { changeFilterAction, searchTextAction } from '../store/actions/weather-forecast.actions';
import { StoreService } from '../store/store.service';


@Component({
	selector: 'bp-weather-table',
	templateUrl: './weather-table.component.html',
	styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent implements AfterViewInit{

	@ViewChild('selectFilter')
	selectFilter!: ElementRef<HTMLSelectElement>;


	weatherForecastItems$: Observable<WeaherItemResponse[]>;

	searchTextState$: Observable<string>;

	filterState$: Observable<string>;

	queryParams$: Observable<{ filter: string; search: string }>;

	constructor(
		private weatcherService: WeatherForecastService,
		private activateRouter: ActivatedRoute,
		private storeService: StoreService,
		) {
			this.queryParams$ = this.activateRouter.queryParams.pipe(
				map(params => ({ filter: params.filter || '', search: params.search || ''})),
				publishReplay(1),
				refCount()
			);
			this.searchTextState$ = this.storeService.getSearchTextState();
			this.filterState$ = this.storeService.getFilterState();
			this.weatherForecastItems$ = this.storeService.getWeatherForecastItems();
			this.weatherForecastItems$.subscribe(data => {
				debugger;
			});
		}

	ngAfterViewInit(): void {}


	onSearch(event: EventTarget | null) {
		const searchTextValue = event && (event as HTMLInputElement).value;
		if(searchTextValue) {
			this.storeService.dispatch(searchTextAction({ searchTextValue }))
		}

	}

	onFilterChange(event: EventTarget | null) {
		const filterValue = event && (event as HTMLSelectElement).value;
		if(filterValue) {
			this.storeService.dispatch(changeFilterAction({ filterValue }))
		}
	}

	dailySearch(cityName: string) {
		return this.weatcherService.getDailyWeatherData(cityName);
	}

	hourlySearch(cityName: string) {
		return this.weatcherService.getHourlyWeatherData(cityName);
	}
}

