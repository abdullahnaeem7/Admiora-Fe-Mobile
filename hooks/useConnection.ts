import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appContext from '@/context/appContext';
import { useCustomerProfile } from '@/hooks/useCustomer';  // Import useCustomerProfile hook

const useConnection = () => {
    const context = useContext(appContext);
    const { user, setUser, setIsLogged, setLoading } = context;



    const { data: profileData, isLoading, isError, error } = useCustomerProfile(); // Use the hook to fetch the profile

    const checkTokenAndFetchUser = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("@user_token");

            if (token) {
                if (!isLoading && !isError && profileData) {
                    setUser(profileData);  // Update the user context with profile data
                    setIsLogged(true);  // User is logged in
                } else if (isError) {
                    setIsLogged(false);  // Handle error in fetching profile
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setIsLogged(false);
        } finally {
            setLoading(false);  // Set loading state to false once all logic is complete
        }
    };

    return { checkTokenAndFetchUser };
};

export default useConnection;
