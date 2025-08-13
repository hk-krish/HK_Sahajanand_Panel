import Cookies from "js-cookie";

//dynamic Number
export const dynamicNumber = (totalLength: number) => {
  return Array.from({ length: totalLength }, (_, index) => index + 1);
};

//get token
export const getToken = () => {
  return Cookies.get("sahajanand-admin-token");
};

export const generateOptions = (data?: { _id: string; name: string }[]) => data?.map((item) => ({ value: item._id, label: item.name })) || [];
