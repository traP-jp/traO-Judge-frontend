<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'
import TextboxLabel from '@/components/Controls/Textbox/TextboxLabel.vue'
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})
const {
  errorMessage = '',
  label = '',
  isRequired
} = defineProps<{
  errorMessage?: string
  label?: string
  isRequired?: boolean
}>()
const value = defineModel<string>()
const isError = computed(() => errorMessage != '')
</script>

<template>
  <div class="flex flex-col gap-2">
    <TextboxLabel v-if="label != ''" :is-required="isRequired" :label="label" :for="$attrs.id" />
    <input
      v-model="value"
      v-bind="$attrs"
      :class="[
        {
          'border-border-secondary outline-text-primary focus:border-text-primary': !isError
        },
        { 'border-status-error outline outline-1 outline-status-error': isError },
        'fontstyle-ui-body w-full rounded border bg-background-primary py-1 pl-4 text-text-primary placeholder:text-text-tertiary focus:outline focus:outline-1 disabled:bg-background-secondary'
      ]"
    />
    <div v-if="isError" class="flex items-start gap-2 pl-1 text-status-error">
      <MaterialIcon icon="error" size="1.25rem" />
      <span class="fontstyle-ui-control min-w-0 break-words">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped></style>
