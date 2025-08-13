import Delete from "@/Api/Delete";
import { Href, ImagePath, RouteList, Url_Keys } from "@/Constant";
// import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchProductApiData, setSingleEditingProduct } from "@/ReduxToolkit/Slice/ProductSlice";
import { ProductType } from "@/Types/Product";
import { dynamicNumber } from "@/Utils";
import RatioImage from "@/Utils/RatioImage";
import { Pagination } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";

const GridView = () => {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allProduct, isProductSearchData, isLoadingProduct } = useAppSelector((state) => state.product);
  const pathname = usePathname();

  const rawSearchParams = useSearchParams();
  useEffect(() => {
  const params = new URLSearchParams(rawSearchParams?.toString() || "");
  const page = params.get("page");
  const pageLimit = params.get("pageLimit");
  setPage(parseInt(page) || 1);
  setPageLimit(parseInt(pageLimit) || 10);
  }, [pathname, rawSearchParams, router]);
  
  useEffect(() => {
  const params = new URLSearchParams(rawSearchParams?.toString() || "");
    const queryMap: Record<string, string | string[] | boolean | undefined> = {
      page: page.toString(),
      pageLimit : pageLimit.toString(),
    };
    Object.keys(queryMap).forEach((key) => {
      const value = queryMap[key];
      if (value) params.set(key, value as string);
    });
    router.push(`${pathname}?${params.toString()}`);
  }, [page, pageLimit, pathname, rawSearchParams, router]);

  const DeleteItem = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Product.Delete}/${id}`);
      getAllProduct();
    } catch (error) {}
  };

  const EditItem = (item: ProductType) => {
    dispatch(setSingleEditingProduct(item));
    router.push(`${RouteList.Product.EditProduct}?page=${page}&pageLimit=${pageLimit}`);
  };

  const getAllProduct = useCallback(async () => {
    try {
      const params = new URLSearchParams(rawSearchParams?.toString() || "");
      const page = params.get("page");
      const pageLimit = params.get("pageLimit");
      await dispatch(fetchProductApiData({ page: parseInt(page), limit: parseInt(pageLimit), search: isProductSearchData }));
    } catch (error) {}
  }, [rawSearchParams, dispatch, isProductSearchData]);

  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  return (
    <div className="product-wrapper-grid ratio_landscape">
      {isLoadingProduct ? (
        <Row className="gridRow">
          {dynamicNumber(8).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </Row>
      ) : allProduct?.totalData !== 0 ? (
        <Fragment>
          <Row className="gridRow">
            {allProduct?.product_data?.map((item, index) => (
              <Col xl="3" md="4" sm="6" id="gridId" key={index}>
                <Card>
                  <div className="product-box">
                    <div className="product-img">
                      <RatioImage src={item?.frontImage ? item?.frontImage : `${ImagePath}product/compare-1.jpg`} alt={`product-${index}`} className="img-fluid-box w-100 img-product" />
                      <RatioImage src={item?.backImage ? item?.backImage : `${ImagePath}product/compare-1.jpg`} alt={`product-${index}`} className="img-fluid-box w-100 img-hover" />
                      <div className="product-hover">
                        <ul>
                          <li onClick={() => EditItem(item)}>
                            <Link href={Href} color="transparent">
                              <i className="icon icon-pen" />
                            </Link>
                          </li>
                          <li onClick={() => DeleteItem(item?._id)}>
                            <Link href={Href} color="transparent">
                              <i className="icon icon-trash" />
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
          <Pagination
            align="end"
            current={page}
            pageSize={pageLimit}
            total={allProduct?.totalData || 0}
            showSizeChanger={true}
            onChange={(newPage, newPageSize) => {
              setPage(newPage);
              setPageLimit(newPageSize);
              router.push(`${RouteList.Product.Product}?page=${newPage}&pageLimit=${newPageSize}`);
            }}
          />
          {/* <Pagination page={page} pageCount={allProduct?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} /> */}
        </Fragment>
      ) : (
        <SearchNotFoundClass word="No items found in Product" />
      )}
    </div>
  );
};
export default GridView;
