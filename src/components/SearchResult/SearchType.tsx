import React, { FC } from 'react';
import classnames from 'classnames';

import { getLabel } from '../../helpers';
import { PLACE_TYPE } from '../../types';

interface SearchTypeProps {
  type: PLACE_TYPE;
  className?: string;
}

/**
 * <SearchType />
 * Display component for location type
 */
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
