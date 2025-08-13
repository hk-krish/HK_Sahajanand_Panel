import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddUniqueCategoryModal } from "@/ReduxToolkit/Slice/ProductSlice";
import { AddUniqueCategoryModalType, UniqueCategoryFormData } from "@/Types/Product";
import { UniqueCategorySchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddUniqueCategoryModal: FC<AddUniqueCategoryModalType> = ({ isEdit, setEdit, getAllUniqueCategory }) => {
  const [photo, setPhoto] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { isAddUniqueCategoryModal, singleEditingUniqueCategory } = useAppSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UniqueCategorySchema) });

  useEffect(() => {
    if (singleEditingUniqueCategory && isEdit) {
      setValue("name", singleEditingUniqueCategory.name);
      setValue("priority", singleEditingUniqueCategory.priority);
      if (singleEditingUniqueCategory.image) {
        setValue("image", [singleEditingUniqueCategory.image]);
        setPhoto([singleEditingUniqueCategory.image]);
        trigger("image");
      }
    }
  }, [isEdit, setValue, singleEditingUniqueCategory, trigger]);

  const onCloseModal = () => {
    getAllUniqueCategory();
    reset();
    setEdit(false);
    dispatch(setAddUniqueCategoryModal());
    setPhoto([]);
  };

  const onSubmit = async (data: UniqueCategoryFormData) => {
    const UniqueCategory = {
      name: data.name,
      priority: data.priority,
      image: photo[0],
    };
    try {
      const response = isEdit ? await Post(Url_Keys.UniqueCategory.Edit, { uniqueCategoryId: singleEditingUniqueCategory._id, ...UniqueCategory }) : await Post(Url_Keys.UniqueCategory.Add, UniqueCategory);
      if (response?.status === 200) {
        onCloseModal();
        trigger("image");
      }
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddUniqueCategoryModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Unique Category" : "Add Unique Category"}
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
                <Col md="12" className="custom-dropzone-project input-box">
                  <div className="mb-3">
                    <Label>Upload Image</Label>
                    <CommonImageUpload name="image" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} />
                  </div>
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

export default AddUniqueCategoryModal;
