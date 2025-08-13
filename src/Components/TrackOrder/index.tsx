import { Href, ImagePath } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import RatioImage from "@/Utils/RatioImage";
import { Edit, Trash } from "iconsax-react";
import React, { Fragment } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";

const TrackOrderContainer = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Track Order" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader title="Track Order" />
            <CardBody>
              <Row>
                <Col xs="12">
                  <div className="order-left-image">
                    <div className="tracking-product-image">
                      <RatioImage className="img-fluid w-100" src={`${ImagePath}product/compare-1.jpg`} alt="profile" />
                    </div>
                    <div className="order-image-contain">
                      <h4>Ultimate Loaded Nacho Fiesta</h4>
                      <div className="tracker-number">
                        <p>
                          Order Number : <span>W765EWR8568871</span>
                        </p>
                        <p>
                          Order Placed : <span>June 25, 2024</span>
                        </p>
                      </div>
                      <h5>Your items is on the way. Tracking information will be available within 24 hours.</h5>
                    </div>
                  </div>
                </Col>
                <ol className="progtrckr">
                  <li className="progtrckr-done">
                    <h5>Order Processing</h5>
                    <h6>05:43 AM</h6>
                  </li>
                  <li className="progtrckr-done">
                    <h5>Pre-Production</h5>
                    <h6>01:21 PM</h6>
                  </li>
                  <li className="progtrckr-done">
                    <h5>In Production</h5>
                    <h6>Processing</h6>
                  </li>
                  <li className="progtrckr-todo">
                    <h5>Shipped</h5>
                    <h6>Pending</h6>
                  </li>
                  <li className="progtrckr-todo">
                    <h5>Delivered</h5>
                    <h6>Pending</h6>
                  </li>
                </ol>
                <Col xs="12" className="custom-table">
                  <Table responsive>
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Discription</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h6>30/04/2024</h6>
                        </td>
                        <td>
                          <h6>06:26 PM</h6>
                        </td>
                        <td>
                          <p className="fw-bold">Origin Scan</p>
                        </td>
                        <td>
                          <h6>38 Saxon Lane Mobile, AL 36605</h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6>02/02/2024</h6>
                        </td>
                        <td>
                          <h6>03:45 PM</h6>
                        </td>
                        <td>
                          <p className="fw-bold">Shipped Info Received</p>
                        </td>
                        <td>
                          <h6>3 Willow Street Chillicothe, OH 45601</h6>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default TrackOrderContainer;
