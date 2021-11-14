import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidHV0ZWxhcnltYW8iLCJhIjoiY2t2dzgwd3o0MGJpbzJvcWM2cDBxZjIzZyJ9.492lVuarZqXx6EIan-5SxA'
});

export default function CustomMap() {
  return (
    <Map
      style='mapbox://styles/mapbox/streets-v9'
      containerStyle={{
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        zIndex: '-1'
      }}
    >
      <Layer type='symbol' id="marker" layer={{ 'icon-image': 'marker-15'}}>
        <Feature coordinates={[25.047675, 121.517055]} />
      </Layer>
    </Map>
  )
}