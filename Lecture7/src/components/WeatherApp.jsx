import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [location, setLocation] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Your API key should be stored securely, not directly in code
  // For this example, we'll use a placeholder
  const API_KEY = '66a2280826d146139cc72813250812';
    
  useEffect(() => {
    // Function to fetch weather data
    const fetchWeather = async () => {
      // Reset state before fetching
      setLoading(true);
      setError(null);
     try {
        const response = await fetch(          
`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
        );
        
        if (!response.ok) {
          throw new Error('Weather data not available for this location');
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // Call the function
    fetchWeather();
  }, [location]); // Re-run when location changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setLocation(inputValue);
      setInputValue('');
    }
  };
return (
    <div className="weather-app p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Weather App</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
{loading && <p className="text-center">Loading weather data...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {weather && !loading && !error && (
        <div className="weather-data">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-gray-500">{weather.location.localtime}</p>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <img 
              src={weather.current.condition.icon} 
              alt={weather.current.condition.text}
              className="w-16 h-16"
            />
            <div className="ml-4">
              <p className="text-4xl font-bold">{weather.current.temp_c}°C</p>
              <p className="text-gray-700">{weather.current.condition.text}</p>
            </div>
          </div>

         <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-gray-500">Feels Like</p>
              <p className="font-semibold">{weather.current.feelslike_c}°C</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-gray-500">Humidity</p>
              <p className="font-semibold">{weather.current.humidity}%</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-gray-500">Wind</p>
              <p className="font-semibold">{weather.current.wind_kph} km/h</p>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-gray-500">Precipitation</p>
              <p className="font-semibold">{weather.current.precip_mm} mm</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

