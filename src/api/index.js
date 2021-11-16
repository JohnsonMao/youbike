import ajax from "./ajax";

const ROOT_URL = 'https://ptx.transportdata.tw/MOTC/v2/';
const TOURISM_URL = "https://ptx.transportdata.tw/MOTC/v2/Tourism";

/* 預設篩選活動資料 */
const initActivity = {
  $select: [
    "ID",
    "Name",
    "Description",
    "Address",
    "Location",
    "Phone",
    "Picture",
    "Charge",
    "StartTime",
    "EndTime",
  ]
};
/* 活動 API */
export const apiActivity = (data = null, City = "") =>
  ajax(TOURISM_URL + "/Activity/" + City, { ...initActivity, ...data });

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

/* 預設篩選住宿資料 */
const initHotel = {
  $select: [
    "ID",
    "Name",
    "Description",
    "Grade",
    "Address",
    "Phone",
    "Picture",
    "Class",
    "ServiceInfo",
    "Spec",
  ]
};
/* 住宿 API */
export const apiHotel = (data = null, City = "") =>
  ajax(TOURISM_URL + "/Hotel/" + City, { ...initHotel, ...data });

/* 交通 API */
/* 路線資料：RouteUID（路線識別代碼）、TaiwanTripName（台灣好行路線名稱）
 *  url?$select=RouteUID,TaiwanTripName
 */
export const apiBusByCity = () =>
  ajax(TOURISM_URL + "/Bus/Route/TaiwanTrip", {
    $select: ["RouteUID", "TaiwanTripName"],
  });
// 預估到站資料
export const apiBusEstimatedTime = (TaiwanTripName) =>
  ajax(
    TOURISM_URL + "/Bus/EstimatedTimeOfArrival/TaiwanTrip/" + TaiwanTripName
  );
// 動態定點資料
export const apiBusNearStop = (TaiwanTripName) =>
  ajax(TOURISM_URL + "/Bus/RealTimeNearStop/TaiwanTrip/" + TaiwanTripName);
