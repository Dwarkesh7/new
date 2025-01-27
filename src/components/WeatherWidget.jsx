import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useWeather } from '../contexts/WeatherContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faCloud, 
  faCloudRain, 
  faSnowflake, 
  faWind 
} from '@fortawesome/free-solid-svg-icons';

const WeatherWidget = () => {
  const { weatherData, loading, error } = useWeather();

  const getWeatherIcon = (weatherCode) => {
    // Basic weather code mapping
    switch (true) {
      case weatherCode < 300: // Thunderstorm
        return faCloudRain;
      case weatherCode < 600: // Rain
        return faCloudRain;
      case weatherCode < 700: // Snow
        return faSnowflake;
      case weatherCode < 800: // Atmosphere (fog, mist, etc.)
        return faWind;
      case weatherCode === 800: // Clear
        return faSun;
      default: // Clouds
        return faCloud;
    }
  };

  if (loading) {
    return (
      <Card>
        <Card.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading weather data...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Body>
          <Card.Text className="text-danger">
            Unable to load weather data
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  if (!weatherData.main) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Weather at Vendor Location</Card.Title>
        <div className="text-center">
          <FontAwesomeIcon
            icon={getWeatherIcon(weatherData.weather[0].id)}
            size="2x"
            className="mb-2"
          />
          <h3>{Math.round(weatherData.main.temp)}°C</h3>
          <p className="mb-0">{weatherData.weather[0].description}</p>
          <p className="text-muted">
            {weatherData.name}, {weatherData.sys.country}
          </p>
          <div className="d-flex justify-content-around">
            <div>
              <small>Humidity</small>
              <p className="mb-0">{weatherData.main.humidity}%</p>
            </div>
            <div>
              <small>Wind</small>
              <p className="mb-0">{Math.round(weatherData.wind.speed)} m/s</p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherWidget; 