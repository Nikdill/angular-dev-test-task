import { createAction, props } from "@ngrx/store";
import { WeatherMode, WeatherRecordInterface } from "../state";

export const changeFilterAction = createAction('[Weather Table] Change filter', props<{ filterValue: WeatherMode }>());
export const searchTextAction = createAction('[Weather Table] Search Text', props<{ searchTextValue: string }>());
export const searchTextInputAction = createAction('[Weather Table] Search Text input', props<{ searchTextValue: string }>());
export const quaryParamsChangeAction = createAction('[Weather Table] query params change', props<{ filterValue: WeatherMode, searchTextValue: string }>());
export const weatherItemsOnLoadErrorAction = createAction('[Weather Table] Weather items on load error');
export const weatherItemsLoadedAction = createAction('[Weather Table] Weather items loaded', props<{ weatherRecord: WeatherRecordInterface }>());

