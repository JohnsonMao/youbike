import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay } from "react-leaflet";
import env from "react-dotenv";
import 'leaflet/dist/leaflet.css'

// import stationSVG from "../../asset/icon/station.svg";
import { stationSVG } from "./Icon";
import "./map.scss";

// let img = new Image(36, 50);
// img.src = stationSVG;

export default function Map() {
  const [lng, setLng] = useState(25.047675);
  const [lat, setLat] = useState(121.517055);
  const [zoom, setZoom] = useState(15);

  const position = [lng, lat];

  return (
    <MapContainer center={position} zoom={zoom} className="map-container">
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${env.MAP_USERNAME}/${env.MAP_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${env.MAP_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker
        position={position}
        icon={ stationSVG }
        title="station"
        alt="station"
      >
        <Popup>
          1
        </Popup>
      </Marker>
    </MapContainer>
  );
}
