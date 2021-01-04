import React from 'react';
import './Table.css';
import '../../styles/HelperStyles.css';

function Table(props) {
    return (
        <div className="country-table">
            <tr className="flexRow flexBetween">
                <td>Country Name</td>
                <td className='mr-20'><strong>Total Cases</strong></td>
            </tr>
            {props.countries.map(country => (
                <tr className="flexRow flexBetween">
                    <td style={{width: '60%', flexWrap: 'wrap'}}>{country.country}</td>
                    <td className='mr-20'><strong>{country.cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
