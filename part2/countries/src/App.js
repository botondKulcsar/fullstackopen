import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CountryInfo = ({match, countries}) => {
  
  const country = countries.find(country => country.name.official.includes(match[0]));


  const [temperature, setTemperature] = useState('');
  const [windDir, setWindDir] = useState('');
  const [windSpeed, setWindSpeed] =  useState('');
  const [weatherIcon, setWeatherIcon] = useState('');

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital[0]}`
    axios
      .get(url)
      .then(response => {
        setTemperature(response.data.current.temperature);
        setWindDir(response.data.current.wind_dir)
        setWindSpeed(response.data.current.wind_speed)
        setWeatherIcon(response.data.current.weather_icons[0])
      })
  }, [country.capital])

  if (!country) return null;

  return (
    <>
    <h2>{country.name.official}</h2>
    <p>capital {country.capital[0]}</p>
    <p>population {country.population}</p>
    <h3>Spoken languages</h3>
    <ul>
      { Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>) }
    </ul>
    <div>
    <img src={country.flags.png} alt='flag'/>
    <h3>Weather in {country.capital[0]}</h3>
    <p><b>temperature</b> {temperature} Celsius</p>
    <img src={weatherIcon} alt='weather' />
    <p><b>wind</b> {windSpeed} km/h  direction {windDir}</p>
    </div>
    </>
  )
}

const Country = ({ country, onClick }) => {

  return (
    <p>{country} <button onClick={ () => onClick(country) } >Show</button></p>
  )
}

const CountryList = ({ results, onClick }) => {
  return (
    <>
    { results.map(country => <Country key={country}  onClick={ onClick } country={country}/>) }
    </>
  )
}

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleChange = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
    setSelected('');
  }

  const results = countries
    .filter(country => country.name.common.toLowerCase().includes(searchTerm)
       || country.name.official.toLowerCase().includes(searchTerm))
    .map(country => country.name.official)
    



  const countryList = results.length > 10 
    ? <p>Too many, matches, specify another field</p>
    : results.length > 1
    ? <CountryList results={results} onClick={(country) => setSelected(country)}/>
    : results.length === 1
    ? <CountryInfo match={ results } countries={ countries }/> 
    : 'no country found'

 

  return (
    <div>
      <div>find countries 
        <input
          value={ searchTerm }
          onChange={ handleChange }
        />
      </div>
      
      { searchTerm && !selected ? <div>{countryList}</div> : ''}
      {selected ?  <CountryInfo match={ [selected] } countries={ countries }/> : ''}
    </div>
  );
}

export default App;
