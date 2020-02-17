import React, { useState, FormEvent } from 'react';

import SearchInput from './SearchInput';

const LABEL_TEXT = 'Pick-up Location';
const PLACEHOLDER = 'city, airport, station, region and district...';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = (val: string): void => setSearchTerm(val);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log(`Search for ${searchTerm}`);
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
        onChange={onChange}
        placeholder={PLACEHOLDER}
        value={searchTerm}
      />
      <button type="submit" className="SearchForm__Submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
