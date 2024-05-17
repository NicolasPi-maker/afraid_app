<script setup lang="ts">
const state = reactive({
  teasers : [],
  loading: true,
});

const { getTeasers } = useTeaser();
const { data, pending } = await useAsyncData(
    'teasers', () => getTeasers()
);
state.teasers = data.value.data;
state.loading = pending;

const selectedCategoryName = ref('');
const categories = [
  {id: 1, name: 'Surnaturel'},
  {id: 2, name: 'Paranormal'},
  {id: 3, name: 'Horreur'},
  {id: 4, name: 'Gore'},
];

const isCategorySelected = (categoryName: string) => {
  return selectedCategoryName.value === categoryName;
}


const getRandomRate = (min: number, max: number) => {
  let randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(1);
}

const getRandomCategory = () => {
  return categories[Math.floor(Math.random() * categories.length)];
}
</script>

<template>
  <div v-if="!state.loading">
    <ul class="flex overflow-x-auto gap-3 m-3">
      <li v-for="category in categories"
          :key="category.id"
          @click="selectedCategoryName = category.name"
          :class="isCategorySelected(category.name) ? 'bg-unactiveBlood text-white active-filter' : ''"
          class="rounded-full border-2 border-gray-400 p-1 m-2 min-w-32 text-center cursor-pointer"
      >
        {{ category.name }}
      </li>
    </ul>
    <section class="grid grid-cols-1 gap-3">
      <article v-for="teaser in state.teasers" :key="teaser.id" class="m-4 p-2">
        <NuxtLink :to="{name: 'story-id', params: {id: teaser.story_id}}">
          <h2 class="text-2xl font-marina my-3">{{ (teaser.title).toUpperCase() }}</h2>
          <div class="flex w-full">
            <NuxtImg v-if="teaser.thumbnails.length > 0" :src="teaser.thumbnails[0].url" :alt="teaser.thumbnails[0].alt" class="object-cover rounded-lg" width="150px" height="150px" />
            <section class="mx-3 flex flex-col w-full">
              <div class="flex items-center">
                <div class="flex items-center gap-2 flex-1">
                  <p class="text-sm">{{ getRandomRate(3.0, 5.0) }}</p>
                  <NuxtImg src="icons/star.svg" alt="star" width="20px" height="20px" />
                </div>
                <Icon name="cil:options-horizontal" color="white" size="1.5rem" />
              </div>
              <p class="flex-1">13 min</p>
              <ul class="flex">
                <li class="rounded-full border border-gray-400 p-1 px-3 text-gray-500 text-sm text-center">
                  {{ getRandomCategory().name }}
                </li>
              </ul>
            </section>
          </div>
        </NuxtLink>
      </article>
    </section>
  </div>
  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

<style scoped>
.active-filter {
  box-shadow: 0 0 50px 5px #3D0000;
}
</style>