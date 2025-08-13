import { Post } from "@/Api";
import { RouteList, Url_Keys } from "@/Constant";
import { ForgotPasswordType } from "@/Types/Layout";
import { ForgotPasswordSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Label, Row } from "reactstrap";

const ForgotPasswordContainer = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    try {
      const response = await Post(Url_Keys.Auth.ForgotPassword, data, false);
      if (response.status === 200) {
        router.push(RouteList.Auth.Login);
      }
    } catch (error) {}
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div>
                <Link className="logo" href={RouteList.Dashboard}>
                  {/* Add logo image here if needed */}
                </Link>
              </div>
              <div className="login-main">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <h3>Reset Your Password</h3>
                  <p>Enter your Email Id & New password</p>

                  <div className="input-box">
                    <Label className="col-form-label">Email Id</Label>
                    <input type="text" placeholder="Enter Your Email Id" {...register("email")} />
                    {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="input-box">
                    <Label className="col-form-label">Password</Label>
                    <div className="position-relative">
                      <input type={isPasswordVisible ? "text" : "password"} placeholder="Enter Your New Password" {...register("password")} />
                      <div className="show-hide" onClick={() => setPasswordVisible(!isPasswordVisible)}>
                        <span className={!isPasswordVisible ? "show" : ""}> </span>
                      </div>
                    </div>
                    {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
                  </div>

                  <div className="input-box">
                    <Label className="col-form-label">Confirm Password</Label>
                    <div className="position-relative">
                      <input type={isConfirmPasswordVisible ? "text" : "password"} placeholder="Confirm Your New Password" {...register("confirmPassword")} />
                      <div className="show-hide" onClick={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                        <span className={!isConfirmPasswordVisible ? "show" : ""}> </span>
                      </div>
                    </div>
                    {errors.confirmPassword && <p className="text-danger mt-1">{errors.confirmPassword.message}</p>}
                  </div>

                  <div className="text-end mt-4">
                    <Button color="primary" className="w-100" block>
                      Save
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordContainer;
