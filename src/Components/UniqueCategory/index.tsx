import { RouteList } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setAddUniqueCategoryModal, setUniqueCategorySearchData } from "@/ReduxToolkit/Slice/ProductSlice";
import { Fragment } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import GridView from "./GridView";

const UniqueCategoryContainer = () => {
  const dispatch = useAppDispatch();

  const setSearchData = (e: string) => dispatch(setUniqueCategorySearchData(e));
  const AddBannerModalClick = () => dispatch(setAddUniqueCategoryModal());

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Unique Category" parent="Pages" />
      <Container fluid className="product-wrapper">
        <div className="product-grid">
          <Col sx="12">
            <Card>
              <CommonCardHeader searchClass="col-md-10 col-sm-7" Search={setSearchData} btnTitle="Add Unique Category" btnClick={AddBannerModalClick} />
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

export default UniqueCategoryContainer;
