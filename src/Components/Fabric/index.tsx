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
import AddFabricModal from "./AddFabricModal";
import { fetchFabricApiData, setAddFabricModal, setSingleEditingFabric } from "@/ReduxToolkit/Slice/AttributeSlice";
import { AttributeType } from "@/Types/Attribute";

const FabricContainer = () => {
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);

  const dispatch = useAppDispatch();
  const { isLoadingFabric, allFabric } = useAppSelector((state) => state.attribute);

  const AddAttributeModalClick = () => dispatch(setAddFabricModal());

  const EditFabric = (item: AttributeType) => {
    dispatch(setSingleEditingFabric(item));
    setEdit(true);
    AddAttributeModalClick();
  };

  const DeleteEnquiry = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Fabric.Delete}/${id}`);
      getAllFabric();
    } catch (error) {}
  };

  const getAllFabric = useCallback(async () => {
    try {
      await dispatch(fetchFabricApiData({ page: page + 1, limit: pageLimit}));
    } catch (error) {}
  }, [dispatch, page, pageLimit]);

  useEffect(() => {
    getAllFabric();
  }, [getAllFabric]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Fabric" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader rowClass="justify-content-end" btnTitle="Add Fabric" btnClick={AddAttributeModalClick} />
            <CardBody>
              {isLoadingFabric ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allFabric?.totalData !== 0 ? (
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
                      {allFabric?.fabric_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{page * pageLimit + index + 1} </td>
                          <td>{item.name}</td>
                          <td>{item.priority}</td>
                          <td>
                            <Button color="primary" href={Href} className="m-1 p-1" onClick={() => EditFabric(item)}>
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
                  <Pagination page={page} pageCount={allFabric?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in Fabric" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddFabricModal isEdit={isEdit} setEdit={setEdit} getAllAttribute={getAllFabric} />
    </Fragment>
  );
};

export default FabricContainer;
