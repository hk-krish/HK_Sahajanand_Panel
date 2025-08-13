import { dynamicNumber } from "@/Utils";
import { Edit, Trash } from "iconsax-react";
import { FC, Fragment } from "react";
import { Button, Card, CardHeader, Col, Table } from "reactstrap";

const Skeleton: FC<{ type?: string }> = ({ type }) => {
  return (
    <Fragment>
      {type === "table" ? (
        <Table responsive className="table-skeleton">
          <thead className="bg-light-primary">
            <tr>
              <th>Sr No.</th>
              <th>Desktop Image</th>
              <th>Mobile Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Link Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dynamicNumber(5).map((_, index) => (
              <tr key={index}>
                <td>
                  <div className="skeleton skeleton-text short" />
                </td>
                <td>
                  <div className="skeleton skeleton-img" />
                </td>
                <td>
                  <div className="skeleton skeleton-img" />
                </td>
                <td>
                  <div className="skeleton skeleton-text" />
                </td>
                <td>
                  <div className="skeleton skeleton-text" />
                </td>
                <td>
                  <div className="skeleton skeleton-text short" />
                </td>
                <td>
                  <div className="skeleton skeleton-text" />
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <Button color="primary" className="m-0 p-1" disabled>
                      <Trash className="action" />
                    </Button>
                    <Button color="danger" className="m-0 p-1" disabled>
                      <Edit className="action" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : type === "faq" ? (
        <Fragment>
          {dynamicNumber(5).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <h2 className="mb-0">
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <div className="skeleton skeleton-text w-75 my-2" />
                    <div className="skeleton skeleton-text w-25 my-2" />
                  </div>
                </h2>
              </CardHeader>
            </Card>
          ))}
        </Fragment>
      ) : (
        <Col xl="3" md="4" sm="6">
          <Card>
            <div className="product-box">
              <div className="product-img p-3">
                <div className="skeleton-image skeleton"></div>
              </div>
              <div className="product-details p-3 pt-0">
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text short"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          </Card>
        </Col>
      )}
    </Fragment>
  );
};

export default Skeleton;
