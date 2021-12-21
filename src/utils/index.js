export function getSearchVal(search, type) {
  const searchParams = search.substr(1).split('&');

  const total = searchParams.length
  for (let i = 0; i < total; i++) {
    const searchParam = searchParams[i].split('=')
    if (searchParam[0] === type) {
      return searchParam[1]
    }
  }
  return false
}

export const getCityName = (cityList, searchParam) => {
  if (!searchParam) return false
  const index = cityList.findIndex((obj) => obj.City?.toLowerCase() === searchParam.toLowerCase());
  if (index === -1) {
    return false
  } else {
    return cityList[index].CityName
  }
}

export const getCityFromType = (cityList, cityType) => {
  if (!cityType) return false
  const index = cityList.findIndex((obj) => obj.CityCode === cityType);
  if (index === -1) {
    return false
  } else {
    return cityList[index].City
  }
}