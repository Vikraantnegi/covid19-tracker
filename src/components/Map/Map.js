import React from 'react';
import './Map.css';
import '../../styles/HelperStyles.css';
import { MapContainer, TileLayer } from 'react-leaflet';

function CovidMap(props) {
    return (
        <div className="map">
            <MapContainer center={props.center} zoom={props.zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default CovidMap;
