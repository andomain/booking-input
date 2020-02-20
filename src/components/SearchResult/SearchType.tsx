import React, { FC } from 'react';
import classnames from 'classnames';

import { PLACE_TYPE } from '../../types';

interface SearchTypeProps {
  type: PLACE_TYPE;
  className?: string;
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

const SearchType: FC<SearchTypeProps> = ({ className = '', type }) => {
  const classes = classnames('SearchType__Pill', {
    'SearchType__Pill--city': type === PLACE_TYPE.CITY,
    'SearchType__Pill--airport': type === PLACE_TYPE.AIRPORT,
    'SearchType__Pill--district': type === PLACE_TYPE.DISTRICT,
    'SearchType__Pill--station': type === PLACE_TYPE.STATION,
  });

  return (
    <div className={`SearchType ${className}`}>
      <span className={classes}>{getLabel(type)}</span>
    </div>
  );
};

export default SearchType;
