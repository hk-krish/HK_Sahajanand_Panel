import { PostApiResponse } from "@/Types/CoreComponents";
import { getToken } from "@/Utils";
import { Toaster } from "@/Utils/ToastNotification";
import axios from "axios";

let isRedirecting = false;

async function Post<TInput, TResponse>(url: string, data?: TInput, isToken: boolean = true): Promise<PostApiResponse<TResponse> | null> {
  const isFormData = data instanceof FormData;
  const authToken = getToken();
  const headers = {
    ...(isToken ? { Authorization: authToken } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  try {
    const response = await axios.post<PostApiResponse<TResponse>>(url, data, { headers });
    const resData = response.data;

    if (response.status === 200) {
      if (resData.status === 200) {
        Toaster("success", resData.message || "Success");
        return resData;
      } else {
        Toaster("error", resData.message || "Something went wrong");
        return null;
      }
    } else if (response.status === 404) {
      Toaster("error", resData.message || "Not Found");
    } else {
      Toaster("error", resData.message || "Something went wrong");
    }
  } catch (error: any) {
    const msg = error?.response?.data?.message || "No database connection";
    const status = error?.response?.status;

    if (status === 410 && !isRedirecting) {
      isRedirecting = true;
      window.location.href = "/";
      setTimeout(() => (isRedirecting = false), 1000);
    } else {
      Toaster("error", msg);
    }
  }

  return null;
}

export default Post;
