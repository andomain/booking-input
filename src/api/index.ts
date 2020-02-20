import axios, { AxiosResponse } from 'axios';
import { API_RESPONSE } from '../types';

const API_BASE = 'https://www.rentalcars.com';

export const getResults = async (
  searchTerm: string,
  limit: number,
): Promise<AxiosResponse<API_RESPONSE>> =>
  axios.get(
    `${API_BASE}/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${limit}&solrTerm=${searchTerm}`,
  );
