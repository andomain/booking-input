import React from 'react';
import { shallow } from 'enzyme';

import App from '../components/App';

describe('<App />', () => {
  it('Renders a basic application', () => {
    const app = shallow(<App />);
    expect(app.getElements()).toMatchSnapshot();
  })
})
