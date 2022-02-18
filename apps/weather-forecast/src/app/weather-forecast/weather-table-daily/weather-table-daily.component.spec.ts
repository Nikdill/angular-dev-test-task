import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTableDailyComponent } from './weather-table-daily.component';

describe('WeatherTableDailyComponent', () => {
  let component: WeatherTableDailyComponent;
  let fixture: ComponentFixture<WeatherTableDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherTableDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTableDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
