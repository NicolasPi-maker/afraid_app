let currentRefreshTry = ref(false);

type Response = {
    success?: boolean;
    token?: string;
};

export const useAppApi = (url: string, options: object = {}): Promise<any> => {
    const runtime = useRuntimeConfig();
    const baseUrl = runtime.public.appApiUrl;

    const authStore = useAuthStore();
    let { token, refreshToken} = storeToRefs(authStore);

    return $fetch(url, {
        baseURL: baseUrl,
        onRequest({request, options}) {
            options.headers = {
                ...options.headers,
                "Accept": "application/json",
                "Cache-Control": "no-cache",
            };
            if (request !== '/refresh' && request !== '/login') {
                if (token.value) {
                    options.headers = {
                        ...options.headers,
                        "Authorization": "Bearer " + token.value,
                    }
                }
            }
        },
        onResponse({response}) {
            if(!response.hasOwnProperty('_data') && response.status === 204) {
                response._data = {
                    message: 'No content',
                    responseHttpCode: 204
                }
            } else {
                response._data.responseHttpCode = response.status;
            }
        },
        retryStatusCodes: [401],
        async onResponseError({ response, options}) {
            const authStore = useAuthStore();
            if (response.status === 401) {
                //Si on n'a pas déjà essayé de refresh le token
                if (!currentRefreshTry.value) {
                    //Si on a un refresh token
                    if (refreshToken.value) {
                        currentRefreshTry.value = true;
                        await $fetch('/refresh', {
                            baseURL: baseUrl,
                            method: 'POST',
                            headers: {
                                "Authorization": 'Bearer ' + refreshToken.value,
                                // 'Init': request,
                            },
                        }).then((response) => {
                            if ((response as Response).token) {
                                const authStore = useAuthStore();
                                const {token} = storeToRefs(authStore);
                                token.value = (response as Response).token;
                                options.headers = {
                                    ...options.headers,
                                    "Authorization": "Bearer " + token.value,
                                };
                                options.retry = 1;
                            }
                        }).catch(() => {
                            authStore.logout();
                        }).finally(() => {
                            currentRefreshTry.value = false;
                        });
                    } else {
                        authStore.logout();
                    }
                } else {
                    authStore.logout();
                }
            } else {
                throw(response?._data?.message ?? response?.statusText ?? 'Une erreur est survenue');
            }
        },
        ...options
    });
}
