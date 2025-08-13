import Delete from "@/Api/Delete";
import { Href, ImagePath, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { BannerTypeData, LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchBannerApiData, setAddBannerModal, setBannerSearchData, setSingleEditingBanner } from "@/ReduxToolkit/Slice/BannersSlice";
import { BannerType } from "@/Types/Banner";
import RatioImage from "@/Utils/RatioImage";
import { Edit, Trash } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import AddBannersModal from "./AddBannersModal";

const BannersContainer = () => {
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const [isTypeFilter, setTypeFilter] = useState("");

  const dispatch = useAppDispatch();
  const { allBanner, isBannerSearchData, isLoadingBanner } = useAppSelector((state) => state.banners);

  const AddBannerModalClick = () => dispatch(setAddBannerModal());
  const setSearchData = (e: string) => dispatch(setBannerSearchData(e));

  const DeleteBanner = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Banner.Delete}/${id}`);
      getAllBanner();
    } catch (error) {}
  };

  const EditBanner = (item: BannerType) => {
    dispatch(setSingleEditingBanner(item));
    setEdit(true);
    AddBannerModalClick();
  };

  const getAllBanner = useCallback(async () => {
    try {
      await dispatch(fetchBannerApiData({ page: page + 1, limit: pageLimit, search: isBannerSearchData, typeFilter: isTypeFilter }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isBannerSearchData, isTypeFilter]);

  useEffect(() => {
    getAllBanner();
  }, [getAllBanner]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Banners" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={setSearchData} searchClass="col-md-8" typeFilter={setTypeFilter} typeFilterData={BannerTypeData} btnTitle="Add Banners" btnClick={AddBannerModalClick} />
            <CardBody>
              {isLoadingBanner ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allBanner?.totalData !== 0 ? (
                <Fragment>
                  <Table responsive className="mb-4">
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Sr No.</th>
                        <th>Desktop Image</th>
                        <th>Mobile Image</th>
                        {/* <th>Title</th>   */}
                        {/* <th>Description</th> */}
                        <th>Type</th>
                        <th>Priority</th>
                        {/* <th>Link Type</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBanner?.banner_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{page * pageLimit + index + 1} </td>
                          <td>
                            <a href={item.imageDesktop} target="_blank">
                              <RatioImage className="img-fluid img-100" src={item?.imageDesktop ? item.imageDesktop : `${ImagePath}product/compare-1.jpg`} />
                            </a>
                          </td>
                          <td>
                            <a href={item.imageDesktop} target="_blank">
                              <RatioImage className="img-fluid img-100" src={item?.imageMobile ? item.imageMobile : `${ImagePath}product/compare-1.jpg`} />
                            </a>
                          </td>
                          {/* <td>{item.title}</td> */}
                          {/* <td>{item.description}</td> */}
                          <td>{item.type}</td>
                          <td>{item.priority}</td>
                          {/* <td>{item.linkType}</td> */}
                          <td>
                            <Button color="primary" href={Href} className="m-1 p-1" onClick={() => EditBanner(item)}>
                              <Edit className="action" />
                            </Button>
                            <Button color="danger" href={Href} className="m-1 p-1" onClick={() => DeleteBanner(item?._id)}>
                              <Trash className="action" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination page={page} pageCount={allBanner?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in Banner" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddBannersModal isEdit={isEdit} setEdit={setEdit} getAllBanner={getAllBanner} />
    </Fragment>
  );
};

export default BannersContainer;
