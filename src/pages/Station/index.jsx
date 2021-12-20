import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";

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

export default function Station() {
  const { error, latitude, longitude } = useGeolocation();
  const { search } = useLocation();
  const [map, setMap] = useState(null);
  const handleMap = (e) => setMap(e);
  const [type, setType] = useState(1);
  const handleType = (e) => setType(e);
  const zoom = 16;
  const searchType = getSearchVal(search, "type");
  const searchCity = getSearchVal(search, "city");
  const [nearby, setNearby] = useState(latitude + ',' + longitude);
  
  useEffect(() => {
    setNearby(latitude + ',' + longitude);
  }, [latitude, longitude]);

  const { data, loading } = useHttp("", "bike", nearby);
  
  const stations = data.filter((station) => station.ServiceType === type);
  
  return (
    <div className={searchType === "rent" ? null : "dark"}>
      <HeaderNavbar
        page="station"
        menu={menu}
        handleType={handleType}
        searchParam={searchType}
        searchCity={searchCity}
      />
      <Search searchType={searchType} searchCity={searchCity} />
      {map ? <NearbyBtn map={map} zoom={zoom} latitude={latitude} longitude={longitude} /> : null}
      {latitude === null ? (
        <Loading />
      ) : (
        <Map
          setMap={handleMap}
          data={stations}
          zoom={zoom}
          latitude={latitude} 
          longitude={longitude}
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
