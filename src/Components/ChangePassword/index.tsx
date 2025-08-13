import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { ForgotPasswordType } from "@/Types/Layout";
import { ForgotPasswordSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Container, Form, Label, Row } from "reactstrap";

const ChangePasswordContainer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      const response = await Post(Url_Keys.Auth.ForgotPassword, data, false);
      if (response.status === 200) {
        reset();
      }
    } catch (error) {}
  };
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Change Password" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader title="Change Password" />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="12">
                      <div className="input-box">
                        <Label>Email</Label>
                        <input type="email" {...register("email")} placeholder="Enter your email" />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Password</Label>
                        <input type="text" {...register("password")} placeholder="Enter Password" />
                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Confirm Password</Label>
                        <input type="text" {...register("confirmPassword")} placeholder="Enter Confirm password" />
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center mt-4">
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
      </Container>
    </Fragment>
  );
};

export default ChangePasswordContainer;
