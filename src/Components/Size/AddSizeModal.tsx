import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddSizeModal } from "@/ReduxToolkit/Slice/AttributeSlice";
import { AddAttributeModalType, AttributeFormData } from "@/Types/Attribute";
import { AttributeSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddSizeModal: FC<AddAttributeModalType> = ({ isEdit, setEdit, getAllAttribute }) => {
  const dispatch = useAppDispatch();
  const { isAddSizeModal, singleEditingSize } = useAppSelector((state) => state.attribute);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AttributeSchema) });

  useEffect(() => {
    if (singleEditingSize && isEdit) {
      setValue("name", singleEditingSize.name);
      setValue("priority", singleEditingSize.priority);
    }
  }, [isEdit, setValue, singleEditingSize]);

  const onCloseModal = () => {
    getAllAttribute();
    reset();
    setEdit(false);
    dispatch(setAddSizeModal());
  };

  const onSubmit = async (data: AttributeFormData) => {
    try {
      const response = isEdit ? await Post(Url_Keys.Size.Edit, { sizeId: singleEditingSize._id, ...data }) : await Post(Url_Keys.Size.Add, data);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddSizeModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Size" : "Add Size"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="12" className="input-box">
                  <Label>Name</Label>
                  <input placeholder="Name" {...register("name")} />
                  {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </Col>
                <Col md="12" className="input-box">
                  <Label htmlFor="priority">Priority</Label>
                  <input type="number" id="priority" placeholder="Priority" {...register("priority")} />
                  {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
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

export default AddSizeModal;
