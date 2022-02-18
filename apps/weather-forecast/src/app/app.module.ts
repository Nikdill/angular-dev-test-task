import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {WeatherForecastModule} from "./weather-forecast/weather-forecast.module";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		WeatherForecastModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
