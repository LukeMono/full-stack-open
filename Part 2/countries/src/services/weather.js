import axios from 'axios'

const fetchWeather = (lat, lon, setWeather) => {
  const apiKey = import.meta.env.VITE_WEATHER_KEY
  const WeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  axios.get(WeatherURL)
    .then(response => {
      setWeather(response.data)
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error)
    })
}

export default fetchWeather