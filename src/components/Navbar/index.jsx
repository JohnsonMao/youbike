import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ReactComponent as Logo } from "../../asset/icon/logo.svg";
import { ReactComponent as Bike } from "../../asset/icon/bike.svg";
import { ReactComponent as Parking } from "../../asset/icon/parking.svg";
import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="bg-primary">
      <Container className="d-flex justify-content-between align-items-center py-7">
        <Link to="/">
          <Logo className="logo" />
        </Link>
        <ul className="d-flex ">
          <li>
            <Link to="rent">
              <Bike />
              租車
            </Link>
          </li>
          <li>
            <Link to="return">
              <Parking />
              還車
            </Link>
          </li>
        </ul>
        <label for="lane">
          <input type="checkbox" id="lane" />
          <span></span>
        </label>
      </Container>
    </div>
  );
}
