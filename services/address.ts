import { privateApi } from "../utils/axiosInstance";

export const createAddress = async (addressData: any): Promise<any> => {
  const { data } = await privateApi.post(`/address`, addressData);
  return data;
};

export const updateAddress = async (
  addressId: string,
  updates: any
): Promise<any> => {
  const { data } = await privateApi.patch(`/address/${addressId}`, updates);
  return data;
};

export const getAllAddresses = async (): Promise<any> => {
  const { data } = await privateApi.get(`/address`);
  return data;
};

export const getAddressById = async (addressId: string): Promise<any> => {
  const { data } = await privateApi.get(`/address/${addressId}`);
  return data;
};

export const deleteAddress = async (addressId: string): Promise<void> => {
  await privateApi.delete(`/address/${addressId}`);
};
