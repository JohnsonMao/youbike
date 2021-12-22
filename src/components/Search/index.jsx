import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ReactComponent as SearchIcon } from "../../asset/icon/search.svg";
import { bikeCityList } from "../../utils/cityList";
import { getCityName } from "../../utils";
import "./search.scss";

export default function Search({ data = [], searchType, searchCity }) {
  const [hide, setHide] = useState(true);
  
  const [keyword, setKeyword] = useState("");
  const [resultShow, setResultShow] = useState(false);
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleResultShow = () => {
    setResultShow(true);
  }

  const handleSelect = useCallback(
    (e) => {
      const { node } = e.target.dataset;
      switch (node) {
        case "select":
          setHide(!hide);
          break;
        case "search":
          handleResultShow();
          break;
        default:
          setHide(true);
          setResultShow(false);
      }
    },
    [setHide, hide]
  );

  const clickResult = (e) => {
    setKeyword(e.target.innerText);
  };

  const filterData = data.filter(
    (item) => item.StationName.Zh_tw.indexOf(keyword) !== -1
  );

  const result = filterData.slice(0, 10);

  useEffect(() => {
    window.addEventListener("click", handleSelect);
    return () => {
      window.removeEventListener("click", handleSelect);
    };
  }, [handleSelect]);

  const cityName = getCityName(bikeCityList, searchCity);

  return (
    <Container className="position-absolute top-20 start-50 translate-middle">
      <form className="form">
        <div className="form__group d-flex mx-auto">
          <div className="d-flex bg-light rounded shadow me-1">
            <div className="custom_select">
              <select>
                {bikeCityList.map((item) => (
                  <option key={item.City} value={item.City}>
                    {item.CityName}
                  </option>
                ))}
              </select>
              <div
                className="select-selected p-3 py-2 rounded-start"
                data-node="select"
              >
                {cityName}
              </div>
              <ul className={`select-items shadow ${hide ? "d-none" : null}`}>
                <li>
                  <Link
                    to={`?type=${searchType}&city=${searchCity}`}
                    className="d-block text-dark p-3 py-2"
                  >
                    {cityName}
                  </Link>
                </li>
                {bikeCityList.map((item) =>
                  item.City.toLowerCase() ===
                  searchCity.toLowerCase() ? null : (
                    <li key={item.City}>
                      <Link
                        to={`?type=${searchType}&city=${item.City}`}
                        className="d-block text-dark p-3 py-2"
                      >
                        {item.CityName}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="position-relative">
              <input
                type="search"
                placeholder="尋找站點"
                className="form__control fs-2 w-100 p-3 py-2"
                onChange={handleKeyword}
                value={keyword}
                onFocus={handleResultShow}
                data-node="search"
              />
              <ul
                className="position-absolute w-100 form__result rounded-bottom overflow-hidden"
                onClick={clickResult}
              >
                {keyword.trim() && resultShow
                  ? result.map((item) => (
                      <li
                        key={item.StationUID}
                        className="p-1 ps-3 text-line-1"
                      >
                        {item.StationName.Zh_tw.slice(11)}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
          <button type="button" className="btn btn--dark p-3 py-2 shadow">
            <SearchIcon />
          </button>
        </div>
      </form>
    </Container>
  );
}
