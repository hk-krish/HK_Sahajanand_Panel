import { RouteList } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setCollectionSearchData } from "@/ReduxToolkit/Slice/ProductSlice";
import { Fragment } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import GridView from "./GridView";

const CollectionsContainer = () => {
  
  const dispatch = useAppDispatch();

  const setSearchData = (e: string) => dispatch(setCollectionSearchData(e));

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Collections" parent="Pages" />
      <Container fluid className="product-wrapper">
        <div className="product-grid">
          <Col sx="12">
            <Card>
              <CommonCardHeader searchClass="col-md-10 col-sm-7" Search={setSearchData}  btnTitle="Add Collections" btnLink={RouteList.Collections.AddCollections} />
              <CardBody>
                <GridView/>
              </CardBody>
            </Card>
          </Col>
        </div>
      </Container>
    </Fragment>
  );
};

export default CollectionsContainer;
