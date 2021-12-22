import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";

import {
  GPS_SVG,
  stationSVG,
  rentEmptyStationSVG,
  returnEmptyStationSVG,
  MarkerClusterIcon,
} from "./Icon";
import "./map.scss";

const StationMarker = ({ item, isActive, map }) => {
  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef(null);

  useEffect(() => {
    if (refReady && isActive) {
      popupRef.openOn(map);
    }
  }, [refReady, isActive, map]);

  /*
  AvailableRentBikes: 19
  AvailableReturnBikes: 1
  BikesCapacity: 20
  ServiceStatus: 1
  ServiceType: 1
  SrcUpdateTime: "2021-12-22T20:56:40+08:00"
  StationAddress:
    En: "No.8, Ln. 26, Zhongxiao St., Yonghe Dist."
    Zh_tw: "忠孝街26巷8號(前)(鄰近楊三郎美術館)"
  StationName:
    En: "YouBike1.0_Zhongxiao Activity Center"
    Zh_tw: "YouBike1.0_忠孝活動中心"
  */

  return (
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
          ? returnEmptyStationSVG
          : stationSVG
      }
      title={item.StationName.Zh_tw}
      alt={item.StationName.Zh_tw}
    >
      <Popup
        offset={[0, -10]}
        ref={(r) => {
          popupRef = r;
          setRefReady(true);
        }}
      >
        <h3 className="fs-6">{item.StationName.Zh_tw}</h3>
        <p className="fs-6 mt-2 mb-0">
          可租借：
          <span className={item.AvailableRentBikes === 0 ? "text-danger" : ""}>
            {item.AvailableRentBikes}
          </span>
          <br />
          停車位：
          <span
            className={item.AvailableReturnBikes === 0 ? "text-danger" : ""}
          >
            {item.AvailableReturnBikes}
          </span>
        </p>
      </Popup>
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
  );
};

export default function Map({
  data,
  index,
  latitude,
  longitude,
  map,
  setMap,
  zoom,
}) {
  useEffect(() => {
    const delay = setTimeout(() => {
      if (index !== "noIndex") {
        map?.setView([latitude, longitude], zoom);
      } else {
        map?.setView([latitude, longitude], zoom);
      }
    }, 0);
    return () => {
      clearTimeout(delay);
    };
  }, [map, zoom, index, latitude, longitude]);

  return (
    <MapContainer
      center={[latitude, longitude]}
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
        position={[latitude, longitude]}
        icon={GPS_SVG}
        zIndexOffset={460}
        title="目前的位置"
        alt="目前的位置"
      ></Marker>
      <MarkerClusterGroup
        showCoverageOnHover={false}
        iconCreateFunction={MarkerClusterIcon}
      >
        {data.map((item, index) => (
          <StationMarker key={index} item={item} isActive={index} map={map} />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
