import React from 'react';
import { useLocation } from 'react-router-dom';

import HeaderNavbar from '../../components/HeaderNavbar';
import CardList from '../../components/CardList';
import { getSearchVal } from "../../utils";

export default function Shape() {
  const { search } = useLocation();

  const city = getSearchVal(search, "city");
  return (
    <div>
      <HeaderNavbar page="shape" searchParam={city} />
      <CardList searchParam={city} />
    </div>
  )
}
