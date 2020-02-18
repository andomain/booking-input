import React, { FC } from 'react';
import classnames from 'classnames';

import { PLACE_TYPE } from '../../types';

interface SearchTypeProps {
  type: PLACE_TYPE;
}

const getLabel = (type: PLACE_TYPE): string => {
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

const SearchType: FC<SearchTypeProps> = ({ type }) => {
  const classes = classnames('SearchResult__Type', {
    'SearchResult__Type--city': type === PLACE_TYPE.CITY,
    'SearchResult__Type--airport': type === PLACE_TYPE.AIRPORT,
    'SearchResult__Type--district': type === PLACE_TYPE.DISTRICT,
    'SearchResult__Type--station': type === PLACE_TYPE.STATION,
  });

  return <span className={classes}>{getLabel(type)}</span>;
};

export default SearchType;
