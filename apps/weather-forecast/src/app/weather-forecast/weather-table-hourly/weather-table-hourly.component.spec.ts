import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTableHourlyComponent } from './weather-table-hourly.component';

describe('WeatherTableHourlyComponent', () => {
  let component: WeatherTableHourlyComponent;
  let fixture: ComponentFixture<WeatherTableHourlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherTableHourlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTableHourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
