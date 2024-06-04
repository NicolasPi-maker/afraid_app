export const useStory = () => {
    const runtime = useRuntimeConfig();
    const appApiUrl = runtime.public.appApiUrl;
    const generateStory = (data: any) => {
        return $fetch(`${appApiUrl}/story`, {
            method: 'POST',
            body: data
        });
    }

    const generateStoryContinuation = (storyId: string) => {
        return $fetch(`${appApiUrl}/story/continuation/${storyId}`);
    }

    const getStory = async (id: string) => {
        return $fetch(`${appApiUrl}/story/${id}`);
    }

    const storeChapters = async (generated_story: any, storyId: string) => {
        return useFetch(`${appApiUrl}/chapter/${storyId}`, {
            method: 'POST',
            body: {generated_story}
        });
    }

    return {
        generateStory,
        getStory,
        storeChapters,
        generateStoryContinuation
    }
}