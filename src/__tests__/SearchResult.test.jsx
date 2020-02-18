import React from 'react';
import { shallow } from 'enzyme';
import SearchResult from '../components/SearchResult';

describe('<SearchResult />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchResult />);
  });

  // TODO: Uncomment this once component complete
  // it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should display the type of search result', () => {
    return 0;
  });

  it('should display the name of the search result', () => {
    return 0;
  });

  it('should display the region & country combined', () => {
    return 0;
  });

  it('should fire an onSelect handler when clicked', () => {});
});
