import { useState, useEffect } from "react";

function XStares() {
  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch all countries
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://crio-location-selector.onrender.com/countries");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setErrorMessage("Failed to load countries.");
      }
    }
    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    async function fetchStates() {
      if (countryName) {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setStates(data);
        } catch (error) {
          console.error("Failed to fetch states:", error);
          setErrorMessage("Failed to load states.");
        }
      }
    }
    fetchStates();
  }, [countryName]);

  // Fetch cities when a state is selected
  useEffect(() => {
    async function fetchCities() {
      if (countryName && stateName) {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          setErrorMessage("Failed to load cities.");
        }
      }
    }
    fetchCities();
  }, [countryName, stateName]);

  function handleCountryChange(e) {
    setCountryName(e.target.value);
    setStateName(''); // Reset state and city when country changes
    setCityName('');
    setStates([]);
    setCities([]);
    setErrorMessage('');
  }

  function handleStateChange(e) {
    setStateName(e.target.value);
    setCityName(''); // Reset city when state changes
    setCities([]);
    setErrorMessage('');
  }

  function handleCityChange(e) {
    setCityName(e.target.value);
  }

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form>
        <select onChange={handleCountryChange} value={countryName}>
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <br />

        <select onChange={handleStateChange} value={stateName} disabled={!countryName}>
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        <br />

        <select onChange={handleCityChange} value={cityName} disabled={!stateName}>
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </form>

      <br />

      {cityName && stateName && countryName && (
        <h3>You selected {cityName}, {stateName}, {countryName}</h3>
      )}
    </div>
  );
}

export default XStares;
