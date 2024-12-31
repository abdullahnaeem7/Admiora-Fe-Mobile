import { privateApi } from "../utils/axiosInstance";

export const createOrder = async (orderData: any): Promise<any> => {
  const { data } = await privateApi.post(`/order`, orderData);
  return data;
};

export const updateOrder = async (
  orderId: string,
  updates: any
): Promise<any> => {
  const { data } = await privateApi.patch(`/order/${orderId}`, updates);
  return data;
};

export const getMyOrders = async (): Promise<any> => {
  const { data } = await privateApi.get(`/order/myorders`);
  return data;
};

export const getOrderById = async (orderId: string): Promise<any> => {
  const { data } = await privateApi.get(`/order/${orderId}`);
  return data;
};

export const deleteOrder = async (orderId: string): Promise<void> => {
  await privateApi.delete(`/order/${orderId}`);
};
