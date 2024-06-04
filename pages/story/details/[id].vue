<script setup lang="ts">
import {useStory} from "~/composables/useStory";
import IconRegister from "~/components/icons/IconRegister.vue";
import IconArrowLeft from "~/components/icons/IconArrowLeft.vue";
import IconShare from "~/components/icons/IconShare.vue";
import AppButton from "~/components/shared/AppButton.vue";

const router = useRouter();
const { params } = useRoute();
const { getStory, generateStoryContinuation, storeChapters } = useStory();

const state = reactive({
  story : null,
  loading: true,
  storyContinuationLoading: false,
})

const loadStory = async () => {
  try {
    const response = await getStory(params.id);
    state.story = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    state.loading = false;
  }
}

onMounted(async () => {
  await loadStory();
});

const soundOnly = ref(false);
const toggleSoundOnly = () => {
  soundOnly.value = !soundOnly.value;
}


const storyPlayer = ref<HTMLAudioElement | null>(null);
const retries = ref(0);
const limitOfRetries = 10;
const isPlaying = ref(false);
const checkAudioPlayer = async () => {
  await nextTick();
  if (storyPlayer.value) {
    console.info(storyPlayer.value);
    retries.value = 0;
  } else {
    retries.value++;
    if (retries.value < limitOfRetries) {
      setTimeout(checkAudioPlayer, 100); // Réessayez après un court délai
    } else {
      console.error('Le lecteur audio n\'a pas pu être chargé.');
    }
  }
};

onMounted(async () => {
  await checkAudioPlayer();
});

const togglePlayer = () => {
  if (storyPlayer.value) {
    if (storyPlayer.value.paused) {
      storyPlayer.value.play();
      isPlaying.value = true;
    } else {
      storyPlayer.value.pause();
      isPlaying.value = false;
    }
  }
}

const showControls = ref(false);
const toggleShowControls = () => {
  showControls.value = !showControls.value;
  if(showControls.value) {
    setTimeout(() => {
      showControls.value = false;
    }, 5000);
  }
}

const launchGenerateStoryContinuation = async () => {
  if(state.story && state.story.id) {
    state.storyContinuationLoading = true;
    try {
      const response = await generateStoryContinuation(state.story.id);
      if(response.success) {
        const {data: chapterResponse } = await storeChapters(response.data, state.story.id);
        await loadStory();
        console.log(chapterResponse.value.data.success);
      }
    } catch (error) {
      console.error(error);
    } finally {
      state.storyContinuationLoading = false;
    }
  }
}

</script>

<template>
  <p id="text" v-if="state.loading">Chargement</p>
  <div v-else class="h-full flex flex-col">
    <section @click="toggleShowControls" class="relative thumbnail-wrapper opacity-80 transition-all duration-300 ease-in-out" :class="soundOnly ? 'flex flex-col flex-1' : ''">
      <NuxtImg :src="state.story.teasers[0].thumbnails[0].url" :alt="state.story.teasers[0].thumbnails[0].alt" class="w-full h-full object-cover" />
      <div class="header-teaser-wrapper glass flex flex-col absolute top-0 w-full p-2">
        <button @click="router.back()">
          <IconArrowLeft class="flex-1 mt-2 mx-5"/>
        </button>
        <div class="flex justify-between items-center mt-2 mx-3">
          <h1 class="font-marina text-xl w-1/2">{{ (state.story.teasers[0].title).toUpperCase() }}</h1>
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
      <button @click="togglePlayer" class="play-button absolute transition-opacity duration-500 ease-in-out" :class="showControls ? 'opacity-100' : 'opacity-0'">
        <Icon :name="!isPlaying ? 'material-symbols-light:play-arrow-rounded' : 'ic:round-pause'" color="white" size="4rem" />
      </button>
      <div class="flex gap-3 items-center justify-center w-full absolute bottom-0 mb-3">
        <audio controls ref="storyPlayer" id="story-player">
          <source :src="state.story.speeches[0].url" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <button @click="toggleSoundOnly">
          <Icon :name="!soundOnly ? 'material-symbols:fullscreen-rounded' : 'material-symbols:fullscreen-exit-rounded'" color="white" size="2rem" />
        </button>
      </div>
    </section>
    <section v-if="!soundOnly" class="flex flex-col flex-1 m-5 p-2">
      <div v-for="chapter in state.story.chapters" :key="chapter.id">
        <h2 class="text-xl font-marina my-6">{{ chapter.title }}</h2>
        <div class="imageContainer relative" v-if="chapter.illustration[0] !== undefined">
          <NuxtImg v-if="chapter.illustration.length > 0" :src="chapter.illustration[0].url" :alt="chapter.illustration.alt" class="w-full h-48 object-cover rounded-lg my-6 foregroundImg" />
          <NuxtImg v-if="chapter.illustration.length > 0" :src="chapter.illustration[0].url" :alt="chapter.illustration.alt" class="w-full h-48 object-cover rounded-lg my-6 backgroundImg" />
        </div>
        <ul class="flex flex-col gap-4 relative z-10">
          <li v-for="paragraph in chapter.paragraphs" :key="paragraph.id">
            <p class="font-respira">{{ paragraph.content }}</p>
          </li>
        </ul>
      </div>
<!--      <AppButton @click="launchGenerateStoryContinuation" label="Génerer la suite" icon-path="icons/Livre.svg" class="w-3/4 text-lg my-6 self-center"></AppButton>-->
    </section>
  </div>
</template>

<style scoped>
.thumbnail-wrapper {
  transition: all 0.3s;
}

.foregroundImg {
  position: relative;
  z-index: 2;
}

.backgroundImg {
  position: absolute;
  top: 2px;
  left: 0;
  transform: scale(1.05);
  transition: all 0.5s ease;
  z-index: 1;
  opacity: 0.8;
  filter: blur(24px);
}

.play-button {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  top: 50%;
  right: 50%;
  transform: translateX(50%);
  transition: all 0.3s;
}
</style>