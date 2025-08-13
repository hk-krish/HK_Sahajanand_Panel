import { Post } from "@/Api";
import { RouteList, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchProductApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { CollectionFormData, SelectOption } from "@/Types/Product";
import { AddCollectionSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FC, Fragment, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const CollectionDataForm: FC<{ action: string }> = ({ action = "Add" }) => {
  const [photo, setPhoto] = useState<string[]>([]);
  const { allProduct, singleEditingCollection } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCollectionSchema),
  });

  useEffect(() => {
    if (singleEditingCollection && action === "Edit") {
      setValue("name", singleEditingCollection.name);
      setValue("description", singleEditingCollection.description);
      setValue("isVisible", singleEditingCollection.isVisible);
      setValue("priority", singleEditingCollection.priority);
      // setValue("products", singleEditingCollection.products);
      const selectedOptions = allProduct?.product_data?.filter((product) => singleEditingCollection.products.includes(product._id))?.map((product) => ({ label: product.name, value: product._id }));
      setValue("products", selectedOptions || []);
      if (singleEditingCollection.image) {
        setValue("image", [singleEditingCollection.image]);
        setPhoto([singleEditingCollection.image]);
      }
    }
  }, [action, allProduct?.product_data, setValue, singleEditingCollection]);

  const onSubmit = async (data: CollectionFormData) => {
    const normalizeTags = (items: SelectOption[] = []) => items.map((item) => (typeof item === "string" ? item : item.value));
    const Collection = {
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(photo?.[0] && { image: photo[0] }),
      ...(data.isVisible !== undefined && { isVisible: data.isVisible }),
      ...(data.priority !== undefined && { priority: data.priority }),
      ...(data.products && { products: normalizeTags(data.products) }),
    };
    try {
      const response = action === "Edit" ? await Post(Url_Keys.Collection.Edit, { collectionId: singleEditingCollection._id, ...Collection }) : await Post(Url_Keys.Collection.Add, Collection);
      if (response?.status === 200) {
        reset();
        setPhoto([]);
        trigger("image");
        router.push(RouteList.Collections.Collections);
      }
    } catch (error) {}
  };

  const ProductOptions = allProduct?.product_data?.map((product) => ({
    value: product._id,
    label: product.name,
  }));

  useEffect(() => {
    dispatch(fetchProductApiData({}));
  }, [dispatch]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${action} Collection`} parent="Collection" />
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={`${action} Collection`} />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="12">
                      <div className="input-box">
                        <Label>name</Label>
                        <input id="name" type="text" placeholder="Name" {...register("name")} />
                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="input-box">
                        <Label>Description</Label>
                        <textarea placeholder="Description" {...register("description")} />
                        {errors.description && <p className="text-danger">{errors.description.message}</p>}
                      </div>
                    </Col>
                    <Col md="6" className="input-box">
                      <Label htmlFor="priority">Priority</Label>
                      <input type="number" id="priority" placeholder="Priority" {...register("priority")} />
                      {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Products</Label>
                        <Controller name="products" control={control} render={({ field }) => <Typeahead {...field} multiple id={`product-typeahead`} options={ProductOptions} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder={`Add Product`} allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
                        {errors.products && <p className="text-danger">{errors.products.message}</p>}
                      </div>
                    </Col>
                    <Col md="12" className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>Upload Image</Label>
                        <CommonImageUpload name="image" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} />
                      </div>
                    </Col>
                    <Col sm="6" md="3">
                      <div className="input-box">
                        <div className="d-flex">
                          <Label className="col-form-label m-r-10">Visible</Label>
                          <div className="text-end switch-sm">
                            <Label className="switch">
                              <input type="checkbox" {...register("isVisible")} />
                              <span className="switch-state" />
                            </Label>
                          </div>
                        </div>
                      </div>
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
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CollectionDataForm;
