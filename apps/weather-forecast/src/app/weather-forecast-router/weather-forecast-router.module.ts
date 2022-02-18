import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WeatherTableHourlyComponent} from "../weather-forecast/weather-table-hourly/weather-table-hourly.component";
import {WeatherTableDailyComponent} from "../weather-forecast/weather-table-daily/weather-table-daily.component";

const routes: Routes = [
	{ path: '', redirectTo: 'daily', pathMatch: 'full' },
	{ path: 'hourly', component: WeatherTableHourlyComponent },
	{ path: 'daily', component: WeatherTableDailyComponent }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class WeatherForecastRouterModule { }
