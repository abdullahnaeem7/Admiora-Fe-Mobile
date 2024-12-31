import { publicApi } from "@/utils/axiosInstance";

// Customer Login
export const Login = async (
    email: string,
    password: string
): Promise<{ resp: any }> => {
    const { data } = await publicApi.post(`/auth/customer/login`, {
        email,
        password,
    });
    return data;
};