import L from "leaflet";

const GPS_SVG = new L.Icon({
  iconUrl: require("../../asset/icon/youbike_GPS.svg").default,
  iconRetinaUrl: require("../../asset/icon/youbike_GPS.svg").default,
  iconAnchor: null,
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(24, 24),
  className: "GPS animation-radar",
});

const stationSVG = new L.Icon({
  iconUrl: require("../../asset/icon/station.svg").default,
  iconRetinaUrl: require("../../asset/icon/station.svg").default,
  iconAnchor: null,
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(36, 50),
  className: "station",
});

const rentEmptyStationSVG = new L.Icon({
  iconUrl: require("../../asset/icon/station.svg").default,
  iconRetinaUrl: require("../../asset/icon/station.svg").default,
  iconAnchor: null,
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(36, 50),
  className: "rentEmpty station",
});

const returnEmptyStationSVG = new L.Icon({
  iconUrl: require("../../asset/icon/station.svg").default,
  iconRetinaUrl: require("../../asset/icon/station.svg").default,
  iconAnchor: null,
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(36, 50),
  className: "returnEmpty station",
});

const MarkerClusterIcon = (cluster) =>
  L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className:
      "bg-dark text-light rounded-circle d-flex justify-content-center align-items-center fs-2",
    iconSize: L.point(30, 30, true),
  });

export {
  GPS_SVG,
  stationSVG,
  rentEmptyStationSVG,
  returnEmptyStationSVG,
  MarkerClusterIcon,
};
