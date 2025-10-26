import { useState, useEffect } from 'react'
import countryService from './services/countries'
import fetchWeather from './services/weather'

const App = () => {
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  // consolidate state into state objects
  const [data, setData] = useState({
    info: null,
    names: [],
    filtered: {
      info: [],
      names: []
    }
  })

  //get weather when one result
  useEffect(() => {
    if (data.filtered.names.length === 1) {
      const country = data.filtered.info[0]
      const [lat, lon] = country.capitalInfo.latlng

      if (lat != null && lon != null) {
        fetchWeather(lat, lon, setWeather)
      }
    } else {
      setWeather(null)
    }
  }, [data.filtered])

  //rendering as a function
  const renderResults = () => {
    const filteredName = data.filtered.names
    const filteredInfo = data.filtered.info

    if (filteredName.length === 0) return <div>No Matches Found</div>
    if (filteredName.length > 10) return <div>Too many matches, specify another filter</div>
    if (filteredName.length === 1) {

      const country = filteredInfo[0]

      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt || "flag"} />
          <p>Latitude: {country.latlng[0]}</p>
          <p>Longitude: {country.latlng[1]}</p>
          <h1>Weather in {country.capital}</h1>
          
          {!weather ? (
            <p>Loading weather data...</p>
          ) : (
            <div>
              <p>Temperature: {weather.main.temp} °C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}

        </div>
      )
    }

    return filteredName.map((country) => (
      <div key={country}>
        {country}
        <button onClick={() => handleShow(country)}>Show</button>
      </div>))
  }

  //initial load
  useEffect(() => {
    countryService.getAll()
      .then(response => {
        const nameArray = response.map(country => country.name.common)
        setData({
          info: response,
          names: nameArray,
          filtered: {
            info: response,
            names: nameArray
          }
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  //writing filter as its own command
  const filterCountries = (searchTerm, exactMatch = false) => {
    if (!data.info || data.info.length === 0) {
      return {
        names: [],
        info: []
      }
    }

    if (!searchTerm) {
      return {
        names: data.names,
        info: data.info
      }
    }

    const term = searchTerm.toLowerCase()
    if (!exactMatch) {
      return {
        names: data.names.filter(n => n.toLowerCase().includes(term)),
        info: data.info.filter(n => n.name.common.toLowerCase().includes(term))
      }
    }
    else {
      return {
        names: data.names.filter(n => n === searchTerm),
        info: data.info.filter(n => n.name.common === searchTerm)
      }
    }
  }

  const handleChange = (event) => {
    const searchTerm = event.target.value
    setSearch(searchTerm)

    const filteringCountries = filterCountries(searchTerm)
    setData(prev => ({
      ...prev,
      filtered: filteringCountries
    }))
  }

  const handleShow = (countryName) => {
    const filteringCountries = filterCountries(countryName, true)
    setData(prev => ({ ...prev, filtered: filteringCountries }))
  }

  return (
    <>
      <p> find countries <input value={search} onChange={handleChange}></input></p>

      {data.names.length === 0 ? (
        <div>Loading...</div>
      ) : (
        renderResults()
      )}
    </>
  )
}



export default App