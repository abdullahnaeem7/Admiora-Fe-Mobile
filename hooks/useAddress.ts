import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
    createAddress,
    updateAddress,
    getAllAddresses,
    getAddressById,
    deleteAddress,
} from '@/services/address';

export const useAllAddresses = (): UseQueryResult<any> => {
    return useQuery({
        queryKey: ['addresses'],
        queryFn: getAllAddresses,
    });
};

export const useAddressById = (addressId: string): UseQueryResult<any> => {
    return useQuery({
        queryKey: ['address', addressId],
        queryFn: () => getAddressById(addressId),
        enabled: !!addressId,
    });
};

export const useCreateAddress = () => {
    return useMutation({
        mutationFn: (addressData: any) => createAddress(addressData),
    });
};

export const useUpdateAddress = () => {
    return useMutation({
        mutationFn: ({
            addressId,
            updates,
        }: {
            addressId: string;
            updates: any;
        }) => updateAddress(addressId, updates),
    });
};

export const useDeleteAddress = () => {
    return useMutation({
        mutationFn: (addressId: string) => deleteAddress(addressId),
    });
};
