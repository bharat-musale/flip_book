import { Country, State } from "country-state-city";

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

// Helper function to get full country name from code
export const getCountryName = (countryCode) => {
  const country = Country.getAllCountries().find(
    (c) => c.isoCode === countryCode
  );
  return country ? country.name : countryCode; // fallback to code if not found
};

export const getStateName = (countryCode, stateCode) => {
  const state = State.getStatesOfCountry(countryCode).find(
    (s) => s.isoCode === stateCode
  );
  return state ? state.name : stateCode; // fallback to code
};

