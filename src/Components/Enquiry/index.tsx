import Delete from "@/Api/Delete";
import { Href, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { EnquiryTypeData, LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchEnquiryApiData, setAddEnquiryModal, setSingleEditingEnquiry } from "@/ReduxToolkit/Slice/EnquirySlice";
import { EnquiryType } from "@/Types/Enquiry";
import { Edit, Trash } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import AddEnquiryModal from "./AddEnquiryContainerModal";

const EnquiryContainer = () => {
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const [isTypeFilter, setTypeFilter] = useState("");

  const dispatch = useAppDispatch();
  const { isLoadingEnquiry, allEnquiry } = useAppSelector((state) => state.enquiry);

  const AddEnquiryModalClick = () => dispatch(setAddEnquiryModal());

  const DeleteEnquiry = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Enquiry.Delete}/${id}`);
      getAllEnquiry();
    } catch (error) {}
  };

  const EditEnquiry = (item: EnquiryType) => {
    dispatch(setSingleEditingEnquiry(item));
    setEdit(true);
    AddEnquiryModalClick();
  };

  const getAllEnquiry = useCallback(async () => {
    try {
      await dispatch(fetchEnquiryApiData({ page: page + 1, limit: pageLimit, typeFilter: isTypeFilter }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isTypeFilter]);

  useEffect(() => {
    getAllEnquiry();
  }, [getAllEnquiry]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Enquiry" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader rowClass="justify-content-end" typeFilter={setTypeFilter} typeFilterData={EnquiryTypeData} btnTitle="Add Enquiry" btnClick={AddEnquiryModalClick} />
            <CardBody>
              {isLoadingEnquiry ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allEnquiry?.totalData !== 0 ? (
                <Fragment>
                  <Table responsive className="mb-4">
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allEnquiry?.enquiry_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{page * pageLimit + index + 1} </td>
                          <td>{item?.name}</td>
                          <td>{item.email}</td>
                          <td>{item.message}</td>
                          <td>
                            <Button color="primary" href={Href} className="m-1 p-1" onClick={() => EditEnquiry(item)}>
                              <Edit className="action" />
                            </Button>
                            <Button color="danger" href={Href} className="m-1 p-1" onClick={() => DeleteEnquiry(item?._id)}>
                              <Trash className="action" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination page={page} pageCount={allEnquiry?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in Enquiry" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddEnquiryModal isEdit={isEdit} setEdit={setEdit} getAllEnquiry={getAllEnquiry} />
    </Fragment>
  );
};

export default EnquiryContainer;
