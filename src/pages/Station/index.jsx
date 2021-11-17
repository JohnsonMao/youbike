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
  const [type, setType] = useState(1);
  const handleType = (e) => setType(e);
  console.log(geolocation)

  return (
    <div className={pathname === '/station/rent' ? null : 'return'}>
      <Navbar page="station" menu={menu} handleType={handleType} />
      <Search />
      <NearbyBtn />
      {geolocation.latitude === null ? (
        <div>loading</div>
      ) : (
        <Map type={type} {...geolocation} />
      )}
    </div>
  );
}
