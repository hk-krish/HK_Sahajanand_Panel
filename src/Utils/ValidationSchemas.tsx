import * as yup from "yup";

const emptyToUndefined = (value: any, originalValue: any) => (originalValue === "" ? undefined : value);

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
  password: yup
    .string()
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character")
    .required("Password is required"),
});

export const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
  password: yup
    .string()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character")
    .required("Password is required"),
});

const tagArraySchema = yup
  .array()
  .of(
    yup.lazy((value) =>
      typeof value === "string"
        ? yup.string()
        : yup.object().shape({
            label: yup.string().required(),
            customOption: yup.boolean().optional(),
          })
    )
  )
  .min(1, "At least one value is required")
  .required("This field is required");

const tagSchema = yup.array().of(
  yup.lazy((value) =>
    typeof value === "string"
      ? yup.string()
      : yup.object().shape({
          label: yup.string().required(),
          customOption: yup.boolean().optional(),
        })
  )
);

const imageSchema = yup.array().min(1, "At least one image is required").required("Image is required");

export const AddProductSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .required("Price is required"),
  salePrice: yup
    .number()
    .typeError("Sale Price must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .required("Sale Price is required"),
  sku: yup.string().required("SKU is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .required("Stock is required"),
  categoryId: yup.string().required("Category is required"),
  uniqueCategoryId: yup.string().notRequired(),
  tags: tagSchema,
  // colorIds: tagSchema,
  sizeIds: tagArraySchema,
  materialIds: tagArraySchema,
  fabricIds: tagSchema,
  occasionIds: tagSchema,
  isNewArrival: yup.boolean(),
  isBestSelling: yup.boolean(),
  isFeatured: yup.boolean(),
  showOnHomepage: yup.boolean(),
  frontImage: yup.array().min(1, "At least one front Image is required").required("front Image is required"),
  backImage: yup.array().min(1, "At least one back Image is required").required("back Image is required"),
  // image: imageSchema,
  isOffer: yup.boolean(),
  offerPrice: yup
    .number()
    .typeError("Offer Price must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .notRequired(),
  weight: yup
    .number()
    .typeError("weight must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .notRequired(),
});

export const AddCategorySchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  slug: yup.string(),
  description: yup.string(),
  isFeatured: yup.boolean(),
  image: imageSchema,
  priority: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(1, "Priority must be at least 1")
    .required("Priority is required"),
});

export const AddFaqSchema = yup.object().shape({
  question: yup.string().required("Question is required"),
  answer: yup.string().required("Answer is required"),
  priority: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(1, "Priority must be at least 1")
    .required("Priority is required"),
  category: yup.string().required("Category is required"),
});

export const AddBannerSchema = yup.object().shape({
  type: yup.string().required("Type is required"),
  title: yup.string(),
  linkType: yup.string().required("Link Type is required"),
  linkId: yup.string(),
  description: yup.string(),
  priority: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(1, "Priority must be at least 1")
    .required("Priority is required"),
  buttonText: yup.string(),
  percentage: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    }),
  buttonVisible: yup.boolean(),
  image: imageSchema,
  mobileImage: imageSchema,
});

export const AddBlogSchema = yup.object().shape({
  title: yup.string().required("Project title is required"),
  content: yup.string().required("Content is required"),
  slug: yup.string().required("Slug is required"),
  metaTitle: yup.string().required("Meta Title is required"),
  metaDescription: yup.string().required("Meta Description is required"),
  category: yup.string().required("Category is required"),
  status: yup.string().required("Status is required"),
  metaKeywords: tagArraySchema,
  tags: tagArraySchema,
  image: imageSchema,
});

export const AddCollectionSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  image: imageSchema,
  isVisible: yup.boolean(),
  priority: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(1, "Priority must be at least 1")
    .required("Priority is required"),
  products: tagSchema,
});

export const SettingSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required"),
  phoneNumber: yup.number().typeError("Phone Number must be a number").transform(emptyToUndefined).required("Phone Number is required"),
  facebook: yup.string().required("Facebook is required"),
  twitter: yup.string().required("Twitter is required"),
  instagram: yup.string().required("Instagram is required"),
  image: imageSchema,
  newsLetterImage: imageSchema,
  headerOffer: tagArraySchema,
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.number().typeError("Zip Code must be a number").transform(emptyToUndefined).required("Zip Code is required"),
  mapLink: yup.string().required("Map Link is required"),
  whatsappNumber: yup.number().typeError("Whatsapp Number must be a number").transform(emptyToUndefined).required("Whatsapp Number is required"),
  whatsappMessage: yup.string().required("Whatsapp Message is required"),
  razorpayKeyId: yup.string().required("Razorpay Key Id is required"),
  razorpayKeySecret: yup.string().required("Razorpay Secret Key is required"),
  freeShippingThreshold: yup.number().typeError("Free shipping charge must be a number").transform(emptyToUndefined).required("Free shipping charge is required"),
  shippingCharge: yup.number().typeError("Shipping Charge must be a number").transform(emptyToUndefined).required("Shipping Charge is required"),
});

export const AddProductReviewSchema = yup.object().shape({
  productId: yup.string().required("Product is required"),
  comment: yup.string().required("Comment is required"),
  rating: yup.number().typeError("Rating must be a number").transform(emptyToUndefined).min(1, "Rating must be at least 1").required("Rating is required"),
});

export const AddEnquirySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
  message: yup.string().required("Message is required"),
  type: yup.string().required("Type is required"),
});

export const NewsLetterSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
});

export const AskQuestionSchema = yup.object().shape({
  productId: yup.string().required("Product is required"),
  name: yup.string().required("Name is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits and contain no letters"),
  email: yup.string().required("Email is required"),
  message: yup.string().required("Message is required"),
});

export const AttributeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  priority: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(1, "Priority must be at least 1")
    .required("Priority is required"),
});

export const ColorSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  colorCode: yup.string().required("Color Code is required"),
  priority: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(1, "Priority must be at least 1")
    .required("Priority is required"),
});

export const AddOurStorySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  image: imageSchema,
  description: yup.string().required("Description is required"),
});

export const UniqueCategorySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  priority: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(1, "Priority must be at least 1")
    .required("Priority is required"),
  image: imageSchema,
});
