import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { cityList } from "../../utils/cityList";
import Loading from "../Loading";
import { getCityName } from "../../utils";
import { ReactComponent as GPS } from "../../asset/icon/GPS_s.svg";

export default function CardList({ data, loading, searchParam }) {

  const cityName = getCityName(cityList, searchParam);

  return (
    <Container className="pt-header">
      {loading ? (
        <Loading />
      ) : searchParam ? (
        <Row xs={1} md={2} xl={3} as="ul" className="g-2">
          {data.map((item) => {
            const { Direction, CyclingLength } = item;
            return (
              <Col as="li" key={item.Geometry}>
                <div className="bg-light rounded-1 shadow p-3">
                  <h2 className="text-line-1">{item.RouteName}</h2>
                  <Row className="d-flex justify-content-between">
                    <Col className="fs-5 text-gray text-line-1">
                      {Direction && CyclingLength
                        ? Direction + " " + CyclingLength / 1000 + " 公里"
                        : !Direction && CyclingLength
                        ? "總長 " + CyclingLength / 1000 + " 公里"
                        : "未提供"}
                    </Col>
                    <Col className="fs-5 text-gray d-flex align-items-center">
                      <GPS className="flex-shrink-0" />
                      <span className="text-line-1">{cityName} {item.Town}</span>
                    </Col>
                  </Row>
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
