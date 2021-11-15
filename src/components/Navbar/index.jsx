import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { cityList } from "../../utils/cityList";
import { ReactComponent as Logo } from "../../asset/icon/logo.svg";
import { ReactComponent as Bike } from "../../asset/icon/bike.svg";
import { ReactComponent as Parking } from "../../asset/icon/parking.svg";
import "./navbar.scss";

export default function Navbar({ menu = [], type = "" }) {
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
  return (
    <header className="header bg-primary mb-8 py-7 px-3">
      <Row className="align-items-center">
        <Col>
          <h1 className="logoSize mx-auto mb-0">
            <Link to="/">
              <Logo className="header__logo" />
              Where's YouBide
            </Link>
          </h1>
        </Col>
        <Col>
          <ul className="d-flex menu rounded-pill mx-auto">
            {menu.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="d-flex align-items-end rounded-pill fs-4"
                >
                  {item.icon === "bike" ? (
                    <Bike className="bike me-2" />
                  ) : (
                    <Parking className="parking me-2" />
                  )}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          {type === "station" ? (
            <label htmlFor="lane" className="switch mx-auto">
              <input type="checkbox" id="lane" />
              <span className="slider rounded-pill"></span>
            </label>
          ) : (
            <div className="custom_select mx-auto">
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
                請選擇縣市
              </div>
              <ul className={`select-items ${hide ? "d-none" : null}`}>
                {cityList.map((item) => (
                  <li key={item.City} value={item.City} className="px-4 py-1">
                    {item.CityName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Col>
      </Row>
    </header>
  );
}
