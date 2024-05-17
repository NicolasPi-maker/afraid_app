<script setup lang="ts">
import {useStory} from "~/composables/useStory";
import IconRegister from "~/components/icons/IconRegister.vue";
import IconArrowLeft from "~/components/icons/IconArrowLeft.vue";
import IconShare from "~/components/icons/IconShare.vue";

const router = useRouter();
const { params } = useRoute();
const { getStory } = useStory();

const state = reactive({
  story : null,
  loading: true,
})

const { data, pending } = await getStory(params.id);
state.story = data.value.data;
state.loading = pending;

const soundOnly = ref(false);
const toggleSoundOnly = () => {
  soundOnly.value = !soundOnly.value;
}

</script>

<template>
  <div class="h-full flex flex-col">
    <section class="relative thumbnail-wrapper opacity-80" :class="soundOnly ? 'flex flex-col flex-1' : ''">
      <NuxtImg :src="state.story.teasers[0].thumbnails[0].url" :alt="state.story.teasers[0].thumbnails[0].alt" class="w-full h-full object-cover" />
      <div class="header-teaser-wrapper flex flex-col absolute top-0 w-full p-2">
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
      <div class="flex gap-3 items-center justify-center w-full absolute bottom-0 mb-3">
        <audio controls>
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
        <h2 class="text-xl font-marina my-3">{{ chapter.title }}</h2>
        <NuxtImg v-if="chapter.illustration.length > 0" :src="chapter.illustration[0].url" :alt="chapter.illustration.alt" class="w-full h-48 object-cover rounded-lg my-3" />
        <ul class="flex flex-col gap-4">
          <li v-for="paragraph in chapter.paragraphs" :key="paragraph.id">
            <p class="font-respira">{{ paragraph.content }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.thumbnail-wrapper {
  transition: all 0.3s;
}
</style>