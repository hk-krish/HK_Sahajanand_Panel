import { Post } from "@/Api";
import { RouteList, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import { useAppSelector } from "@/ReduxToolkit/Hooks";
import { CategoryFormData } from "@/Types/Product";
import { AddCategorySchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FC, Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const CategoryDataForm: FC<{ action: string }> = ({ action = "Add" }) => {
  const [photo, setPhoto] = useState<string[]>([]);
  const { singleEditingCategory } = useAppSelector((state) => state.product);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCategorySchema),
  });

  useEffect(() => {
    if (singleEditingCategory && action === "Edit") {
      setValue("name", singleEditingCategory.name);
      setValue("slug", singleEditingCategory.slug);
      setValue("description", singleEditingCategory.description);
      setValue("isFeatured", singleEditingCategory.isFeatured);
      setValue("priority", singleEditingCategory.priority);
      if (singleEditingCategory.image) {
        setValue("image", [singleEditingCategory.image]);
        setPhoto([singleEditingCategory.image]);
      }
    }
  }, [action, setValue, singleEditingCategory]);

  const onSubmit = async (data: CategoryFormData) => {
    const Category = {
      ...(data.name && { name: data.name }),
      ...(data.slug && { slug: data.slug }),
      ...(data.description && { description: data.description }),
      ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
      ...(data.priority && { priority: data.priority }),
      ...(photo?.[0] && { image: photo[0] }),
    };
    try {
      const response = action === "Edit" ? await Post(Url_Keys.Category.Edit, { id: singleEditingCategory._id, ...Category }) : await Post(Url_Keys.Category.Add, Category);
      if (response?.status === 200) {
        reset();
        setPhoto([]);
        trigger("image");
        router.push(RouteList.Category.Category);
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${action} Category`} parent="Category" />
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={`${action} Category`} />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="12">
                      <div className="input-box">
                        <Label>Category Name</Label>
                        <input id="name" type="text" placeholder="Category Name" {...register("name")} />
                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Slug</Label>
                        <input type="text" placeholder="Slug" {...register("slug")} />
                        {errors.slug && <p className="text-danger">{errors.slug.message}</p>}
                      </div>
                    </Col>
                    <Col md="6" className="input-box">
                      <Label htmlFor="priority">Priority</Label>
                      <input type="number" id="priority" placeholder="Priority" {...register("priority")} />
                      {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
                    </Col>

                    <Col md="12">
                      <div className="input-box">
                        <Label>Description</Label>
                        <textarea placeholder="Description" {...register("description")} />
                        {errors.description && <p className="text-danger">{errors.description.message}</p>}
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
                          <Label className="col-form-label m-r-10">Featured</Label>
                          <div className="text-end switch-sm">
                            <Label className="switch">
                              <input type="checkbox" {...register("isFeatured")} />
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

export default CategoryDataForm;
