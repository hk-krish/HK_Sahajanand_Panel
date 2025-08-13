import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddAskQuestionModal } from "@/ReduxToolkit/Slice/AskQuestionSlice";
import { fetchProductApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { AddAskQuestionModalType, AskQuestionFormData } from "@/Types/AskQuestion";
import { AskQuestionSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddAskQuestionModal: FC<AddAskQuestionModalType> = ({ isEdit, setEdit, getAllAskQuestion }) => {
  const dispatch = useAppDispatch();
  const { isAddAskQuestionModal, singleEditingAskQuestion } = useAppSelector((state) => state.askQuestion);
  const { allProduct } = useAppSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AskQuestionSchema) });

  useEffect(() => {
    if (singleEditingAskQuestion && isEdit) {
      setValue("name", singleEditingAskQuestion.name);
      setValue("phoneNumber", singleEditingAskQuestion.phoneNumber);
      setValue("email", singleEditingAskQuestion.email);
      setValue("message", singleEditingAskQuestion.message);
      setValue("productId", singleEditingAskQuestion.productId._id);
    }
  }, [isEdit, setValue, singleEditingAskQuestion]);

  const onCloseModal = () => {
    getAllAskQuestion();
    reset();
    setEdit(false);
    dispatch(setAddAskQuestionModal());
  };

  const onSubmit = async (data: AskQuestionFormData) => {
    try {
      const response = isEdit ? await Post(Url_Keys.AskQuestion.Edit, { aksAQuestionId: singleEditingAskQuestion._id, ...data }) : await Post(Url_Keys.AskQuestion.Add, data);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(fetchProductApiData({}));
  }, [dispatch]);

  return (
    <Modal centered size="xl" isOpen={isAddAskQuestionModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit News Letter" : "Add News Letter"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="6" className="input-box">
                  <Label>Name</Label>
                  <input placeholder="Name" {...register("name")} />
                  {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </Col>
                <Col md="6" className="input-box">
                  <Label>Product</Label>
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
                <Col md="6" className="input-box">
                  <Label>Email</Label>
                  <input placeholder="Email" {...register("email")} />
                  {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </Col>
                <Col md="6" className="input-box">
                  <Label>Phone Number</Label>
                  <input placeholder="Phone Number" {...register("phoneNumber")} />
                  {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
                </Col>
                <Col md="12" className="input-box">
                  <Label>message</Label>
                  <textarea placeholder="Message" {...register("message")} />
                  {errors.message && <span className="text-danger">{errors.message.message}</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-center mt-3">
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

export default AddAskQuestionModal;
