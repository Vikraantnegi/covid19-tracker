import React from 'react';
import './App.css';
import './styles/HelperStyles.css';
import {FormControl, MenuItem, Select} from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <div className="covid-header flexRow flexBetween flexAlignCenter mb-20">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="country-dropdown">
          <Select variant='outlined' value='Select Location'>
            <MenuItem value='Worldwide'>WorldWide</MenuItem>
            <MenuItem value='India'>India</MenuItem>
            <MenuItem value='US'>US</MenuItem>
            <MenuItem value='UK'>UK</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
