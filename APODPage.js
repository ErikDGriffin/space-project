import React, { useState, useEffect } from 'react';

function APODPage() {
  const [apodData, setAPODData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [fadeState, setFadeState] = useState('fade-in'); // Initial fade state

  useEffect(() => {
    setFadeState('fade-out'); // Trigger fade-out when changing images
    fetchAPODData();
  }, [selectedDate]);

  const fetchAPODData = async () => {
    if (!selectedDate) return;

    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=DBJWI4PvCOrizsejIHvBQRMZF6ZJoX1QK2G5VWvp&date=${selectedDate}`
      );
      const data = await response.json();
      setAPODData(data);
      setFadeState('fade-in'); // Trigger fade-in when the new image is loaded
    } catch (error) {
      console.error('Error fetching APOD data:', error);
    }
  };
  const handlePreviousDate =() => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
    
  };

  const handleNextDate = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };


  return (
    <div className="background-image">
      <div className="static-background">
        <h2 className= "apod-heading">Astronomy Picture of the Day</h2>
        <div className="center-date-input">
          <label>Select a date: </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button className="navigation-button" onClick={handlePreviousDate}>Previous</button>
          <button className= "navigation-button" onClick={handleNextDate}>next</button>
        </div>
        <div className={`image-container ${fadeState}`}>
          {apodData.media_type === 'image' ? (
            <div>
              <h2 className="image-title">{apodData.title}</h2>
              <img
                src={apodData.url}
                alt={apodData.title}
                className={`fadeable-image ${fadeState} center-image`}
              />
              <p className="image-text">{apodData.explanation}</p>
            </div>
          ) : (
            <p className="image-text">
              {apodData.media_type ==='video'
              ? "no image available for the selected date."
              : "no data available for the selected date."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default APODPage;


