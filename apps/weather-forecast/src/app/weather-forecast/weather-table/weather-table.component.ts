import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeaherItemResponse } from 'libs/weather-forecast/services/src/lib/actions/get-weather-data.response';
import { WeatherForecastService } from 'libs/weather-forecast/services/src/lib/weather-forecast.service';
import { of, ReplaySubject, combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, publishReplay, refCount, switchMap } from 'rxjs/operators';


@Component({
	selector: 'bp-weather-table',
	templateUrl: './weather-table.component.html',
	styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent implements AfterViewInit{

	@ViewChild('selectFilter')
	selectFilter!: ElementRef<HTMLSelectElement>;


	searchResult$ = new ReplaySubject<WeaherItemResponse[]>(1);

	searchText$ = new BehaviorSubject('');

	filterState$ = new BehaviorSubject('');

	queryParams$: Observable<{ filter: string; search: string }>;

	private readonly searchMethodMap =  new Map([
		['daily', this.dailySearch.bind(this)],
		['hourly', this.hourlySearch.bind(this)],
	])

	constructor(
		private weatcherService: WeatherForecastService,
		private activateRouter: ActivatedRoute,
		private router: Router,
		) {
			this.queryParams$ = this.activateRouter.queryParams.pipe(
				map(params => ({ filter: params.filter || '', search: params.search || ''})),
				publishReplay(1),
				refCount()
			);
		}

	ngAfterViewInit(): void {
		this.queryParams$.subscribe(params => {
			if(params.filter && params.search) {
				this.searchMethodMap.get(params.filter)?.(params.search).subscribe(response => this.searchResult$.next(response))
			}
		});

		this.searchText$.pipe(
			filter(Boolean),
			distinctUntilChanged(),
			debounceTime(500),
			switchMap(value => {
				return combineLatest(
					[
						this.filterState$,
						of(value),
					]
				)
			})
		).subscribe(([filter, search]) => {
			this.router.navigate([''], { queryParams: { filter, search } });
		});

		this.filterState$.pipe(
			filter(Boolean),
			distinctUntilChanged(),
			debounceTime(500),
			switchMap(value => {
				return combineLatest(
					[
						of(value),
						this.searchText$,
					]
				)
			})
		).subscribe(([filter, search]) => {
			this.router.navigate([''], { queryParams: { filter, search } });
		});
	}


	onSearch(event: EventTarget | null) {
		const text = event && (event as HTMLInputElement).value;
		if(text) {
			this.searchText$.next(text);
		}

	}

	onFilterChange(event: EventTarget | null) {
		const value = event && (event as HTMLSelectElement).value;
		if(value) {
			this.filterState$.next(value)
		}
	}

	dailySearch(cityName: string) {
		return this.weatcherService.getDailyWeatherData(cityName);
	}

	hourlySearch(cityName: string) {
		return this.weatcherService.getHourlyWeatherData(cityName);
	}
}
