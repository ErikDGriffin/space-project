import React, { useState } from "react";


function AsteroidPage() {
  const [closestDate, setClosestDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");  

  const [asteroidId, setAsteroidId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [specificAsteroid, setSpecificAsteroid] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        //`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=bjJJgDaHYvyXn1iEnDRELg0cwb3OMSnwNGy3bM6J`
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=bjJJgDaHYvyXn1iEnDRELg0cwb3OMSnwNGy3bM6J`
      );
      const data = await response.json();
      setSearchResults(data.near_earth_objects);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleBrowse = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=bjJJgDaHYvyXn1iEnDRELg0cwb3OMSnwNGy3bM6J`
      );
      if (!response.ok){
        throw new Error('error fetching data')
      }
      const data = await response.json();
      setSearchResults(data.near_earth_objects);
    } catch (error) {
      console.error("Error fetching asteroid data:", error);
    }
  };

  const handleLookup = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=bjJJgDaHYvyXn1iEnDRELg0cwb3OMSnwNGy3bM6J`
      );
      const data = await response.json();
      setSpecificAsteroid(data);
    } catch (error) {
      console.error("Error fetching asteroid data:", error);
    }
  };

  return (
    <div className="background-container">
      <div className="content-container">
        <div className="content-scroll-container">
      <h1>Asteroid Search</h1>
      <div className="button-container">
        <button className="browse-button" onClick={handleBrowse}>Browse Asteroids</button>
        <h2>Search by Closest Approach Date</h2>
        <input
          type="date"
          value={closestDate}
          onChange={(e) => setClosestDate(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
        {searchResults.length > 0 ? (
       searchResults.map((asteroid) => (
      <li key={asteroid.id}>{asteroid.name}</li>
    ))
  ) : (
    <li>No search results</li>
  )}
        </ul>
      </div>
      <div>
        <h2>Lookup Asteroid by NASA JPL ID</h2>
        <input
          type="text"
          placeholder="Enter NASA JPL ID"
          value={asteroidId}
          onChange={(e) => setAsteroidId(e.target.value)}
        />
        <button onClick={handleLookup}>Lookup</button>
        {specificAsteroid && (
          <div>
            <h3>Name: {specificAsteroid.name}</h3>
            <p>Neo Reference ID: {specificAsteroid.neo_reference_id}</p>
            <p>Closest Approach Date: {specificAsteroid.close_approach_data[0].close_approach_date}</p>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default AsteroidPage;

