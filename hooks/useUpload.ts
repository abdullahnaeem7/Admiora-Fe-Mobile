import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '@/services/upload'; // Adjust the import path as necessary

export const useUploadFile = () => {
    return useMutation({
        mutationFn: (file: File) => uploadFile(file),
    });
};
