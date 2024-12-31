import authService from "./auth-service";

export const handleSignInChat = async (email: string) => {
    const dataUser = { full_name: '', login: email, password: 'ImN@R7378' };
    try {
        const response = await authService.signIn(dataUser);
        return response
    } catch (error) {
        throw error
    }
};

export const handleSignUpChat = async (name: string, email: string,) => {



    const dataUser = { full_name: name, login: email, password: 'ImN@R7378' };
    try {
        const response = await authService.signUp(dataUser);
        return response
    } catch (error) {
        throw error
    }
};