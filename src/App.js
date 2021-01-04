import React, {useState, useEffect} from 'react';
import './App.css';
import './styles/HelperStyles.css';
import {FormControl, MenuItem, Select} from '@material-ui/core'

function App() {
  const [countries, setcountries] = useState(['Worldwide', 'US', 'UK', 'India', 'Brazil', 'Argentina', 'Israel']);

  useEffect(() => {
    const getCountryData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => {
          response.json()
        })
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            code: country.countryInfo.iso2,
            // flag: country.countryInfo.flag,
            // totalcases: country.cases,
            // newcases: country.todayCases,
            // totalrecovered: country.recovered,
            // newrecovered: country.todayRecovered,
            // totaldeaths: country.deaths,
            // newdeaths: country.todayDeaths,
            // active: country.active,
            // critical: country.critical,
          }))
        })

    }
  }, [countries])
  return (
    <div className="App">
      <div className="covid-header flexRow flexBetween flexAlignCenter mb-20">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="country-dropdown">
          <Select variant='outlined' value='Select Location'>
            {countries.map(country => (
              <MenuItem value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
