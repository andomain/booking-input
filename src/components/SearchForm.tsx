import React, { useState, FormEvent } from 'react'

import SearchInput from './SearchInput';

const LABEL_TEXT = 'Pick-up location';
const PLACEHOLDER = 'city, airport, station, region and district...';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = (val: string): void => setSearchTerm(val);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log(`Search for ${searchTerm}`);
  }

  return (
    <form className="SearchForm" autoComplete="off" noValidate onSubmit={onSubmit}>
      <SearchInput
        id="pickup"
        name="pickup"
        label={LABEL_TEXT}
        onChange={onChange}
        placeholder={PLACEHOLDER}
        value={searchTerm} />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchForm;
