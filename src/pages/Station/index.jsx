import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";

import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import NearbyBtn from "../../components/NearbyBtn";
import Map from "../../components/Map";
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
  const searchParam = getSearchVal(search, "type");
  return (
    <div className={searchParam === "rent" ? null : "dark"}>
      <Navbar
        page="station"
        menu={menu}
        handleType={handleType}
        searchParam={searchParam}
      />
      <Search />
      {map ? <NearbyBtn map={map} zoom={zoom} {...geolocation} /> : null}
      {geolocation.latitude === null ? (
        <div>loading</div>
      ) : (
        <Map
          type={type}
          setMap={handleMap}
          zoom={zoom}
          searchParam={searchParam}
          {...geolocation}
        />
      )}
    </div>
  );
}
