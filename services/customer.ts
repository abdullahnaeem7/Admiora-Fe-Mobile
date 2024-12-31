import { privateApi } from "../utils/axiosInstance";

export const update = async (updates: any): Promise<any> => {
  const { data } = await privateApi.patch(`/customer`, updates);
  return data;
};

export const getProfile = async (): Promise<any> => {
  const { data } = await privateApi.get(`/customer/getSingle`);
  return data;
};

export const deleteProfile = async (): Promise<void> => {
  await privateApi.delete(`/customer`);
};
