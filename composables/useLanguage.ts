export const useLanguage = () => {
    const runtime = useRuntimeConfig();
    const appApiUrl = runtime.public.appApiUrl;
    const getLanguages = async () => {
        return $fetch(`${appApiUrl}/languages`);
    }

    return {
        getLanguages
    }
}