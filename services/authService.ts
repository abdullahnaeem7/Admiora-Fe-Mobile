// authService.ts
import { privateApi, publicApi } from '@/libs/http/axios';
import { AuthResponse, SigninCredentials, SignupData, User } from '@/types/user/authTypes';
// Function to handle user signup
export const signup = async (userData: SignupData): Promise<AuthResponse> => {
    try {
        const response = await publicApi.post<AuthResponse>('/customer/signup', userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

// Function to handle user login
export const login = async (credentials: SigninCredentials): Promise<AuthResponse> => {
    try {
        const { data } = await publicApi.post<AuthResponse>('/customer/login', credentials);
        return data;

    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Function to get the current user (private API)
export const getProfile = async (): Promise<User> => {
    try {
        const response = await privateApi.get<User>('/customer/profile');
        return response.data;
    } catch (error) {
        console.error('Get user error:', error);
        throw error;
    }
};


