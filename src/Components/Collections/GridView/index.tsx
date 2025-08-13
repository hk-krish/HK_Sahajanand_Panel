import Delete from "@/Api/Delete";
import { Href, RouteList, Url_Keys } from "@/Constant";
import Pagination from "@/CoreComponents/Pagination";
import ProductImage from "@/CoreComponents/ProductImage";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchCollectionApiData, setSingleEditingCollection } from "@/ReduxToolkit/Slice/ProductSlice";
import { CollectionType } from "@/Types/Product";
import { dynamicNumber } from "@/Utils";
import Link from "next/link";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";

const GridView = () => {
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);

  const dispatch = useAppDispatch();
  const { allCollection, isLoadingCollection, isCollectionSearchData } = useAppSelector((state) => state.product);

  const EditCollection = (item: CollectionType) => {
    dispatch(setSingleEditingCollection(item));
  };

  const DeleteCollection = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Collection.Delete}/${id}`);
      getAllCollection();
    } catch (error) {}
  };

  const getAllCollection = useCallback(async () => {
    try {
      await dispatch(fetchCollectionApiData({ page: page + 1, limit: pageLimit, search: isCollectionSearchData }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isCollectionSearchData]);

  useEffect(() => {
    getAllCollection();
  }, [getAllCollection]);

  return (
    <div className="product-wrapper-grid ratio_landscape">
      {isLoadingCollection ? (
        <Row className="gridRow">
          {dynamicNumber(8).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </Row>
      ) : allCollection?.totalData !== 0 ? (
        <Fragment>
          <Row className="gridRow">
            {allCollection?.collection_data?.map((item, index) => (
              <Col xl="3" md="4" sm="6" id="gridId" key={index}>
                <Card>
                  <div className="product-box">
                    <div className="product-img">
                      <ProductImage image={item?.image} />
                      <div className="product-hover">
                        <ul>
                          <li onClick={() => DeleteCollection(item?._id)}>
                            <Link href={Href} color="transparent">
                              <i className="icon icon-trash" />
                            </Link>
                          </li>
                          <li onClick={() => EditCollection(item)}>
                            <Link href={RouteList.Collections.EditCollections} color="transparent">
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
                      <div className="product-price">{item.type}</div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination page={page} pageCount={allCollection?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
        </Fragment>
      ) : (
        <SearchNotFoundClass word="No items found in Collection" />
      )}
    </div>
  );
};
export default GridView;
