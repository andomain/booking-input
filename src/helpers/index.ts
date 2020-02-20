import { SearchResponse, PLACE_TYPE } from '../types';

// Convert Search response data into a "nice" name string
export const buildName = (data: SearchResponse): string => {
  if (data.placeType === PLACE_TYPE.AIRPORT && data.iata) {
    return `${data.name} (${data.iata})`;
  }
  return data.name;
};

// Convert Search response data into a "nice" location string
export const buildLocation = (data: SearchResponse): string => {
  if (data.placeType === PLACE_TYPE.AIRPORT) {
    if (data.city) {
      return `${data.city}, ${data.country}`;
    }
    return data.country;
  }
  return `${data.region}, ${data.country}`;
};

// Convert placeType to a human redable string
export const getLabel = (type: PLACE_TYPE): string => {
  switch (type) {
    case PLACE_TYPE.AIRPORT:
      return 'Airport';
    case PLACE_TYPE.STATION:
      return 'Station';
    case PLACE_TYPE.DISTRICT:
      return 'District';
    case PLACE_TYPE.CITY:
      return 'City';
    default:
      return 'Unknown';
  }
};
