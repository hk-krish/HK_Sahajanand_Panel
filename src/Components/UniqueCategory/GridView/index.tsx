import Delete from "@/Api/Delete";
import { Href, ImagePath, RouteList, Url_Keys } from "@/Constant";
import Pagination from "@/CoreComponents/Pagination";
import ProductImage from "@/CoreComponents/ProductImage";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchUniqueCategoryApiData, setAddUniqueCategoryModal, setSingleEditingUniqueCategory } from "@/ReduxToolkit/Slice/ProductSlice";
import { UniqueCategoryType } from "@/Types/Product";
import { dynamicNumber } from "@/Utils";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import AddUniqueCategoryModal from "./AddUniqueCategoryModal";

const GridView = () => {
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const [isEdit, setEdit] = useState(false);

  const dispatch = useAppDispatch();
  const { allUniqueCategory, isUniqueCategorySearchData, isLoadingUniqueCategory } = useAppSelector((state) => state.product);

  const DeleteItem = async (id: string) => {
    try {
      await Delete(`${Url_Keys.UniqueCategory.Delete}/${id}`);
      getAllUniqueCategory();
    } catch (error) {}
  };

  const EditItem = (item: UniqueCategoryType) => {
    dispatch(setSingleEditingUniqueCategory(item));
    dispatch(setAddUniqueCategoryModal());
    setEdit(true);
  };

  const getAllUniqueCategory = useCallback(async () => {
    try {
      await dispatch(fetchUniqueCategoryApiData({ page: page + 1, limit: pageLimit, search: isUniqueCategorySearchData }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isUniqueCategorySearchData]);

  useEffect(() => {
    getAllUniqueCategory();
  }, [getAllUniqueCategory]);

  return (
    <div className="product-wrapper-grid ratio_landscape">
      {isLoadingUniqueCategory ? (
        <Row className="gridRow">
          {dynamicNumber(8).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </Row>
      ) : allUniqueCategory?.totalData !== 0 ? (
        <Fragment>
          <Row className="gridRow">
            {allUniqueCategory?.unique_category_data?.map((item, index) => (
              <Col xl="3" md="4" sm="6" id="gridId" key={index}>
                <Card>
                  <div className="product-box">
                    <div className="product-img">
                      <ProductImage image={item?.image} />
                      <div className="product-hover">
                        <ul>
                          <li onClick={() => DeleteItem(item?._id)}>
                            <Link href={Href} color="transparent">
                              <i className="icon icon-trash" />
                            </Link>
                          </li>
                          <li onClick={() => EditItem(item)}>
                            <Link href={Href} color="transparent">
                              <i className="icon icon-pen" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-details">
                      <Link href={RouteList.Default}>
                        <h4>{item.name}</h4>
                      </Link>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination page={page} pageCount={allUniqueCategory?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
        </Fragment>
      ) : (
        <SearchNotFoundClass word="No items found in Category" />
      )}
      <AddUniqueCategoryModal isEdit={isEdit} setEdit={setEdit} getAllUniqueCategory={getAllUniqueCategory} />
    </div>
  );
};
export default GridView;
