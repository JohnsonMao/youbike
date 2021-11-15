import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import CardList from '../../components/CardList';

export default function Shape() {
  return (
    <div>
      <Navbar />
      <CardList />
    </div>
  )
}
