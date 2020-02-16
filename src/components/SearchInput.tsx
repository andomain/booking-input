import React, { FC, ChangeEvent } from 'react'

interface SearchInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ id, name, label, onChange, placeholder, value }) => {

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { target: { value } } = e;
    onChange(value);
  }

  return (
    <div className="SearchInput">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} onChange={changeHandler} type="text" placeholder={placeholder} value={value} />
    </div>
  )
}

export default SearchInput
