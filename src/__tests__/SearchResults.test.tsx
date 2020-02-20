import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SearchResults from '../components/SearchResults';

describe('<SearchResults />', () => {
  let wrapper: ReactWrapper;

  const mockSelect = jest.fn();
  const mockReset = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <SearchResults onSelect={mockSelect} reset={mockReset} results={[]} />,
    );
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());
});
