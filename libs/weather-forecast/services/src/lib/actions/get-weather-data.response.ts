export interface WeaherItemResponse {
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
	hourly?: WeaherItemResponse[];
	daily?: WeaherItemResponse[];
  }
