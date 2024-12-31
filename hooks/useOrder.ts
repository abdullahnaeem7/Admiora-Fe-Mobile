import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  createOrder,
  updateOrder,
  getMyOrders,
  getOrderById,
  deleteOrder,
} from "@/services/order";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (orderData: any) => createOrder(orderData),
  });
};

export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: ({ orderId, updates }: { orderId: string; updates: any }) =>
      updateOrder(orderId, updates),
  });
};

export const useMyOrders = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });
};

export const useOrderById = (orderId: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
  });
};
