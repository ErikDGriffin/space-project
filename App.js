import React, { useState } from 'react';
import './roverPage.css';
import './APODPage.css';
import APODPage from './APODPage';
import RoversPage from './RoversPage';
import MarsWeatherPage from './MarsWeatherPage'; 
import './homePage.css';
import './buttonContainer.css';
import './AsteroidPage.css';
import AsteroidPage from './AsteroidPage';


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'apod':
        return <APODPage />;
      case 'rovers':
        return <RoversPage />;
      case 'weather':
        return <MarsWeatherPage />;
      case 'asteroids': // Add case for 'asteroids'
        return <AsteroidPage />; // Render AsteroidPage
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('apod')}>APOD</button>
        <button onClick={() => setCurrentPage('rovers')}>Rovers</button>
        <button onClick={() => setCurrentPage('asteroids')}>Asteroids</button>

      </header>
      <main>{renderPage()}</main>
    </div>
  );
}

function HomePage() {
  return (
  <div className="home-page">
    <h1 className="animated-text">Welcome to the Space Age Home Page!</h1>
    <p className="fade-in-text">Please select a button above to begin your journey</p>
    </div>
  );
}


export default App;

