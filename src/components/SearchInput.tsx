import React, { FC, ChangeEvent, useState, useEffect } from 'react';

import SearchResults from './SearchResults';

import { getResults } from '../api';
import { SearchResponse } from '../types';

interface SearchInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onSelect: (data: SearchResponse | null) => void;
}

const MIN_SEARCH_LENGTH = 2;
const API_RESULT_LIMIT = 6;

/**
 * <SearchInput />
 * Houses the search input & outputs the results
 * Displays the full formatted name of a result when clicked
 */

const SearchInput: FC<SearchInputProps> = ({
  id,
  name,
  label,
  placeholder,
  onSelect,
}) => {
  const [typedValue, setTypedValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [displaySelected, setDisplaySelected] = useState(false);
  const [results, setResults] = useState<null | SearchResponse[]>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Clear any error
    setError('');

    // If typed value is long enough, run the search
    if (typedValue.length >= MIN_SEARCH_LENGTH) {
      runSearch(typedValue);
    } else {
      setResults(null);
    }
  }, [typedValue]);

  // Call the api method and update state based on results
  const runSearch = async (
    searchTerm: string,
    limit = API_RESULT_LIMIT,
  ): Promise<void> => {
    const { data, status } = await getResults(searchTerm, limit);

    if (status === 200) {
      if (data.results.numFound > 0) {
        setResults(data.results.docs);
      } else {
        setResults([]);
      }
    } else {
      setError('Something went wrong');
    }
  };

  const typeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;
    setTypedValue(value);
  };

  // Allow the user to type again when input is focused
  const focusInput = () => setDisplaySelected(false);

  // If a result is selected, show the full name
  const selectHandler = (displayName: string, data: SearchResponse): void => {
    setDisplaySelected(true);
    setSelectedValue(displayName);
    onSelect(data);
  };

  // Clear the 'full name' and reset to standard form behaviour
  const reset = (): void => {
    setDisplaySelected(false);
    setSelectedValue('');
    onSelect(null);
  };

  return (
    <div className="SearchInput">
      <label className="SearchInput__Label" htmlFor={id}>
        {label}
      </label>
      <input
        className="SearchInput__Input"
        id={id}
        name={name}
        onClick={focusInput}
        onChange={typeHandler}
        type="text"
        placeholder={placeholder}
        value={displaySelected ? selectedValue : typedValue}
      />
      {error && <div className="SearchInput__Error">{error}</div>}
      <SearchResults results={results} onSelect={selectHandler} reset={reset} />
    </div>
  );
};

export default SearchInput;
