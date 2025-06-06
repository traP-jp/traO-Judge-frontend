<script setup lang="ts">
import { generateRandomString } from '@/utils/random'
import { useRouter } from 'vue-router'
import { Oauth2Api } from '@/api/generated/apis/Oauth2Api'
import { ResponseError } from '@/api/generated/runtime'

const {
  disabled = false,
  app,
  action
} = defineProps<{
  disabled?: boolean
  app: string
  action: 'signup' | 'login'
}>()

const router = useRouter()

async function onOAuthClick() {
  try {
    if (app === 'GitHub' || app === 'Google') {
      const oauth2Api = new Oauth2Api()
      const response =
        app === 'GitHub'
          ? await oauth2Api.getgithubAuthParams({ oauthAction: action })
          : await oauth2Api.getGoogleAuthParams({ oauthAction: action })
      const oauthState = generateRandomString(32)
      sessionStorage.setItem('oauth_state', oauthState)
      router.push(response.url + `&state=${oauthState}`)
    } else if (app === 'traQ') {
      router.push('/_oauth/login?redirect=/') // TODO: Redirect to the correct URL
    } else {
      throw new Error('Unknown OAuth app: ' + app)
    }
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      if (error.response.status === 500) {
        const responseJson = await error.response.json()
        console.error('Internal Server Error: ' + responseJson.message)
      } else {
        console.error('Unknown error: ' + error.response.status)
      }
    } else {
      console.error('OAuth Error:', error)
    }
  }
}
</script>

<template>
  <button
    :disabled="disabled"
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
    <span class="inline-block align-middle"
      >{{ app }} で{{ action === 'signup' ? '新規登録' : 'ログイン' }}</span
    >
  </button>
</template>

<style scoped></style>
