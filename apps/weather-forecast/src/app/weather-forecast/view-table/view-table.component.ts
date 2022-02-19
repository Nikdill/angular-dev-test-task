import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { WeatherForecastCollectionModel } from 'libs/weather-forecast/services/src/lib/model/weather-forecast-collection.model';

@Component({
  selector: 'bp-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTableComponent   {

	@Input()
	weatherRecords!: WeatherForecastCollectionModel[];

	@ContentChild('headerTemplate')
	headerTemplate!: TemplateRef<any>
}
