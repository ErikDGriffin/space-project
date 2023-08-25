import React, { useState, useEffect } from 'react';

function RoversPage() {
  const [roverPhotos, setRoverPhotos] = useState([]);

  useEffect(() => {
    fetchRoverPhotos();
  }, []);

  const fetchRoverPhotos = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=DBJWI4PvCOrizsejIHvBQRMZF6ZJoX1QK2G5VWvp`
      );
      const data = await response.json();
      setRoverPhotos(data.photos);
    } catch (error) {
      console.error('Error fetching Mars Rover photos:', error);
    }
  };

  return (
    <div className="rover-page">
      <div className="foreground-container">
      <h1>Mars Rover Photos</h1>
      <div className="photo-container">
      <ul className="photo-list center"> 
        {roverPhotos.map(photo => (
          <li key={photo.id}>
            <img
              src={photo.img_src}
              alt={`Rover Photo ${photo.id}`}
              className="photo-img"
            />
            <p>{photo.camera.full_name}</p>
            <p>{photo.earth_date}</p>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
}

export default RoversPage;


  