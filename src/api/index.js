import ajax from "./ajax";

const ROOT_URL = 'https://ptx.transportdata.tw/MOTC/v2/';
const TOURISM_URL = "https://ptx.transportdata.tw/MOTC/v2/Tourism";

/* 預設篩選站點資料 */
const initBikeStation = {
  $select: [
    "StationUID",
    "StationPosition",
    "StationAddress"
  ]
};
/* 預設篩選車位資料 */
const initBikeAvailability = {
  $select: [
    "StationUID",
    "ServiceStatus",
    "AvailableRentBikes",
    "AvailableReturnBikes"
  ]
};
/* 自行車站點 API */
const apiBikeStation = (data = null, City = "Taipei") =>
  ajax(ROOT_URL + "/Bike/Station/" + City, { ...initBikeStation, ...data });
/* 自行車車位 API */
const apiBikeAvailability = (data = null, City = "Taipei") =>
  ajax(ROOT_URL + "/Bike/Availability/" + City, { ...initBikeAvailability, ...data });
/* 整合站點與車位的 API */
export const apiBike = async (data = null, City = 'Taipei') => {
  const { data: bikeStation } = await apiBikeStation(data, City);
  const { data: bikeAvailability } =  await apiBikeAvailability(data, City);
  const result = [];
  bikeStation.forEach((item, index) => {
    result[index] = Object.assign(item, bikeAvailability[index])
  })
  return result
}

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
  ]
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
  ]
};
/* 景點 API 
  Name,Description,Phone,Address,OpenTime,Picture,TicketInfo 
  $filter=contains(Name,'過濾')*/
export const apiScenicSpot = (data = null, City = "") =>
  ajax(TOURISM_URL + "/ScenicSpot/" + City, { ...initScenicSpot, ...data });
