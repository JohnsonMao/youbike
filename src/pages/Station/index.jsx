import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";

import HeaderNavbar from "../../components/HeaderNavbar";
import FooterNavbar from "../../components/FooterNavbar";
import Search from "../../components/Search";
import NearbyBtn from "../../components/NearbyBtn";
import Map from "../../components/Map";
import Loading from "../../components/Loading";
import { getSearchVal } from "../../utils";

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
  const geolocation = useGeolocation();
  const { search } = useLocation();
  const [map, setMap] = useState(null);
  const handleMap = (e) => setMap(e);
  const [type, setType] = useState(1);
  const handleType = (e) => setType(e);
  const zoom = 16;
  const searchType = getSearchVal(search, "type");
  const searchCity = getSearchVal(search, "city");
  
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
      {map ? <NearbyBtn map={map} zoom={zoom} {...geolocation} /> : null}
      {geolocation.latitude === null ? (
        <Loading />
      ) : (
        <Map
          type={type}
          setMap={handleMap}
          zoom={zoom}
          searchParam={searchType}
          {...geolocation}
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
