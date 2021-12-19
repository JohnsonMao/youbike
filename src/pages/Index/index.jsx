import React from "react";
import Lottie from "lottie-react-web";
import { Link } from "react-router-dom";

import youbike from "../../asset/icon/youbike.json";
import { ReactComponent as Logo } from "../../asset/icon/logo.svg";
import "./index.scss";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link
            to="station?type=rent&city=Taipei"
            className="d-block w-100 btn fs-2 p-3 mb-7"
          >
            尋找 Youbike
          </Link>
        </li>
        <li>
          <Link to="shape" className="d-block w-100 btn fs-2 p-3 mb-7">
            查詢自行車道
          </Link>
        </li>
        <li>
          <Link to="tourism" className="d-block w-100 btn fs-2 p-3">
            附近景點、美食
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default function Index() {
  return (
    <div className="vh-100 bg-primary d-flex justify-content-center">
      <div className="index_menu d-flex flex-column justify-content-evenly py-8">
        <header className="header mt-8">
          <div className="border-bottom border-dark border-3 mb-2 stone">
            <div className="w-50 animation-bumps">
              <Lottie
                options={{
                  animationData: youbike,
                }}
              />
            </div>
          </div>
          <h1 className="fs-6 mb-0">
            <Logo className="header__logo" />
            Where's YouBide
          </h1>
          <h2 className="fs-5">微笑單車．暢遊城市</h2>
        </header>
        <Nav />
        <div className="fixed-bottom fs-6 text-end pe-8 pb-3">
          Where’s YouBike　© Code:{" "}
          <a
            href="https://github.com/JohnsonMao/youbike"
            target="_blank"
            className="text-dark"
            rel="noreferrer"
          >
            Mao
          </a>
          　/　Design:{" "}
          <a
            href="https://www.behance.net/gallery/131133281/YouBike-Map-Project"
            target="_blank"
            className="text-dark"
            rel="noreferrer"
          >
            KT
          </a>
        </div>
      </div>
    </div>
  );
}
