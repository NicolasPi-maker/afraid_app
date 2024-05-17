export const useSpeech = () => {
    const runtime = useRuntimeConfig();
    const appApiUrl = runtime.public.appApiUrl;

    const saveSpeech = async (data : any) => {
        return useFetch(`${appApiUrl}/speech`, {
            method: 'POST',
            body: {story_id: data.story_id, speaker: data.speaker , language: data.language}
        });
    }

    return {
        saveSpeech,
    }
}