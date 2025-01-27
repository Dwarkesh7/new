import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { getWeatherUrl } from '../config/weatherConfig';

const WeatherContext = createContext();

export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(getWeatherUrl(lat, lon));
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    weatherData,
    loading,
    error,
    fetchWeatherData
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}; 