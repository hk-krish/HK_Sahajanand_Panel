import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import Information from "@/CoreComponents/Information";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchReturnPoliciesApiData } from "@/ReduxToolkit/Slice/AboutSlice";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { Col, Container } from "reactstrap";

const ReturnPoliciesContainer = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { allReturnPolicy } = useAppSelector((state) => state.about);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Post(Url_Keys.ReturnPolicy.ReturnPolicyEdit, { returnPolicy: editorContent });
      if (response?.status === 200) {
        setIsEditing(false);
      }
      setIsEditing(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (allReturnPolicy) {
      setEditorContent(allReturnPolicy?.returnPolicy);
    }
  }, [allReturnPolicy]);

  useEffect(() => {
    dispatch(fetchReturnPoliciesApiData());
  }, [dispatch]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Return Policy" parent="Pages" />
      <Container fluid>
        <Col xl="12">
          <Information headerTitle="Return Policy" editorContent={editorContent} setEditorContent={setEditorContent} handleSubmit={handleSubmit} isEditing={isEditing} setIsEditing={setIsEditing} />
        </Col>
      </Container>
    </Fragment>
  );
};

export default ReturnPoliciesContainer;
