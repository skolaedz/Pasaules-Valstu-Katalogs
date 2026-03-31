import axios from "axios";
import { Country } from "./types";

const BASE_URL = "https://restcountries.com/v3.1";
const FIELDS = "name,cca3,flags,region,population,capital,subregion,languages";

export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(`${BASE_URL}/all?fields=${FIELDS}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;
  }
};

export const getCountryByCode = async (code: string): Promise<Country> => {
  try {
    const response = await axios.get<any>(`${BASE_URL}/alpha/${code}?fields=${FIELDS}`);
    if (Array.isArray(response.data)) {
      return response.data[0];
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching country ${code}:`, error);
    throw error;
  }
};
