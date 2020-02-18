import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from '../components/SearchInput';

const TEST = {
  ID: 'test-id',
  NAME: 'test-name',
  LABEL: 'test-label',
  PLACEHOLD: 'test-placehold',
  VALUE: 'test-value',
};

describe('<SearchInput />', () => {
  let wrapper;
  let input;
  let label;

  const changeHandlerMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <SearchInput
        id={TEST.ID}
        name={TEST.NAME}
        label={TEST.LABEL}
        onChange={changeHandlerMock}
        placeholder={TEST.PLACEHOLD}
        value={TEST.VALUE}
      />,
    );
    input = wrapper.find('input');
    label = wrapper.find('label');
  });

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

  it('should display the value prop', () => {
    expect(input.props().value).toEqual(TEST.VALUE);
  });

  // TODO: Test focus state
  // This is not essential as the required behaviour is browser default
  // it('should focus on the input element when clicked', async () => {
  //   expect(document.activeElement).toEqual(input);
  // });

  it('should fire onChange prop when value changes', () => {
    const event = {
      preventDefault() {},
      target: {
        value: 'testValue',
      },
    };

    input.simulate('change', event);
    expect(changeHandlerMock).toHaveBeenCalledWith('testValue');
  });

  describe('Search functionality', () => {
    it('should fire onSelect handler when a search result is selected', () => {
      return 0;
    });

    it('should set the input value to "name, region, country" when a search result is selected', () => {
      return 0;
    });

    it('should revert to the typed search term when the input is clicked into again', () => {
      return 0;
    });

    it('should not display search results when one alphanumeric character is typed', () => {
      return 0;
    });

    it('should display search results when 2+ alphanumeric characters typed', () => {
      return 0;
    });

    it('should display a loader while waiting for search results', () => {
      return 0;
    });

    it('should show a maximum of 6 search results', () => {
      return 0;
    });

    it('should return a message when no results found', () => {
      return 0;
    });

    it('should remove the search results when characters are deleted leaving <2', () => {
      return 0;
    });

    it('should render a <SearchResult /> element for each result', () => {
      return 0;
    });
  });

  describe('Accessibility', () => {
    it('should have an id & corresponding label for screenreaders', () => {
      expect(input.props().id).toEqual(TEST.ID);
      expect(label.props().htmlFor).toEqual(TEST.ID);
    });

    it('should make search results navigable by keyboard', () => {
      return 0;
    });

    it('should fire onSelect handler when user presses enter while hovering over a search result', () => {
      return 0;
    });
  });
});
