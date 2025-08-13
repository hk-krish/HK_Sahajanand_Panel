import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import { EnquiryTypeData } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddEnquiryModal } from "@/ReduxToolkit/Slice/EnquirySlice";
import { AddEnquiryModalType, EnquiryFormData } from "@/Types/Enquiry";
import { AddEnquirySchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddEnquiryModal: FC<AddEnquiryModalType> = ({ isEdit, setEdit, getAllEnquiry }) => {
  const dispatch = useAppDispatch();
  const { isAddEnquiryModal, singleEditingEnquiry } = useAppSelector((state) => state.enquiry);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddEnquirySchema) });

  useEffect(() => {
    if (singleEditingEnquiry && isEdit) {
      setValue("name", singleEditingEnquiry.name);
      setValue("email", singleEditingEnquiry.email);
      setValue("message", singleEditingEnquiry.message);
      setValue("type", singleEditingEnquiry.type);
    }
  }, [isEdit, setValue, singleEditingEnquiry]);

  const onCloseModal = () => {
    getAllEnquiry();
    reset();
    setEdit(false);
    dispatch(setAddEnquiryModal());
  };

  const onSubmit = async (data: EnquiryFormData) => {
    const Enquiry = {
      name: data.name,
      email: data.email,
      message: data.message,
      type:data.type
    };
    try {
      const response = isEdit ? await Post(Url_Keys.Enquiry.Edit, { enquiryId: singleEditingEnquiry._id, ...Enquiry }) : await Post(Url_Keys.Enquiry.Add, Enquiry);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddEnquiryModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Enquiry" : "Add Enquiry"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="12">
                  <div className="input-box">
                    <Label>Name</Label>
                    <input type="text" placeholder="Name" {...register("name")} />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                  </div>
                </Col>
                <Col md="12">
                  <div className="input-box">
                    <Label>Email</Label>
                    <input type="text" placeholder="Email" {...register("email")} />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </div>
                </Col>
                <Col md="12">
                  <div className="input-box">
                    <Label>Type</Label>
                    <select className="form-select" {...register("type")}>
                      <option value="">-- Select Type --</option>
                      {EnquiryTypeData?.map((banner, index) => (
                        <option value={banner?.value} key={index}>
                          {banner?.label}
                        </option>
                      ))}
                    </select>
                    {errors.type && <p className="text-danger">{errors.type.message}</p>}
                  </div>
                </Col>
                <Col md="12" className="input-box">
                  <Label>message</Label>
                  <textarea placeholder="comment" {...register("message")} />
                  {errors.message && <span className="text-danger">{errors.message.message}</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-center mt-2">
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

export default AddEnquiryModal;
