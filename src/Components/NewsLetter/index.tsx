import Delete from "@/Api/Delete";
import { Href, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchNewsLetterApiData, setAddNewsLetterModal, setSingleEditingNewsLetter } from "@/ReduxToolkit/Slice/NewsLetterSlice";
import { NewsLetterType } from "@/Types/NewsLetter";
import { Edit, Trash } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import AddNewsLetterModal from "./AddNewsLetterModal";

const NewsLetterContainer = () => {
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const [isSearch, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const { isLoadingNewsLetter, allNewsLetter } = useAppSelector((state) => state.newsLetter);

  const AddNewsLetterModalClick = () => dispatch(setAddNewsLetterModal());
  const setSearchData = (e: string) => setSearch(e);

  const EditNewsLetter = (item: NewsLetterType) => {
    dispatch(setSingleEditingNewsLetter(item));
    setEdit(true);
    AddNewsLetterModalClick();
  };

  const DeleteEnquiry = async (id: string) => {
    try {
      await Delete(`${Url_Keys.NewsLetter.Delete}/${id}`);
      getAllNewsLetter();
    } catch (error) {}
  };

  const getAllNewsLetter = useCallback(async () => {
    try {
      await dispatch(fetchNewsLetterApiData({ page: page + 1, limit: pageLimit, search: isSearch }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isSearch]);

  useEffect(() => {
    getAllNewsLetter();
  }, [getAllNewsLetter]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="News Letter" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={setSearchData} searchClass="col-md-10 col-sm-7" btnTitle="Add News Letter" btnClick={AddNewsLetterModalClick} />
            <CardBody>
              {isLoadingNewsLetter ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allNewsLetter?.totalData !== 0 ? (
                <Fragment>
                  <Table responsive className="mb-4">
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Sr No.</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allNewsLetter?.newsletter_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{page * pageLimit + index + 1} </td>
                          <td>{item.email}</td>
                          <td>
                            <Button color="primary" href={Href} className="m-1 p-1" onClick={() => EditNewsLetter(item)}>
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
                  <Pagination page={page} pageCount={allNewsLetter?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in News Letter" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddNewsLetterModal isEdit={isEdit} setEdit={setEdit} getAllNewsLetter={getAllNewsLetter} />
    </Fragment>
  );
};

export default NewsLetterContainer;
