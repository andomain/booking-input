import React from 'react';
import { mount } from 'enzyme';
import SearchInput from '../components/SearchInput';

const TEST = {
  ID: 'test-id',
  NAME: 'test-name',
  LABEL: 'test-label',
  PLACEHOLD: 'test-placehold',
};

describe('<SearchInput />', () => {
  let wrapper;
  let input;
  let label;

  const mockSelect = jest.fn();
  const mockType = value => {
    const event = {
      preventDefault() {},
      target: { value },
    };
    wrapper.find('input').simulate('change', event);
  };
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

  // TODO: Test focus state
  // This is not essential as the required behaviour is browser default
  // it('should focus on the input element when clicked', async () => {
  //   expect(document.activeElement).toEqual(input);
  // });

  describe('Search functionality', () => {
    // beforeEach(() => {});
    describe('Selection', () => {
      it('should fire onSelect handler when a search result is selected', async () => {
        mockType('test-input');

        const input = wrapper.find('li').first();
        input.simulate('click');
        expect(mockSelect).toHaveBeenCalledTimes(1);
      });

      // TODO: Nide to have functionality
      // Ran out of time to implement these
      // it('should set the input value to "name, region, country" when a search result is selected', () => {
      //   return Promise.reject();
      // });

      // it('should revert to the typed search term when the input is clicked into again', () => {
      //   return Promise.reject();
      // });
    });

    describe('Typing', () => {
      it('should not search/display results when one alphanumeric character is typed', () => {
        mockType('a');

        const inputs = wrapper.find('.SearchResult');
        expect(inputs.length).toEqual(0);
      });

      it('should search/display results when 2+ alphanumeric characters typed', () => {
        mockType('ab');

        const inputs = wrapper.find('.SearchResult');
        expect(inputs.length).toBeGreaterThan(0);
      });

      it('should display a loader while waiting for search results', () => {
        mockType('ab');
        const loader = wrapper.find('.Loader');
        expect(loader.length).toBe(1);
      });

      it('should remove the search results when characters are deleted leaving <2', () => {
        mockType('ab');
        const inputs = wrapper.find('.SearchResult');
        expect(inputs.length).toBe(6);
        mockType('a');
        const newInputs = wrapper.find('.SearchResult');
        expect(newInputs.length).toBe(0);
      });
    });

    // TODO: Mock multiple return lengths to test actual behaviour
    describe('Results', () => {
      it('should show a maximum of 6 search results', () => {
        mockType('ab');

        const inputs = wrapper.find('.SearchResult');
        expect(inputs.length).toBe(6);
      });

      it('should show all results when <6 are available', () => {
        mockType('ab');

        const inputs = wrapper.find('.SearchResult');
        expect(inputs.length).toBe(3);
      });

      it('should return a message when no results found', () => {
        const error = wrapper.find('.SearchResult--none');
        expect(error.length).toEqual(0);
        mockType('abc');
        expect(error.length).toEqual(1);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have an id & corresponding label for screenreaders', () => {
      expect(input.props().id).toEqual(TEST.ID);
      expect(label.props().htmlFor).toEqual(TEST.ID);
    });

    // TODO: Accessibility tests
    // Removed as nice to have but limited time
    // it('should make search results navigable by keyboard', () => {
    //   return Promise.reject();
    // });

    // it('should fire onSelect handler when user presses enter while hovering over a search result', () => {
    //   return Promise.reject();
    // });
  });
});
