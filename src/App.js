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
  const [caseType, setcaseType] = useState('cases');

  const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1))
    return sortedData;
  }

  const numberFormat = (data) => 
    data ? `${numeral(data).format("0.0a")}` : "0";

    const titleCase = (str) => {
      str = str.toLowerCase()
                .split(' ')
                .map(function(word) {
          return (word.charAt(0).toUpperCase() + word.slice(1));
      });
     return str.join(' ');
    }

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
          setMapZoom(3);
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
            <MenuItem value="WoW">WorldWide</MenuItem>
            {countries.map(country => (
              <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="covid-stats flexRow flexAlignCenter">
        <div className="total-covid flexColumn">

        </div> 
        <div className="overview-covid flexColumn">
          
        </div> 
        <div className="trends-covid flexColumn">
          <div className="trends-head flexRow flexBetween flexAlignCenter mh-10">
            <h3 className="fresh-cases" style={{fontWeight: 600}}>Trends</h3>
            <FormControl className="trends-dropdown">
                <Select variant='outlined' defaultValue={caseType} onChange={(e) => setcaseType(e.target.value)}>
                    <MenuItem value='cases'><strong>Total Cases</strong></MenuItem>
                    <MenuItem value='recovered'><strong>Recovered</strong></MenuItem>
                    <MenuItem value='deaths'><strong>Total Deaths</strong></MenuItem>
                </Select>
            </FormControl>
          </div>
          <Graph countryCode={country} casesType={caseType} />
        </div> 
      </div>
      <div className="covid-app flexRow flexAround">
        <div className="stats-left">
          {/* <div className="covid-total flexRow flexEnd">
            <h1 className="total-cases mr-20">{numberFormat(countryInfo.cases)}</h1>
            <div className="flexColumn flexAlignCenter flexCenter mr-20">
              <h4 style={{margin:0}} className="critical-cases flexColumn flexCenter">{numberFormat(countryInfo.critical)}</h4>
              <h4 style={{margin:0}} className="critical">Critical</h4>
            </div>
          </div> */}
          {/* <div className="covid-stats flexRow flexBetween flexAlignCenter">
            <FeatureBox 
              sr='active'
              active={casesType === 'cases'}
              onClick={(e) => setCasesType('cases')}
              title="Total Active Cases" 
              freshCases={numberFormat(countryInfo.todayCases)} 
              totalCases={numberFormat(countryInfo.active)} 
            />
            <FeatureBox 
              sr='recovered'
              active={casesType === 'recovered'}
              onClick={(e) => setCasesType('recovered')}
              title="Total Recovered Cases" 
              freshCases={numberFormat(countryInfo.todayRecovered)} 
              totalCases={numberFormat(countryInfo.recovered)} 
            />
            <FeatureBox
              sr='deaths'
              active={casesType === 'deaths'}
              onClick={(e) => setCasesType('deaths')}
              title="Total Covid Deaths" 
              freshCases={numberFormat(countryInfo.todayDeaths)} 
              totalCases={numberFormat(countryInfo.deaths)} 
            />
          </div> */}
          <div className="covid-map">
            <Map 
            // casesType={casesType} 
            countries={mapCountries} center={mapCenter} zoom={mapZoom} />
          </div>
        </div>
        <Card className="stats-right">
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
