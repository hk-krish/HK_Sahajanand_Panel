export const ToolbarOptions = [["bold", "italic", "underline", "strike"], ["blockquote", "code-block"], ["link", "image", "video", "formula"], [{ header: 1 }, { header: 2 }], [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], [{ script: "sub" }, { script: "super" }], [{ indent: "-1" }, { indent: "+1" }], [{ direction: "rtl" }], [{ size: ["small", false, "large", "huge"] }], [{ header: [1, 2, 3, 4, 5, 6, false] }], [{ color: [] }, { background: [] }], [{ font: [] }], [{ align: [] }], ["clean"]];

export const LimitOptions = [
  { value: 10, label: 10 },
  { value: 30, label: 30 },
  { value: 50, label: 50 },
  { value: 100, label: 100 },
];

export const BlogStatus = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
];

export const BannerTypeData = [
  { value: "hero", label: "Hero" },
  { value: "offer", label: "Offer" },
  { value: "collection", label: "Collection" },
];

export const LinkTypeData = [
  { label: "All Product", value: "page" },
  { label: "Best selling", value: "isBestSeller" },
  { label: "New Arrival", value: "isNewArrival" },
  { label: "Featured", value: "isFeatured" },
  { label: "Category", value: "category" },
  { label: "Unique Category", value: "unique-category" },
  { label: "Collection", value: "collection" },
];

export const CategoryData = [
  { value: "orders", label: "Orders" },
  { value: "payments", label: "Payments" },
  { value: "shipping", label: "Shipping" },
  { value: "returns", label: "Returns" },
  { value: "products", label: "Products" },
  { value: "account", label: "Account" },
  { value: "technical", label: "Technical" },
  { value: "pricing", label: "Pricing" },
  { value: "security", label: "Security" },
];

export const CollectionTypeData = [
  { value: "our", label: "Our" },
  { value: "occasion", label: "Occasion" },
  { value: "material", label: "Material" },
  { value: "color", label: "Color" },
  { value: "theme", label: "Theme" },
];

export const EnquiryTypeData = [
  { value: "enquiry", label: "Enquiry" },
  { value: "contact-us", label: "Contact Us" },
];

export const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#fff",
    padding: "4px",
    border: "1px dashed #dedbdb",
    borderRadius: "4px",
    boxShadow: "none",
    "&:hover": { borderColor: "#dedbdb" },
  }),
  menu: (base) => ({
    ...base,
    maxHeight: 200,
    zIndex: 9999,
    overflow: "hidden",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    padding: "12px 16px",
    height: "auto",
    backgroundColor: isFocused ? "#f0f0f0" : "#fff",
    color: "#000",
    cursor: "pointer",
  }),
  placeholder: (base) => ({ ...base, color: "#aaa" }),
  singleValue: (base) => ({ ...base, color: "#000" }),
};