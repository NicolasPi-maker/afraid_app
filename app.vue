<script setup>
</script>

<template>
  <NuxtLayout>
    <NuxtPwaManifest />
    <NuxtPage />
<!--    <ClientOnly>-->
<!--      <div-->
<!--          v-if="$pwa?.offlineReady || $pwa?.needRefresh"-->
<!--          class="pwa-toast"-->
<!--          role="alert"-->
<!--      >-->
<!--        <div class="message">-->
<!--          <span v-if="$pwa.offlineReady">-->
<!--            App ready to work offline-->
<!--          </span>-->
<!--          <span v-else>-->
<!--            New content available, click on reload button to update.-->
<!--          </span>-->
<!--        </div>-->
<!--        <button-->
<!--            v-if="$pwa.needRefresh"-->
<!--            @click="$pwa.updateServiceWorker()"-->
<!--        >-->
<!--          Reload-->
<!--        </button>-->
<!--        <button @click="$pwa.cancelPrompt()">-->
<!--          Close-->
<!--        </button>-->
<!--      </div>-->
<!--      <div-->
<!--          v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"-->
<!--          class="pwa-toast"-->
<!--          role="alert"-->
<!--      >-->
<!--        <div class="message">-->
<!--          <span>-->
<!--            Install PWA-->
<!--          </span>-->
<!--        </div>-->
<!--        <button @click="$pwa.install()">-->
<!--          Install-->
<!--        </button>-->
<!--        <button @click="$pwa.cancelInstall()">-->
<!--          Cancel-->
<!--        </button>-->
<!--      </div>-->
<!--    </ClientOnly>-->
  </NuxtLayout>
  <UNotifications />
</template>

<style>
</style>
