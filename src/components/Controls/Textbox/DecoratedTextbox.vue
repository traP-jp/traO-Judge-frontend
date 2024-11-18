<script setup lang="ts">
import BasicTextbox from '@/components/Controls/Textbox/BasicTextbox.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import TextboxLabel from '@/components/Controls/Textbox/TextboxLabel.vue'

const { errorMessage = '', label = '' } = defineProps<{
  disabled?: boolean
  errorMessage?: string
  isPassword?: boolean
  isRequired?: boolean
  label?: string
  placeholder?: string
}>()
const value = defineModel<string>('value')
</script>

<template>
  <div class="flex flex-col gap-2">
    <TextboxLabel v-if="label != ''" :is-required="isRequired" :label="label" />
    <div>
      <BasicTextbox
        v-model="value"
        class="w-full"
        :disabled
        :error="errorMessage != ''"
        :is-password="isPassword"
        :placeholder="placeholder"
      />
    </div>
    <div v-if="errorMessage != ''" class="flex items-start gap-2 pl-1 text-status-error">
      <MaterialIcon icon="error" size="1.25rem" />
      <span class="fontstyle-ui-control">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped></style>
