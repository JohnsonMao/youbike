import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";

import Loading from "../Loading";
import useHttp from "../../utils/useHttp";
import {
  GPS_SVG,
  stationSVG,
  rentEmptyStationSVG,
  returnEmptyStationSVG,
  MarkerClusterIcon,
} from "./Icon";
import "./map.scss";

const StationMarker = ({ data }) => (
  <MarkerClusterGroup
    showCoverageOnHover={false}
    iconCreateFunction={MarkerClusterIcon}
  >
    {data.map((item) => (
      <Marker
        key={item.StationUID}
        position={[
          item.StationPosition.PositionLat,
          item.StationPosition.PositionLon,
        ]}
        icon={
          item.AvailableRentBikes === 0
            ? rentEmptyStationSVG
            : item.AvailableReturnBikes === 0
            ? rentEmptyStationSVG
            : stationSVG
        }
        title={item.StationName.Zh_tw}
        alt={item.StationName.Zh_tw}
      >
        <Tooltip offset={[-1, -8]} direction="center" opacity={1} permanent>
          <span className="position-absolute top-50 start-50 translate-middle rentNum">
            {item.AvailableRentBikes.toString()}
          </span>
          <span
            className={`position-absolute top-50 start-50 translate-middle returnNum ${
              item.AvailableReturnBikes === 0 ? "zero" : null
            }`}
          >
            {item.AvailableReturnBikes.toString()}
          </span>
        </Tooltip>
      </Marker>
    ))}
  </MarkerClusterGroup>
);

export default function Map({ data, latitude, longitude, setMap, zoom }) {
  const [position, setPosition] = useState([latitude, longitude]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  console.log(data);

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      whenCreated={setMap}
      zoomSnap
      className="map-container"
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAP_USERNAME}/${process.env.REACT_APP_MAP_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker
        position={position}
        icon={GPS_SVG}
        zIndexOffset={460}
        title="目前的位置"
        alt="目前的位置"
      ></Marker>
      <StationMarker data={data} />
    </MapContainer>
  );
}
