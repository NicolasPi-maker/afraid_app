import type {FormLogin, FormRegister} from "~/utils/interfaces/forms.interface";
import type {User} from "~/utils/interfaces";

export const useAuth = () => {
    const apiLogin = async (formData: FormLogin): Promise<{ token: string, refreshToken: string, success: boolean}> => {
        try {
            return await useAppApi(`/login`, {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            return { token: '', refreshToken: '', success: false };
        }
    }

    const apiCheckUser = async (): Promise<{ success: boolean; user: User | null }> => {
        try {
            // check if users token is valid and keep users logged in
            return await useAppApi(`/me`);
        } catch (error) {
            return { success: false, user: null };
        }
    }

    const apiSignup = async (formData: FormRegister): Promise<{ success: boolean, message: string}> => {
        try {
            return await useAppApi(`/register`, {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            // @ts-ignore
            return { success: error.success, message: error.message};
        }
    }

    return {
        apiLogin,
        apiCheckUser,
        apiSignup,
    }
}