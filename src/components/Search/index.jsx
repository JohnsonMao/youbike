import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ReactComponent as SearchIcon } from "../../asset/icon/search.svg";
import { bikeCityList } from "../../utils/cityList";
import { getCityName } from "../../utils";
import "./search.scss";

export default function Search({ searchType, searchCity }) {
  const [hide, setHide] = useState(true);
  const handleSelect = useCallback(
    (e) => {
      const { node } = e.target.dataset;
      switch (node) {
        case "select":
          setHide(!hide);
          break;
        default:
          setHide(true);
      }
    },
    [setHide, hide]
  );

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
                {bikeCityList.map((item) => (
                  item.City.toLowerCase() === searchCity.toLowerCase() ? null :
                  <li key={item.City}>
                    <Link
                      to={`?type=${searchType}&city=${item.City}`}
                      className="d-block text-dark p-3 py-2"
                    >
                      {item.CityName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="search"
              placeholder="尋找站點"
              className="form__control fs-2 w-100 p-3 py-2"
            />
          </div>
          <button type="button" className="btn btn--dark p-3 py-2 shadow">
            <SearchIcon />
          </button>
        </div>
      </form>
    </Container>
  );
}
