import Delete from "@/Api/Delete";
import { Href, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchAskQuestionApiData, setAddAskQuestionModal, setSingleEditingAskQuestion } from "@/ReduxToolkit/Slice/AskQuestionSlice";
import { Edit, Trash } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import AddAskQuestionModal from "./AddAskQuestionModal";
import { AskAQuestionType } from "@/Types/AskQuestion";

const AskQuestionContainer = () => {
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);

  const dispatch = useAppDispatch();
  const { isLoadingAskQuestion, allAskQuestion } = useAppSelector((state) => state.askQuestion);

  const AddAskQuestionModalClick = () => dispatch(setAddAskQuestionModal());

  const EditAskQuestion = (item: AskAQuestionType) => {
    dispatch(setSingleEditingAskQuestion(item));
    setEdit(true);
    AddAskQuestionModalClick();
  };

  const DeleteEnquiry = async (id: string) => {
    try {
      await Delete(`${Url_Keys.AskQuestion.Delete}/${id}`);
      getAllAskQuestion();
    } catch (error) {}
  };

  const getAllAskQuestion = useCallback(async () => {
    try {
      await dispatch(fetchAskQuestionApiData({ page: page + 1, limit: pageLimit }));
    } catch (error) {}
  }, [dispatch, page, pageLimit]);

  useEffect(() => {
    getAllAskQuestion();
  }, [getAllAskQuestion]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Ask a Question" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader rowClass="justify-content-end" btnTitle="Add Ask a Question" btnClick={AddAskQuestionModalClick} />
            <CardBody>
              {isLoadingAskQuestion ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allAskQuestion?.totalData !== 0 ? (
                <Fragment>
                  <Table responsive className="mb-4">
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Sr No.</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Message</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allAskQuestion?.ask_a_question_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{page * pageLimit + index + 1} </td>
                          <td>{item.productId.name}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phoneNumber}</td>
                          <td>{item.message}</td>
                          <td>
                            <Button color="primary" href={Href} className="m-1 p-1" onClick={() => EditAskQuestion(item)}>
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
                  <Pagination page={page} pageCount={allAskQuestion?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in Ask A Question" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddAskQuestionModal isEdit={isEdit} setEdit={setEdit} getAllAskQuestion={getAllAskQuestion} />
    </Fragment>
  );
};

export default AskQuestionContainer;
