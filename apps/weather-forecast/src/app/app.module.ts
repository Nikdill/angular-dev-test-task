import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {WeatherForecastModule} from "./weather-forecast/weather-forecast.module";
import { SearchInputComponent } from './weather-forcast/search-input/search-input.component';

@NgModule({
	declarations: [AppComponent, SearchInputComponent],
	imports: [
		BrowserModule,
		WeatherForecastModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
