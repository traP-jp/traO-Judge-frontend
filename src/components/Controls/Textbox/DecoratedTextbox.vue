<script setup lang="ts">
import BasicTextbox from '@/components/Controls/Textbox/BasicTextbox.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import TextboxLabel from '@/components/Controls/Textbox/TextboxLabel.vue'

const { errorMessage = '', label = '' } = defineProps<{
  isRequired?: boolean
  disabled?: boolean
  error?: boolean
  placeholder?: string
  value?: string
  errorMessage?: string
  label?: string
}>()

const emits = defineEmits<{
  input: [event: Event]
  change: [event: Event]
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <TextboxLabel v-if="label != ''" :is-required="isRequired" :label="label" />
    <div>
      <BasicTextbox
        :disabled="disabled"
        :error="error"
        :placeholder="placeholder"
        :value="value"
        @input="(e) => emits('input', e)"
        @change="(e) => emits('change', e)"
      />
    </div>
    <div v-if="errorMessage != ''" class="flex items-center gap-2 pl-1 text-status-error">
      <MaterialIcon icon="error" size="1.25rem" />
      <span class="fontstyle-ui-control">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped></style>
