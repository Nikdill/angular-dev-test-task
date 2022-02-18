import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherForecastServicesModule} from "@bp/weather-forecast/services";
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { WeatherTableHourlyComponent } from './weather-table-hourly/weather-table-hourly.component';
import { WeatherTableDailyComponent } from './weather-table-daily/weather-table-daily.component';
import {RouterModule} from "@angular/router";
import {WeatherForecastRouterModule} from "../weather-forecast-router/weather-forecast-router.module";
import { SearchInputComponent } from './search-input/search-input.component';
import { SelectFilterComponent } from './select-filter/select-filter.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { SearchInputContentComponent } from './search-input/search-input-content/search-input-content.component';



@NgModule({
	declarations: [
		WeatherTableComponent,
		WeatherTableHourlyComponent,
		WeatherTableDailyComponent,
		SearchInputComponent,
		SelectFilterComponent,
		ViewTableComponent,
		SearchInputContentComponent
	],
	imports: [
		CommonModule,
		WeatherForecastServicesModule,
		WeatherForecastRouterModule,
		RouterModule
	],
	exports: [WeatherTableComponent]
})
export class WeatherForecastModule { }
