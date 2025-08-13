import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import CustomTypeahead from "@/CoreComponents/CustomTypeahead";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchSingleUserApiData } from "@/ReduxToolkit/Slice/UserSlice";
import { SettingFormData } from "@/Types/UserType";
import { SettingSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Facebook, Instagram, Xrp } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Container, Form, InputGroup, InputGroupText, Label, Row } from "reactstrap";

const SettingContainer = () => {
  const [photo, setPhoto] = useState<string[]>([]);
  const [isNewsLetterImage, setNewsLetterImage] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { singleUser } = useAppSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SettingSchema),
  });

  useEffect(() => {
    if (singleUser) {
      setValue("firstName", singleUser?.firstName);
      setValue("lastName", singleUser?.lastName);
      setValue("email", singleUser?.email);
      setValue("phoneNumber", singleUser?.phoneNumber);
      setValue("facebook", singleUser?.socialMedia?.facebook);
      setValue("twitter", singleUser?.socialMedia?.twitter);
      setValue("instagram", singleUser?.socialMedia?.instagram);
      setValue("headerOffer", singleUser?.headerOffer);
      setValue("address", singleUser?.address);
      setValue("city", singleUser?.city);
      setValue("country", singleUser?.country);
      setValue("state", singleUser?.state);
      setValue("zipCode", singleUser?.zipCode);
      setValue("mapLink", singleUser?.mapLink);
      setValue("whatsappNumber", singleUser?.whatsappNumber);
      setValue("whatsappMessage", singleUser?.whatsappMessage);
      setValue("razorpayKeyId", singleUser?.razorpayKeyId);
      setValue("razorpayKeySecret", singleUser?.razorpayKeySecret);
      setValue("freeShippingThreshold", singleUser?.freeShippingThreshold);
      setValue("shippingCharge", singleUser?.shippingCharge);
      if (singleUser?.profilePhoto) {
        setValue("image", [singleUser?.profilePhoto]);
        setPhoto([singleUser?.profilePhoto]);
      }
      if (singleUser?.newsLetterImage) {
        setValue("newsLetterImage", [singleUser?.newsLetterImage]);
        setNewsLetterImage([singleUser?.newsLetterImage]);
      }
    }
  }, [setValue, singleUser]);

  const onSubmit = async (data: SettingFormData) => {
    const setting = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      socialMedia: {
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
      },
      profilePhoto: photo[0],
      newsLetterImage: isNewsLetterImage[0],
      headerOffer: data.headerOffer,
      address: data.address,
      city: data.city,
      country: data.country,
      state: data.state,
      zipCode: data.zipCode,
      mapLink: data.mapLink,
      whatsappNumber: data.whatsappNumber,
      whatsappMessage: data.whatsappMessage,
      razorpayKeyId: data.razorpayKeyId,
      razorpayKeySecret: data.razorpayKeySecret,
      freeShippingThreshold: data.freeShippingThreshold,
      shippingCharge: data.shippingCharge,
    };
    try {
      const response = await Post(Url_Keys.Users.EditAdmin, { userId: singleUser?._id, ...setting });
      if (response?.status === 200) {
        getSingleUser();
        setIsEditing(false);
      }
    } catch (error) {}
  };

  const getSingleUser = useCallback(async () => {
    try {
      await dispatch(fetchSingleUserApiData({ search: user?._id }));
    } catch (error) {}
  }, [dispatch, user?._id]);

  useEffect(() => {
    getSingleUser();
  }, [getSingleUser]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Setting" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader title="Setting" />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="12" className="custom-dropzone-project input-box avatar-upload">
                      <div className="mb-3">
                        <CommonImageUpload disabled={!isEditing} type="profile" name="image" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} />
                        <Label className="d-flex justify-content-center mt-2">Upload Image</Label>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>first Name</Label>
                        <input type="text" placeholder="First Name" {...register("firstName")} readOnly={!isEditing} />
                        {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Last Name</Label>
                        <input type="text" placeholder="Last Name" {...register("lastName")} readOnly={!isEditing} />
                        {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Email</Label>
                        <input type="text" placeholder="Email" {...register("email")} readOnly={!isEditing} />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Phone Number</Label>
                        <input type="number" placeholder="Phone Number" {...register("phoneNumber")} readOnly={!isEditing} />
                        {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>address</Label>
                        <input type="text" placeholder="address" {...register("address")} readOnly={!isEditing} />
                        {errors.address && <p className="text-danger">{errors.address.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>city</Label>
                        <input type="text" placeholder="city" {...register("city")} readOnly={!isEditing} />
                        {errors.city && <p className="text-danger">{errors.city.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>state</Label>
                        <input type="text" placeholder="state" {...register("state")} readOnly={!isEditing} />
                        {errors.state && <p className="text-danger">{errors.state.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>country</Label>
                        <input type="text" placeholder="country" {...register("country")} readOnly={!isEditing} />
                        {errors.country && <p className="text-danger">{errors.country.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Pin Code</Label>
                        <input type="number" placeholder="Zip Code" {...register("zipCode")} readOnly={!isEditing} />
                        {errors.zipCode && <p className="text-danger">{errors.zipCode.message}</p>}
                      </div>
                    </Col>

                    <CustomTypeahead control={control} errors={errors.headerOffer} title="Header Offer" name="headerOffer" disabled={!isEditing} />

                    <Col md="6">
                      <div className="input-box">
                        <Label>Facebook</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Facebook />
                          </InputGroupText>
                          <input type="text" placeholder="Facebook" {...register("facebook")} readOnly={!isEditing} />
                        </InputGroup>
                        {errors.facebook && <p className="text-danger">{errors.facebook.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Instagram</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Instagram />
                          </InputGroupText>
                          <input type="text" placeholder="Instagram" {...register("instagram")} readOnly={!isEditing} />
                        </InputGroup>
                        {errors.instagram && <p className="text-danger">{errors.instagram.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Twitter</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Xrp />
                          </InputGroupText>
                          <input type="text" placeholder="Twitter" {...register("twitter")} readOnly={!isEditing} />
                        </InputGroup>
                        {errors.twitter && <p className="text-danger">{errors.twitter.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Google Map Link</Label>
                        <input type="text" placeholder="Enter Your Google Map Link" {...register("mapLink")} readOnly={!isEditing} />
                        {errors.mapLink && <p className="text-danger">{errors.mapLink.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Whatsapp Number</Label>
                        <input type="number" placeholder="Whatsapp Number" {...register("whatsappNumber")} readOnly={!isEditing} />
                        {errors.whatsappNumber && <p className="text-danger">{errors.whatsappNumber.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Whatsapp Message</Label>
                        <input type="text" placeholder="Whatsapp Message" {...register("whatsappMessage")} readOnly={!isEditing} />
                        {errors.whatsappMessage && <p className="text-danger">{errors.whatsappMessage.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Razorpay Key Id</Label>
                        <input type="text" placeholder="Razorpay Key Id" {...register("razorpayKeyId")} readOnly={!isEditing} />
                        {errors.razorpayKeyId && <p className="text-danger">{errors.razorpayKeyId.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Razorpay Secret Key</Label>
                        <input type="text" placeholder="Razorpay Secret Key" {...register("razorpayKeySecret")} readOnly={!isEditing} />
                        {errors.razorpayKeySecret && <p className="text-danger">{errors.razorpayKeySecret.message}</p>}
                      </div>
                    </Col>
                     <Col md="6">
                      <div className="input-box">
                        <Label>Free shipping charge</Label>
                        <input type="text" placeholder="Free shipping charge" {...register("freeShippingThreshold")} readOnly={!isEditing} />
                        {errors.freeShippingThreshold && <p className="text-danger">{errors.freeShippingThreshold.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Shipping Charge</Label>
                        <input type="text" placeholder="Shipping Charge" {...register("shippingCharge")} readOnly={!isEditing} />
                        {errors.shippingCharge && <p className="text-danger">{errors.shippingCharge.message}</p>}
                      </div>
                    </Col>
                    <Col md="12" className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>News Letter Image</Label>
                        <CommonImageUpload disabled={!isEditing} name="newsLetterImage" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setNewsLetterImage} photo={isNewsLetterImage} />
                      </div>
                    </Col>
                  </Row>
                  {isEditing && (
                    <Row>
                      <Col>
                        <div className="text-center mt-4">
                          <Button type="submit" color="primary">
                            Save
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Form>
                {!isEditing && (
                  <Row>
                    <Col>
                      <div className="text-center mt-4">
                        <Button type="button" color="primary" onClick={() => setIsEditing(true)}>
                          Edit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default SettingContainer;
