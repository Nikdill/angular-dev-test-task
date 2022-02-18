import {AfterViewInit, Component,} from '@angular/core';
import {WeatherForecastService} from "../../../../../../libs/weather-forecast/services/src/lib/weather-forecast.service";
@Component({
	selector: 'bp-weather-table-hourly',
	templateUrl: './weather-table-hourly.component.html',
	styleUrls: ['./weather-table-hourly.component.scss']
})
export class WeatherTableHourlyComponent implements AfterViewInit {

	constructor(private weatherForecastService: WeatherForecastService) { }

	ngAfterViewInit(): void {
		this.weatherForecastService.getHourlyWeatherData('Dnipro').subscribe();
	}
}
