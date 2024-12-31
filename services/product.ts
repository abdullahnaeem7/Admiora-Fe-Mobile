import { privateApi, publicApi } from "../utils/axiosInstance";

export const getAllProducts = async (
  searchTerm = "",
  page = 1,
  limit = 10,
  minPrice = "",
  maxPrice = ""
): Promise<any> => {
  const queryParams = new URLSearchParams({
    search: searchTerm,
    page: page.toString(),
    limit: limit.toString(),
    minPrice: minPrice,
    maxPrice: maxPrice,
  }).toString();

  const { data } = await publicApi.get(`/product?${queryParams}`);
  return data;
};

export const getMostFavoredProducts = async (): Promise<any> => {
  const { data } = await publicApi.get(`/product/mostFavored`);
  return data;
};

export const getTopOrderedProducts = async (
  searchTerm = "",
  page = 1,
  limit = 10,
  minPrice = "",
  maxPrice = ""
): Promise<any> => {
  const queryParams = new URLSearchParams({
    search: searchTerm,
    page: page.toString(),
    limit: limit.toString(),
    minPrice: minPrice,
    maxPrice: maxPrice,
  }).toString();
  const { data } = await publicApi.get(`/product/topopOrdered?${queryParams}`);
  return data;
};

export const getProductById = async (productId: string): Promise<any> => {
  const { data } = await publicApi.get(`/product/${productId}`);
  return data;
};

export const getAllProductsByCategoryId = async (
  searchTerm: string = "",
  page = 1,
  limit = 10,
  minPrice = "",
  maxPrice = "",
  categoryId: string
): Promise<any> => {
  const queryParams = new URLSearchParams({
    search: searchTerm,
    page: page.toString(),
    limit: limit.toString(),
    minPrice: minPrice,
    maxPrice: maxPrice,
  }).toString();

  console.warn("working>>>>");

  const { data } = await publicApi.get(
    `/product/category/${categoryId}?${queryParams}`
  );

  console.warn("data,,,,", data);

  return data;
};
