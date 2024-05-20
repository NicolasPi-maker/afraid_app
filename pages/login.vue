<script setup lang="ts">
import AppButton from "~/components/shared/AppButton.vue";
import PasswordInput from "~/components/form/PasswordInput.vue";
const loginTitle = 'Entrez vos identifiants et connectez votre âme';
import InputErrorValidationMessage from "~/components/form/InputErrorValidationMessage.vue";
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useField, useForm} from "vee-validate";
import type {FormLogin} from "~/utils/interfaces/forms.interface";

const loading = ref(false);
const initialValues = {
  email: 'nicolas_pinier@hotmail.fr',
  password: '123456',
};

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, { message: 'Ce champ est requis' }).email({ message: 'Votre email doit être valide' }),
    password: z.string({ required_error: 'Ce champ est requis' }).min(1, { message: 'Ce champ est requis' })
  })
);

const { handleSubmit } = useForm<FormLogin>({
  initialValues,
  validationSchema,
});

const email = useField('email', '', {
  validateOnValueUpdate: false,
});
const password = useField('password', '', {
  validateOnValueUpdate: false,
});

const authStore = useAuthStore();
const submit = handleSubmit(async (formValue: FormLogin, { resetForm }) => {
  loading.value = true;
  try {
    await authStore.login(formValue);
    resetForm();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="login-wrapper flex flex-col h-full p-3">
    <h1 class="font-marina text-gray-500 text-center w-2/3 h-1/3 mx-auto content-center">{{ loginTitle.toUpperCase() }}</h1>
    <form @submit="submit" class="m-4 flex flex-col gap-8 justify-evenly h-2/3">
      <section class="flex flex-col gap-6">
        <div class="flex gap-6 items-center justify-center">
          <NuxtImg src="icons/Utilisateur.svg" alt="user" width="30" height="30" />
          <div class="flex flex-col gap-3 w-3/4">
            <input type="email" placeholder="E-mail" class="p-3 border rounded-lg text-sm w-full bg-black text-gray-500" v-model="email.value.value" @blur="email.handleChange" />
            <InputErrorValidationMessage v-if="email.errorMessage && email.meta.validated && !email.meta.valid">{{ email.errorMessage }}</InputErrorValidationMessage>
          </div>
        </div>
        <div class="flex gap-6 items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="white" d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3M9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z" />
          </svg>
          <div class="flex flex-col gap-3 w-3/4">
            <PasswordInput class="w-full" v-model="password.value.value" @blur="password.handleChange" />
            <InputErrorValidationMessage v-if="password.errorMessage && password.meta.validated && !password.meta.valid">{{ password.errorMessage }}</InputErrorValidationMessage>
          </div>
        </div>
        <UCheckbox
          label="Se souvenir de moi"
          :model-value="true"
          :ui="{
            color: 'text-blood',
            wrapper: 'mx-16 px-3',
            label: 'font-respira dark:text-gray-300',
            base: 'p-3',
            rounded: 'rounded-lg',
          }
        "/>
      </section>
      <div class="flex flex-col gap-3 items-center">
        <NuxtLink :to="{name: 'signup'}">
          <p class="text-sm text-gray-500">Pas encore de compte ?</p>
        </NuxtLink>
        <AppButton label="Connexion" class="w-3/4" />
        <p class="text-sm">Mot de passe oublié ?</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-wrapper {
  background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url("/background_app.jpg");
}
</style>