import { Post } from "@/Api";
import { RouteList, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import CustomTypeahead from "@/CoreComponents/CustomTypeahead";
import { BlogStatus } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchCategoryApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { BlogFormData } from "@/Types/Blog";
import { SelectOption } from "@/Types/Product";
import { AddBlogSchema } from "@/Utils/ValidationSchemas";
import "@ant-design/v5-patch-for-react-19";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/navigation";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

dayjs.extend(utc);

const BlogDataForm: FC<{ action: string }> = ({ action = "Add" }) => {
  const [photo, setPhoto] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>(dayjs().startOf("day").toDate());

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allCategory } = useAppSelector((state) => state.product);
  const { singleEditingBlog } = useAppSelector((state) => state.blog);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddBlogSchema),
  });

  useEffect(() => {
    if (singleEditingBlog && action === "Edit") {
      setValue("title", singleEditingBlog.title);
      setValue("content", singleEditingBlog.content);
      setValue("slug", singleEditingBlog.slug);
      setValue("metaTitle", singleEditingBlog.metaTitle);
      setValue("metaDescription", singleEditingBlog.metaDescription);
      setValue("metaKeywords", singleEditingBlog.metaKeywords);
      setValue("category", singleEditingBlog.category);
      setValue("tags", singleEditingBlog.tags);
      setValue("status", singleEditingBlog.status);
      if (singleEditingBlog.scheduledAt) {
        const scheduled = singleEditingBlog.scheduledAt ? new Date(singleEditingBlog.scheduledAt) : dayjs().startOf("day").toDate();
        setStartDate(scheduled);
      }
      if (singleEditingBlog.image) {
        setValue("image", [singleEditingBlog.image]);
        setPhoto([singleEditingBlog.image]);
      }
    }
  }, [action, setValue, singleEditingBlog]);

  const onSubmit = async (data: BlogFormData) => {
    const normalizeTags = (items: SelectOption[] = []) => items.map((item) => (typeof item === "string" ? item : item.label));

    const Blog = {
      title: data.title,
      content: data.content,
      slug: data.slug,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      metaKeywords: normalizeTags(data.metaKeywords),
      category: data.category,
      tags: normalizeTags(data.tags),
      scheduledAt: startDate,
      status: data.status,
      image: photo[0],
    };
    try {
      const response = action === "Edit" ? await Post(Url_Keys.Blog.Edit, { blogId: singleEditingBlog._id, ...Blog }) : await Post(Url_Keys.Blog.Add, Blog);
      if (response?.status === 200) {
        reset();
        setPhoto([]);
        trigger("image");
        router.push(RouteList.Blog.Blog);
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

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${action} Blog`} parent="Blog" />
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={`${action} Blog`} />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3 justify-content-center">
                    <Col md="6">
                      <div className="input-box">
                        <Label>Title</Label>
                        <input id="name" type="text" placeholder="Blog Title" {...register("title")} />
                        {errors.title && <p className="text-danger">{errors.title.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Slug</Label>
                        <input type="text" placeholder="Slug" {...register("slug")} />
                        {errors.slug && <p className="text-danger">{errors.slug.message}</p>}
                      </div>
                    </Col>

                    <Col md="12">
                      <div className="input-box">
                        <Label>Content</Label>
                        <textarea placeholder="Content" {...register("content")} />
                        {errors.content && <p className="text-danger">{errors.content.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Meta Title</Label>
                        <input type="text" placeholder="Meta Title" {...register("metaTitle")} />
                        {errors.metaTitle && <p className="text-danger">{errors.metaTitle.message}</p>}
                      </div>
                    </Col>

                    <CustomTypeahead control={control} errors={errors.metaKeywords} title="Meta Keywords" name="metaKeywords" />

                    <Col md="12">
                      <div className="input-box">
                        <Label>Meta Description</Label>
                        <textarea placeholder="Meta Description" {...register("metaDescription")} />
                        {errors.metaDescription && <p className="text-danger">{errors.metaDescription.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Category</Label>
                        <select className="form-select" {...register("category")}>
                          <option>Select Category</option>
                          {allCategory?.category_data?.map((category, index) => (
                            <option value={category?._id} key={index}>
                              {category?.name}
                            </option>
                          ))}
                        </select>
                        {errors.category && <p className="text-danger">{errors.category.message}</p>}
                      </div>
                    </Col>

                    <CustomTypeahead control={control} errors={errors.tags} title="Tags" name="tags" />

                    <Col md="6">
                      <div className="input-box">
                        <Label>Status</Label>
                        <select className="form-select" {...register("status")}>
                          <option>Select Status</option>
                          {BlogStatus?.map((blog, index) => (
                            <option value={blog?.value} key={index}>
                              {blog?.label}
                            </option>
                          ))}
                        </select>
                        {errors.status && <p className="text-danger">{errors.status.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Scheduled At</Label>
                        <DatePicker color="primary" showTime value={dayjs(startDate)} onChange={(date) => setStartDate(date ? dayjs(date).toDate() : null)} format="DD/MM/YYYY HH:mm" placeholder="Start Date" className="w-100" />
                      </div>
                    </Col>

                    <Col md="12" className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>Upload Image</Label>
                        <CommonImageUpload trigger={trigger} name="image" errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo}/>
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

export default BlogDataForm;
