import React from 'react';
import './Map.css';
import '../../styles/HelperStyles.css';
import {Map as Map1, TileLayer} from 'react-leaflet';

function Map() {
    return (
        <div className="covid-map">
            <Map1>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map1>
        </div>
    )
}

export default Map
