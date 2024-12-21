import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ lat, lon, city }) => {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      className="w-full h-full"
      // style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
