import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { WeatherForecastServicesModule } from 'libs/weather-forecast/services/src/index'
import { RouterModule } from '@angular/router';
@NgModule({
	declarations: [
		WeatherTableComponent,
		ViewTableComponent
		],
	imports: [
		CommonModule,
		RouterModule.forRoot([]),
		WeatherForecastServicesModule,
	],
	exports: [WeatherTableComponent],
})
export class WeatherForecastModule { }
