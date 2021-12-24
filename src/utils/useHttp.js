import { useEffect, useState, useCallback, useMemo } from "react";

import { apiLocationType, apiBike, apiBikeStation, apiCyclingShape } from "../api";

export default function useHttp(
  city = "",
  type = "shape",
  nearby = [null, null],
  count = 100,
  page = 1
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);

  /* 1, 5, 9, 13...每 4 頁新增一次新的 4 頁內容 */
  const UPDATE_SKIP = 4;
  const newSkip = Math.floor((page - 1) / UPDATE_SKIP);
  const newCount = skip === 0 ? count : (count / 8) * UPDATE_SKIP;
  /* 往回按不會重複請求 */
  if (skip < newSkip) setSkip(newSkip);

  /* 頁數基礎參數 */
  const page_param = useMemo(() => {
    return {
      $top: newCount,
      $skip: count * skip,
    };
  }, [newCount, count, skip]);

  /* 使用定位 nearby */
  const nearby_param = useMemo(() => {
    return {
      $spatialFilter: `nearby(${nearby[0]},${nearby[1]},1000)`
    }
  }, [nearby])

  const updateData = useCallback(async () => {
    try {
      switch (type) {
        case "cityType":
          const {data: cityType} = await apiLocationType(nearby_param);
          setData(cityType);
          break;
        case "bike":
          const result = await apiBike('Nearby', nearby_param);
          const {data: stations} = await apiBikeStation(city);
          setData([result, stations]);
          break;
        case "shape":
          if (!city) break;
          const { data: shapes } = await apiCyclingShape(page_param ,city);
          setData(shapes);
          break
        default:
          break;
      }
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [type, city, nearby_param, page_param]);

  useEffect(() => {
    setData([]);
  }, [type]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const delay = setTimeout(() => {
      updateData();
    }, 0);
    return () => {
      clearTimeout(delay);
    };
  }, [updateData]);

  return { loading, error, data };
}
