import axios from "axios";

//Central Axios-instans för alla anrop mot backend.
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;

    let message: string;
    if (data?.errors) {
      message = Object.values(data.errors).flat().join(", ");
    } else if (data?.title) {
      message = data.title;
    } else if (data?.message) {
      message = data.message;
    } else {
      message = error.message || "Något gick fel";
    }
    return Promise.reject(new Error(message));
  },
);
