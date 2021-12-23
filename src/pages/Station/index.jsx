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

export default function Station({ error, latitude, longitude }) {
  const { search } = useLocation();
  const [map, setMap] = useState(null);
  const handleMap = (e) => setMap(e);
  const [type, setType] = useState(1);
  const handleType = (e) => setType(e);
  const zoom = 16;
  const searchType = getSearchVal(search, "type");
  const searchCity = getSearchVal(search, "city");

  const [index, setIndex] = useState("noIndex");

  const [nearby, setNearby] = useState(latitude + "," + longitude);

  useEffect(() => {
    setNearby(latitude + "," + longitude);
  }, [latitude, longitude]);

  return (
    <div className={searchType === "rent" ? null : "dark"}>
      <HeaderNavbar
        page="station"
        menu={menu}
        handleType={handleType}
        searchParam={searchType}
        searchCity={searchCity}
      />
      <Search searchType={searchType} searchCity={searchCity} type={type} />
      {map ? (
        <NearbyBtn
          map={map}
          zoom={zoom}
          latitude={latitude}
          longitude={longitude}
        />
      ) : null}
      {latitude === null ? (
        <Loading />
      ) : (
        <Map
          setMap={handleMap}
          map={map}
          index={index}
          zoom={zoom}
          latitude={latitude}
          longitude={longitude}
          nearby={nearby}
          type={type}
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
