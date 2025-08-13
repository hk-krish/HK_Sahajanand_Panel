import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddProductReviewModal } from "@/ReduxToolkit/Slice/ProductReview";
import { fetchProductApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { AddProductReviewModalType, ProductReviewFormData } from "@/Types/ProductReview";
import { AddProductReviewSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddProductReviewModal: FC<AddProductReviewModalType> = ({ isEdit, setEdit, getAllProductReview }) => {
  const dispatch = useAppDispatch();
  const { isAddProductReviewModal, singleEditingProductReview } = useAppSelector((state) => state.productReview);
  const { allProduct } = useAppSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddProductReviewSchema) });

  useEffect(() => {
    if (singleEditingProductReview && isEdit) {
      setValue("productId", singleEditingProductReview.productId);
      setValue("rating", singleEditingProductReview.rating);
      setValue("comment", singleEditingProductReview.comment);
    }
  }, [isEdit, setValue, singleEditingProductReview]);

  const onCloseModal = () => {
    getAllProductReview();
    reset();
    setEdit(false);
    dispatch(setAddProductReviewModal());
  };

  const onSubmit = async (data: ProductReviewFormData) => {
    const ProductReview = {
      productId: data.productId,
      rating: data.rating,
      comment: data.comment,
    };
    try {
      const response = isEdit ? await Post(Url_Keys.ProductReview.Edit, { productReviewId: singleEditingProductReview._id, ...ProductReview }) : await Post(Url_Keys.ProductReview.Add, ProductReview);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(fetchProductApiData({}));
  }, [dispatch]);

  return (
    <Modal centered isOpen={isAddProductReviewModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Product Review" : "Add Product Review"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="12" className="input-box">
                  <Label>product</Label>
                  <select className="form-select" {...register("productId")}>
                    <option value="">-- Select Product --</option>
                    {allProduct?.product_data?.map((product, index) => (
                      <option value={product?._id} key={index}>
                        {product?.name}
                      </option>
                    ))}
                  </select>
                  {errors.productId && <span className="text-danger">{errors.productId.message}</span>}
                </Col>
                <Col md="12" className="input-box">
                  <Label>Rating</Label>
                  <div className="rating">
                    <Controller name="rating" control={control} render={({ field }) => <Rating onClick={(rate) => field.onChange(rate)} initialValue={field.value || 0} size={20} className="mt-1" />} />
                  </div>
                  {errors.rating && <span className="text-danger">{errors.rating.message}</span>}
                </Col>
                <Col md="12" className="input-box">
                  <Label>comment</Label>
                  <textarea placeholder="comment" {...register("comment")} />
                  {errors.comment && <span className="text-danger">{errors.comment.message}</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-center">
                    <Button type="submit" color="primary">
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddProductReviewModal;
