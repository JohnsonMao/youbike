import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeaderNavbar from "../../components/HeaderNavbar";
import FooterNavbar from "../../components/FooterNavbar";
import Search from "../../components/Search";
import NearbyBtn from "../../components/NearbyBtn";
import Map from "../../components/Map";
import Loading from "../../components/Loading";
import { getSearchVal } from "../../utils";
import useHttp from "../../utils/useHttp";

const menu = [
  {
    icon: "bike",
    title: "租車",
    to: "rent",
  },
  {
    icon: "parking",
    title: "還車",
    to: "return",
  },
];

export default function Station({ error, latitude, longitude, nearby }) {
  const { search } = useLocation();
  const [map, setMap] = useState(null);
  const handleMap = (e) => setMap(e);
  const [type, setType] = useState(1);
  const handleType = (e) => setType(e);
  const zoom = 16;
  const searchType = getSearchVal(search, "type");
  const searchCity = getSearchVal(search, "city");

  const [index, setIndex] = useState("noIndex");
  const [position, setPosition] = useState([latitude, longitude]);
  const handlePosition = (e) => {
    setPosition(e);
  };

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  const { data, loading } = useHttp(searchCity, "bike", position);
  const nearbyStations = data[0]?.filter(
    (station) => station.ServiceType === type
  );
  const cityStations = data[1]?.filter(
    (station) => station.ServiceType === type
  );

  return (
    <div className={searchType === "rent" ? null : "dark"}>
      <HeaderNavbar
        page="station"
        menu={menu}
        handleType={handleType}
        searchParam={searchType}
        searchCity={searchCity}
      />
      <Search
        searchType={searchType}
        searchCity={searchCity}
        cityStations={cityStations}
        setIndex={setIndex}
        setPosition={handlePosition}
      />
      {map ? (
        <NearbyBtn
          map={map}
          zoom={zoom}
          nearby={nearby}
          setPosition={handlePosition}
          setIndex={setIndex}
        />
      ) : null}
      {position[0] === null ? (
        <Loading />
      ) : (
        <Map
          setMap={handleMap}
          map={map}
          index={index}
          zoom={zoom}
          position={position}
          nearby={nearby}
          nearbyStations={nearbyStations}
          loading={loading}
        />
      )}
      <FooterNavbar
        page="station"
        menu={menu}
        handleType={handleType}
        searchParam={searchType}
        searchCity={searchCity}
      />
    </div>
  );
}
