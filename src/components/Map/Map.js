  
import React from "react";
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import "./Map.css";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  };
  
  const showMapData = (data, casesType = "cases") =>
    data.map((country) => (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          Hi I am a Popup!
        </Popup>
      </Circle>
    ));


function Map({ countries, casesType, center, zoom }) {
    const ChangeView = ({ center, zoom }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

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