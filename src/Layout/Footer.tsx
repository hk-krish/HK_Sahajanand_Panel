import SvgIcon from "@/CoreComponents/SvgIcon";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="6" className="p-0 footer-copyright">
            <p className="mb-0">Copyright 2025 © HK Digiverse & IT Consultancy Pvt Ltd..</p>
          </Col>
          <Col md="6" className="p-0">
            <p className="heart mb-0">
              Hand crafted & made with
              <SvgIcon className="svg-color footer-icon ms-1" iconId="heart" />
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
