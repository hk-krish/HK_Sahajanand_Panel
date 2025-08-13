import { Post } from "@/Api";
import { Href, RouteList, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import CustomCheckbox from "@/CoreComponents/CustomCheckbox";
import CustomTypeahead from "@/CoreComponents/CustomTypeahead";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchColorApiData, fetchFabricApiData, fetchMaterialApiData, fetchOccasionApiData, fetchSizeApiData } from "@/ReduxToolkit/Slice/AttributeSlice";
import { fetchCategoryApiData, fetchUniqueCategoryApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { ProductFormData, SelectOption } from "@/Types/Product";
import { generateOptions } from "@/Utils";
import { AddProductSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";
import Select from "react-select";
import ImageUpload from "@/CoreComponents/ImageUpload";
import { Add, Minus } from "iconsax-react";
import { customSelectStyles } from "@/Data/CoreComponents";

const ProductDataForm: FC<{ action: string }> = ({ action = "Add" }) => {
  // const [photo, setPhoto] = useState<string[]>([]);
  const [isFrontImage, setFrontImage] = useState<string[]>([]);
  const [isBackImage, setBackImage] = useState<string[]>([]);
  const [isOffer, setOffer] = useState(false);
  const rawSearchParams = useSearchParams();
  const params = new URLSearchParams(rawSearchParams?.toString() || "");
  const page = params.get("page") || "1";
  const pageLimit = params.get("pageLimit") || "10";

  // State for dynamic color-image combinations
  const [colorImageCombinations, setColorImageCombinations] = useState([{ id: 1, colorId: "", images: [] as string[] }]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allCategory, singleEditingProduct, allUniqueCategory } = useAppSelector((state) => state.product);
  const { allSize, allColor, allFabric, allMaterial, allOccasion } = useAppSelector((state) => state.attribute);

  // Functions to handle dynamic color-image combinations
  const addColorImageCombination = () => {
    const newId = Math.max(...colorImageCombinations.map((item) => item.id), 0) + 1;
    setColorImageCombinations([...colorImageCombinations, { id: newId, colorId: "", images: [] }]);
  };

  const removeColorImageCombination = (id: number) => {
    if (colorImageCombinations.length > 1) {
      setColorImageCombinations(colorImageCombinations.filter((item) => item.id !== id));
    }
  };

  const updateColorImageCombination = (id: number, field: "colorId" | "images", value: string | string[]) => {
    setColorImageCombinations((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const updateColorImageCombinationImages = (id: number, images: string[]) => {
    setColorImageCombinations((prev) => prev.map((item) => (item.id === id ? { ...item, images } : item)));
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddProductSchema),
  });

  useEffect(() => {
    if (singleEditingProduct && action === "Edit") {
      setValue("name", singleEditingProduct.name);
      setValue("description", singleEditingProduct.description);
      setValue("price", singleEditingProduct.price);
      setValue("salePrice", singleEditingProduct.salePrice);
      setValue("sku", singleEditingProduct.sku);
      setValue("categoryId", singleEditingProduct.categoryId?._id);
      setValue("uniqueCategoryId", singleEditingProduct.uniqueCategoryId?._id);
      setValue("tags", singleEditingProduct.tags);
      // setValue("colorIds", generateOptions(singleEditingProduct.attributes.colorIds));
      setValue("sizeIds", generateOptions(singleEditingProduct.attributes.sizeIds));
      setValue("materialIds", generateOptions(singleEditingProduct.attributes.materialIds));
      setValue("fabricIds", generateOptions(singleEditingProduct.attributes.fabricIds));
      setValue("occasionIds", generateOptions(singleEditingProduct.attributes.occasionIds));
      setValue("stock", singleEditingProduct.stock);
      setValue("isFeatured", singleEditingProduct.isFeatured);
      setValue("isNewArrival", singleEditingProduct.isNewArrival);
      setValue("isBestSelling", singleEditingProduct.isBestSelling);
      setValue("showOnHomepage", singleEditingProduct.showOnHomepage);
      setValue("offerPrice", singleEditingProduct.offerPrice);
      setValue("weight", singleEditingProduct.weight);
      if (singleEditingProduct.isOffer) {
        setValue("isOffer", singleEditingProduct.isOffer);
        setOffer(singleEditingProduct.isOffer);
      }
      if (singleEditingProduct.frontImage) {
        setValue("frontImage", [singleEditingProduct.frontImage]);
        setFrontImage([singleEditingProduct.frontImage]);
      }
      if (singleEditingProduct.backImage) {
        setValue("backImage", [singleEditingProduct.backImage]);
        setBackImage([singleEditingProduct.backImage]);
      }

      // Handle color-image combinations for editing
      if (singleEditingProduct.colorImages && singleEditingProduct.colorImages.length > 0) {
        const combinations = singleEditingProduct.colorImages.map((item, index) => ({
          id: index + 1,
          colorId: item.colorId._id,
          images: item.images,
        }));
        setColorImageCombinations(combinations);
      }
    }
  }, [action, setValue, singleEditingProduct, setOffer]);

  const onSubmit = async (data: ProductFormData) => {
    const normalizeTags = (items: SelectOption[] = []) => items.map((item) => (typeof item === "string" ? item : item.value));
    const Tags = (items: SelectOption[] = []) => items.map((item) => (typeof item === "string" ? item : item.label));

    // Process color-image combinations
    const colorImageData = colorImageCombinations
      .filter((combination) => combination.colorId && combination.images.length > 0)
      .map((combination) => ({
        colorId: combination.colorId,
        images: combination.images,
      }));

    let Product: any = {
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(data.price && { price: data.price }),
      ...(data.salePrice && { salePrice: data.salePrice }),
      ...(data.categoryId && { categoryId: data.categoryId }),
      ...(data.sku && { sku: data.sku }),
      ...(data.tags && data.tags.length > 0 && { tags: Tags(data.tags) }),
      ...(colorImageData.length > 0 && { colorImages: colorImageData }),
      ...(isFrontImage?.[0] && { frontImage: isFrontImage[0] }),
      ...(isBackImage?.[0] && { backImage: isBackImage[0] }),
      attributes: {
        ...(data.sizeIds && data.sizeIds.length > 0 && { sizeIds: normalizeTags(data.sizeIds) }),
        ...(data.materialIds && data.materialIds.length > 0 && { materialIds: normalizeTags(data.materialIds) }),
        ...(data.fabricIds && data.fabricIds.length > 0 && { fabricIds: normalizeTags(data.fabricIds) }),
        ...(data.occasionIds && data.occasionIds.length > 0 && { occasionIds: normalizeTags(data.occasionIds) }),
      },
      ...(data.stock && { stock: data.stock }),
      ...(data.isNewArrival !== undefined && { isNewArrival: data.isNewArrival }),
      ...(data.isBestSelling !== undefined && { isBestSelling: data.isBestSelling }),
      ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
      ...(data.showOnHomepage !== undefined && { showOnHomepage: data.showOnHomepage }),
      ...(isOffer !== undefined && { isOffer: isOffer }),
      ...(data.offerPrice && { offerPrice: data.offerPrice }),
      ...(data.weight && { weight: data.weight }),
      ...(data.uniqueCategoryId && { uniqueCategoryId: data.uniqueCategoryId }),
    };

    try {
      const response = action === "Edit" ? await Post(Url_Keys.Product.Edit, { productId: singleEditingProduct._id, ...Product }) : await Post(Url_Keys.Product.Add, Product);
      if (response?.status === 200) {
        reset();
        setBackImage([]);
        setFrontImage([]);
        setColorImageCombinations([]);
        router.push(`${RouteList.Product.Product}?page=${page}&pageLimit=${pageLimit}`);
      }
    } catch (error) {}
  };

  const getAllCategory = useCallback(async () => {
    try {
      await dispatch(fetchCategoryApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  const getAllUniqueCategory = useCallback(async () => {
    try {
      await dispatch(fetchUniqueCategoryApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllUniqueCategory();
  }, [getAllUniqueCategory]);

  const getAllSize = useCallback(async () => {
    try {
      await dispatch(fetchSizeApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllSize();
  }, [getAllSize]);

  const getAllColor = useCallback(async () => {
    try {
      await dispatch(fetchColorApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllColor();
  }, [getAllColor]);

  const getAllFabric = useCallback(async () => {
    try {
      await dispatch(fetchFabricApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllFabric();
  }, [getAllFabric]);

  const getAllMaterial = useCallback(async () => {
    try {
      await dispatch(fetchMaterialApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllMaterial();
  }, [getAllMaterial]);

  const getAllOccasion = useCallback(async () => {
    try {
      await dispatch(fetchOccasionApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllOccasion();
  }, [getAllOccasion]);

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${action} Product`} parent="Product" />
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={`${action} Product`} />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3 justify-content-center">
                    <Col md="12">
                      <div className="input-box">
                        <Label>
                          Product Name<span className="required">*</span>
                        </Label>
                        <input id="name" type="text" placeholder="Product name" {...register("name")} />
                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                      </div>
                    </Col>

                    <Col md="12">
                      <div className="input-box">
                        <Label>
                          Description<span className="required">*</span>
                        </Label>
                        <textarea placeholder="Description" {...register("description")} />
                        {errors.description && <p className="text-danger">{errors.description.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>
                          Price<span className="required">*</span>
                        </Label>
                        <input type="number" placeholder="Price" {...register("price")} />
                        {errors.price && <p className="text-danger">{errors.price.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>
                          Sale Price<span className="required">*</span>
                        </Label>
                        <input type="number" placeholder="Sale Price" {...register("salePrice")} />
                        {errors.salePrice && <p className="text-danger">{errors.salePrice.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>
                          SKU<span className="required">*</span>
                        </Label>
                        <input type="text" placeholder="SKU" {...register("sku")} />
                        {errors.sku && <p className="text-danger">{errors.sku.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>
                          Stock<span className="required">*</span>
                        </Label>
                        <input type="number" placeholder="Stock" {...register("stock")} />
                        {errors.stock && <p className="text-danger">{errors.stock.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>
                          Category<span className="required">*</span>
                        </Label>
                        <select className="form-select" {...register("categoryId")}>
                          <option value="">Select Category</option>
                          {allCategory?.category_data?.map((category, index) => (
                            <option value={category?._id} key={index}>
                              {category?.name}
                            </option>
                          ))}
                        </select>
                        {errors.categoryId && <p className="text-danger">{errors.categoryId.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>Unique Category</Label>
                        <select className="form-select" {...register("uniqueCategoryId")}>
                          <option value="">Select Unique Category</option>
                          {allUniqueCategory?.unique_category_data?.map((uniqueCategory, index) => (
                            <option value={uniqueCategory?._id} key={index}>
                              {uniqueCategory?.name}
                            </option>
                          ))}
                        </select>
                        {errors.uniqueCategoryId && <p className="text-danger">{errors.uniqueCategoryId.message}</p>}
                      </div>
                    </Col>

                    <CustomTypeahead control={control} errors={errors.tags} title="Tags" name="tags" options={[]} />
                    {/* <CustomTypeahead control={control} errors={errors.colorIds} title="Color" name="colorIds" options={generateOptions(allColor?.color_data)} /> */}
                    <CustomTypeahead required control={control} errors={errors.sizeIds} title="Size" name="sizeIds" options={generateOptions(allSize?.size_data)} />
                    <CustomTypeahead required control={control} errors={errors.materialIds} title="Material" name="materialIds" options={generateOptions(allMaterial?.material_data)} />
                    <CustomTypeahead control={control} errors={errors.fabricIds} title="Fabric" name="fabricIds" options={generateOptions(allFabric?.fabric_data)} />
                    <CustomTypeahead control={control} errors={errors.occasionIds} title="Occasion" name="occasionIds" options={generateOptions(allOccasion?.occasion_data)} />

                    <Col md="6">
                      <div className="input-box">
                        <Label>weight</Label>
                        <input type="number" placeholder="weight" {...register("weight")} />
                        {errors.weight && <p className="text-danger">{errors.weight.message}</p>}
                      </div>
                    </Col>
                    {isOffer && (
                      <Col md="12">
                        <div className="input-box">
                          <Label>Offer Price</Label>
                          <input type="number" placeholder="Offer Price" {...register("offerPrice")} />
                          {errors.offerPrice && <p className="text-danger">{errors.offerPrice.message}</p>}
                        </div>
                      </Col>
                    )}
                    <Col md="6" className="input-box">
                      <Label>
                        Upload Product Front Images <span className="required">*</span>
                      </Label>
                      <CommonImageUpload name="frontImage" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setFrontImage} photo={isFrontImage} />
                      {errors.frontImage && <p className="text-danger mt-1">{errors.frontImage.message}</p>}
                    </Col>

                    <Col md="6" className="input-box">
                      <Label>
                        Upload Product back Images <span className="required">*</span>
                      </Label>
                      <CommonImageUpload name="backImage" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setBackImage} photo={isBackImage} />
                      {errors.backImage && <p className="text-danger mt-1">{errors.backImage.message}</p>}
                    </Col>
                    <Col md="12">
                      <Label className="mb-3">
                        Product Color & Images<span className="required">*</span>
                      </Label>
                      {colorImageCombinations.map((combination, index) => (
                        <div key={combination.id}>
                          {combination.colorId && combination.images.length === 0 && <p className="text-danger mb-2">Please add images for Color {index + 1}</p>}
                          {!combination.colorId && combination.images.length > 0 && <p className="text-danger mb-2">Please select a color for the images in row {index + 1}</p>}
                          <Row className="mb-3">
                            <Col md="2" className="input-box">
                              <Label>Color {index + 1}</Label>
                              <Select<{ label: string; value: string }> value={generateOptions(allColor?.color_data).find((opt) => opt.value === combination.colorId) || null} onChange={(option) => updateColorImageCombination(combination.id, "colorId", option?.value || "")} options={generateOptions(allColor?.color_data)} placeholder="Select Color" styles={customSelectStyles} />
                            </Col>
                            <Col md="10" className="d-flex align-items-center gap-2">
                              <div className="input-box">
                                <Label>Images for Color {index + 1}</Label>
                                <ImageUpload multiple trigger={trigger} fileList={combination.images} setFileList={(images: any) => updateColorImageCombinationImages(combination.id, images)} setValue={setValue} accept="image/*" isListType="picture-card" />
                              </div>
                              <div className="input-box d-flex align-items-center gap-2">
                                {colorImageCombinations.length !== 1 && (
                                  <Button color="danger" onClick={() => removeColorImageCombination(combination.id)} className="m-1 p-1 action-btn">
                                    <Minus className="action" />
                                  </Button>
                                )}
                                {index === colorImageCombinations.length - 1 && (
                                  <Button color="primary" onClick={addColorImageCombination} className="m-1 p-1 action-btn">
                                    <Add className="action" />
                                  </Button>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Col>

                    <Col md="12">
                      <Row>
                        <CustomCheckbox register={register} title="New Arrival" name="isNewArrival" />
                        <CustomCheckbox register={register} title="Best Selling" name="isBestSelling" />
                        <CustomCheckbox register={register} title="Featured" name="isFeatured" />
                        <CustomCheckbox register={register} title="Show On Homepage" name="showOnHomepage" />
                        <Col sm="6" md="2">
                          <div className="input-box">
                            <div className="d-flex">
                              <Label className="col-form-label m-r-10" htmlFor="isOffer">
                                Offer Product
                              </Label>
                              <div className="text-end switch-sm">
                                <Label className="switch">
                                  <input type="checkbox" id="isOffer" {...register("isOffer")} onChange={(e) => setOffer(e.target.checked)} />
                                  <span className="switch-state"></span>
                                </Label>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
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
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductDataForm;
