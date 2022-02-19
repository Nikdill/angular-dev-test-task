import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { WeatherForecastServicesModule } from 'libs/weather-forecast/services/src/index'
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreService } from './store/store.service';
import { weatherForecastReducer } from './store/reducers/weather-forecast.reducer';
import { weatherForecastStoreKey } from './store/state';
import { EffectsModule } from '@ngrx/effects';
import { LoadWeatherForecastEffect } from './store/effects/load-weather-forecast.effect';
import { QueryParamsChangeEffect } from './store/effects/query-params-change.effects';
import { SearchTextInputEffect } from './store/effects/search-text-input.effect';
@NgModule({
	declarations: [
		WeatherTableComponent,
		ViewTableComponent
		],
	imports: [
		CommonModule,
		RouterModule.forRoot([]),
		WeatherForecastServicesModule,
		StoreModule.forFeature(weatherForecastStoreKey, weatherForecastReducer),
		EffectsModule.forRoot([LoadWeatherForecastEffect, QueryParamsChangeEffect, SearchTextInputEffect])
	],
	providers: [StoreService],
	exports: [WeatherTableComponent],
})
export class WeatherForecastModule { }
