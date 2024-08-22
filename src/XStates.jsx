import React, { useState, useEffect } from "react";

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries on component mount
  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch("https://crio-location-selector.onrender.com/countries");
      const data = await response.json();
      setCountries(data);
    }
    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    async function fetchStates() {
      if (selectedCountry) {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        const data = await response.json();
        setStates(data);
        setCities([]); // Clear cities when a new country is selected
        setSelectedCity(""); // Reset city selection
      }
    }
    fetchStates();
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    async function fetchCities() {
      if (selectedState) {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        const data = await response.json();
        setCities(data);
      }
    }
    fetchCities();
  }, [selectedState]);

  return (
    <div>
        <h1 style={{ display :'flex',justifyContent:"center", alignItems:"center", fontSize:"50px"}}>Select Location</h1>
      <form style={{ display :'flex',justifyContent:"center", alignItems:"center"}}>
        {/* Country Dropdown */}
        <select style={{padding:"20px",fontSize:'30px',margin:'5px'}}
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* State Dropdown */}
        <select style={{padding:"20px",fontSize:'30px',margin:'3px'}}
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select style={{padding:"20px",fontSize:'30px',margin:'3px'}}
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </form>

      {/* Display Selected Location */}
      {selectedCity && selectedState && selectedCountry && (
        <h3 style={{ display :'flex',justifyContent:"center", alignItems:"center",fontSize:"40px"}}
        >You Selected {selectedCity}, {selectedState}, {selectedCountry} </h3>
      )}
    </div>
  );
}

export default LocationSelector;
