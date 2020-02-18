import React from 'react';
import { mount } from 'enzyme';
import SearchResult from '../components/SearchResult';

// Example city item
const CITY_DATA = {
  country: 'United Kingdom',
  placeType: 'C',
  name: 'Leeds',
  region: 'West Yorkshire',
};

// Example airport data
const AIRPORT_DATA = {
  country: 'United Kingdom',
  city: 'London',
  placeType: 'A',
  iata: 'LGW',
  name: 'Gatwick Airport',
  region: 'Greater London',
};

const DISTRICT_DATA = {
  country: 'United Kingdom',
  placeType: 'D',
  name: 'Leeds City Centre',
  region: 'West Yorkshire',
};

const STATION_DATA = {
  country: 'United Kingdom',
  city: 'Manchester',
  placeType: 'T',
  name: 'Manchester - Piccadilly Train Station',
  region: 'England',
};

describe('<SearchResult />', () => {
  let wrapper;

  const mockSelect = jest.fn();

  beforeEach(() => {
    wrapper = mount(<SearchResult data={CITY_DATA} onSelect={mockSelect} />);
  });

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <li />', () => {
    expect(wrapper.find('li').length).toBe(1);
  });

  it('should fire an onSelect handler when clicked', () => {
    wrapper.simulate('click');
    expect(mockSelect).toBeCalledTimes(1);
    expect(mockSelect).toBeCalledWith(CITY_DATA);
  });

  describe('Result name', () => {
    it('should display the name of the search result', () => {
      const name = wrapper.find('p.SearchResult__Name');
      expect(name.length).toEqual(1);
      expect(name.text()).toEqual(CITY_DATA.name);
    });

    it('should display the airport IATA code', () => {
      const airportWrapper = mount(<SearchResult data={AIRPORT_DATA} />);
      const name = airportWrapper.find('p.SearchResult__Name');
      expect(name.text()).toEqual(
        `${AIRPORT_DATA.name} (${AIRPORT_DATA.iata})`,
      );
    });
  });

  describe('Result types', () => {
    it('should display result type', () => {
      const type = wrapper.find('span.SearchResult__Type');
      expect(type.length).toEqual(1);
    });

    it('should display city responses', () => {
      const type = wrapper.find('span.SearchResult__Type');
      expect(type.text()).toEqual('City');
    });

    it('should display airport responses', () => {
      const airportWrapper = mount(<SearchResult data={AIRPORT_DATA} />);
      expect(airportWrapper.find('span.SearchResult__Type').text()).toEqual(
        'Airport',
      );
    });

    it('should display district responses', () => {
      const districtWrapper = mount(<SearchResult data={DISTRICT_DATA} />);
      expect(districtWrapper.find('span.SearchResult__Type').text()).toEqual(
        'District',
      );
    });

    it('should display station responses', () => {
      const stationWrapper = mount(<SearchResult data={STATION_DATA} />);
      expect(stationWrapper.find('span.SearchResult__Type').text()).toEqual(
        'Station',
      );
    });

    it('should style based on response type', () => {
      const airportWrapper = mount(<SearchResult data={AIRPORT_DATA} />);
      const districtWrapper = mount(<SearchResult data={DISTRICT_DATA} />);
      const stationWrapper = mount(<SearchResult data={STATION_DATA} />);

      expect(
        wrapper.find('span.SearchResult__Type').props().className,
      ).toContain('SearchResult__Type--city');
      expect(
        airportWrapper.find('span.SearchResult__Type').props().className,
      ).toContain('SearchResult__Type--airport');
      expect(
        stationWrapper.find('span.SearchResult__Type').props().className,
      ).toContain('SearchResult__Type--station');
      expect(
        districtWrapper.find('span.SearchResult__Type').props().className,
      ).toContain('SearchResult__Type--district');
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
      const airportWrapper = mount(<SearchResult data={AIRPORT_DATA} />);
      const location = airportWrapper.find('p.SearchResult__Sub');

      expect(location.text()).toEqual(
        `${AIRPORT_DATA.city}, ${AIRPORT_DATA.country}`,
      );
    });

    it('should only display airport country if no city present', () => {
      const TEST_DATA = { ...AIRPORT_DATA, city: undefined };
      const airportWrapper = mount(<SearchResult data={TEST_DATA} />);
      const location = airportWrapper.find('p.SearchResult__Sub');

      expect(location.text()).toEqual(AIRPORT_DATA.country);
    });
  });
});
