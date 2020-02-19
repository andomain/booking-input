import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SearchResult from '../components/SearchResult';
import { PLACE_TYPE, SearchResponse } from '../types';

// Example city item
const CITY_DATA: SearchResponse = {
  country: 'United Kingdom',
  placeKey: 'abc',
  placeType: PLACE_TYPE.CITY,
  name: 'Leeds',
  region: 'West Yorkshire',
};

// Example airport data
const AIRPORT_DATA: SearchResponse = {
  country: 'United Kingdom',
  city: 'London',
  placeType: PLACE_TYPE.AIRPORT,
  placeKey: 'abc',
  iata: 'LGW',
  name: 'Gatwick Airport',
  region: 'Greater London',
};

const DISTRICT_DATA: SearchResponse = {
  country: 'United Kingdom',
  placeType: PLACE_TYPE.DISTRICT,
  placeKey: 'abc',
  name: 'Leeds City Centre',
  region: 'West Yorkshire',
};

const STATION_DATA: SearchResponse = {
  country: 'United Kingdom',
  city: 'Manchester',
  placeType: PLACE_TYPE.STATION,
  placeKey: 'abc',
  name: 'Manchester - Piccadilly Train Station',
  region: 'England',
};

describe('<SearchResult />', () => {
  let wrapper: ReactWrapper;

  const mockSelect = jest.fn();

  beforeEach(() => {
    wrapper = mount(<SearchResult onSelect={mockSelect} data={CITY_DATA} />);
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <li />', () => {
    expect(wrapper.find('li').length).toBe(1);
  });

  it('should fire an onSelect handler when clicked', () => {
    wrapper.simulate('click');
    expect(mockSelect).toBeCalledTimes(1);
    expect(mockSelect).toBeCalledWith(CITY_DATA.name, CITY_DATA);
  });

  describe('Result name', () => {
    it('should display the name of the search result', () => {
      const name = wrapper.find('p.SearchResult__Name');
      expect(name.length).toEqual(1);
      expect(name.text()).toEqual(CITY_DATA.name);
    });

    it('should display the airport IATA code', () => {
      const airportWrapper = mount(
        <SearchResult onSelect={mockSelect} data={AIRPORT_DATA} />,
      );
      const name = airportWrapper.find('p.SearchResult__Name');
      expect(name.text()).toEqual(
        `${AIRPORT_DATA.name} (${AIRPORT_DATA.iata})`,
      );
    });
  });

  describe('Result types', () => {
    it('should display result type', () => {
      const type = wrapper.find('.SearchType__Pill');
      expect(type.length).toEqual(1);
    });

    it('should display city responses', () => {
      const type = wrapper.find('.SearchType__Pill');
      expect(type.text()).toEqual('City');
    });

    it('should display airport responses', () => {
      const airportWrapper = mount(
        <SearchResult onSelect={mockSelect} data={AIRPORT_DATA} />,
      );
      expect(airportWrapper.find('.SearchType__Pill').text()).toEqual(
        'Airport',
      );
    });

    it('should display district responses', () => {
      const districtWrapper = mount(
        <SearchResult onSelect={mockSelect} data={DISTRICT_DATA} />,
      );
      expect(districtWrapper.find('.SearchType__Pill').text()).toEqual(
        'District',
      );
    });

    it('should display station responses', () => {
      const stationWrapper = mount(
        <SearchResult onSelect={mockSelect} data={STATION_DATA} />,
      );
      expect(stationWrapper.find('.SearchType__Pill').text()).toEqual(
        'Station',
      );
    });

    it('should style based on response type', () => {
      const airportWrapper = mount(
        <SearchResult onSelect={mockSelect} data={AIRPORT_DATA} />,
      );
      const districtWrapper = mount(
        <SearchResult onSelect={mockSelect} data={DISTRICT_DATA} />,
      );
      const stationWrapper = mount(
        <SearchResult onSelect={mockSelect} data={STATION_DATA} />,
      );

      expect(wrapper.find('.SearchType__Pill').props().className).toContain(
        'SearchType__Pill--city',
      );
      expect(
        airportWrapper.find('.SearchType__Pill').props().className,
      ).toContain('SearchType__Pill--airport');
      expect(
        stationWrapper.find('.SearchType__Pill').props().className,
      ).toContain('SearchType__Pill--station');
      expect(
        districtWrapper.find('.SearchType__Pill').props().className,
      ).toContain('SearchType__Pill--district');
    });
  });

  describe('Location', () => {
    it('should display the region & country combined by default', () => {
      const location = wrapper.find('p.SearchResult__Sub');
      expect(location.length).toEqual(1);
      expect(location.text()).toEqual(
        `${CITY_DATA.region}, ${CITY_DATA.country}`,
      );
    });

    it('should display airport cities if present', () => {
      const airportWrapper = mount(
        <SearchResult onSelect={mockSelect} data={AIRPORT_DATA} />,
      );
      const location = airportWrapper.find('p.SearchResult__Sub');

      expect(location.text()).toEqual(
        `${AIRPORT_DATA.city}, ${AIRPORT_DATA.country}`,
      );
    });

    it('should only display airport country if no city present', () => {
      const TEST_DATA: SearchResponse = { ...AIRPORT_DATA, city: undefined };
      const airportWrapper = mount(
        <SearchResult onSelect={mockSelect} data={TEST_DATA} />,
      );
      const location = airportWrapper.find('p.SearchResult__Sub');

      expect(location.text()).toEqual(AIRPORT_DATA.country);
    });
  });
});
