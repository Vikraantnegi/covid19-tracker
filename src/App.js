/* eslint-disable no-lone-blocks */
import React, {useState, useEffect} from 'react';
import './App.css';
import './styles/HelperStyles.css';
import {Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import FeatureBox from './components/FeatureBox/FeatureBox';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import Graph from './components/Graph/Graph';
import "leaflet/dist/leaflet.css";
import numeral from 'numeral';

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('WoW');
  const [countryInfo, setcountryInfo] = useState([]);
  const [table, settable] = useState([]);  
  const [mapCenter, setMapCenter] = useState([ 34.80746, -40.4796 ]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);

  const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1))
    return sortedData;
  }

  const numberFormat = (data) => 
    data ? `${numeral(data).format("0,0")}` : "0";

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
            setMapCountries(data);
            const sortedData = sortData(data);
            settable(sortedData);
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
          {countryCode === 'WoW' ? (
            setMapCenter([ 34.80746, -40.4796 ])
          ) : (
            setMapCenter([ data.countryInfo.lat, data.countryInfo.long ])
          )}
          setMapZoom(4);
          setcountry(countryCode);
          setcountryInfo(data);
        })
      .catch(error => console.log(error));
  }

  return (
    <div className="flexColumn flexAround mw1100">
      <div className="flexRow flexBetween flexAlignCenter mh-20">
        <h1 className="covid-header">Covid-19 Tracker</h1>
        <FormControl className="country-dropdown">
          <Select variant='outlined' defaultValue={country} onChange={(e) => DropdownChange(e)}>
            <MenuItem value="WoW"><strong>WorldWide</strong></MenuItem>
            {countries.map(country => (
              <MenuItem key={country.code} value={country.code}><strong>{country.name}</strong></MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="covid-stats flexRow flexAlignCenter">
        <div className="w680 total-covid grow flexColumn">
          <h3 style={{marginTop: 20, marginBottom: 0}}>Total Confirmed Covid Cases</h3>
          <h1 className="total-cases">{numberFormat(countryInfo.cases)}</h1>
          <div className="flexColumn flexAlignCenter">
            <div className="stat-box flexRow flexEnd">
              <h4 style={{margin:0, color: '#666666'}} className="flexColumn flexCenter">+ {numberFormat(countryInfo.todayCases)} new cases</h4>
            </div>
            <FeatureBox 
              casetype="Critical"  
              freshCases='' 
              totalCases={numberFormat(countryInfo.critical)} 
              color="#de3700"
            />
          </div>
        </div> 
        <div className="w680 overview-covid grow flexColumn">
          <h3 style={{marginTop: 20, marginBottom: 20}}>Overview</h3>
          <div className="flexColumn flexAlignCenter">
            <FeatureBox 
              casetype="Active" 
              freshCases='' 
              totalCases={numberFormat(countryInfo.active)} 
              color="#f4c363"
            />
            <FeatureBox 
              casetype="Recovered" 
              freshCases={numberFormat(countryInfo.todayRecovered)} 
              totalCases={numberFormat(countryInfo.recovered)} 
              color="#60bb69"
            />
            <FeatureBox 
              casetype="Fatal" 
              freshCases={numberFormat(countryInfo.todayDeaths)} 
              totalCases={numberFormat(countryInfo.deaths)} 
              color="#767676"
            />
            <h5 className="covid-source w100">Source : https://disease.sh/</h5>
          </div>
        </div> 
        <div className="trends-covid grow flexColumn">
          <Graph countryCode={country} />
        </div> 
      </div>
      <div className="covid-app flexRow flexAround">
        <div className="stats-left">
          <div className="covid-map">
            <Map 
              countries={mapCountries} 
              center={mapCenter} 
              zoom={mapZoom} 
            />
          </div>
        </div>
        <Card className="grow stats-right">
          <CardContent className="flexColumn flexBetween">
            <h3 className="live-cases">Live Count by Country</h3>
            <Table countries={table} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
