<script setup lang="ts">
import {useField, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import type {FormRegister} from "~/utils/interfaces/forms.interface";
import InputErrorValidationMessage from "~/components/form/InputErrorValidationMessage.vue";
import PasswordInput from "~/components/form/PasswordInput.vue";
import AppButton from "~/components/shared/AppButton.vue";
import {useAuthStore} from "~/stores/authStore";

const signinTitle = 'Vous voilà arrivé au seuil de l\'oubli éternel.';
const signinSubtitle = 'Donne ton identité pour être inscrit dans le grimoire des damnés.';
const loading = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    lastname: z.string().min(1, { message: 'Ce champ est requis' }),
    firstname: z.string().min(1, { message: 'Ce champ est requis' }),
    username: z.string().min(1, { message: 'Ce champ est requis' }),
    email: z.string().email({ message: 'Votre email doit être valide' }),
    password: z.string().min(1, { message: 'Ce champ est requis' }),
    acceptTerms: z.boolean().refine(value => value, { message: 'Vous devez accepter les conditions générales' }),
  })
);
const initialValues = {
  lastname: '',
  firstname: '',
  username: '',
  email: '',
  password: '',
  acceptTerms: false,
};

const { handleSubmit } = useForm<FormRegister>({
  initialValues,
  validationSchema,
});

const lastname = useField('lastname', '', {
  validateOnValueUpdate: false,
});
const firstname = useField('firstname', '', {
  validateOnValueUpdate: false,
});
const username = useField('username', '', {
  validateOnValueUpdate: false,
});
const email = useField('email', '', {
  validateOnValueUpdate: false,
});
const password = useField('password', '', {
  validateOnValueUpdate: false,
});
const acceptTerms = useField('acceptTerms', '', {
  validateOnValueUpdate: false,
});

const authStore = useAuthStore();
const submit = handleSubmit(async (formValue, { resetForm }) => {
  console.log(formValue)
  loading.value = true;
  try {
    await authStore.register(formValue);
    resetForm();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="signup-wrapper flex flex-col h-full">
    <header class="p-6 flex flex-col gap-6">
      <h1 class="font-marina text-gray-400 text-center mx-auto content-center text-xs">{{ signinTitle.toUpperCase() }}</h1>
      <p class="font-marina text-gray-400 text-center mx-auto content-center text-xs">{{ signinSubtitle.toUpperCase() }}</p>
    </header>
    <form @submit="submit" method="post" class="flex flex-1 flex-col gap-6 m-8">
      <section class="flex flex-1 flex-col gap-6">
        <fieldset class="flex flex-col gap-6">
          <legend class="sr-only">Informations de l'utilisateur</legend>
          <section class="flex gap-6">
            <NuxtImg src="icons/Utilisateur.svg" alt="user icon" width="30" height="30" />
            <div class="flex flex-col gap-3">
              <input v-model="lastname.value.value" type="text" id="lastname" name="lastname" placeholder="Nom" class="p-3 border rounded-lg text-sm w-full bg-black text-gray-500" />
              <InputErrorValidationMessage v-if="lastname.errorMessage && lastname.meta.validated && !lastname.meta.valid">{{ lastname.errorMessage }}</InputErrorValidationMessage>
            </div>
            <div class="flex flex-col gap-3">
              <input v-model="firstname.value.value" type="text" id="firstname" name="firstname" placeholder="Prénom" class="p-3 border rounded-lg text-sm w-full bg-black text-gray-500" />
              <InputErrorValidationMessage v-if="firstname.errorMessage && firstname.meta.validated && !firstname.meta.valid">{{ firstname.errorMessage }}</InputErrorValidationMessage>
            </div>
          </section>
          <section class="flex gap-6 w-full">
            <NuxtImg src="icons/Livre.svg" alt="username icon" width="30" height="30" />
            <div class="flex flex-col gap-3 w-full">
              <input v-model="username.value.value" type="text" id="username" name="username" placeholder="Nom d'utilisateur" class=" w-full flex-1 p-3 border rounded-lg text-sm bg-black text-gray-500" />
              <InputErrorValidationMessage v-if="username.errorMessage && username.meta.validated && !username.meta.valid">{{ username.errorMessage }}</InputErrorValidationMessage>
            </div>
          </section>
        </fieldset>
        <fieldset class="flex flex-col gap-6 w-full">
          <legend class="sr-only">Informations de connexion</legend>
          <section class="flex gap-6">
            <NuxtImg src="icons/Mail.svg" alt="mail icon" width="30" height="30" />
            <div class="flex flex-col gap-3 w-full">
              <input v-model="email.value.value" style="text-transform: lowercase" type="email" id="email" name="email" placeholder="E-mail" class="flex-1 p-3 border rounded-lg text-sm bg-black text-gray-500" />
              <InputErrorValidationMessage v-if="email.errorMessage && email.meta.validated && !email.meta.valid">{{ email.errorMessage }}</InputErrorValidationMessage>
            </div>
          </section>
          <section class="flex gap-6 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
              <rect width="24" height="24" fill="none" />
              <path fill="white" d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3M9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z" />
            </svg>
            <div class="flex flex-col gap-3 w-full">
              <PasswordInput class="w-full" v-model="password.value.value" @blur="password.handleChange" />
              <InputErrorValidationMessage v-if="password.errorMessage && password.meta.validated && !password.meta.valid">{{ password.errorMessage }}</InputErrorValidationMessage>
            </div>
          </section>
        </fieldset>
      </section>
      <section class="ml-14 flex flex-col gap-6 mb-4">
        <UCheckbox
            v-model="acceptTerms.value.value"
            :ui="{
            color: 'text-blood',
            label: 'font-respira dark:text-gray-400 text-xs',
            base: 'p-3',
            rounded: 'rounded-lg',
          }
        ">
          <template #label>
            <NuxtLink :to="{name: 'terms-cgu'}">J’accepte les <span class="underline">conditions générales</span></NuxtLink>
          </template>
        </UCheckbox>
        <InputErrorValidationMessage v-if="acceptTerms.errorMessage && acceptTerms.meta.validated && !acceptTerms.meta.valid">{{ acceptTerms.errorMessage }}</InputErrorValidationMessage>
        <UCheckbox
            label="J’accepte de recevoir des newletters par l’équipe GetAfraid et des offres promotionnelles"
            :model-value="true"
            :ui="{
            color: 'text-blood',
            label: 'font-respira dark:text-gray-400 text-xs',
            base: 'p-3',
            rounded: 'rounded-lg',
          }
        "/>
      </section>
      <section class="w-3/4 mx-auto flex flex-col gap-2 mb-6">
        <AppButton label="Créer mon compte" class="full" />
        <NuxtLink :to="{name: 'login'}">
          <p class="font-respira m-0 text-xs text-gray-400 text-center">J'ai déjà un compte</p>
        </NuxtLink>
      </section>
    </form>
  </div>
</template>

<style scoped>
.signup-wrapper {
  background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.7)), url("/background_app.jpg");
}
</style>