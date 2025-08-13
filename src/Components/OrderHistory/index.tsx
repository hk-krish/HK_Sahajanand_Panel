import { Href } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchOrderHistoryApiData, setOrderHistoryDetailModal, setSingleEditingOrderHistory } from "@/ReduxToolkit/Slice/OrderHistorySlice";
import { OrderType } from "@/Types/OrderHistory";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import OrderHistoryDetailContainerModal from "./OrderHistoryDetailContainerModal";

const OrderHistoryContainer = () => {
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);

  const dispatch = useAppDispatch();
  const { isLoadingOrderHistory, allOrderHistory } = useAppSelector((state) => state.order);

  const EditEnquiry = (item: OrderType) => {
    dispatch(setSingleEditingOrderHistory(item));
    dispatch(setOrderHistoryDetailModal());
  };

  const getAllEnquiry = useCallback(async () => {
    try {
      await dispatch(fetchOrderHistoryApiData({ page: page + 1, limit: pageLimit }));
    } catch (error) {}
  }, [dispatch, page, pageLimit]);

  useEffect(() => {
    getAllEnquiry();
  }, [getAllEnquiry]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Order History" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CardBody>
              {isLoadingOrderHistory ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allOrderHistory?.totalData !== 0 ? (
                <Fragment>
                  <Table responsive className="mb-4">
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrderHistory?.order_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{page * pageLimit + index + 1} </td>
                          <td>{item?.userId.firstName} {item?.userId.lastName}</td>
                          <td>{item?.userId.email}</td>
                          <td>{item?.totalAmount}</td>
                          <td>{item?.orderStatus}</td>
                          <td>
                            <Button color="primary" href={Href} onClick={() => EditEnquiry(item)}>
                              Detail
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination page={page} pageCount={allOrderHistory?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in Enquiry" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <OrderHistoryDetailContainerModal />
    </Fragment>
  );
};

export default OrderHistoryContainer;
