import L from 'leaflet';

const stationSVG = new L.Icon({
    iconUrl: require('../../asset/icon/station.svg').default,
    iconRetinaUrl: require('../../asset/icon/station.svg').default,
    iconAnchor: null,
    popupAnchor: [0, 0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(36, 50),
    className: ''
});

export { stationSVG };