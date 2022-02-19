import { Action, createReducer, on } from '@ngrx/store';
import { searchTextAction, changeFilterAction, weatherItemsLoadedAction, quaryParamsChangeAction } from '../actions/weather-forecast.actions';
import { initialState, StateInterface } from '../state';


const _weatherForecastReducer = createReducer(
	initialState,
	on(changeFilterAction, (state, { filterValue }) => ({...state, filter: filterValue })),
  	on(searchTextAction, (state, { searchTextValue }) => ({...state, searchText: searchTextValue })),
	on(quaryParamsChangeAction, (state, { searchTextValue, filterValue }) => ({
			...state,
		 	searchText: searchTextValue,
		  	filter: filterValue
		})),
	on(weatherItemsLoadedAction, (state, { weatherRecord }) => {
		const newState = [...state.weatherItemsMap[state.filter]];
		const foundIndex = newState.findIndex(i => i.cityName === weatherRecord.cityName);

		if(~foundIndex) {
			newState.splice(foundIndex, 1, weatherRecord);
		} else {
			newState.push(weatherRecord)
		}

		return {
			...state,
			 weatherItemsMap: {
				...state.weatherItemsMap,
				[state.filter]: newState
			}
		}
	}),
);

export function weatherForecastReducer(state: StateInterface, action: Action): { filter: string; searchText: string; } {
  return _weatherForecastReducer(state, action);
}
