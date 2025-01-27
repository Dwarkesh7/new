const WEATHER_API_CONFIG = {
  API_KEY: 'YOUR_WEATHER_API_KEY',
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  UNITS: 'metric'
};

export const getWeatherUrl = (lat, lon) => {
  return `${WEATHER_API_CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${WEATHER_API_CONFIG.UNITS}&appid=${WEATHER_API_CONFIG.API_KEY}`;
};

export default WEATHER_API_CONFIG; 