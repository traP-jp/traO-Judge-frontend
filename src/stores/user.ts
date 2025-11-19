import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { MeApi, AuthenticationApi } from '@/api/generated'
import { ResponseError } from '@/api/generated/runtime'
import type { Me, UserEmailAndPassword } from '@/api/generated'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const user = ref<Me | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const username = computed(() => user.value?.name ?? '')

  const SESSION_FLAG_KEY = 'traOJudge_hasSession'

  const setSessionFlag = (value: boolean) => {
    if (value) {
      localStorage.setItem(SESSION_FLAG_KEY, 'true')
    } else {
      localStorage.removeItem(SESSION_FLAG_KEY)
    }
  }

  const hasSessionFlag = (): boolean => {
    return localStorage.getItem(SESSION_FLAG_KEY) === 'true'
  }

  const fetchCurrentUser = async () => {
    isLoading.value = true
    error.value = null

    try {
      const meApi = new MeApi()
      const response = await meApi.getMe()
      user.value = response
      setSessionFlag(true)
      return response
    } catch (err) {
      if (err instanceof ResponseError && err.response.status === 401) {
        handleUnauthorized()
      }
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const login = async (credentials: UserEmailAndPassword) => {
    isLoading.value = true
    error.value = null

    try {
      const authApi = new AuthenticationApi()
      await authApi.postLogin({ userEmailAndPassword: credentials })
      await fetchCurrentUser()
    } catch (err) {
      if (err instanceof ResponseError && err.response.status === 401) {
        handleUnauthorized()
      }
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    error.value = null

    try {
      const authApi = new AuthenticationApi()
      await authApi.postLogout()
      user.value = null
      setSessionFlag(false)
    } catch (err) {
      if (err instanceof ResponseError && err.response.status === 401) {
        handleUnauthorized()
      }
      error.value = err instanceof Error ? err.message : 'Logout failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const handleUnauthorized = () => {
    user.value = null
    setSessionFlag(false)

    // ログインページ以外から401が発生した場合はリダイレクト
    const currentPath = router.currentRoute.value.fullPath
    if (currentPath !== '/login' && !currentPath.startsWith('/signup')) {
      router.push({
        path: '/login',
        query: { redirect: currentPath }
      })
    }
  }

  const reset = () => {
    user.value = null
    error.value = null
    isLoading.value = false
    setSessionFlag(false)
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    username,
    hasSessionFlag,
    fetchCurrentUser,
    login,
    logout,
    reset
  }
})
