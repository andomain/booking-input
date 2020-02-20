export enum PLACE_TYPE {
  AIRPORT = 'A',
  DISTRICT = 'D',
  CITY = 'C',
  STATION = 'T',
}

// Subset of response data shared by all response types
type BaseResponse = {
  country: string;
  name: string;
  placeKey: string;
  region: string;
  city?: string;
};

// Extend base types with data specific to airports etc.
type AIRPORT = BaseResponse & {
  placeType: PLACE_TYPE.AIRPORT;
  iata: string;
};

type CITY = BaseResponse & {
  placeType: PLACE_TYPE.CITY;
};
type DISTRICT = BaseResponse & {
  placeType: PLACE_TYPE.DISTRICT;
};
type STATION = BaseResponse & {
  placeType: PLACE_TYPE.STATION;
};

export type SearchResponse = AIRPORT | CITY | STATION | DISTRICT;

export type API_RESPONSE = {
  results: {
    docs: SearchResponse[];
    numFound: number;
  };
};
