<script setup lang="ts">
import { ref } from 'vue'
import PlainTextArea from '@/components/PlainTextArea.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'

defineOptions({
  inheritAttrs: false
})

interface Props {
  modelValue: string
  label?: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  supportingText?: string
  id?: string
  placeholder?: string
  showCopyButton?: boolean
  copyTooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  errorMessage: '',
  supportingText: '',
  id: '',
  placeholder: '',
  showCopyButton: true,
  copyTooltip: 'コピー'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  copy: [value: string]
  focusin: []
  blur: []
}>()

const showCopied = ref(false)

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.modelValue)
    emit('copy', props.modelValue)

    showCopied.value = true
    setTimeout(() => {
      showCopied.value = false
    }, 1000)
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}

const updateValue = (value: string | undefined) => {
  emit('update:modelValue', value || '')
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="label" class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <label class="fontstyle-ui-control text-text-primary" :for="id">{{ label }}</label>
        <span v-if="required" class="fontstyle-ui-caption-strong text-status-error">必須</span>
      </div>
      <button
        v-if="showCopyButton"
        class="group relative rounded p-1 text-text-secondary hover:bg-background-secondary"
        :title="copyTooltip"
        @click="handleCopy"
      >
        <MaterialIcon icon="content_copy" size="18px" />
        <span
          v-if="showCopied"
          class="absolute -top-8 right-0 whitespace-nowrap rounded bg-background-secondary px-2 py-1 text-xs text-text-primary shadow"
        >
          コピーしました
        </span>
      </button>
    </div>

    <PlainTextArea
      :id="id"
      :model-value="modelValue"
      :label="''"
      :required="false"
      :disabled="disabled"
      :error="error"
      :error-message="errorMessage"
      :supporting-text="supportingText"
      :placeholder="placeholder"
      v-bind="$attrs"
      @update:model-value="updateValue"
      @focusin="$emit('focusin')"
      @blur="$emit('blur')"
    />
  </div>
</template>

<style scoped></style>
