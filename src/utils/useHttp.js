import { useEffect, useState, useCallback, useMemo } from "react";

import { apiBike, apiCyclingShape } from "../api";

export default function useHttp(
  city = "",
  type = "shape",
  nearby = "",
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
      $spatialFilter: nearby
    }
  }, [nearby])

  const updateData = useCallback(async () => {
    try {
      switch (type) {
        case "bike":
          const result = await apiBike(nearby_param);
          setData(result);
          break;
        case "shape":
          console.log(city)
          if (!city) break;
          const { data } = await apiCyclingShape(page_param ,city);
          setData(data);
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
