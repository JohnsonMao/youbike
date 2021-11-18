import React from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import CardList from '../../components/CardList';
import { getSearchVal } from "../../utils";

export default function Shape() {
  const { search } = useLocation();

  const city = getSearchVal(search, "city");
  return (
    <div>
      <Navbar page="shape" searchParam={city} />
      <CardList searchParam={city} />
    </div>
  )
}
