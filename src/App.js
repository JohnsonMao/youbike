import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import useGeolocation from "react-hook-geolocation";

import Index from "./pages/Index";
import Station from "./pages/Station";
import Shape from "./pages/Shape";
import Tourism from "./pages/Tourism";
import useHttp from "./utils/useHttp";
import { bikeCityList } from "./utils/cityList";
import { getCityFromType } from "./utils";
import "./asset/scss/style.scss";

export default function App() {
  const { error, latitude, longitude } = useGeolocation();
  const [nearby, setNearby] = useState(latitude + "," + longitude);
  useEffect(() => {
    setNearby(latitude + "," + longitude);
  }, [latitude, longitude]);
  const { data } = useHttp("", "cityType", nearby);
  const cityCode = data[0]?.AuthorityID;
  const city = getCityFromType(bikeCityList, cityCode);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index city={city} />} />
        <Route
          path="station"
          element={
            <Station error={error} latitude={latitude} longitude={longitude} />
          }
        />
        <Route path="shape" element={<Shape />} />
        <Route path="tourism" element={<Tourism />} />
      </Routes>
    </HashRouter>
  );
}
