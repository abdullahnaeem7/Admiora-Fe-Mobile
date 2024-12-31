import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  createOrder,
  updateOrder,
  getMyOrders,
  getOrderById,
  deleteOrder,
} from "@/services/order";
import { getAllCategories } from "@/services/catagory";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (categoryData: any) => createOrder(categoryData),
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({
      categoryId,
      updates,
    }: {
      categoryId: string;
      updates: any;
    }) => updateOrder(categoryId, updates),
  });
};

export const useAllCategory = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["all-category"],
    queryFn: getAllCategories,
  });
};

export const useCategoryById = (categoryId: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getOrderById(categoryId),
    enabled: !!categoryId,
  });
};

export const useDelete = () => {
  return useMutation({
    mutationFn: (categoryId: string) => deleteOrder(categoryId),
  });
};
