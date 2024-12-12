<script setup lang="ts">
const { disabled = false } = defineProps<{
  disabled?: boolean
  app: string
  mode: 'signup' | 'login'
}>()
function onOAuthClick() {
  // TODO: some OAuth login/signup logic
}
</script>

<template>
  <button
    :disabled="disabled"
    class="fontstyle-ui-control-strong inline-block space-x-2.5 rounded-lg border border-border-secondary px-3 py-2 text-text-primary enabled:hover:bg-background-secondary disabled:opacity-50"
    @click="onOAuthClick"
  >
    <span v-if="app === 'Github'" class="inline-block align-middle"
      ><img src="" class="size-5"
    /></span>
    <span v-if="app === 'Google'" class="inline-block align-middle"
      ><img src="" class="size-5"
    /></span>
    <span v-if="app === 'traQ'" class="inline-block align-middle"
      ><img src="" class="size-5"
    /></span>
    <span class="inline-block align-middle">{{ app }} で新規登録</span>
  </button>
</template>

<style scoped></style>
