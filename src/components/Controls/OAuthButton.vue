<script setup lang="ts">
import { useRouter } from 'vue-router'

const {
  disabled = false,
  app,
  mode
} = defineProps<{
  disabled?: boolean
  app: string
  mode: 'signup' | 'login'
}>()

const router = useRouter()

async function onOAuthClick() {
  try {
    if (mode === 'signup') {
      if (app === 'Github') {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/github-oauth2/params`)
        if (response.status === 200) {
          const responseJson = await response.json()
          alert(responseJson.url)
          router.push(responseJson.url)
        } else if (response.status === 500) {
          const responseJson = await response.json()
          alert('Internal Server Error: ' + responseJson.message)
        } else {
          alert(response.status)
        }
      }
      if (app === 'Google') {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/google-oauth2/params`)
        if (response.status === 200) {
          const responseJson = await response.json()
          router.push(responseJson.url)
        } else if (response.status === 500) {
          const responseJson = await response.json()
          alert('Internal Server Error: ' + responseJson.message)
        } else {
          alert(response.status)
        }
      }
      if (app === 'traQ') {
        router.push('/_oauth/login?redirect=/') // TODO: Redirect to the correct URL
      }
    }
  } catch (error) {
    console.error('OAuth Error:', error)
    alert('OAuth Error:' + error)
  }
}
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong inline-block space-x-2.5 rounded-lg border border-border-secondary px-3 py-2 text-text-primary enabled:hover:bg-background-secondary disabled:opacity-50"
    @click="onOAuthClick"
  >
    <span v-if="app === 'Github'" class="inline-block align-middle"
      ><img src="/src/assets/service_icons/github.svg" class="size-5"
    /></span>
    <span v-if="app === 'Google'" class="inline-block align-middle"
      ><img src="/src/assets/service_icons/google.svg" class="size-5"
    /></span>
    <span v-if="app === 'traQ'" class="inline-block align-middle"
      ><img src="/src/assets/service_icons/traq.svg" class="size-5"
    /></span>
    <span class="inline-block align-middle"
      >{{ app }} で{{ mode === 'signup' ? '新規登録' : 'ログイン' }}</span
    >
  </button>
</template>

<style scoped></style>
