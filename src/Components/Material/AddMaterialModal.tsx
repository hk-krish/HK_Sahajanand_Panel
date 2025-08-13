import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddMaterialModal } from "@/ReduxToolkit/Slice/AttributeSlice";
import { AddAttributeModalType, AttributeFormData } from "@/Types/Attribute";
import { AttributeSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddMaterialModal: FC<AddAttributeModalType> = ({ isEdit, setEdit, getAllAttribute }) => {
  const dispatch = useAppDispatch();
  const { isAddMaterialModal, singleEditingMaterial } = useAppSelector((state) => state.attribute);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AttributeSchema) });

  useEffect(() => {
    if (singleEditingMaterial && isEdit) {
      setValue("name", singleEditingMaterial.name);
      setValue("priority", singleEditingMaterial.priority);
    }
  }, [isEdit, setValue, singleEditingMaterial]);

  const onCloseModal = () => {
    getAllAttribute();
    reset();
    setEdit(false);
    dispatch(setAddMaterialModal());
  };

  const onSubmit = async (data: AttributeFormData) => {
    try {
      const response = isEdit ? await Post(Url_Keys.Material.Edit, { materialId: singleEditingMaterial._id, ...data }) : await Post(Url_Keys.Material.Add, data);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddMaterialModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Material" : "Add Material"}
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

export default AddMaterialModal;
