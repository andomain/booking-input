import React, { useState } from 'react'

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = () => console.log('Run change handler here')

  const onSubmit = () => console.log('Submit search here');

  return (
    <form className="SearchForm" autoComplete="off" noValidate>

    </form>
  )
}

export default SearchForm;
