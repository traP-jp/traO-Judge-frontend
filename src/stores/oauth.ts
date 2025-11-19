import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { Oauth2Api } from '@/api/generated'
import { useUserStore } from '@/stores/user'
import type { OAuthProvider, OAuthAction, OAuthState } from '@/types/oauth'

export const useOAuthStore = defineStore('oauth', () => {
  const router = useRouter()

  const oauth2Api = new Oauth2Api()

  const pendingOAuthState = ref<OAuthState | null>(null)
  const isOAuthInProgress = ref(false)
  const oauthError = ref<string | null>(null)

  // 初期化時に古いstateをクリーンアップ
  const cleanupExpiredStates = () => {
    const keys = Object.keys(sessionStorage)
    const now = Date.now()

    keys.forEach((key) => {
      if (key.startsWith('oauth_state_')) {
        try {
          const stateData = sessionStorage.getItem(key)
          if (stateData) {
            const state = JSON.parse(stateData)
            // 10分以上古いstateは削除
            // TODO: 有効期限はどうする？
            if (now - state.timestamp > 10 * 60 * 1000) {
              sessionStorage.removeItem(key)
            }
          }
        } catch {
          sessionStorage.removeItem(key)
        }
      }
    })
  }

  cleanupExpiredStates()

  const generateSecureState = (): string => {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
  }

  const initiateOAuth = async (provider: OAuthProvider, action: OAuthAction) => {
    try {
      isOAuthInProgress.value = true
      oauthError.value = null

      // 現在のredirectパラメータを取得
      const currentRoute = router.currentRoute.value
      const redirectTo = currentRoute.query.redirect as string

      const stateValue = generateSecureState()
      const stateMetadata: OAuthState = {
        provider,
        action,
        timestamp: Date.now(),
        redirectTo // redirectTo を保存
      }
      sessionStorage.setItem(`oauth_state_${stateValue}`, JSON.stringify(stateMetadata))
      pendingOAuthState.value = stateMetadata

      let response
      switch (provider) {
        case 'google':
          response = await oauth2Api.getGoogleAuthParams({
            oauthAction: action
          })
          break
        case 'github':
          response = await oauth2Api.getgithubAuthParams({
            oauthAction: action
          })
          break
        default:
          throw new Error(`Unsupported OAuth provider: ${provider}`)
      }

      const separator = response.url.includes('?') ? '&' : '?'
      const urlWithState = `${response.url}${separator}state=${encodeURIComponent(stateValue)}`

      window.location.href = urlWithState
    } catch (error) {
      console.error('OAuth initiation failed:', error)
      oauthError.value = 'OAuthの開始に失敗しました'
      isOAuthInProgress.value = false
      throw error
    }
  }

  const handleOAuthCallback = async (code: string, stateParam?: string) => {
    try {
      isOAuthInProgress.value = true
      oauthError.value = null

      if (!stateParam) {
        throw new Error('State parameter is missing')
      }

      const stateKey = `oauth_state_${stateParam}`
      const savedStateData = sessionStorage.getItem(stateKey)
      if (!savedStateData) {
        throw new Error('Invalid state parameter')
      }

      const state: OAuthState = JSON.parse(savedStateData)

      const stateAge = Date.now() - state.timestamp
      if (stateAge > 10 * 60 * 1000) {
        sessionStorage.removeItem(stateKey)
        throw new Error('OAuth state expired')
      }

      // 認証コードを検証
      let response
      switch (state.provider) {
        case 'google':
          response = await oauth2Api.postGoogleOAuthAuthorize({
            oauthAction: state.action,
            oAuthAuthorizationCode: { code }
          })
          break
        case 'github':
          response = await oauth2Api.postGithubOAuthAuthorize({
            oauthAction: state.action,
            oAuthAuthorizationCode: { code }
          })
          break
        default:
          throw new Error(`Unsupported OAuth provider: ${state.provider}`)
      }

      // レスポンスに基づいて処理
      if (state.action === 'signup' && response?.token) {
        router.push(`/signup/register?oauth=true&token=${encodeURIComponent(response.token)}`)
      } else if (state.action === 'login') {
        const userStore = useUserStore()
        try {
          await userStore.fetchCurrentUser()
          const redirectTarget = state.redirectTo || '/problems'
          await router.push(redirectTarget)
        } catch (error) {
          console.error('Failed to fetch user after OAuth:', error)
          await router.push('/login')
        }
      } else if (state.action === 'bind') {
        await router.push('/settings/account')
        router.go(0)
      }

      // 使用済みstateを削除
      sessionStorage.removeItem(stateKey)
      pendingOAuthState.value = null
    } catch (error) {
      console.error('OAuth callback failed:', error)
      oauthError.value = error instanceof Error ? error.message : 'OAuth認証に失敗しました'
      throw error
    } finally {
      isOAuthInProgress.value = false
    }
  }

  const revokeOAuth = async (provider: OAuthProvider) => {
    try {
      switch (provider) {
        case 'google':
          await oauth2Api.revokeGoogleAuth()
          break
        case 'github':
          await oauth2Api.revokeGithubAuth()
          break
        default:
          throw new Error(`Unsupported OAuth provider: ${provider}`)
      }
    } catch (error) {
      console.error('OAuth revoke failed:', error)
      throw error
    }
  }

  const clearOAuthState = () => {
    cleanupExpiredStates()
    pendingOAuthState.value = null
    isOAuthInProgress.value = false
    oauthError.value = null
  }

  return {
    pendingOAuthState: computed(() => pendingOAuthState.value),
    isOAuthInProgress: computed(() => isOAuthInProgress.value),
    oauthError: computed(() => oauthError.value),

    initiateOAuth,
    handleOAuthCallback,
    revokeOAuth,
    clearOAuthState
  }
})
