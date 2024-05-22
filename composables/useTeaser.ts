export const useTeaser = () => {
    const runtime = useRuntimeConfig();
    const appApiUrl = runtime.public.appApiUrl;
    const getTeasers = async () => {
        return $fetch(`${appApiUrl}/teasers`);
    }

    const getTeaser = async (id : string) => {
        return $fetch(`${appApiUrl}/teaser/${id}`);
    }

    const generateTeaser = async (prompt : string, language: string = 'FR') => {
        return $fetch(`${appApiUrl}/teaser/generate`, {
            method: 'POST',
            body: {prompt, language}
        });
    }

    const saveTeaser = (data : any) => {
        return useFetch(`${appApiUrl}/teaser`, {
            method: 'POST',
            body: {prompt_id: data.prompt_id, story_id: data.story_id, teaser: data.teaser}
        });
    }

    return {
        getTeasers,
        getTeaser,
        saveTeaser,
        generateTeaser
    }
}