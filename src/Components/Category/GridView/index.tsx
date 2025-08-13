import Delete from "@/Api/Delete";
import { Href, ImagePath, RouteList, Url_Keys } from "@/Constant";
import Pagination from "@/CoreComponents/Pagination";
import ProductImage from "@/CoreComponents/ProductImage";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchCategoryApiData, setSingleEditingCategory } from "@/ReduxToolkit/Slice/ProductSlice";
import { CategoryType } from "@/Types/Product";
import { dynamicNumber } from "@/Utils";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";

const GridView = () => {
  const { allCategory, isCategorySearchData, isLoadingCategory } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);

  const DeleteItem = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Category.Delete}/${id}`);
      getAllCategory();
    } catch (error) {}
  };

  const EditItem = (item: CategoryType) => {
    dispatch(setSingleEditingCategory(item));
  };

  const getAllCategory = useCallback(async () => {
    try {
      await dispatch(fetchCategoryApiData({ page: page + 1, limit: pageLimit, search: isCategorySearchData }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isCategorySearchData]);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  return (
    <div className="product-wrapper-grid ratio_landscape">
      {isLoadingCategory ? (
        <Row className="gridRow">
          {dynamicNumber(8).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </Row>
      ) : allCategory?.totalData !== 0 ? (
        <Fragment>
          <Row className="gridRow">
            {allCategory?.category_data?.map((item, index) => (
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
                            <Link href={RouteList.Category.EditCategory} color="transparent">
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
                      <div className="product-price">{item.slug}</div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination page={page} pageCount={allCategory?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
        </Fragment>
      ) : (
        <SearchNotFoundClass word="No items found in Category" />
      )}
    </div>
  );
};
export default GridView;
