import React from 'react';
import './Table.css';
import '../../styles/HelperStyles.css';

function Table(props) {
    return (
        <div className="country-table">
            <tr>
                <td>Country Name</td>
                <td className='mr-20'><strong>Total Cases</strong></td>
            </tr>
            {props.countries.map(country => (
                <tr>
                    <td style={{width: '60%', flexWrap: 'wrap'}}>{country.country}</td>
                    <td><strong>{country.cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
