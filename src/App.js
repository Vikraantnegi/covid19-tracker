import React, {useState, useEffect} from 'react';
import './App.css';
import './styles/HelperStyles.css';
import {Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import FeatureBox from './components/FeatureBox/FeatureBox';
import Map from './components/Map/Map';

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('WoW');
  const [countryInfo, setcountryInfo] = useState([]);

  useEffect(() => {
    const getCountryData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
          .then(data => {
            const countries = data.map(country => ({
              name: country.country,
              code: country.countryInfo.iso3,
            }))
            setcountries(countries);
          })
        .catch(error => console.log(error));
    };
    getCountryData();
  }, []);

  const DropdownChange = async(e) => {
    const api = e.target.value === 'WoW' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${country}`;
    await fetch(api)
      .then(response => response.json())
        .then(data => {
          const countryInfo = data.map(country => ({
            name: country.country,
            code: country.countryInfo.iso3,
            flag: country.countryInfo.flag,
            totalcases: country.cases,
            newcases: country.todayCases,
            totalrecovered: country.recovered,
            newrecovered: country.todayRecovered,
            totaldeaths: country.deaths,
            newdeaths: country.todayDeaths,
            active: country.active,
            critical: country.critical,
          }))
          setcountry(countryInfo.code);
          setcountryInfo(countryInfo);
        })
      .catch(error => console.log(error));
  }

  return (
    <div className="covid-app flexRow flexEvenly flexAlignCenter mw1100">
      <div className="stats-left">
        <div className="covid-header flexRow flexBetween flexAlignCenter mb-20">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="country-dropdown">
            <Select variant='outlined' defaultValue={country} onChange={(e) => DropdownChange(e)}>
              <MenuItem value="WoW">WorldWide</MenuItem>
              {countries.map(country => (
                <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="covid-total flexRow flexEnd mb-20">
          <h1 className="total-cases mr-20">132456</h1>
          <h4 className="new-cases flexColumn flexCenter mr-20"> +2879 </h4>
        </div>
        <div className="covid-stats flexRow flexBetween flexAlignCenter mb-20">
          <FeatureBox title="Total Active Cases" freshCases={2689} totalCases={12345} />
          <FeatureBox title="Total Recovered Cases" freshCases={3788} totalCases={113678} />
          <FeatureBox title="Total Covid Deaths" freshCases={200} totalCases={12345} />
        </div>
        <div className="covid-map">
          <Map />
        </div>
      </div>
      <Card className="stats-right">
        <CardContent className="flexColumn flexBetween">
          <h3 className="live-cases">Live Cases by Country</h3>
          <h3 className="fresh-cases">New Cases WorldWide</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
