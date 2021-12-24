import React from 'react';
import { useLocation } from 'react-router-dom';

import HeaderNavbar from '../../components/HeaderNavbar';
import CardList from '../../components/CardList';
import { getSearchVal } from "../../utils";
import useHttp from "../../utils/useHttp";

export default function Shape() {

  const { search } = useLocation();
  const city = getSearchVal(search, "city");
  const { data, loading } = useHttp(city, 'shape');

  return (
    <div>
      <HeaderNavbar page="shape" searchParam={city} />
      <CardList data={data} loading={loading} searchParam={city} />
    </div>
  )
}
