import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { CategoryData } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddFaqModal } from "@/ReduxToolkit/Slice/FaqSlice";
import { AddFaqModalType, FaqType } from "@/Types/Faq";
import { AddFaqSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddFaqModal: FC<AddFaqModalType> = ({ isEdit, setEdit, getAllFaq }) => {
  const dispatch = useAppDispatch();
  const { isAddFaqModal, singleEditingFaq } = useAppSelector((state) => state.faq);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddFaqSchema) });

  useEffect(() => {
    if (singleEditingFaq && isEdit) {
      setValue("question", singleEditingFaq.question);
      setValue("answer", singleEditingFaq.answer);
      setValue("priority", singleEditingFaq.priority);
      setValue("category", singleEditingFaq.category);
    }
  }, [isEdit, setValue, singleEditingFaq]);

  const onCloseModal = () => {
    getAllFaq();
    reset();
    setEdit(false);
    dispatch(setAddFaqModal());
  };

  const onSubmit = async (data: FaqType) => {
    try {
      try {
        const response = isEdit ? await Post(Url_Keys.Faq.Edit, { faqId: singleEditingFaq._id, ...data }) : await Post(Url_Keys.Faq.Add, data);
        if (response?.status === 200) {
          onCloseModal();
        }
      } catch (error) {}
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddFaqModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Faq" : "Add Faq"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="12" className="input-box">
                  <Label htmlFor="question">question</Label>
                  <input id="question" placeholder="Question" {...register("question")} />
                  {errors.question && <span className="text-danger">{errors.question.message}</span>}
                </Col>
                <Col md="12" className="input-box">
                  <Label htmlFor="answer">answer</Label>
                  <textarea id="answer" placeholder="Answer" {...register("answer")} />
                  {errors.answer && <span className="text-danger">{errors.answer.message}</span>}
                </Col>
                <Col md="12" className="input-box">
                  <Label htmlFor="priority">Priority</Label>
                  <input type="number" id="priority" placeholder="Priority" {...register("priority")} />
                  {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
                </Col>
                <Col md="12">
                  <div className="input-box">
                    <Label>Category</Label>
                    <select className="form-select" {...register("category")}>
                      <option value="">-- Select Category --</option>
                      {CategoryData?.map((link, index) => (
                        <option value={link?.value} key={index}>
                          {link?.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-danger">{errors.category.message}</p>}
                  </div>
                </Col>
                <Col xs="12">
                  <Button type="submit" color="primary" className="w-100">
                    Save
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddFaqModal;
