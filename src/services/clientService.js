import axios from "axios";
import getAuthToken from "./cookies";
import i18n from "@/i18n";

const clientApi = axios.create({
  baseURL: "https://getsimt.com/api/v1/admin",
});

export const request = async (options) => {
  const token = getAuthToken();
  console.log(options);

  try {
    const res = await clientApi.request({
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
        "Accept-Language": i18n.language, 
      },
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Unexpected error");
    }
  }
};
