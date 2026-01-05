<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOAuthStore } from '@/stores/oauth'
import { Oauth2Api } from '@/api/generated'
import { useUserStore } from '@/stores/user'
import type { OAuthCallbackParams } from '@/types/oauth'

const route = useRoute()
const router = useRouter()
const oauthStore = useOAuthStore()
const userStore = useUserStore()

const isProcessing = ref(true)
const error = ref<string | null>(null)

const goToLogin = () => {
  router.push('/login')
}

onMounted(async () => {
  try {
    const provider = route.params.provider as string
    const action = route.params.action as string

    if (provider === 'traq') {
      const redirectTarget = (route.query.redirect as string) || '/problems'

      if (!action || !['login', 'signup', 'bind'].includes(action)) {
        throw new Error('Invalid OAuth action')
      }

      const oauth2Api = new Oauth2Api()
      try {
        await oauth2Api.postTraqOAuthAuthorize({
          oauthAction: action as 'login' | 'signup' | 'bind'
        })
      } catch (apiError: any) {
        console.error('traQ OAuth API error:', apiError)

        const status = apiError?.response?.status

        switch (status) {
          case 409:
            switch (action) {
              case 'login':
                throw new Error(
                  'このtraQアカウントはまだ登録されていません。先にサインアップしてください。'
                )
              case 'signup':
                throw new Error('このtraQアカウントは既に別のユーザーに紐付けられています。')
              case 'bind':
                throw new Error('このtraQアカウントは既に別のユーザーに紐付けられています。')
              default:
                throw new Error(`認証に失敗しました: 不正なアクション (${action})`)
            }
          case 400:
            if (action === 'signup') {
              throw new Error(
                '既存ユーザーが存在するためサインアップできません。ログインを試してください。'
              )
            }
            throw new Error(`認証に失敗しました (${status})`)
          default:
            throw new Error(`認証に失敗しました (${status ?? 'unknown'})`)
        }
      }

      switch (action) {
        case 'signup':
          await router.push('/signup/register?oauth=true&provider=traq')
          break
        case 'login':
          await userStore.fetchCurrentUser()
          await router.push(redirectTarget)
          break
        case 'bind':
          await router.push('/settings/account')
          router.go(0)
          break
      }
    } else {
      const params = route.query as OAuthCallbackParams

      if (params.error) {
        throw new Error(params.error)
      }
      if (!params.code) {
        throw new Error('認証コードが見つかりません')
      }

      await oauthStore.handleOAuthCallback(params.code, params.state)
    }
  } catch (err: Error | unknown) {
    console.error('OAuth callback error:', err)
    error.value = err instanceof Error ? err.message : '認証処理中にエラーが発生しました'
  } finally {
    isProcessing.value = false
  }
})
</script>

<template>
  <div class="flex h-header-offset items-center justify-center bg-background-secondary p-6">
    <div
      class="flex w-[360px] flex-col items-center justify-center gap-6 rounded-15 bg-background-primary px-8 py-6"
    >
      <div v-if="isProcessing" class="flex flex-col items-center gap-4">
        <div class="size-8 animate-spin rounded-full border-b-2 border-text-primary"></div>
        <p class="fontstyle-ui-body text-text-primary">認証処理中...</p>
      </div>
      <div v-else-if="error" class="flex flex-col items-center gap-4 text-center">
        <h1 class="fontstyle-ui-subtitle text-red-500">認証エラー</h1>
        <p class="fontstyle-ui-body text-text-secondary">{{ error }}</p>
        <button
          class="fontstyle-ui-control-strong bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-white"
          @click="goToLogin"
        >
          ログイン画面へ戻る
        </button>
      </div>
    </div>
  </div>
</template>
