import React, { useState } from 'react'
import './App.css'
import { getWeatherData } from './data/weatherapi'
import { ScaleLoader } from 'react-spinners'
import styled from 'styled-components'

function App() {
  //const [weather, setWeatherData] = useState(null);
  const [city, setCity] = useState('')
  //const [unit, setUnit] = useState('');
  const [loading, setLoading] = useState(false)
  let [weatherdata, setWeatherdata] = useState(null)

  // let weatherdata={};

  const Button = styled.button``;

  const getData = async (unit) => {
    try {
      console.log(unit)
      setLoading(true)
      const data = await getWeatherData(city, unit)
      console.log(JSON.stringify(data) + '  from getData')
      setWeatherdata(data)
      // weatherdata=data
      // alert(JSON.stringify(data));
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }
  const override = 'display: block; margin: 0 auto; border-color: red;'

  const handleUnitChange = async (unit) => {
    await getData(unit)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getData('metric')
    }
  }

  return (
    <div className="App">
      <div className="card">
        <h2 className="title">
          <i className="fa fa-cloud"></i>Vroom Weather App
        </h2>
        <div className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your state/ city name/ zip"
          />
          <Button onClick={() => getData('metric')}>Search</Button>
        </div>
        {loading ? (
          <div className="loader-container">
            <ScaleLoader
              css={override}
              size={200}
              color={'#fff'}
              loading={loading}
            />
          </div>
        ) : (
          <>
            {weatherdata !== null ? (
              <div className="main-container">
                <h4>Live Weather Report</h4>
                <div className="weather-icon">
                  <img
                    src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}
                    alt="imicon"
                  />
                </div>
                <h3>{weatherdata.weather[0].main}</h3>
                <div className="temperature">
                  <h1>{parseInt(weatherdata.main.temp)}&deg;</h1>
                  <h2>
                    <Button
                      className="temparturebutton"
                      onClick={() => handleUnitChange('metric')}
                    >
                      <h2> &deg;C </h2>
                    </Button>
                    /
                    <Button
                      className="temparturebutton"
                      onClick={() => handleUnitChange('imperial')}
                    >
                      <h2> &deg;F </h2>
                    </Button>
                  </h2>
                </div>
                <div className="location">
                  <h3>
                    <i className="fa fa-street-view"></i>
                    {weatherdata.name} | {weatherdata.sys.country}
                  </h3>
                </div>
                <div className="temperature-range">
                  <h6>
                    H: {parseInt(weatherdata.main.temp_max)}&deg; || L:{' '}
                    {parseInt(weatherdata.main.temp_min)}&deg;
                  </h6>
                  <h5>
                    {' '}
                    Sunrise:{' '}
                    {new Date(
                      weatherdata.sys.sunrise * 1000,
                    ).toLocaleTimeString()}
                    || Sunset:{' '}
                    {new Date(
                      weatherdata.sys.sunset * 1000,
                    ).toLocaleTimeString()}
                  </h5>
                  <h5>
                    {' '}
                    Humidity: {weatherdata.main.humidity}% || Wind:{' '}
                    {parseInt(weatherdata.wind.speed)}mph
                  </h5>
                  <h5>
                    {' '}
                    Feels Like: {parseInt(weatherdata.main.feels_like)}&deg; ||
                    Visibility: {parseInt(weatherdata.visibility * 0.00062137)}
                    mi
                  </h5>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

export default App
