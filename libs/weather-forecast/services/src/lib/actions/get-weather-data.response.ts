export interface WeaherDailyItemResponse {
	dt: number;
	temp: {
		day: number;
		eve: number;
		max: number;
		min: number;
		morn: number;
		night: number;

	};
	feels_like: {
		day: number;
        night: number;
        eve: number;
        morn: number;
	};
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi:number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: [
	  {
		id: number;
		main: string;
		description: string;
		icon: string;
	  }
	],
	pop: number;
  }

  export interface WeaherHourlyItemResponse {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi:number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: [
	  {
		id: number;
		main: string;
		description: string;
		icon: string;
	  }
	],
	pop: number;
  }

export interface GetWeatherDataResponse {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	hourly?: WeaherHourlyItemResponse[];
	daily?: WeaherDailyItemResponse[];
  }
