<script setup lang="ts">
import FeatureCard from "~/components/nav/FeatureCard.vue";
</script>

<template>
  <div class="flex flex-col justify-evenly h-full p-4">
    <FeatureCard
        title="LIRE DES HISTOIRES"
        description="Accédez à une multitude d’histoires terrifiantes, audibles et illustrées,
        générées par Intelligence Artificielle, accompagnées d’images terrorisantes."
        icon-path="icons/Livre.svg"
        image-path="thumbnails/read_story.jpg"
        route-name="story"
    />
    <FeatureCard
        title="CRÉER DES HISTOIRES"
        description="Générés gratuitement jusqu’à 5 histoires par jours grâce à l’intelligence artificiel et à votre imagination !"
        icon-path="icons/Créer.svg"
        image-path="thumbnails/create_story.jpg"
        subtitle="Accessible uniquement aux utilisateurs connectés."
        route-name="teaser-create"
    />
  </div>
</template>

<style scoped>

</style>