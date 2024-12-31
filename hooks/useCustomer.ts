import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { update, getProfile, deleteProfile } from '@/services/customer'; // Adjust the import path as necessary

export const useCustomerProfile = (): UseQueryResult<any> => {
    return useQuery({
        queryKey: ['customer-profile'],
        queryFn: getProfile,
    });
};

export const useUpdateCustomerProfile = () => {
    return useMutation({
        mutationFn: (updates: any) => update(updates),
    });
};

export const useDeleteCustomerProfile = () => {
    return useMutation({
        mutationFn: deleteProfile,
    });
};
