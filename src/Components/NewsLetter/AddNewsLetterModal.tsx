import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddNewsLetterModal } from "@/ReduxToolkit/Slice/NewsLetterSlice";
import { AddNewsLetterModalType, NewsLetterFormData } from "@/Types/NewsLetter";
import { NewsLetterSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddNewsLetterModal: FC<AddNewsLetterModalType> = ({ isEdit, setEdit, getAllNewsLetter }) => {
  const dispatch = useAppDispatch();
  const { isAddNewsLetterModal, singleEditingNewsLetter } = useAppSelector((state) => state.newsLetter);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(NewsLetterSchema) });

  useEffect(() => {
    if (singleEditingNewsLetter && isEdit) {
      setValue("email", singleEditingNewsLetter.email);
    }
  }, [isEdit, setValue, singleEditingNewsLetter]);

  const onCloseModal = () => {
    getAllNewsLetter();
    reset();
    setEdit(false);
    dispatch(setAddNewsLetterModal());
  };

  const onSubmit = async (data: NewsLetterFormData) => {
    try {
      const response = isEdit ? await Post(Url_Keys.NewsLetter.Edit, { newsLetterId: singleEditingNewsLetter._id, ...data }) : await Post(Url_Keys.NewsLetter.Add, data);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };



  return (
    <Modal centered isOpen={isAddNewsLetterModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit News Letter" : "Add News Letter"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="12" className="input-box">
                  <Label>Email</Label>
                  <input placeholder="Email" {...register("email")} />
                  {errors.email && <span className="text-danger">{errors.email.message}</span>}
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

export default AddNewsLetterModal;
