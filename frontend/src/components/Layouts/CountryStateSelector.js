import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { TextField, MenuItem, Box } from "@mui/material";

const CountryStateSelector = ({
  onSelectionChange,
  data = { country: "", state: "" },
  openViewModal = false,
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(data.country);
  const [selectedState, setSelectedState] = useState(data.state);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const statesOfCountry = State.getStatesOfCountry(selectedCountry);
      setStates(statesOfCountry);
      setSelectedState(""); // Reset state on country change
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    onSelectionChange?.({ countryCode, stateCode: "" });
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    onSelectionChange?.({ countryCode: selectedCountry, stateCode });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        select
        label="Select Country"
        value={selectedCountry || data?.country}
        onChange={handleCountryChange}
        disabled={openViewModal}
      >
        {countries.map((country) => (
          <MenuItem key={country.isoCode} value={country.isoCode}>
            {country.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Select State"
        value={selectedState || data?.state}
        onChange={handleStateChange}
        disabled={openViewModal}
      >
        {states.map((state) => (
          <MenuItem key={state.isoCode} value={state.isoCode}>
            {state.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default CountryStateSelector;
