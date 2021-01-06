  
import React from "react";
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import "./Map.css";
import numeral from 'numeral';

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };

  const showMapData = (data, casesType = "cases") =>
    data.map((country) => (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].rgb}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="covidmap-popup">
            <div className="country-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}}></div>
            <div className="country-name">{country.country}</div>
            <div className="country-active">Active: {numeral(country.active).format("0,0")}</div>
            <div className="country-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
            <div className="country-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
          </div>
        </Popup>
      </Circle>
    ));

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  function Map({ countries, casesType, center, zoom }) {  
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <ChangeView center={center} zoom={zoom} /> 
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showMapData(countries, casesType)}
            </MapContainer>
        </div>
    );
  }

  export default Map;