import { RouteList } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setProductSearchData } from "@/ReduxToolkit/Slice/ProductSlice";
import { Fragment } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import GridView from "./GridView";

const ProductContainer = () => {
  const dispatch = useAppDispatch();

  const setSearchData = (e: string) => dispatch(setProductSearchData(e));
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Product" parent="Pages" />
      <Container fluid className={`product-wrapper`}>
        <div className="product-grid">
          <Col sx="12">
            <Card>
              <CommonCardHeader searchClass="col-md-10 col-sm-7" Search={setSearchData} btnTitle="Add Product" btnLink={RouteList.Product.AddProduct} />
              <CardBody>
                <GridView />
              </CardBody>
            </Card>
          </Col>
        </div>
      </Container>
    </Fragment>
  );
};

export default ProductContainer;
