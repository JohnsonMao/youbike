import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import { ReactComponent as Bike } from "../../asset/icon/bike.svg";
import { ReactComponent as Parking } from "../../asset/icon/parking.svg";
import "./footerNavbar.scss";

export default function FooterNavbar({ menu = [], page = "", searchParam, searchCity }) {
  return (
    <nav className="fixed-bottom bg-primary d-lg-none">
      <Container>
        <ul className="d-flex nav">
          {menu.map((item) => (
            <li key={item.to} className="flex-fill">
              <Link
                to={`?type=${item.to}&city=${searchCity}`}
                className={`d-flex justify-content-center align-items-end fs-1 py-3 ${
                  searchParam === item.to ? "active" : ""
                } ${item.icon}`}
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
      </Container>
    </nav>
  );
}
