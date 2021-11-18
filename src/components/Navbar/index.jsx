import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { cityList } from "../../utils/cityList";
import { ReactComponent as Logo } from "../../asset/icon/logo.svg";
import { ReactComponent as Bike } from "../../asset/icon/bike.svg";
import { ReactComponent as Parking } from "../../asset/icon/parking.svg";
import { getCityName } from "../../utils";
import "./navbar.scss";

export default function Navbar({
  menu = [],
  page = "",
  handleType,
  searchParam,
}) {
  const [hide, setHide] = useState(true);
  const handleSelect = (e) => {
    const { node } = e.target.dataset;
    switch (node) {
      case "select":
        setHide(!hide);
        break;
      default:
        setHide(true);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleSelect);
    return () => {
      window.removeEventListener("click", handleSelect);
    };
  }, []);

  const a = (e) => {
    e.target.checked ? handleType(2) : handleType(1);
  };

  const cityName = getCityName(cityList, searchParam);

  return (
    <header className="header bg-primary mb-8 py-7">
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1 className="logoSize me-auto mb-0">
              <Link to="/">
                <Logo className="header__logo" />
                Where's YouBide
              </Link>
            </h1>
          </Col>
          <Col>
            <ul className={`d-flex menu rounded-pill mx-auto ${searchParam}`}>
              {menu.map((item) => (
                <li key={item.to}>
                  <Link
                    to={`?type=${item.to}`}
                    className={`d-flex align-items-end rounded-pill fs-4 ${item.icon}`}
                  >
                    {item.icon === "bike" ? (
                      <Bike className="bike me-2" />
                    ) : (
                      <Parking className="parking me-2" />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            {page === "station" ? (
              <label htmlFor="lane" className="switch ms-auto" onChange={a}>
                <input type="checkbox" id="lane" />
                <span className="slider rounded-pill"></span>
              </label>
            ) : (
              <div className="custom_select ms-auto">
                <select>
                  <option>請選擇縣市</option>
                  {cityList.map((item) => (
                    <option key={item.City} value={item.City}>
                      {item.CityName}
                    </option>
                  ))}
                </select>
                <div
                  className="select-selected px-4 py-1 rounded-pill"
                  data-node="select"
                >
                  {cityName || "選擇縣市"}
                </div>
                <ul className={`select-items ${hide ? "d-none" : null}`}>
                  {searchParam ? (
                    <li>
                      <Link
                        to={`?city=${searchParam}`}
                        className="d-block px-4 py-1"
                      >
                        {cityName}
                      </Link>
                    </li>
                  ) : null}
                  {cityList.map((item) =>
                    item.City === searchParam ? null : (
                      <li key={item.City}>
                        <Link
                          to={`?city=${item.City}`}
                          className="d-block px-4 py-1"
                        >
                          {item.CityName}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
}
