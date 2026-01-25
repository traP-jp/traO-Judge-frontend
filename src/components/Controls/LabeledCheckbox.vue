<script setup lang="ts">
import { useAttrs, computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const { label = '', supportingText } = defineProps<{
  label?: string
  supportingText?: string
}>()

const value = defineModel<boolean>()

const attrs = useAttrs()
const isDisabled = computed(() => attrs.disabled !== undefined && attrs.disabled !== false)
</script>

<template>
  <div class="w-full">
    <label
      class="flex cursor-pointer items-center gap-2"
      :class="{ 'cursor-not-allowed': isDisabled }"
    >
      <input
        v-bind="$attrs"
        v-model="value"
        type="checkbox"
        class="size-4 cursor-pointer rounded border-border-primary accent-brand-primary"
        :class="{ 'cursor-not-allowed opacity-50': isDisabled }"
      />
      <span
        class="fontstyle-ui-control text-text-secondary"
        :class="{ 'text-text-tertiary': isDisabled }"
      >
        {{ label }}
      </span>
    </label>
    <p v-if="supportingText" class="mt-1 pl-6 text-xs text-text-tertiary">
      {{ supportingText }}
    </p>
  </div>
</template>

<style scoped></style>
