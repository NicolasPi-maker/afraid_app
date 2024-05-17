export const usePrompt = () => {
    const runtime = useRuntimeConfig();
    const appApiUrl = runtime.public.appApiUrl;
    const generateRandomPrompt = async (language: string) => {
        return await $fetch(`${appApiUrl}/prompt/random`, {
            method: 'POST',
            body: {language}
        });
    }

    return {
        generateRandomPrompt
    }
}