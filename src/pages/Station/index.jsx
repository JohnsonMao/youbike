import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";

import Navbar from "../../components/Navbar";
import Search from "../../components/Search";
import NearbyBtn from "../../components/NearbyBtn";
import Map from "../../components/Map";

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
  const { pathname } = useLocation();
  const [map, setMap] = useState(null);
  const handleMap = (e) => setMap(e);
  const [type, setType] = useState(1);
  const handleType = (e) => setType(e);
  const zoom = 16

  return (
    <div className={pathname === '/station/rent' ? null : 'return'}>
      <Navbar page="station" menu={menu} handleType={handleType} />
      <Search />
      {map ? <NearbyBtn map={map} zoom={zoom} {...geolocation} /> : null}
      {geolocation.latitude === null ? (
        <div>loading</div>
      ) : (
        <Map type={type} setMap={handleMap} zoom={zoom} {...geolocation} />
      )}
    </div>
  );
}
