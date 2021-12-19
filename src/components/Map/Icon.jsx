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

const rentStationSVG = new L.Icon({
  iconUrl: require("../../asset/icon/rentStation.svg").default,
  iconRetinaUrl: require("../../asset/icon/rentStation.svg").default,
  iconAnchor: null,
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(36, 50),
  className: "",
});

const returnStationSVG = new L.Icon({
  iconUrl: require("../../asset/icon/returnStation.svg").default,
  iconRetinaUrl: require("../../asset/icon/returnStation.svg").default,
  iconAnchor: null,
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(36, 50),
  className: "",
});

const emptyStationSVG = new L.Icon({
  iconUrl: require("../../asset/icon/emptyStation.svg").default,
  iconRetinaUrl: require("../../asset/icon/emptyStation.svg").default,
  iconAnchor: null,
  popupAnchor: [0, 0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(36, 50),
  className: "",
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
  rentStationSVG,
  returnStationSVG,
  emptyStationSVG,
  MarkerClusterIcon,
};
