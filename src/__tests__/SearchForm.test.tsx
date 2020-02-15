import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SearchForm from '../components/SearchForm';
import SearchInput from '../components/SearchInput';

describe("<Form />", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => wrapper = shallow(<SearchForm />));

  it('should render a containing <form />', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  
  it('should contain a <SearchInput />', () => {
    expect(wrapper.containsMatchingElement(<SearchInput />)).toEqual(true);
  });
  
  it('should contain a submit button', () => {
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').type()).toEqual('submit');
  })
})
