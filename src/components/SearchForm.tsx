import React, { useState } from 'react'

import SearchInput from './SearchInput';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = () => console.log('Run change handler here')

  const onSubmit = () => console.log('Submit search here');

  return (
    <form className="SearchForm" autoComplete="off" noValidate onSubmit={onSubmit}>
      <SearchInput id="pickup" name="pickup" label="Pick-up location" onChange={onChange} placeholder="city, airport, station, region and district..."/>
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchForm;
