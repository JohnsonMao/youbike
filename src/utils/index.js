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
  const index = cityList.findIndex((obj) => obj.City === searchParam)
  if (index === -1) {
    return false
  } else {
    return cityList[index].CityName
  }
}