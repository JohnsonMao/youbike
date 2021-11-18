import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { cityList } from "../../utils/cityList";
import useHttp from "../../utils/useHttp";
import { getCityName } from "../../utils";
import { ReactComponent as GPS_s } from "../../asset/icon/GPS_s.svg";

export default function CardList({ searchParam }) {
  const { data, loading, error } = useHttp(searchParam);
  const cityName = getCityName(cityList, searchParam);
  console.log(data);

  return (
    <Container>
      {searchParam ? (
        <Row xs={1} md={2} xl={3} as="ul" className="g-2">
          {data.map((item) => {
            const { Direction, CyclingLength } = item;
            const town =
              item.Town === undefined
                ? "　　　"
                : item.Town.length === 2
                ? "　" + item.Town
                : item.Town;
            return (
              <Col as="li" key={item.Geometry}>
                <div className="bg-light rounded-1 shadow p-3">
                  <h2>{item.RouteName}</h2>
                  <div className="d-flex justify-content-between">
                    <span className="fs-5 text-gray">
                      {Direction && CyclingLength
                        ? Direction + " " + (CyclingLength / 1000) + " 公里"
                        : !Direction && CyclingLength
                        ? "總長 " + (CyclingLength / 1000) + " 公里"
                        : "未提供"}
                    </span>
                    <span className="fs-5 text-gray d-flex align-items-center">
                      <GPS_s />
                      {cityName} {town}
                    </span>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p className="fs-1 text-gray">尚未選擇任何縣市</p>
      )}
    </Container>
  );
}
