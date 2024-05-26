<script setup lang="ts">
import type {Ref} from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const passwordInput: Ref<null | HTMLInputElement> = ref(null);
const passwordVisibility = ref(false);
const togglePasswordVisibility = () => {
  passwordVisibility.value = !passwordVisibility.value;
  if (passwordInput.value) {
    passwordInput.value.type = passwordVisibility.value ? 'text' : 'password';
  }
}

onMounted(() => {
  let domPasswordInput = document.getElementById('password') as HTMLInputElement;
  if (domPasswordInput) {
    passwordInput.value = domPasswordInput;
  }
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// Mettre à jour la valeur de l'input lorsque `modelValue` change
watch(() => props.modelValue, (newValue) => {
  if (passwordInput.value && passwordInput.value.value !== newValue) {
    passwordInput.value.value = newValue;
  }
});
</script>

<template>
  <div class="rounded-xl flex justify-between items-center relative">
    <label for="password" class="sr-only">Mot de passe</label>
    <input
        @input="handleInput"
        type="password"
        id="password"
        name="password"
        placeholder="Mot de passe"
        class="p-3 border rounded-lg text-sm w-full bg-black text-gray-500"
        autocomplete="true"
    />
    <button
        type="button"
        @click.stop="togglePasswordVisibility"
        aria-label="toggle password visibility"
        aria-pressed="false"
    >
      <NuxtImg v-if="passwordVisibility" src="icons/Voir.svg" alt="open eye icon, show the password" height="20" width="20" />
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21" aria-hidden="true">
        <rect width="21" height="21" fill="none" />
        <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" d="M2 10.5c2.537 3.667 5.37 5.5 8.5 5.5s5.963-1.833 8.5-5.5M4.5 13.423l-2 2.077m14-2.077l2 2.077m-6 .5l1 2.5m-5-2.5l-1 2.5" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
input {
  padding-right: 3em;
}

button {
  border: none;
  cursor: pointer;
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}
</style>