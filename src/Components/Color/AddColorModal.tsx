import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddColorModal } from "@/ReduxToolkit/Slice/AttributeSlice";
import { AddAttributeModalType, AttributeFormData } from "@/Types/Attribute";
import { ColorSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { ColorPicker } from "antd";
import { FC, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, InputGroup, InputGroupText, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddColorModal: FC<AddAttributeModalType> = ({ isEdit, setEdit, getAllAttribute }) => {
  const dispatch = useAppDispatch();
  const { isAddColorModal, singleEditingColor } = useAppSelector((state) => state.attribute);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ColorSchema) });

  useEffect(() => {
    if (singleEditingColor && isEdit) {
      setValue("name", singleEditingColor.name);
      setValue("priority", singleEditingColor.priority);
      setValue("colorCode", singleEditingColor.colorCode);
    }
  }, [isEdit, setValue, singleEditingColor]);

  const onCloseModal = () => {
    getAllAttribute();
    reset();
    setEdit(false);
    dispatch(setAddColorModal());
  };

  const onSubmit = async (data: AttributeFormData) => {
    try {
      const response = isEdit ? await Post(Url_Keys.Color.Edit, { colorId: singleEditingColor._id, ...data }) : await Post(Url_Keys.Color.Add, data);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddColorModal} toggle={onCloseModal} modalClassName="color-modal">
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Color" : "Add Color"}
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
                <Col md="12">
                  <div className="input-box">
                    <Label>Color</Label>
                    <InputGroup>
                      <Controller
                        name="colorCode"
                        control={control}
                        render={({ field }) => (
                          <>
                            <InputGroupText className="list-light-primary">
                              <ColorPicker value={field.value || "#1677ff"} onChange={(color) => field.onChange(color.toHexString())} />
                            </InputGroupText>
                            <Typeahead
                              id="color-typeahead"
                              options={[]}
                              onChange={(selected) => {
                                const value = selected[0];
                                if (typeof value === "string") {
                                  field.onChange(value);
                                } else if (value?.label) {
                                  field.onChange(value.label);
                                }
                              }}
                              selected={field.value ? [field.value] : []}
                              placeholder="Add Color"
                              allowNew
                              newSelectionPrefix="Add a new color: "
                              labelKey={(option) => (typeof option === "string" ? option : option.label)}
                            />
                          </>
                        )}
                      />
                      {errors.colorCode && <p className="text-danger">{errors.colorCode.message}</p>}
                    </InputGroup>
                  </div>
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

export default AddColorModal;
