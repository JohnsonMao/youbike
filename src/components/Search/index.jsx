import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";

import { ReactComponent as SearchIcon } from "../../asset/icon/search.svg";
import { bikeCityList } from "../../utils/cityList";
import "./search.scss";

export default function Search() {
  
  const [hide, setHide] = useState(true);
  const handleSelect = useCallback((e) => {
    const { node } = e.target.dataset;
    switch (node) {
      case "select":
        setHide(!hide);
        break;
      default:
        setHide(true);
    }
  }, [setHide, hide]);

  useEffect(() => {
    window.addEventListener("click", handleSelect);
    return () => {
      window.removeEventListener("click", handleSelect);
    };
  }, [handleSelect]);

  return (
    <Container>
      <form>
        <div className="form__group d-flex mx-auto">
          <div className="d-flex bg-light rounded shadow me-1">
            <div className="custom_select">
              <select>
                <option>請選擇縣市</option>
                {bikeCityList.map((item) => (
                  <option key={item.City} value={item.City}>
                    {item.CityName}
                  </option>
                ))}
              </select>
              <div
                className="select-selected p-4 rounded"
                data-node="select"
              >
                城市
              </div>
              <ul className={`select-items shadow ${hide ? "d-none" : null}`}>
                {bikeCityList.map((item) =>
                  <li key={item.City} className="d-block p-4">
                      {item.CityName}
                  </li>
                )}
              </ul>
            </div>
            <input
              type="search"
              placeholder="尋找站點"
              className="form__control fs-1 w-100 p-4"
            />
          </div>
          <button type="button" className="btn btn--dark p-4 shadow">
            <SearchIcon />
          </button>
        </div>
      </form>
    </Container>
  );
}
