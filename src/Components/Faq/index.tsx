import Delete from "@/Api/Delete";
import { Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { CategoryData, LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchFaqApiData, setAddFaqModal, setFaqSearchData, setSingleEditingFaq } from "@/ReduxToolkit/Slice/FaqSlice";
import { FaqType } from "@/Types/Faq";
import { Add, Edit, Minus, Trash } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Collapse, Container, Row } from "reactstrap";
import AddSalesmanModal from "./AddFaqModal";

const FaqContainer = () => {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const [isTypeFilter, setTypeFilter] = useState("");

  const dispatch = useAppDispatch();
  const { allFaq, isFaqSearchData, isLoadingFaq } = useAppSelector((state) => state.faq);

  const handleChange = (id: string) => setActiveFaqId((prev) => (prev === id ? null : id));
  const AddFaqModalClick = () => dispatch(setAddFaqModal());
  const setSearchData = (e: string) => dispatch(setFaqSearchData(e));

  const DeleteFaq = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Faq.Delete}/${id}`);
      getAllFaq();
    } catch (error) {}
  };
  const EditFaq = (item: FaqType) => {
    dispatch(setSingleEditingFaq(item));
    setEdit(true);
    AddFaqModalClick();
  };

  const getAllFaq = useCallback(async () => {
    try {
      await dispatch(fetchFaqApiData({ page: page + 1, limit: pageLimit, search: isFaqSearchData, category: isTypeFilter }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isFaqSearchData, isTypeFilter]);


  useEffect(() => {
      getAllFaq();
  }, [getAllFaq]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="FAQ" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader searchClass="col-md-8" Search={setSearchData} typeFilter={setTypeFilter} typeFilterData={CategoryData} btnTitle="Add Faq" btnClick={AddFaqModalClick} />
            <CardBody>
              <div className="default-according style-1">
                <Col xl="12" className="input-items">
                  {isLoadingFaq ? (
                    <Row>
                      <Skeleton type="faq" />
                    </Row>
                  ) : allFaq?.totalData !== 0 ? (
                    <Fragment>
                      {allFaq?.faq_data?.map((item, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <h2 className="mb-0">
                              <Button color="transparent" className="btn-link collapsed justify-content-between" onClick={() => handleChange(item._id)}>
                                <span className="d-flex align-items-center justify-content-between gap-2">
                                  {item.question}
                                  <div className="d-flex align-items-center">
                                    <div className="faq-hover">
                                      <Trash size="22" onClick={() => DeleteFaq(item?._id)} />
                                      <Edit size="22" onClick={() => EditFaq(item)} />
                                    </div>
                                    {activeFaqId === item._id ? <Minus size="20" /> : <Add size="20" />}
                                  </div>
                                </span>
                              </Button>
                            </h2>
                          </CardHeader>
                          <Collapse isOpen={activeFaqId === item._id}>
                            <CardBody>{item.answer}</CardBody>
                          </Collapse>
                        </Card>
                      ))}
                      <Pagination page={page} pageCount={allFaq?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                    </Fragment>
                  ) : (
                    <SearchNotFoundClass word="No items found in FAQ" />
                  )}
                  <AddSalesmanModal isEdit={isEdit} setEdit={setEdit} getAllFaq={getAllFaq} />
                </Col>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default FaqContainer;
