import { privateApi } from "../utils/axiosInstance";

export const addToFavorites = async (productId: string): Promise<any> => {
  try {
    const { data } = await privateApi.post(`/favorites/add`, { productId });
    console.warn("data", data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromFavorites = async (productId: string): Promise<any> => {
  const { data } = await privateApi.post(`/favorites/remove`, { productId });
  return data;
};

export const getFavorites = async (): Promise<any> => {
  const { data } = await privateApi.get(`/favorites`);
  return data;
};
