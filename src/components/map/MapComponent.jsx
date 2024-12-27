import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({ locations }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "310px",
    border: "6px solid #007F73",
    borderRadius: "10px",
  };

  const defaultCenter = {
    lat: locations[0]?.lat || 0,
    lng: locations[0]?.lng || 0,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBD3hRTQ8hmM_vA8lyddRAZsxijLypi0u4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={10}
      >
        {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;