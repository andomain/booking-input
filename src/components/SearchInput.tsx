import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

import { SearchResponse, API_RESPONSE } from '../types';
import SearchResult from './SearchResult';

interface SearchInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onSelect: (data: SearchResponse | null) => void;
}

const API_BASE = 'https://www.rentalcars.com';
const MIN_SEARCH_LENGTH = 2;
const API_RESULT_LIMIT = 6;

export const fetchResults = async (
  searchTerm: string,
  limit: number,
): Promise<AxiosResponse<API_RESPONSE>> =>
  axios.get(
    `${API_BASE}/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${limit}&solrTerm=${searchTerm}`,
  );

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
    setError('');
    if (typedValue.length >= MIN_SEARCH_LENGTH) {
      getResults(typedValue);
    } else {
      setResults(null);
    }
  }, [typedValue]);

  const getResults = async (
    searchTerm: string,
    limit = API_RESULT_LIMIT,
  ): Promise<void> => {
    const { data, status } = await fetchResults(searchTerm, limit);

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

  const focusInput = () => setDisplaySelected(false);

  const selectHandler = (displayName: string, data: SearchResponse): void => {
    setDisplaySelected(true);
    setSelectedValue(displayName);
    onSelect(data);
  };

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
      <div className="SearchInput__Results">
        <ul>
          {results !== null &&
            results.length > 0 &&
            results.map(result => (
              <SearchResult
                key={result.placeKey}
                data={result}
                onSelect={selectHandler}
              />
            ))}
          {results !== null && results.length === 0 && (
            <li className="SearchResult SearchResult--none" onClick={reset}>
              No results found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchInput;
