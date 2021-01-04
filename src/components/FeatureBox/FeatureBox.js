import React from 'react';
import './FeatureBox.css';
import '../../styles/HelperStyles.css';
import {Card, CardContent, Typography} from '@material-ui/core';

const FeatureBox = (props) => {
    return(
        <Card>
            <CardContent>
                <Typography className="feature-title" color="textSecondary">
                    {props.title}
                </Typography>

                <h2 className="feature-freshCases">
                    + {props.freshCases} new cases
                </h2>

                <Typography className="feature-totalCases" color="textSecondary">
                    {props.totalCases}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default FeatureBox;