import React from 'react';
import './FeatureBox.css';
import '../../styles/HelperStyles.css';
import {Card, CardContent, Typography} from '@material-ui/core';

const FeatureBox = (props) => {
    return(
        <Card
         onClick={props.onClick}
         className={`featurebox ${props.active && `featurebox-${props.sr}`}`}>
            <CardContent>
                <Typography className="feature-title" color="textSecondary">
                    {props.title}
                </Typography>

                <Typography className={`feature-totalCases ${props.sr === 'recovered' && 'recovered-text'}`} color="textSecondary">
                    {props.totalCases}
                </Typography>

                <h2 className="feature-freshCases">
                    + {props.freshCases} cases
                </h2>
            </CardContent>
        </Card>
    );
}

export default FeatureBox;