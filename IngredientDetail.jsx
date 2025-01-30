import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CloudIcon } from '@heroicons/react/24/outline';

const INDIAN_CITIES = [
  { city: 'Mumbai', pincode: '400001' },
  { city: 'Delhi', pincode: '110001' },
  { city: 'Bangalore', pincode: '560001' },
  { city: 'Chennai', pincode: '600001' },
  { city: 'Kolkata', pincode: '700001' },
  { city: 'Hyderabad', pincode: '500001' },
  { city: 'Pune', pincode: '411001' },
  { city: 'Ahmedabad', pincode: '380001' },
  { city: 'Jaipur', pincode: '302001' },
  { city: 'Lucknow', pincode: '226001' }
];

// Your OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY_HERE';

const IngredientDetail = () => {
  const location = useLocation();
  const ingredient = location.state?.ingredient;
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState(INDIAN_CITIES[0]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.city},IN&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert('Error fetching weather data: ' + data.message);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!ingredient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ingredient not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-500 mt-4 inline-block">
            Go back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="mb-8 flex items-center">
            <Link
              to="/"
              className="flex items-center text-blue-600 hover:text-blue-500 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Search
            </Link>
          </div>

          {/* Ingredient Title */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-8">
            {ingredient.Ingredient_Name}
          </h1>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Ingredient Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredient Details</h2>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                {Object.entries(ingredient).map(([key, value]) => (
                  value && (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-600">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Right Column - City and Weather */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Location & Weather</h2>
              
              {/* City Selection */}
              <div className="bg-gray-50 rounded-xl p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select City
                </label>
                <select
                  value={JSON.stringify(selectedCity)}
                  onChange={(e) => setSelectedCity(JSON.parse(e.target.value))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {INDIAN_CITIES.map((city) => (
                    <option key={city.pincode} value={JSON.stringify(city)}>
                      {city.city} - {city.pincode}
                    </option>
                  ))}
                </select>

                {/* Weather Button and Display */}
                <div className="mt-4">
                  <button
                    onClick={fetchWeather}
                    disabled={loading}
                    className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors disabled:opacity-50"
                  >
                    <CloudIcon className="h-5 w-5 mr-2" />
                    {loading ? 'Loading...' : 'Check Weather'}
                  </button>
                </div>

                {weather && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-white rounded-lg shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2">Current Weather in {selectedCity.city}</h3>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <span className="font-medium">Temperature:</span>
                        <span className="ml-2">{weather.main.temp}°C</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium">Feels like:</span>
                        <span className="ml-2">{weather.main.feels_like}°C</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium">Humidity:</span>
                        <span className="ml-2">{weather.main.humidity}%</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium">Weather:</span>
                        <span className="ml-2 capitalize">{weather.weather[0].description}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium">Wind Speed:</span>
                        <span className="ml-2">{weather.wind.speed} m/s</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IngredientDetail; 
