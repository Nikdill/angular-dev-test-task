import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { WeatherRecordInterface } from '../store/state';

@Component({
  selector: 'bp-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTableComponent implements OnInit {

	@Input()
	weatherRecords!: WeatherRecordInterface[];

	@ContentChild('headerTemplate')
	headerTemplate!: TemplateRef<any>

	@ContentChild('tdTemplate')
	tdTemplate!: TemplateRef<any>

	constructor() { }

	ngOnInit(): void {}

}
