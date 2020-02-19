import React, { FC } from 'react';

import SearchType from './SearchType';

import { SearchResponse, PLACE_TYPE } from '../../types';

interface SearchResultProps {
  data: SearchResponse;
  onSelect: (name: string, data: SearchResponse) => void;
}

const buildName = (data: SearchResponse): string => {
  if (data.placeType === PLACE_TYPE.AIRPORT && data.iata) {
    return `${data.name} (${data.iata})`;
  }
  return data.name;
};

const buildLocation = (data: SearchResponse): string => {
  if (data.placeType === PLACE_TYPE.AIRPORT) {
    if (data.city) {
      return `${data.city}, ${data.country}`;
    }
    return data.country;
  }
  return `${data.region}, ${data.country}`;
};

const SearchResult: FC<SearchResultProps> = ({ data, onSelect }) => {
  const clickHandler = (displayName: string) => onSelect(name, data);

  const name = buildName(data);
  const location = buildLocation(data);

  return (
    <li className="SearchResult" onClick={() => clickHandler(name)}>
      <SearchType className="SearchResult__Type" type={data.placeType} />
      <div>
        <p className="SearchResult__Name">{name}</p>
        <p className="SearchResult__Sub">{location}</p>
      </div>
    </li>
  );
};

export default SearchResult;
