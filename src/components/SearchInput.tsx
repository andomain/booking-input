import React, { FC } from 'react'

interface SearchInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string
  onChange: () => void;
}

const SearchInput: FC<SearchInputProps> = ({ id, name, label, onChange, placeholder }) => {
  return (
    <div className="SearchInput">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} onChange={onChange} type="text" placeholder={placeholder} />
    </div>
  )
}

export default SearchInput
