import { GetApiResponse } from "@/Types/CoreComponents";
import { getToken } from "@/Utils";
import { Toaster } from "@/Utils/ToastNotification";
import axios, { AxiosRequestConfig } from "axios";

async function Get<T>(url: string): Promise<GetApiResponse<T> | null> {
  let isRedirecting = false;
  const authToken = getToken();

  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      Authorization: authToken,
    },
  };

  try {
    const response = await axios.get<GetApiResponse<T>>(url, config);

    const resData = response.data;

    if (response.status === 200) {
      if (resData.status === 200) {
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

export default Get;
