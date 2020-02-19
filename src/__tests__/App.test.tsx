import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import App from '../components/App';
import Form from '../components/SearchForm';

describe('<App />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => (wrapper = shallow(<App />)));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('renders a containing <div> element', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders a <Form /> element', () => {
    expect(wrapper.containsMatchingElement(<Form />)).toEqual(true);
  });
});
