import React, { useState, useEffect } from 'react';

function MarsWeatherPage() {
  const [weatherData, setWeatherData] = useState({});
  const [sol, setSol] = useState('');
  const [selectedSolData, setSelectedSolData] = useState({});
  
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
         'https://api.nasa.gov/insight_weather/?api_key=TdOmsTeVVGz8eSY6l8Zew3qnkmJ7g18n99VS4h6I&feedtype=json&ver=1.0'
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching Mars weather data:', error);
    }
  };

  const handleSearch = () => {
    const selectedSol = weatherData.sol_keys.find(key => key === sol);
    if (selectedSol) {
      setSelectedSolData(weatherData[selectedSol]);
    } else {
      setSelectedSolData({});
    }
  };

  return (
    <div>
      <div classname= "background-picture">
      <h1>Mars Weather</h1>
      <input
        type="text"
        placeholder="Enter Sol"
        value={sol}
        onChange={(e) => setSol(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
      </div>
        <h3>Available Sol Keys:</h3>
        <ul>
          {weatherData.sol_keys && weatherData.sol_keys.map(key => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </div>

      {Object.keys(selectedSolData).length > 0 ? (
        <div>
          <h2>Sol: {sol}</h2>
          <p>Date: {selectedSolData.First_UTC}</p>
          <p>High Temperature: {selectedSolData.AT.mx} °C</p>
          <p>Low Temperature: {selectedSolData.AT.mn} °C</p>
        </div>
      ) : (
        <p>No weather data available for the selected sol.</p>
      )}
    </div>
  );
}

export default MarsWeatherPage;
