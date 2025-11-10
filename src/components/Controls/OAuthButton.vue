<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOAuthStore } from '@/stores/oauth'
import type { OAuthProvider, OAuthAction } from '@/types/oauth'

const {
  disabled = false,
  app,
  action
} = defineProps<{
  disabled?: boolean
  app: string
  action: 'signup' | 'login' | 'bind'
}>()

const router = useRouter()
const oauthStore = useOAuthStore()

async function onOAuthClick() {
  try {
    if (app === 'GitHub' || app === 'Google') {
      const provider = app.toLowerCase() as OAuthProvider
      await oauthStore.initiateOAuth(provider, action as OAuthAction)
    } else if (app === 'traQ') {
      router.push('/_oauth/login?redirect=/') // TODO: Redirect to the correct URL
    } else {
      throw new Error('Unknown OAuth app: ' + app)
    }
  } catch (error) {
    // TODO: Error handling
    console.error('OAuth Error:', error)
  }
}
</script>

<template>
  <button
    :disabled="disabled || oauthStore.isOAuthInProgress"
    class="fontstyle-ui-control-strong inline-block space-x-2.5 rounded-lg border border-border-secondary px-3 py-2 text-text-primary enabled:hover:bg-background-secondary disabled:opacity-50"
    @click="onOAuthClick"
  >
    <span v-if="app === 'GitHub'" class="inline-block align-middle"
      ><img src="/src/assets/service_icons/github.svg" class="size-5"
    /></span>
    <span v-if="app === 'Google'" class="inline-block align-middle"
      ><img src="/src/assets/service_icons/google.svg" class="size-5"
    /></span>
    <span v-if="app === 'traQ'" class="inline-block align-middle"
      ><img src="/src/assets/service_icons/traq.svg" class="size-5"
    /></span>
    <span v-if="oauthStore.isOAuthInProgress" class="inline-block align-middle">
      <span
        class="border-current inline-block size-4 animate-spin rounded-full border-2 border-r-transparent"
      ></span>
      処理中...
    </span>
    <span v-else class="inline-block align-middle"
      >{{ app }} で{{
        action === 'signup' ? '新規登録' : action === 'login' ? 'ログイン' : '連携'
      }}</span
    >
  </button>
</template>

<style scoped></style>
