import React, {useState, useEffect} from 'react';
import './App.css';
import './styles/HelperStyles.css';
import {Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import FeatureBox from './components/FeatureBox/FeatureBox';
import Map from './components/Map/Map';
import Table from './components/Table/Table';

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('WoW');
  const [countryInfo, setcountryInfo] = useState([]);
  const [table, settable] = useState([]);

  useEffect(() => {
     fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
        .then(data => {      
          setcountryInfo(data); 
          setcountry('Wow');
        })
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const getCountryData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
          .then(data => {
            const countries = data.map(country => ({
              name: country.country,
              code: country.countryInfo.iso3,
            }))
            settable(data);
            setcountries(countries);
          })
        .catch(error => console.log(error));
    };
    getCountryData();
  }, []);

  const DropdownChange = async(event) => {
    const countryCode = event.target.value;
    const api = countryCode === 'WoW' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(api)
      .then(response => response.json())
        .then(data => {
          setcountry(countryCode);
          setcountryInfo(data);
        })
      .catch(error => console.log(error));
  }

  console.log(countryInfo);

  return (
    <div className="covid-app flexRow flexAround mw1100">
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
        <div className="covid-total flexRow flexEnd">
          <h1 className="total-cases mr-20">{countryInfo.cases}</h1>
          <div className="flexColumn flexAlignCenter flexCenter mr-20">
            <h4 style={{margin:0}} className="critical-cases flexColumn flexCenter">{countryInfo.critical}</h4>
            <h4 style={{margin:0}} className="critical">Critical</h4>
          </div>
        </div>
        <div className="covid-stats flexRow flexBetween flexAlignCenter mb-20">
          <FeatureBox title="Total Active Cases" freshCases={countryInfo.todayCases} totalCases={countryInfo.active} />
          <FeatureBox title="Total Recovered Cases" freshCases={countryInfo.todayRecovered} totalCases={countryInfo.recovered} />
          <FeatureBox title="Total Covid Deaths" freshCases={countryInfo.todayDeaths} totalCases={countryInfo.deaths} />
        </div>
        <div className="covid-map">
          <Map />
        </div>
      </div>
      <Card className="stats-right">
        <CardContent className="flexColumn flexBetween">
          <h3 className="live-cases">Live Cases by Country</h3>
          <Table countries={table} />
          <h3 className="fresh-cases">New Cases WorldWide</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
