import React, { FC } from 'react';

import SearchType from './SearchType';

import { buildName, buildLocation } from '../../helpers';
import { SearchResponse } from '../../types';

interface SearchResultProps {
  data: SearchResponse;
  onSelect: (name: string, data: SearchResponse) => void;
}

/**
 * <SearchResult />
 * Output Search response data in a nicer format
 */
const SearchResult: FC<SearchResultProps> = ({ data, onSelect }) => {
  const name = buildName(data);
  const location = buildLocation(data);

  return (
    <li className="SearchResult" onClick={() => onSelect(name, data)}>
      <SearchType className="SearchResult__Type" type={data.placeType} />
      <div>
        <p className="SearchResult__Name">{name}</p>
        <p className="SearchResult__Sub">{location}</p>
      </div>
    </li>
  );
};

export default SearchResult;
