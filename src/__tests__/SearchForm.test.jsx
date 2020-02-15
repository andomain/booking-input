import React from 'react';
import { shallow } from 'enzyme';
import SearchForm from '../components/SearchForm';
import SearchInput from '../components/SearchInput';

describe("<SearchForm />", () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<SearchForm />));

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render a containing <form />', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  
  it('should contain a <SearchInput />', () => {
    expect(wrapper.containsMatchingElement(<SearchInput />)).toEqual(true);
  });
  
  it('should contain a submit button', () => {
    const button = wrapper.find('button');

    expect(button.length).toEqual(1);
    expect(button.props().type).toEqual('submit');
  })
})
