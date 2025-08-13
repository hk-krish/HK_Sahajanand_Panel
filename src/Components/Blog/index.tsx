import Delete from "@/Api/Delete";
import { Href, ImagePath, RouteList, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import ProductImage from "@/CoreComponents/ProductImage";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchBlogApiData, setBlogSearchData, setSingleEditingBlog } from "@/ReduxToolkit/Slice/BlogSlice";
import { BlogType } from "@/Types/Blog";
import { dynamicNumber } from "@/Utils";
import RatioImage from "@/Utils/RatioImage";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const BlogContainer = () => {
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const { allBlog, isBlogSearchData, isLoadingBlog } = useAppSelector((state) => state.blog);

  const dispatch = useAppDispatch();

  const setSearchData = (e: string) => dispatch(setBlogSearchData(e));

  const DeleteBlog = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Blog.Delete}/${id}`);
      getAllBlog();
    } catch (error) {}
  };

  const EditItem = (item: BlogType) => {
    dispatch(setSingleEditingBlog(item));
  };

  const getAllBlog = useCallback(async () => {
    try {
      await dispatch(fetchBlogApiData({ page: page + 1, limit: pageLimit, search: isBlogSearchData }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isBlogSearchData]);

  useEffect(() => {
    getAllBlog();
  }, [getAllBlog]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Blog" parent="Pages" />
      <Container fluid>
        <Col sx="12">
          <Card>
            <CommonCardHeader searchClass="col-md-10 col-sm-7" Search={setSearchData} btnTitle="Add Blog" btnLink={RouteList.Blog.AddBlog} />
            <CardBody>
              <div className="blog-boxes">
                {isLoadingBlog ? (
                  <Row className="gridRow">
                    {dynamicNumber(8).map((_, index) => (
                      <Skeleton key={index} />
                    ))}
                  </Row>
                ) : allBlog?.totalData !== 0 ? (
                  <Fragment>
                    <Row className="g-4 mb-4">
                      {allBlog?.blog_data?.map((item, index) => (
                        <Col xs="12" sm="6" lg="4" xl="3" key={index}>
                          <div className="blog-box list-box">
                            <div className="blog-image">
                              <RatioImage src={item?.image ? item?.image : `${ImagePath}product/compare-1.jpg`} alt={`product-${index}`} className="img-fluid w-100" />
                              <div className="product-hover">
                                <ul>
                                  <li onClick={() => DeleteBlog(item?._id)}>
                                    <Link href={Href} color="transparent">
                                      <i className="icon icon-trash" />
                                    </Link>
                                  </li>
                                  <li onClick={() => EditItem(item)}>
                                    <Link href={RouteList.Blog.EditBlog} color="transparent">
                                      <i className="icon icon-pen" />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="blog-details border-0">
                              <h6 className="mt-0">{item?.metaTitle}</h6>
                              <a href={Href}>
                                <h5>{item?.title}</h5>
                              </a>
                              <p>{item?.content}</p>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                    <Pagination page={page} pageCount={allBlog?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                  </Fragment>
                ) : (
                  <SearchNotFoundClass word="No items found in Blog" />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default BlogContainer;
