import React, { FC } from 'react';
import { SearchResponse } from '../types';

import SearchResult from './SearchResult';

interface SearchResultsProps {
  results: SearchResponse[] | null;
  onSelect: (name: string, data: SearchResponse) => void;
  reset: () => void;
}

/**
 * <Search Results />
 * Wrapper component for <searchResult /> components
 */
const SearchResults: FC<SearchResultsProps> = ({
  results,
  onSelect,
  reset,
}) => {
  return (
    <div className="SearchResults">
      <ul>
        {results !== null &&
          results.length > 0 &&
          results.map(result => (
            <SearchResult
              key={result.placeKey}
              data={result}
              onSelect={onSelect}
            />
          ))}
        {results !== null && results.length === 0 && (
          <li className="SearchResult SearchResult--none" onClick={reset}>
            No results found
          </li>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
