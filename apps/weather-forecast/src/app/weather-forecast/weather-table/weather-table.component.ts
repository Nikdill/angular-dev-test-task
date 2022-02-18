import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeaherItemResponse } from 'libs/weather-forecast/services/src/lib/actions/get-weather-data.response';
import { WeatherForecastService } from 'libs/weather-forecast/services/src/lib/weather-forecast.service';
import { ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, combineLatest } from 'rxjs/operators';

interface ParamsInterface {
	filter: string;
	search: string;
}

@Component({
	selector: 'bp-weather-table',
	templateUrl: './weather-table.component.html',
	styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent implements AfterViewInit{

	@ViewChild('selectFilter') selectFilter: ElementRef<HTMLSelectElement>;

	searchResult$ = new ReplaySubject<WeaherItemResponse[]>(1);

	searchText$ = new ReplaySubject<string>(1);

	filterState$ = new ReplaySubject<string>(1);

	private readonly searchMethodMap =  new Map([
		['daily', this.dailySearch],
		['hourly', this.hourlySearch],
	])

	constructor(
		private weatcherService: WeatherForecastService,
		private activateRouter: ActivatedRoute,
		private router: Router,
		) {}

	ngAfterViewInit(): void {
		this.activateRouter.params.subscribe(params => {
			if(params.filter && params.search) {
				this.searchMethodMap.get(params.filter)?.(params.search).subscribe(response => this.searchResult$.next(response))
			}
		});

		this.searchText$.pipe(
			filter(Boolean),
			distinctUntilChanged(),
			debounceTime(500),
		).subscribe(searchText => {
			this.router.navigate([this.selectFilter.nativeElement.value, searchText]);
		});

		this.filterState$.pipe(
			filter(Boolean),
			distinctUntilChanged(),
			debounceTime(500),
			switchMap(value => {
				return combineLatest(
					of(value),
					this.activateRouter.params.pipe(map(params => params.search))
				)
			})
		).subscribe(pathParts => {
			this.router.navigate(pathParts);
		});
	}

	onSearch(searchText: string) {
		return this.searchText$.next(searchText);
	}

	onFilterChange(value: string) {
		return this.filterState$.next(value);
	}

	dailySearch(cityName: string) {
		return this.weatcherService.getDailyWeatherData(cityName);
	}

	hourlySearch(cityName: string) {
		return this.weatcherService.getHourlyWeatherData(cityName);
	}
}
