import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import { ToolbarOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchOurStoryApiData } from "@/ReduxToolkit/Slice/AboutSlice";
import { AddOurStorySchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { Button, Card, CardBody, Col, Container, Form, Label, Row } from "reactstrap";

const OurStoryContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { allOurStory } = useAppSelector((state) => state.about);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddOurStorySchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        title: data.title,
        image: photo[0] || "",
        description: data.description,
      };

      const response = await Post(Url_Keys.OurStory.Edit, payload);
      if (response?.status === 200) {
        setIsEditing(false);
        dispatch(fetchOurStoryApiData());
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (allOurStory) {
      setValue("title", allOurStory?.title || "");
      setValue("description", allOurStory?.description || "");
      if (allOurStory?.image) {
        setValue("image", [allOurStory?.image]);
        setPhoto([allOurStory.image]);
      }
    }
  }, [allOurStory, setValue]);

  useEffect(() => {
    dispatch(fetchOurStoryApiData());
  }, [dispatch]);

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Our Story" parent="Pages" />
      <Container fluid>
        <Col sm="12">
          <Card>
            <CommonCardHeader title="Our Story" setIsEditing={setIsEditing} isEditing={isEditing} />
            <CardBody className="input-items">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-3 justify-content-center">
                  <Col md="12">
                    <div className="input-box">
                      <Label>Title</Label>
                      <input type="text" placeholder="Blog Title" {...register("title")} readOnly={!isEditing} />
                      {errors.title && <p className="text-danger">{errors.title.message}</p>}
                    </div>
                  </Col>

                  <Col md="12" className="custom-dropzone-project input-box">
                    <Label>Upload Image</Label>
                    <CommonImageUpload trigger={trigger} name="image" errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} disabled={!isEditing} />
                  </Col>

                  <Col md="12">
                    <div className="input-box">
                      <Label>Description</Label>
                      <ReactQuill className="Information" theme="snow" value={watch("description")} onChange={(content) => setValue("description", content)} modules={{ toolbar: ToolbarOptions }} readOnly={!isEditing} />
                      {errors.description && <p className="text-danger">{errors.description.message}</p>}
                    </div>
                  </Col>
                </Row>
                {isEditing && (
                  <Row className="mt-4">
                    <Col>
                      <div className="text-center">
                        <Button type="submit" color="primary">
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default OurStoryContainer;

// const OurStoryContainer = () => {
//   const [editorContent, setEditorContent] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [photo, setPhoto] = useState<string[]>([]);
//   const [isValue, setIsValue] = useState(editorContent);

//   const quillRef = useRef<ReactQuill>(null);
//   const dispatch = useAppDispatch();
//   const { allOurStory } = useAppSelector((state) => state.about);

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     reset,
//     trigger,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(AddOurStorySchema),
//   });

//   const onSubmit = () => {};

//   const handleOurStorySubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await Post(Url_Keys.OurStory.Edit, { OurStory: editorContent });
//       if (response?.status === 200) {
//         setIsEditing(false);
//       }
//       setIsEditing(false);
//     } catch (error) {}
//   };

//   const onEditorChange = (content: string) => {
//     setIsValue(content);
//     setEditorContent(content);
//   };

//   useEffect(() => {
//     if (editorContent && editorContent !== isValue) {
//       setIsValue(editorContent);
//     }
//   }, [editorContent, isValue]);

//   useEffect(() => {
//     if (allOurStory) {
//       setEditorContent(allOurStory?.description);
//     }
//   }, [allOurStory]);

//   useEffect(() => {
//     dispatch(fetchOurStoryApiData());
//   }, [dispatch]);
//   return (
//     <Fragment>
//       <Breadcrumbs mainTitle="Our Story" parent="Pages" />
//       <Container fluid>
//         <Col sm="12">
//           <Card>
//             <CommonCardHeader title="Our Story" setIsEditing={setIsEditing} isEditing={isEditing} />
//             <CardBody>
//               <div className="input-items">
//                 <Form onSubmit={handleSubmit(onSubmit)}>
//                   <Row className="gy-3 justify-content-center">
//                     <Col md="12">
//                       <div className="input-box">
//                         <Label>Title</Label>
//                         <input id="name" type="text" placeholder="Blog Title" {...register("title")} />
//                         {errors.title && <p className="text-danger">{errors.title.message}</p>}
//                       </div>
//                     </Col>
//                     <Col md="12" className="custom-dropzone-project input-box">
//                       <div className="mb-3">
//                         <Label>Upload Image</Label>
//                         <CommonImageUpload trigger={trigger} name="image" errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} />
//                       </div>
//                     </Col>
//                     <Col md="12">
//                       <div className="input-box">
//                         <ReactQuill className="Information" ref={quillRef} theme="snow" value={isValue} onChange={onEditorChange} modules={{ toolbar: ToolbarOptions }} readOnly={!isEditing} />
//                         {isEditing && (
//                           <Form onSubmit={handleOurStorySubmit}>
//                             <div className="d-flex justify-content-center mt-3 mb-0">
//                               <Button color="primary">Save</Button>
//                             </div>
//                           </Form>
//                         )}
//                       </div>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col>
//                       <div className="text-center">
//                         <Button type="submit" color="primary">
//                           Save
//                         </Button>
//                       </div>
//                     </Col>
//                   </Row>
//                 </Form>
//               </div>
//             </CardBody>
//           </Card>
//         </Col>
//       </Container>
//     </Fragment>
//   );
// };

// export default OurStoryContainer;
