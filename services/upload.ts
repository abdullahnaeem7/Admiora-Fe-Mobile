import { privateApi } from "../utils/axiosInstance";

export const uploadFile = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await privateApi.post(`/file/upload`, formData);
  return data;
};
