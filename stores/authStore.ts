import { defineStore } from "pinia";
import type {User} from "~/utils/interfaces";
import type {ComputedRef, Ref} from "vue";
import type {FormLogin, FormRegister} from "~/utils/interfaces/forms.interface";
import { useAuth } from "~/composables/useAuth";

const {apiLogin, apiCheckUser, apiSignup} = useAuth();
interface AuthState {
  user: User | null,
  loaded: boolean,
  token: string | null,
  refreshToken: ComputedRef<string | null> | null,
}
export const useAuthStore = defineStore('auth', () => {
  const user : Ref<User | null> = ref(null);
  const loaded = ref(false);
  const token = useCookie('auth.token', {maxAge: 60 * 60 * 2, watch: true});
  const refreshToken = useCookie('auth.refreshToken', {maxAge: 60 * 60 * 24, watch: true});
  const isAuthenticated = computed(() => !!user.value);

  function setUserData(userData : User | null) {
    user.value = userData;
    loaded.value = true;
  }

  async function login(formData: FormLogin): Promise<void> {
    try {
      const response = await apiLogin(formData);
      token.value = response.token;
      refreshToken.value = response.refreshToken;
      await checkUser();
    } catch (error) {
      console.error(error);
    }
  }

  async function checkUser() {
    if(token.value && !user.value) {
      try {
        const response = await apiCheckUser();
        if(response.success) {
          setUserData(response.user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function register(formData: FormRegister): Promise<void> {
    try {
      const response = await apiSignup(formData);
      if(response.success) {
        await login({email: formData.email, password: formData.password});
      }
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    token.value = null;
    refreshToken.value = null;
    loaded.value = false;
    user.value = null;
  }

  function logoutAndRedirect() {
    logout();
    navigateTo({name: 'login'});
  }

  return {
    user,
    loaded,
    token,
    refreshToken,
    isAuthenticated,
    logout,
    login,
    register,
  }
});