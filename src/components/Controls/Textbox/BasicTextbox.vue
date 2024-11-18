<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'
import { ref } from 'vue'

const {
  disabled = false,
  error = false,
  placeholder = '',
  isPassword = false
} = defineProps<{
  disabled?: boolean
  error?: boolean
  placeholder?: string
  isPassword?: boolean
}>()
const value = defineModel<string>('value')
const passwordShown = ref(false)
</script>

<template>
  <div class="relative inline-block">
    <input
      v-model="value"
      :class="[
        { 'border-border-secondary outline-text-primary focus:border-text-primary': !error },
        { 'border-status-error outline outline-1 outline-status-error': error },
        { 'pr-11.5': isPassword },
        'fontstyle-ui-body max-w-full rounded border bg-background-primary px-4 py-1 text-text-primary placeholder:text-text-tertiary focus:outline focus:outline-1 disabled:bg-background-secondary'
      ]"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="isPassword && !passwordShown ? 'password' : 'text'"
    />
    <span v-if="isPassword" class="absolute right-4 top-1.75 select-none" @click="() => passwordShown = !passwordShown">
      <MaterialIcon :icon="passwordShown ? 'visibility_off' : 'visibility'" size="1.25rem"/>
    </span>
  </div>
</template>

<style scoped></style>
