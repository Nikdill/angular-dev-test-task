import { Action, createReducer, on } from '@ngrx/store';
import { searchTextAction, changeFilterAction, weatherItemsLoadedAction, quaryParamsChangeAction } from '../actions/weather-forecast.actions';
import { initialState, StateInterface } from '../state';


const _weatherForecastReducer = createReducer(
	initialState,
	on(changeFilterAction, (state, { filterValue }) => ({...state, filter: filterValue })),
  	on(searchTextAction, (state, { searchTextValue }) => ({...state, searchText: searchTextValue })),
	on(quaryParamsChangeAction, (state, { searchTextValue, filterValue }) => ({
			...state,
		 	searchText: (state.searchText || '').trim().toLocaleLowerCase() === (searchTextValue || '').trim().toLocaleLowerCase() ? state.searchText : searchTextValue,
		  	filter: filterValue
		})),
	on(weatherItemsLoadedAction, (state, { weatherRecord }) => {
		const newStateMap = new Map(state.weatherItemsMap[state.filter].map(i => [i.cityName, i.weatherItems]));

		newStateMap.set(weatherRecord.cityName, weatherRecord.weatherItems)


		return {
			...state,
			 weatherItemsMap: {
				...state.weatherItemsMap,
				[state.filter]: Array.from(newStateMap).map(([cityName, weatherItems]) => ({ cityName, weatherItems }))
			}
		}
	}),
);

export function weatherForecastReducer(state: StateInterface, action: Action): { filter: string; searchText: string; } {
  return _weatherForecastReducer(state, action);
}
