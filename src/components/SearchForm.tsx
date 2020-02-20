import React, { useState, FormEvent } from 'react';

import SearchInput from './SearchInput';
import { SearchResponse } from '../types';

const LABEL_TEXT = 'Pick-up Location';
const PLACEHOLDER = 'city, airport, station, region and district...';

const SearchForm = () => {
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (searchData) {
      console.log(`Search for ${searchData.name}`);
    }
  };

  const onSelect = (data: SearchResponse | null): void => {
    setSearchData(data);
  };

  return (
    <form
      className="SearchForm"
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
    >
      <h1 className="SearchForm__Title">Let's find your ideal car</h1>
      <SearchInput
        id="pickup"
        name="pickup"
        label={LABEL_TEXT}
        placeholder={PLACEHOLDER}
        onSelect={onSelect}
      />
      <button type="submit" className="SearchForm__Submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
