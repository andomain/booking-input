import React from 'react';
import { HTMLAttributes, mount, ReactWrapper } from 'enzyme';

import SearchInput from '../components/SearchInput';

const TEST = {
  ID: 'test-id',
  NAME: 'test-name',
  LABEL: 'test-label',
  PLACEHOLD: 'test-placehold',
};

describe('<SearchInput />', () => {
  let wrapper: ReactWrapper;
  let input: ReactWrapper<HTMLAttributes>;
  let label: ReactWrapper<HTMLAttributes>;

  const mockSelect = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <SearchInput
        id={TEST.ID}
        name={TEST.NAME}
        label={TEST.LABEL}
        placeholder={TEST.PLACEHOLD}
        onSelect={mockSelect}
      />,
    );
    input = wrapper.find('input');
    label = wrapper.find('label');
  });

  afterEach(() => jest.clearAllMocks());

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('contains a text <input />', () => {
    expect(input.length).toEqual(1);
    expect(input.props().type).toEqual('text');
  });

  it('should display a label', () => {
    expect(label.text()).toEqual(TEST.LABEL);
  });

  it('should display a placeholder', () => {
    expect(input.props().placeholder).toEqual(TEST.PLACEHOLD);
  });

  describe('Accessibility', () => {
    it('should have an id & corresponding label for screenreaders', () => {
      expect(input.props().id).toEqual(TEST.ID);
      expect(label.props().htmlFor).toEqual(TEST.ID);
    });
  });

  // TODO: Get these tests to pass.
  // Ran out of time
  describe('Search functionality', () => {
    describe('Typing', () => {
      it('should not display any results when one alphanumeric character is typed', async () => {
        const getResults = jest.fn();

        input.simulate('change', {
          preventDefault() {},
          target: { value: 'M' },
        });

        expect(getResults).not.toHaveBeenCalled();
      });

      it('should search/display results when 2+ alphanumeric characters typed', async () => {
        const getResults = jest.fn();

        input.simulate('change', {
          preventDefault() {},
          target: { value: 'Man' },
        });

        expect(getResults).toHaveBeenCalled();
      });
    });

    it('should remove the search results when characters are deleted leaving <2', async () => {
      const getResults = jest.fn();

      input.simulate('change', {
        preventDefault() {},
        target: { value: 'Man' },
      });

      expect(getResults).toHaveBeenCalledTimes(1);
      input.simulate('change', {
        preventDefault() {},
        target: { value: 'M' },
      });
      expect(getResults).toHaveBeenCalledTimes(1);
    });
  });
});
