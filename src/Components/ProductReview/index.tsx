import { Href } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchProductReviewApiData, setAddProductReviewModal, setSingleEditingProductReview } from "@/ReduxToolkit/Slice/ProductReview";
import { ProductReviewType } from "@/Types/ProductReview";
import { Edit } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import AddProductReviewModal from "./AddProductReviewModal";

const ProductReviewContainer = () => {
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const [isSearch, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const { isLoadingProductReview, allProductReview } = useAppSelector((state) => state.productReview);

  const AddProductReviewModalClick = () => dispatch(setAddProductReviewModal());
  const setSearchData = (e: string) => setSearch(e);

  const EditProductReview = (item: ProductReviewType) => {
    dispatch(setSingleEditingProductReview(item));
    setEdit(true);
    AddProductReviewModalClick();
  };

  const getAllProductReview = useCallback(async () => {
    try {
      await dispatch(fetchProductReviewApiData({ page: page + 1, limit: pageLimit, search: isSearch }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isSearch]);

  useEffect(() => {
    getAllProductReview();
  }, [getAllProductReview]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="ProductReview" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={setSearchData} searchClass="col-md-10 col-sm-7" btnTitle="Add ProductReview" btnClick={AddProductReviewModalClick} />
            <CardBody>
              {isLoadingProductReview ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allProductReview?.totalData !== 0 ? (
                <Fragment>
                  <Table responsive className="mb-4">
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Sr No.</th>
                        <th>Product</th>
                        <th>Message</th>
                        <th>Rating</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProductReview?.review_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{page * pageLimit + index + 1} </td>
                          <td>{item?.product?.name}</td>
                          <td>{item.comment}</td>
                          <td><Rating readonly initialValue={item?.rating || 0} size={20} className="mt-1" /></td>
                          <td>
                            <Button color="primary" href={Href} className="m-1 p-1" onClick={() => EditProductReview(item)}>
                              <Edit className="action" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination page={page} pageCount={allProductReview?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in ProductReview" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddProductReviewModal isEdit={isEdit} setEdit={setEdit} getAllProductReview={getAllProductReview} />
    </Fragment>
  );
};

export default ProductReviewContainer;
