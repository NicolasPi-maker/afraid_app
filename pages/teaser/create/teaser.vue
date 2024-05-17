<script setup lang="ts">
import IconArrowLeft from "~/components/icons/IconArrowLeft.vue";
import IconShare from "~/components/icons/IconShare.vue";
import IconRegister from "~/components/icons/IconRegister.vue";
import AppButton from "~/components/shared/AppButton.vue";
import {useSpeech} from "~/composables/useSpeech";

const router = useRouter();
const prompt = useState('prompt', () => {
  return '';
});

const state = reactive({
  teaser : {
    title: '',
    content: '',
    illustration: {
      url: '',
      description: '',
    }
  },
  speaker : {
    id: 46,
    api_id: 'OVVPnTGPGhk7vn3RUB1h'
  },
  language: {
    id: 74,
    code: 'FR',
  }
});

const isLoading = ref(false);

const { generateTeaser, saveTeaser } = useTeaser();
const { generateStory, storeChapters} = useStory();
const { saveSpeech } = useSpeech();

const { data, pending, error, refresh } = await generateTeaser(prompt.value);
state.teaser = data.value.teaser;

const confirmTeaser = async () => {
  const data = {
    prompt: prompt.value,
    teaser: state.teaser,
    speaker: state.speaker,
    language: state.language,
  };
  isLoading.value = true;
  try {
    const response = await generateStory(data);
    if(response.success) {
      // prompt.value = '';
      // await router.push({name: 'story-id', params: {id: response.data}});
      const { prompt_id, teaser, story_id, generated_story } = response.data;
      await saveTeaser({prompt_id, story_id, teaser});
      await storeChapters(generated_story, story_id);
      await saveSpeech({story_id, speaker: data.speaker, language: data.language});
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <section class="relative thumbnail-wrapper opacity-80">
      <NuxtImg :src="state.teaser.illustration.url" :alt="state.teaser.illustration.description" class="w-full" />
      <div class="header-teaser-wrapper flex flex-col absolute top-0 w-full p-2">
        <button @click="router.back()">
          <IconArrowLeft class="flex-1 mt-2 mx-5"/>
        </button>
        <div class="flex justify-between items-center mt-2 mx-3">
          <h1 class="font-marina text-xl w-1/2">{{ (state.teaser.title).toUpperCase() }}</h1>
          <ul class="flex gap-4">
            <li>
              <IconShare width="30" height="30" />
            </li>
            <li>
              <IconRegister width="30" height="30" />
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="text-wrapper flex flex-1">
      <div class="flex flex-col gap-3 mx-5 p-2">
        <h2 class="font-marina text-lg">RÉSUMÉ</h2>
        <p class="font-respira text-gray-400">{{ state.teaser.content }}</p>
      </div>
    </section>
    <section class="flex justify-center items-center gap-6 m-6 mb-12">
      <NuxtLink :to="{name : 'story-create'}" class="w-1/2">
        <AppButton label="Retour" outlined class="w-full"/>
      </NuxtLink>
      <AppButton label="Valider le résumé" @click="confirmTeaser" class="w-1/2"/>
    </section>
  </div>
</template>

<style scoped>
.header-teaser-wrapper {
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,1) 41%, rgba(255,255,255,0) 100%);
}

.thumbnail-wrapper {
  -webkit-box-shadow: inset 0 0 50px 50px #000000;
  box-shadow: inset 0 0 50px 50px #000000;
}

.text-wrapper {
  box-shadow: -3px -22px 50px 47px #000000;
}
</style>