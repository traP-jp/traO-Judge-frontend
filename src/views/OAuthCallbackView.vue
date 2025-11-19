<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOAuthStore } from '@/stores/oauth'
import type { OAuthCallbackParams } from '@/types/oauth'

const route = useRoute()
const router = useRouter()
const oauthStore = useOAuthStore()

const isProcessing = ref(true)
const error = ref<string | null>(null)

const goToLogin = () => {
  router.push('/login')
}

onMounted(async () => {
  try {
    const params = route.query as OAuthCallbackParams

    if (params.error) {
      throw new Error(params.error)
    }
    if (!params.code) {
      throw new Error('認証コードが見つかりません')
    }

    await oauthStore.handleOAuthCallback(params.code, params.state)
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
