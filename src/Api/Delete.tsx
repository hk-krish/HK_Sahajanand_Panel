import { DeleteApiResponse } from "@/Types/CoreComponents";
import { getToken } from "@/Utils";
import { Toaster } from "@/Utils/ToastNotification";
import axios, { AxiosError } from "axios";

const Delete = async (url: string, data?: any, toaster?: boolean): Promise<DeleteApiResponse | null> => {
  let isRedirecting = false;
  const authToken = getToken();

  try {
    const response = await axios.delete<DeleteApiResponse>(url, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
      data,
    });

    const resData = response.data;

    if (response.status === 200) {
      if (resData.status === 200) {
        Toaster("success", resData.message || "Success");
        return resData;
      } else {
        Toaster("error", resData.message || "Something went wrong");
        return null;
      }
    } else if (toaster) {
      if (response.status === 404) {
        Toaster("error", resData.message || "Not Found");
      } else {
        Toaster("error", resData.message || "Something went wrong");
      }
    }
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const msg = err?.response?.data?.message || "Something went wrong";
    const status = err?.response?.status;
    if (toaster) {
      if (status === 410 && !isRedirecting) {
        isRedirecting = true;
        window.location.href = "/";
        setTimeout(() => (isRedirecting = false), 1000);
      } else {
        Toaster("error", msg);
      }
    }
  }

  return null;
};

export default Delete;
