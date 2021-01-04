import React, {useState, useEffect} from 'react';
import './App.css';
import './styles/HelperStyles.css';
import {FormControl, MenuItem, Select} from '@material-ui/core';
import FeatureBox from './components/FeatureBox/FeatureBox';

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('WoW');

  useEffect(() => {
    const getCountryData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            code: country.countryInfo.iso3,
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
          setcountries(countries);
        })
        .catch(error => console.log(error));
    };
    getCountryData();

  }, []);

  const DropdownChange = (e) => {
    setcountry(e.target.value);
  }

  return (
    <div className="App">
      <div className="covid-header flexRow flexBetween flexAlignCenter mb-20">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="country-dropdown">
          <Select variant='outlined' defaultValue={country} onChange={(e) => DropdownChange(e)}>
            <MenuItem value="WoW">WorldWide</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.code}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="covid-options flexRow flexBetween flexAlignCenter mb-20">
        <FeatureBox title="Total Cases" freshCases={2879} totalCases={132456} />
        <FeatureBox title="Total Active Cases" freshCases={2689} totalCases={12345} />
        <FeatureBox title="Total Recovered Cases" freshCases={3788} totalCases={113678} />
        <FeatureBox title="Total Deaths" freshCases={200} totalCases={12345} />
      </div>
    </div>
  );
}

export default App;
