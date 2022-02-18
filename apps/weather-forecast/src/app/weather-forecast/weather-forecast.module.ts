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
import { WeatherForecastEffects } from './store/effects/weather-forecast.effects';
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
		EffectsModule.forRoot([WeatherForecastEffects])
	],
	providers: [StoreService],
	exports: [WeatherTableComponent],
})
export class WeatherForecastModule { }
