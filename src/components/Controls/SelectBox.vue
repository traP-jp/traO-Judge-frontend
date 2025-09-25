<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue'
import { computed } from 'vue'

export interface SelectOption {
  id: string
  name: string
}

const {
  options = [],
  error = false,
  errorMessage = '',
  label = '',
  placeholder = '選択してください',
  required = false,
  disabled = false,
  containerClass = ''
} = defineProps<{
  options: SelectOption[]
  error?: boolean
  errorMessage?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  containerClass?: string
}>()

const emit = defineEmits(['change'])
const value = defineModel<SelectOption>()

const displaysError = computed(() => error || errorMessage !== '')
const displaysLabel = computed(() => label !== '')

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const selectedOption = options.find((option) => option.id === target.value)
  if (selectedOption) {
    value.value = selectedOption
    emit('change', selectedOption)
  }
}
</script>

<template>
  <div :class="containerClass">
    <div v-if="displaysLabel" class="flex items-center gap-2 pb-1">
      <label class="fontstyle-ui-body-2 text-text-primary">{{ label }}</label>
      <span v-if="required" class="fontstyle-ui-caption-strong text-status-error">必須</span>
    </div>
    <div class="relative">
      <select
        :value="value?.id"
        :disabled="disabled"
        class="fontstyle-ui-body w-full appearance-none rounded border bg-white px-3 py-2 pr-10 text-text-primary focus:outline-none"
        :class="[
          disabled ? 'cursor-not-allowed opacity-50' : '',
          displaysError
            ? 'border-status-error focus:border-status-error'
            : 'border-border-secondary focus:border-brand-primary'
        ]"
        @change="onChange"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.id" :value="option.id">
          {{ option.name }}
        </option>
      </select>
      <MaterialIcon
        icon="keyboard_arrow_down"
        size="1.25rem"
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        :class="disabled ? 'text-text-disabled' : 'text-text-secondary'"
      />
    </div>

    <div v-if="displaysError" class="pt-1">
      <span class="fontstyle-ui-caption text-status-error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped></style>
