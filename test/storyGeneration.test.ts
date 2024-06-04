import {ref, reactive} from 'vue';
import { describe, it, expect, vi} from 'vitest';

const generateTeaser = vi.fn((lang: string, prompt: string) => {
    if(prompt === '' || lang === '') {
        throw new Error('Invalid input');
    }
    if(!prompt || !lang) {
        throw new Error('Missing input');
    }
    return `Generated teaser for ${lang} with prompt: ${prompt}`;
});

describe('storyGeneration', () => {
   describe('Check if the input is valid', () => {
     it('should return an error when the prompt is empty', () => {
          expect(() => generateTeaser('en', '')).toThrow('Invalid input');
     });
     it('should return an error when the prompt is missing', () => {
          expect(() => generateTeaser('en', null)).toThrow('Missing input');
     });
     it('should return a teaser when the prompt is valid', () => {
          expect(generateTeaser('en', 'test')).toBe('Generated teaser for en with prompt: test');
     });
   });
});

const launchStoryGeneration = vi.fn((isLoading: any, isOpen: any, storyGenerationLaunched: any) => {
    isLoading.value = true;
    isOpen.value = true;
    storyGenerationLaunched.value = true;
});
describe('Launch story generation', () => {
    it('indicators should be init at true value', () => {
        const isLoading = ref(false);
        const isOpen = ref(false);
        const storyGenerationLaunched = ref(false);

        launchStoryGeneration(isLoading, isOpen, storyGenerationLaunched);

        expect(isLoading.value).toBe(true);
        expect(isOpen.value).toBe(true);
        expect(storyGenerationLaunched.value).toBe(true);
    });
});

const generateSuccessStory = vi.fn((data) => {
    if (!data.prompt || !data.teaser || !data.speaker || !data.language) {
        throw new Error('Missing input');
    }
    return { success: true, data: { story_id: 1, generated_story: 'story content' } };
});

describe('Gestion des réussites de la réponse API', () => {
    it('devrait traiter correctement la réponse en cas de succès', async () => {
        const state = reactive({
            teaser: { title: '', content: '', illustration: { url: '', description: '' } },
            speaker: { id: 46, api_id: 'N2lVS1w4EtoT3dr4eOWO' },
            language: { id: 74, code: 'FR' },
        });
        const newStoryId = ref(0);

        const storyGenerationCheckPoint = ref<{
            storyGeneration: boolean | undefined;
            chaptersGeneration: boolean | undefined;
            speechGeneration: boolean | undefined;
        }>({
            storyGeneration: undefined,
            chaptersGeneration: undefined,
            speechGeneration: undefined,
        });

        const data = {
            prompt: 'A story prompt',
            teaser: state.teaser,
            speaker: state.speaker,
            language: state.language
        };

        const response = generateSuccessStory(data);

        if (response.success) {
            storyGenerationCheckPoint.value.storyGeneration = true;
            const { story_id, generated_story } = response.data;
            newStoryId.value = story_id;
        }

        expect(generateSuccessStory).toHaveBeenCalledWith(data);
        expect(newStoryId.value).toBe(1);
        expect(storyGenerationCheckPoint.value.storyGeneration).toBe(true);
    });
});


const generateErrorStory = vi.fn((data) => {
    if (!data.prompt || !data.teaser || !data.speaker || !data.language) {
        throw new Error('Missing input');
    }
    return { success: false };
});

describe('Gestion des échecs de la réponse API', () => {
    it('devrait traiter correctement la réponse en cas d’échec', async () => {
        const state = reactive({
            teaser: { title: '', content: '', illustration: { url: '', description: '' } },
            speaker: { id: 46, api_id: 'N2lVS1w4EtoT3dr4eOWO' },
            language: { id: 74, code: 'FR' },
        });

        const storyGenerationCheckPoint = ref<{
            storyGeneration: boolean | undefined;
            chaptersGeneration: boolean | undefined;
            speechGeneration: boolean | undefined;
        }>({
            storyGeneration: undefined,
            chaptersGeneration: undefined,
            speechGeneration: undefined,
        });

        const data = {
            prompt: 'A story prompt',
            teaser: state.teaser,
            speaker: state.speaker,
            language: state.language
        };

        const response = generateErrorStory(data);

        if (!response.success) {
            storyGenerationCheckPoint.value.storyGeneration = false;
        }

        expect(generateErrorStory).toHaveBeenCalledWith(data);
        expect(storyGenerationCheckPoint.value.storyGeneration).toBe(false);
    });
});

const generateStoryWithTimeout = (callback: CallableFunction) => {
    const timeout = 90000; // 1 minute 30 seconds

    const timer = setTimeout(() => {
        callback(new Error('Generation timeout exceeded'));
    }, timeout);

    // Simulate story generation
    const generationTime = Math.random() * 2 * 90000; // Random time between 0 and 2 * 1 minute 30 seconds

    setTimeout(() => {
        clearTimeout(timer);
        callback(null, 'Story Generated');
    }, generationTime);
};
describe('generateStoryWithTimeout', () => {
    it('should call the callback with "Story Generated" if the generation completes within 1 minute 30 seconds', () => {
        vi.useFakeTimers();

        const callback = vi.fn();

        generateStoryWithTimeout(callback); // Appelle la fonction avec le spy

        // Avance les timers de 1 minute
        vi.advanceTimersByTime(60000);
        expect(callback).toHaveBeenCalledWith(null, 'Story Generated');

        vi.useRealTimers();
    });

    it('should call the callback with an error if the generation exceeds 1 minute 30 seconds', () => {
        vi.useFakeTimers();

        const callback = vi.fn();

        generateStoryWithTimeout(callback);

        // Avance le timer de 1 minute 30 secondes + 1 milliseconde
        vi.advanceTimersByTime(90001);

        // Vérifie que le callback a été appelé avec une erreur
        expect(callback).toHaveBeenCalledWith(new Error('Generation timeout exceeded'));

        vi.useRealTimers();
    });
});






