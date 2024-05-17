<script setup lang="ts">
import {onMounted} from "vue";

const { getTeaser } = useTeaser();
const state = reactive({
  teaser: null,
  loading: true,
});

const route = useRoute();

onMounted(async () => {
  try {
    const response = await getTeaser(route.params.id);
    state.teaser = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    state.loading = false;
  }
});
</script>

<template>
<pre>
  {{ state.teaser }}
</pre>
</template>

<style scoped>

</style>