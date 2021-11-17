import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import env from "react-dotenv";
import "leaflet/dist/leaflet.css";

import useHttp from "../../utils/useHttp";
import { rentStationSVG, returnStationSVG, emptyStationSVG } from "./Icon";
import "./map.scss";

const StationMarker = ({ data }) => {
  return(
    <>
    {data.map((item) => (
    <Marker
      key={item.StationUID}
      position={[
        item.StationPosition.PositionLat,
        item.StationPosition.PositionLon,
      ]}
      icon={rentStationSVG}
      title={item.StationName.Zh_tw}
      alt={item.StationName.Zh_tw}
    >
      <Tooltip
        offset={[-1, -8]}
        direction="center"
        opacity={1}
        permanent
      >
        {item.AvailableRentBikes.toString()}
      </Tooltip>
    </Marker>))}
    </>
  )
}

export default function Map({latitude, longitude, error, type}) {
  const [position, setPosition] = useState([latitude, longitude]);
  const [nearby, setNearby] = useState(`nearby(${latitude},${longitude},1000)`)
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    setPosition([latitude, longitude])
    setNearby(`nearby(${latitude},${longitude},1000)`)
  }, [latitude, longitude])

  const { data, loading } = useHttp(nearby);
  const bike_1 = data.filter(station => station.ServiceType === 1)
  const bike_2 = data.filter(station => station.ServiceType === 2)
  
  return (
    <MapContainer center={position} zoom={zoom} className="map-container">
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${env.MAP_USERNAME}/${env.MAP_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${env.MAP_TOKEN}`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
        <StationMarker data={type === 1 ? bike_1 : bike_2}/>
        <Marker
          position={position}
          icon={rentStationSVG}
          title='me'
          alt='me'
        >
          <Tooltip
            offset={[-1, -8]}
            direction="center"
            opacity={1}
            permanent
          >
            me
          </Tooltip>
        </Marker>
    </MapContainer>
  );
}
