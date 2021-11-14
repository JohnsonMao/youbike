import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { ReactComponent as Logo } from "../../asset/icon/logo.svg";
import { ReactComponent as Bike } from "../../asset/icon/bike.svg";
import { ReactComponent as Parking } from "../../asset/icon/parking.svg";
import "./navbar.scss";

export default function Navbar() {
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
            <li>
              <NavLink
                to="rent"
                className="d-flex align-items-end rounded-pill fs-"
              >
                <Bike className="bike me-2" />
                <span>租車</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="return"
                className="d-flex align-items-end rounded-pill fs-4"
              >
                <Parking className="parking me-2" />
                <span>還車</span>
              </NavLink>
            </li>
          </ul>
        </Col>
        <Col>
          <label htmlFor="lane" className="switch position-relative d-block mx-auto">
            <input type="checkbox" id="lane" className="opacity-0" />
            <span className="slider position-absolute top-0 start-0 end-0 bottom-0 rounded-pill"></span>
          </label>
        </Col>
      </Row>
    </header>
  );
}
