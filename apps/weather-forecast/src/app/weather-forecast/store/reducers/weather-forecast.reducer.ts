import { Action, createReducer, on } from '@ngrx/store';
import { searchTextAction, changeFilterAction, weatherItemsLoadedAction } from '../actions/weather-forecast.actions';
import { initialState, StateInterface } from '../state';


const _weatherForecastReducer = createReducer(
	initialState,
	on(changeFilterAction, (state, { filterValue }) => ({...state, filter: filterValue })),
  	on(searchTextAction, (state, { searchTextValue }) => ({...state, searchText: searchTextValue })),
	on(weatherItemsLoadedAction, (state, { weatherItems }) => ({...state, weatherItems: weatherItems })),
);

export function weatherForecastReducer(state: StateInterface, action: Action): { filter: string; searchText: string; } {
  return _weatherForecastReducer(state, action);
}
