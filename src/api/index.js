import ajax from "./ajax";

const ROOT_URL = "https://ptx.transportdata.tw/MOTC/v2";
const TOURISM_URL = "https://ptx.transportdata.tw/MOTC/v2/Tourism";

/* 預設篩選站點資料 */
const initBikeStation = {
  $select: [
    "AuthorityID",
    "StationUID",
    "StationName",
    "ServiceType",
    "StationPosition",
    "StationAddress",
  ],
};
/* 預設篩選車位資料 */
const initBikeAvailability = {
  $select: [
    "StationUID",
    "ServiceStatus",
    "AvailableRentBikes",
    "AvailableReturnBikes",
  ],
};
/* 自行車站點 API */
export const apiBikeStation = (city = "Nearby", data = null) =>
  ajax(ROOT_URL + "/Bike/Station/" + city, { ...initBikeStation, ...data });
/* 自行車車位 API */
const apiBikeAvailability = (city = "Nearby", data = null) =>
  ajax(ROOT_URL + "/Bike/Availability/" + city, {
    ...initBikeAvailability,
    ...data,
  });
/* 獲取定位縣市代號 */
export const apiLocationType = (data = null) =>
  data.$spatialFilter.slice(7, 11) === "null"
    ? console.log("沒定位到")
    : ajax(ROOT_URL + "/Bike/Station/NearBy", { ...initBikeStation, ...data });
/* 整合站點與車位的 API */
export const apiBike = async (city = "Nearby", data = null) => {
  if (data?.$spatialFilter.slice(7, 11) === "null")
    return console.log("沒定位到");

  const { data: bikeStation } = await apiBikeStation(city, data);
  const { data: bikeAvailability } = await apiBikeAvailability(city, data);
  const result = [];
  bikeStation.forEach((item, index) => {
    result[index] = Object.assign(item, bikeAvailability[index]);
  });
  return result;
};

const initCyclingShape = {
  $select: [
    "RouteName",
    "Town",
    "RoadSectionStart",
    "RoadSectionEnd",
    "Direction",
    "CyclingLength",
    "Geometry",
  ],
};
/* 自行車道路 API */
export const apiCyclingShape = (City = "Taipei", data = null) =>
  ajax(ROOT_URL + "/Cycling/Shape/" + City, { ...initCyclingShape, ...data });

/* 預設篩選餐廳資料 */
const initRestaurant = {
  $select: [
    "ID",
    "Name",
    "Description",
    "Address",
    "Phone",
    "Picture",
    "OpenTime",
    "WebsiteUrl",
    "Class",
  ],
};
/* 餐飲 API */
export const apiRestaurant = (data = null, City = "") =>
  ajax(TOURISM_URL + "/Restaurant/" + City, { ...initRestaurant, ...data });

/* 預設篩選景點資料 */
const initScenicSpot = {
  $select: [
    "ID",
    "Name",
    "Description",
    "Address",
    "Phone",
    "Picture",
    "TicketInfo",
    "OpenTime",
  ],
};
/* 景點 API 
  Name,Description,Phone,Address,OpenTime,Picture,TicketInfo 
  $filter=contains(Name,'過濾')*/
export const apiScenicSpot = (data = null, City = "") =>
  ajax(TOURISM_URL + "/ScenicSpot/" + City, { ...initScenicSpot, ...data });
