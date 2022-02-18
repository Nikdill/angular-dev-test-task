import { createAction, props } from "@ngrx/store";
import { WeaherItemResponse } from "libs/weather-forecast/services/src/lib/actions/get-weather-data.response";

export const changeFilterAction = createAction('[Weather Table] Change filter', props<{ filterValue: string }>());
export const searchTextAction = createAction('[Weather Table] SearchText', props<{ searchTextValue: string }>());
export const weatherItemsOnLoadeAction = createAction('[Weather Table] Weather items on load');
export const weatherItemsLoadedAction = createAction('[Weather Table] Weather items loaded', props<{ weatherItems: WeaherItemResponse[] }>());

