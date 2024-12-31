import { privateApi } from "../utils/axiosInstance";

export const useCreateCategory = async (categoryData: any): Promise<any> => {
  const { data } = await privateApi.post(`/category`, categoryData);
  return data;
};

export const updateCategory = async (
  categoryId: string,
  updates: any
): Promise<any> => {
  const { data } = await privateApi.patch(`/category/${categoryId}`, updates);
  return data;
};

export const getAllCategories = async (): Promise<any> => {
  const { data } = await privateApi.get(`/category`);
  return data;
};

export const getCategoryById = async (categoryId: string): Promise<any> => {
  const { data } = await privateApi.get(`/category/${categoryId}`);
  return data;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await privateApi.delete(`/category/${categoryId}`);
};
