import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Search from '../../components/Search';
import NearbyBtn from '../../components/NearbyBtn';
import Map from '../../components/Map';

export default function Station() {
  return (
    <div>
      <Navbar />
      <Search />
      <NearbyBtn />
      <Map />
    </div>
  )
}
