import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "@/services/favourite";

export const useAddToFavorites = () => {
  return useMutation({
    mutationFn: (productId: string) => addToFavorites(productId),
  });
};

export const useRemoveFromFavorites = () => {
  return useMutation({
    mutationFn: (productId: string) => removeFromFavorites(productId),
  });
};

export const useFavorites = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
};
