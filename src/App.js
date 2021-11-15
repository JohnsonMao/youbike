import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Index from './pages/Index';
import Station from './pages/Station';
import Shape from './pages/Shape';
import './asset/scss/style.scss';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="station/*" element={<Station />} />
        <Route path="shape/*" element={<Shape />} />
      </Routes>
    </HashRouter>
  )
}
