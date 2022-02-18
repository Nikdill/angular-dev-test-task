export interface GetGeoDataItem {
	name: string;
	local_names: {
		de: string;
		io: string;
		oc: string;
		uk: string;
		ru: string;
		ko: string;
		en: string;
		nl: string;
		eo: string;
		pl: string;
		sr: string;
		hr: string;
		fi: string;
		zh: string;
		et: string;
		hu: string;
		ar: string;
		fr: string;
	},
	lat: number;
	lon: number;
	country: string;
	state: string;
}

export type GetGeoDataResponse = GetGeoDataItem[];
