import {useAppApi} from "~/composables/useAppApi";

export const useLanguage = () => {
    const runtime = useRuntimeConfig();
    const appApiUrl = runtime.public.appApiUrl;
    const getLanguages = async () => {
        return useAppApi(`${appApiUrl}/languages`);
    }

    return {
        getLanguages
    }
}