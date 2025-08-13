export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const URL = {
  Auth: {
    Login: "/auth/login",
    ForgotPassword: "/auth/reset-password",
  },
  PrivacyPolicy: {
    PrivacyPolicy: "/privacy-policy",
    PrivacyPolicyEdit: "/privacy-policy/add/edit",
  },
  AboutUs: {
    AboutUs: "/about-us",
    AboutUsEdit: "/about-us/add/edit",
  },
  ReturnPolicy: {
    ReturnPolicy: "/return-policy",
    ReturnPolicyEdit: "/return-policy/add/edit",
  },
  TermsCondition: {
    TermsCondition: "/terms-condition",
    TermsConditionEdit: "/terms-condition/add/edit",
  },
  Category: {
    Category: "/category",
    Add: "/category/add",
    Delete: "/category",
    Edit: "/category/edit",
  },
  Upload: {
    Upload: "/upload",
    Delete: "/upload",
  },
  Product: {
    Product: "/product",
    Add: "/product/add",
    Edit: "/product/edit",
    Delete: "/product",
  },
  Blog: {
    Blog: "/blog",
    Add: "/blog/add",
    Edit: "/blog/edit",
    Delete: "/blog",
  },
  Banner: {
    Banner: "/banner",
    Add: "/banner/add",
    Edit: "/banner/edit",
    Delete: "/banner",
  },
  Faq: {
    Faq: "/faq",
    Add: "/faq/add",
    Edit: "/faq/edit",
    Delete: "/faq",
  },
  Collection: {
    Collection: "/collection",
    Add: "/collection/add",
    Edit: "/collection/edit",
    Delete: "/collection",
  },
  Users: {
    User: "/user",
    EditAdmin: "/user/edit-admin",
  },
  ProductReview: {
    ProductReview: "/product-review",
    Add: "/product-review/add",
    Edit: "/product-review/edit",
  },
  Enquiry: {
    Enquiry: "/enquiry",
    Add: "/enquiry/add",
    Edit: "/enquiry/edit",
    Delete: "/enquiry",
  },
  NewsLetter: {
    NewsLetter: "/news-letter",
    Add: "/news-letter/add",
    Edit: "/news-letter/edit",
    Delete: "/news-letter",
  },
  AskQuestion: {
    AskQuestion: "/ask-a-question",
    Add: "/ask-a-question/add",
    Edit: "/ask-a-question/edit",
    Delete: "/ask-a-question",
  },
  Order: {
    Order: "/order",
    Add: "/order/add",
  },
  Material: {
    Material: "/material/all",
    Add: "/material/add",
    Edit: "/material/edit",
    Delete: "/material",
  },
  Color: {
    Color: "/color/all",
    Add: "/color/add",
    Edit: "/color/edit",
    Delete: "/color",
  },
  Occasion: {
    Occasion: "/occasion/all",
    Add: "/occasion/add",
    Edit: "/occasion/edit",
    Delete: "/occasion",
  },
  Fabric: {
    Fabric: "/fabric/all",
    Add: "/fabric/add",
    Edit: "/fabric/edit",
    Delete: "/fabric",
  },
  Size: {
    Size: "/size/all",
    Add: "/size/add",
    Edit: "/size/edit",
    Delete: "/size",
  },
  OurStory: {
    OurStory: "/our-story",
    Edit: "/our-story/add/edit",
  },
  UniqueCategory: {
    UniqueCategory: "/unique-category/all",
    Add: "/unique-category/add",
    Delete: "/unique-category",
    Edit: "/unique-category/edit",
  },
} as const;

type UrlMap = typeof URL;
type ResolvedUrlMap = {
  [K in keyof UrlMap]: UrlMap[K] extends string ? string : { [P in keyof UrlMap[K]]: string };
};

export const Url_Keys: ResolvedUrlMap = Object.fromEntries(
  Object.entries(URL).map(([key, value]) => {
    if (typeof value === "string") {
      return [key, `${BASE_URL}${value}`];
    } else {
      const nested = Object.fromEntries(Object.entries(value).map(([subKey, path]) => [subKey, `${BASE_URL}${path}`]));
      return [key, nested];
    }
  })
) as ResolvedUrlMap;
