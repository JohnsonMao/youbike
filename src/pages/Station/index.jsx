import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Search from '../../components/Search';
import NearbyBtn from '../../components/NearbyBtn';
import Map from '../../components/Map';

const menu = [
  {
    icon: 'bike',
    title: '租車',
    to: 'rent'
  },
  {
    icon: 'parking',
    title: '還車',
    to: 'return'
  }
]

export default function Station() {
  return (
    <div>
      <Navbar type='station' menu={menu} />
      <Search />
      <NearbyBtn />
      <Map />
    </div>
  )
}
