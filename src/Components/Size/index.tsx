import Delete from "@/Api/Delete";
import { Href, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { Edit, Trash } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import AddSizeModal from "./AddSizeModal";
import { fetchSizeApiData, setAddSizeModal, setSingleEditingSize } from "@/ReduxToolkit/Slice/AttributeSlice";
import { AttributeType } from "@/Types/Attribute";

const SizeContainer = () => {
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);

  const dispatch = useAppDispatch();
  const { isLoadingSize, allSize } = useAppSelector((state) => state.attribute);

  const AddAttributeModalClick = () => dispatch(setAddSizeModal());

  const EditSize = (item: AttributeType) => {
    dispatch(setSingleEditingSize(item));
    setEdit(true);
    AddAttributeModalClick();
  };

  const DeleteEnquiry = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Size.Delete}/${id}`);
      getAllSize();
    } catch (error) {}
  };

  const getAllSize = useCallback(async () => {
    try {
      await dispatch(fetchSizeApiData({ page: page + 1, limit: pageLimit}));
    } catch (error) {}
  }, [dispatch, page, pageLimit]);

  useEffect(() => {
    getAllSize();
  }, [getAllSize]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Size" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader rowClass="justify-content-end" btnTitle="Add Size" btnClick={AddAttributeModalClick} />
            <CardBody>
              {isLoadingSize ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allSize?.totalData !== 0 ? (
                <Fragment>
                  <Table responsive className="mb-4">
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSize?.size_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{page * pageLimit + index + 1} </td>
                          <td>{item.name}</td>
                          <td>{item.priority}</td>
                          <td>
                            <Button color="primary" href={Href} className="m-1 p-1" onClick={() => EditSize(item)}>
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
                  <Pagination page={page} pageCount={allSize?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in Size" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddSizeModal isEdit={isEdit} setEdit={setEdit} getAllAttribute={getAllSize} />
    </Fragment>
  );
};

export default SizeContainer;
