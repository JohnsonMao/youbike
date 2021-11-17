import L from "leaflet";

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

export { rentStationSVG, returnStationSVG, emptyStationSVG };
