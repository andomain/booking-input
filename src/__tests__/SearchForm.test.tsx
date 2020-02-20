import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SearchForm from '../components/SearchForm';

describe('<SearchForm />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => (wrapper = mount(<SearchForm />)));

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a containing <form />', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should contain a <SearchInput />', () => {
    expect(wrapper.find('.SearchInput').length).toEqual(1);
  });

  it('should contain a submit button', () => {
    const button = wrapper.find('button');

    expect(button.length).toEqual(1);
    expect(button.props().type).toEqual('submit');
  });
});
