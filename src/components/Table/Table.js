import React, {useState} from 'react';
import './Table.css';
import '../../styles/HelperStyles.css';
import numeral from 'numeral';
import {FormControl, MenuItem, Select} from '@material-ui/core';

const numberFormat = (data) => 
    data ? `${numeral(data).format("0,0")}` : "0";

function Table(props) {
    const [caseType, setcaseType] = useState('total');
    return (
        <div className="country-table">
            <tr className="flexRow flexBetween flexAlignCenter">
                <td>Country Name</td>
                <td className='mr-20'>
                    <FormControl className="table-dropdown">
                        <Select variant='outlined' defaultValue={caseType} onChange={(e) => setcaseType(e.target.value)}>
                            <MenuItem value='total'><strong style={{color: '#6a5d5d'}}>Total Cases</strong></MenuItem>
                            <MenuItem value='active'><strong style={{color: '#6a5d5d'}}>Active Cases</strong></MenuItem>
                            <MenuItem value='recovered'><strong style={{color: '#6a5d5d'}}>Recovered</strong></MenuItem>
                            <MenuItem value='deaths'><strong style={{color: '#6a5d5d'}}>Total Deaths</strong></MenuItem>
                        </Select>
                    </FormControl>
                </td>
            </tr>
            {props.countries.map(country => (
                <tr className="flexRow flexBetween">
                    <td style={{width: '60%', flexWrap: 'wrap'}}>{country.country}</td>
                    <td className='mr-20'><strong>{
                        caseType === 'deaths' ? numberFormat(country.deaths) :
                            caseType === 'active' ? numberFormat(country.active) :
                                caseType === 'recovered' ? numberFormat(country.recovered) :
                                    numberFormat(country.cases)
                    }</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
