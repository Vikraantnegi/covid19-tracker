import React from 'react';
import './FeatureBox.css';
import '../../styles/HelperStyles.css';

const FeatureBox = (props) => {
    return(
        <div className="flexColumn w100" style={{marginBottom: 10}}>
            <div className="flexRow flexAlignCenter" style={{marginBottom: 5}}> 
                <div className="circle-covid" style={{backgroundColor: `${props.color}`}}></div>                           
                <h4 className="case-type">{props.casetype}</h4>
                <h4 className="number-cases flexRow flexAlignCenter">
                    {props.totalCases} 
                    {props.freshCases !== '' ? (<span className="fresh-cases">+{props.freshCases}</span>) : null}
                </h4>
            </div>
        </div>
    );
}

export default FeatureBox;