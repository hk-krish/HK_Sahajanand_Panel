import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import CustomCheckbox from "@/CoreComponents/CustomCheckbox";
import { BannerTypeData, LinkTypeData } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddBannerModal } from "@/ReduxToolkit/Slice/BannersSlice";
import { fetchCategoryApiData, fetchCollectionApiData, fetchProductApiData, fetchUniqueCategoryApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { AddBannersModalType, BannerFormData } from "@/Types/Banner";
import { AddBannerSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddBannersModal: FC<AddBannersModalType> = ({ isEdit, setEdit, getAllBanner }) => {
  const [isLinkType, setLinkType] = useState("");
  const [photo, setPhoto] = useState<string[]>([]);
  const [mobilePhoto, setMobilePhoto] = useState<string[]>([]);
  const [isOffer, setOffer] = useState("");

  const dispatch = useAppDispatch();
  const { isAddBannerModal, singleEditingBanner } = useAppSelector((state) => state.banners);
  const { allUniqueCategory, allCollection, allCategory } = useAppSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddBannerSchema) });

  useEffect(() => {
    if (singleEditingBanner && isEdit) {
      setValue("title", singleEditingBanner.title);
      setValue("priority", singleEditingBanner.priority);
      setValue("linkId", singleEditingBanner.linkId);
      setValue("description", singleEditingBanner.description);
      setValue("buttonText", singleEditingBanner.buttonText);
      setValue("percentage", singleEditingBanner.percentage);
      setValue("buttonVisible", singleEditingBanner.buttonVisible);
      if (singleEditingBanner.type) {
        setValue("type", singleEditingBanner.type);
        setOffer(singleEditingBanner.type);
      }
      if (singleEditingBanner.linkType) {
        setValue("linkType", singleEditingBanner.linkType);
        setLinkType(singleEditingBanner.linkType);
      }
      if (singleEditingBanner.imageDesktop) {
        setValue("image", [singleEditingBanner.imageDesktop]);
        setPhoto([singleEditingBanner.imageDesktop]);
        trigger("image");
      }
      if (singleEditingBanner.imageMobile) {
        setValue("mobileImage", [singleEditingBanner.imageMobile]);
        setMobilePhoto([singleEditingBanner.imageMobile]);
        trigger("mobileImage");
      }
    }
  }, [isEdit, setValue, singleEditingBanner, trigger]);

  const onCloseModal = () => {
    getAllBanner();
    reset();
    setEdit(false);
    dispatch(setAddBannerModal());
    setPhoto([]);
    setMobilePhoto([]);
  };

  const onSubmit = async (data: BannerFormData) => {
    let Banner: any = {
      ...(data.type && { type: data.type }),
      ...(data.title && { title: data.title }),
      ...(data.priority && { priority: data.priority }),
      ...(data.linkType && { linkType: data.linkType }),
      ...(data.description && { description: data.description }),
      ...(data.buttonText && { buttonText: data.buttonText }),
      ...(data.buttonVisible !== undefined && { buttonVisible: data.buttonVisible }),
      ...(data.percentage && { percentage: data.percentage }),
      ...(photo?.[0] && { imageDesktop: photo[0] }),
      ...(mobilePhoto?.[0] && { imageMobile: mobilePhoto[0] }),
      ...(["category", "unique-category", "collection"].includes(isLinkType) && { linkId: data.linkId }),
    };
    try {
      const response = isEdit ? await Post(Url_Keys.Banner.Edit, { bannerId: singleEditingBanner._id, ...Banner }) : await Post(Url_Keys.Banner.Add, Banner);
      if (response?.status === 200) {
        onCloseModal();
        trigger("image");
        trigger("mobileImage");
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(fetchProductApiData({}));
    dispatch(fetchCollectionApiData({}));
    dispatch(fetchCategoryApiData({}));
    dispatch(fetchUniqueCategoryApiData({}));
  }, [dispatch]);

  return (
    <Modal centered size="xl" isOpen={isAddBannerModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Banner" : "Add Banner"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="6" className="input-box">
                  <Label htmlFor="title">title</Label>
                  <input id="title" placeholder="Title" {...register("title")} />
                  {errors.title && <span className="text-danger">{errors.title.message}</span>}
                </Col>
                <Col md="6">
                  <div className="input-box">
                    <Label>Type</Label>
                    <select className="form-select" {...register("type")} onChange={(e) => setOffer(e.target.value)}>
                      <option value="">-- Select Type --</option>
                      {BannerTypeData?.map((banner, index) => (
                        <option value={banner?.value} key={index}>
                          {banner?.label}
                        </option>
                      ))}
                    </select>
                    {errors.type && <p className="text-danger">{errors.type.message}</p>}
                  </div>
                </Col>
                <Col md="12" className="input-box">
                  <Label htmlFor="description">description</Label>
                  <textarea id="description" placeholder="Description" {...register("description")} />
                  {errors.description && <span className="text-danger">{errors.description.message}</span>}
                </Col>
                <Col md="4">
                  <div className="input-box">
                    <Label>Link Type</Label>
                    <select className="form-select" {...register("linkType")} onChange={(e) => setLinkType(e.target.value)}>
                      <option value="">-- Select Link Type --</option>
                      {LinkTypeData?.map((link, index) => (
                        <option value={link?.value} key={index}>
                          {link?.label}
                        </option>
                      ))}
                    </select>
                    {errors.linkType && <p className="text-danger">{errors.linkType.message}</p>}
                  </div>
                </Col>
                <Col md="4">
                  <div className="input-box">
                    <Label>Link</Label>
                    <select disabled={!["category", "unique-category", "collection"].includes(isLinkType)} className="form-select" {...register("linkId")}>
                      <option value="">-- Select Product Type --</option>
                      {isLinkType === "category"
                        ? allCategory?.category_data?.map((product, index) => (
                            <option value={product?._id} key={index}>
                              {product?.name}
                            </option>
                          ))
                        : isLinkType === "unique-category"
                        ? allUniqueCategory?.unique_category_data?.map((product, index) => (
                            <option value={product?._id} key={index}>
                              {product?.name}
                            </option>
                          ))
                        : allCollection?.collection_data?.map((product, index) => (
                            <option value={product?._id} key={index}>
                              {product?.name}
                            </option>
                          ))}
                    </select>
                    {errors.linkId && <p className="text-danger">{errors.linkId.message}</p>}
                  </div>
                </Col>
                <Col md="4" className="input-box">
                  <Label htmlFor="priority">Priority</Label>
                  <input type="number" id="priority" placeholder="Priority" {...register("priority")} />
                  {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
                </Col>
                <Col md="6" className="input-box">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <input id="buttonText" placeholder="Button Text" {...register("buttonText")} />
                  {errors.buttonText && <span className="text-danger">{errors.buttonText.message}</span>}
                </Col>
                <Col md="6" className="input-box">
                  <Label htmlFor="percentage">offer percentage</Label>
                  <input disabled={isOffer === "offer" ? false : true} type="number" id="percentage" placeholder="Offer Percentage" {...register("percentage")} />
                  {errors.percentage && <span className="text-danger">{errors.percentage.message}</span>}
                </Col>
                <Col md="6" className="custom-dropzone-project input-box">
                  <div className="mb-3">
                    <Label>Image Desktop</Label>
                    <CommonImageUpload name="image" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} type="banner" />
                  </div>
                </Col>
                <Col md="6" className="custom-dropzone-project input-box">
                  <div className="mb-3">
                    <Label>Image Mobile</Label>
                    <CommonImageUpload name="mobileImage" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setMobilePhoto} photo={mobilePhoto} type="banner" />
                  </div>
                </Col>
                <Col md="12" lg="10" xl="8">
                  <Row>
                    <CustomCheckbox register={register} title="Button Visible" name="buttonVisible" />
                  </Row>
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

export default AddBannersModal;
