import { Login } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            Login(email, password),
    });
};
