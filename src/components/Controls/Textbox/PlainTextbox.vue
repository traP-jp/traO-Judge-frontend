<script setup lang="ts">
import MaterialIcon, { type Icon } from '@/components/MaterialIcon.vue'
import { computed, ref, useTemplateRef } from 'vue'

defineOptions({
  inheritAttrs: false
})
const {
  error = false,
  errorMessage = '',
  label = '',
  leftIcon,
  rightIcon,
  supportingText
} = defineProps<{
  disabled?: boolean
  displaysLength?: boolean
  error?: boolean
  errorMessage?: string
  id?: string
  label?: string
  leftIcon?: Icon
  required?: boolean
  rightIcon?: Icon
  supportingText?: string
}>()
const emit = defineEmits(['clickRight', 'focusin', 'blur'])
const value = defineModel<string>()
const displaysError = computed(() => error || errorMessage != '')
const displaysLeftIcon = computed(() => leftIcon != null)
const displaysRightIcon = computed(() => rightIcon != null)
const displaysSupportingText = computed(() => supportingText != null)
const input = useTemplateRef('input')
const isFocused = ref<boolean>(false)
const onFocusin = (): void => {
  isFocused.value = true
  emit('focusin')
}
const onBlur = (): void => {
  isFocused.value = false
  emit('blur')
}
const onClickInnerBorder = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  if (!isFocused.value) input.value?.focus()
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-1">
      <span v-if="label != ''" class="flex items-center gap-2">
        <label class="fontstyle-ui-control text-text-primary" :for="id">{{ label }}</label>
        <span v-if="required" class="fontstyle-ui-caption-strong text-status-error">必須</span>
      </span>
      <span
        class="flex rounded border bg-background-primary px-2 py-1"
        :class="[
          { 'outline outline-1': isFocused },
          { 'border-border-secondary outline-text-primary': !displaysError },
          { 'border-status-error outline outline-1 outline-status-error': displaysError },
          { 'border-text-primary': isFocused && !displaysError },
          { 'bg-background-secondary': disabled }
        ]"
        @mousedown="onClickInnerBorder"
      >
        <MaterialIcon v-if="displaysLeftIcon" :icon="leftIcon!" size="1.25rem" />
        <input
          v-bind="$attrs"
          :id="id"
          ref="input"
          v-model="value"
          :disabled="disabled"
          class="fontstyle-ui-body h-5 w-full min-w-0 bg-transparent px-2 text-text-primary outline-none placeholder:text-text-tertiary"
          @focusin="onFocusin"
          @blur="onBlur"
        />
        <span class="inline-flex items-center gap-2">
          <span v-if="displaysLength" class="fontstyle-ui-caption text-text-secondary">{{
            value?.length ?? 0
          }}</span>
          <MaterialIcon
            v-if="displaysRightIcon"
            :icon="rightIcon!"
            size="1.25rem"
            @click="emit('clickRight')"
          />
        </span>
      </span>
      <span
        v-if="displaysSupportingText"
        class="fontstyle-ui-caption whitespace-pre-line text-text-secondary"
        >{{ supportingText }}</span
      >
    </div>
    <div v-if="errorMessage != ''" class="mt-2 flex items-start gap-2 text-status-error">
      <MaterialIcon icon="error" size="1.25rem" is-filled />
      <span class="fontstyle-ui-control min-w-0 break-words">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped></style>
