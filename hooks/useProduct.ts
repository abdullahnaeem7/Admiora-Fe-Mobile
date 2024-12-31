import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getAllProducts,
  getMostFavoredProducts,
  getTopOrderedProducts,
  getProductById,
  getAllProductsByCategoryId,
} from "@/services/product";

export const useAllProducts = (
  searchTerm: string = "",
  page: number = 1,
  limit: number = 10,
  minPrice = "",
  maxPrice = ""
): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["products", searchTerm, page, limit, minPrice, maxPrice],
    queryFn: () => getAllProducts(searchTerm, page, limit, minPrice, maxPrice),
  });
};

export const useMostFavoredProducts = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["most-favored-products"],
    queryFn: getMostFavoredProducts,
  });
};

export const useTopOrderedProducts = (
  searchTerm: string = "",
  page: number = 1,
  limit: number = 10,
  minPrice = "",
  maxPrice = ""
): UseQueryResult<any> => {
  return useQuery({
    queryKey: [
      "top-ordered-products",
      searchTerm,
      page,
      limit,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getTopOrderedProducts(searchTerm, page, limit, minPrice, maxPrice),
  });
};

export const useProductById = (productId: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};
export const useAllProductsByCategoryId = (
  searchTerm: string = "",
  page: number = 1,
  limit: number = 10,
  minPrice = "",
  maxPrice = "",
  categoryId: string
): UseQueryResult<any> => {
  return useQuery({
    queryKey: [
      "product",
      searchTerm,
      page,
      limit,
      minPrice,
      maxPrice,
      categoryId,
    ],
    queryFn: () =>
      getAllProductsByCategoryId(
        searchTerm,
        page,
        limit,
        minPrice,
        maxPrice,
        categoryId
      ),
  });
};
