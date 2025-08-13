import { ImagePath } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setOrderHistoryDetailModal } from "@/ReduxToolkit/Slice/OrderHistorySlice";
import { AddEnquiryModalType } from "@/Types/Enquiry";
import RatioImage from "@/Utils/RatioImage";
import { FC } from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";

const OrderHistoryDetailContainerModal = () => {
  const dispatch = useAppDispatch();
  const { isOrderHistoryDetailModal, singleEditingOrderHistory } = useAppSelector((state) => state.order);

  const onCloseModal = () => {
    dispatch(setOrderHistoryDetailModal());
  };

  return (
    <Modal centered size="xl" isOpen={isOrderHistoryDetailModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        Order Detail
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0 custom-table">
        <Table responsive>
          <thead className="bg-light-primary">
            <tr>
              <th>Sr No.</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Color & Size</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {singleEditingOrderHistory?.products?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1} </td>
                <td>
                  <RatioImage className="img-fluid img-60" src={item?.productId?.images[0] ? item.productId?.images[0] : `${ImagePath}product/compare-1.jpg`} />
                </td>
                <td>{item?.productId?.name}</td>
                <td>
                  {item?.color} / {item?.size}
                </td>
                <td>{item?.quantity}</td>
                <td>₹{item?.price}</td>
                <td>₹{item?.price * item?.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}></td>
              <td>Subtotal:</td>
              <td>₹{singleEditingOrderHistory?.totalAmount}</td>
            </tr>
          </tfoot>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default OrderHistoryDetailContainerModal;
