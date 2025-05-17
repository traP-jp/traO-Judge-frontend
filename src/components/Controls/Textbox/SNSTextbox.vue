<script setup lang="ts">
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import { ref, watch } from 'vue'

const modelValue = defineModel<string>()

const showClearIcon = ref<boolean>(false)

watch(
  () => modelValue.value,
  (newValue) => {
    showClearIcon.value = !!newValue && newValue.length > 0
  },
  { immediate: true }
)

function clearInput() {
  modelValue.value = ''
}
</script>

<template>
  <PlainTextbox
    v-model="modelValue"
    left-icon="alternate_email"
    :right-icon="showClearIcon ? 'close' : undefined"
    v-bind="$attrs"
    class="h-5.5"
    @click-right="clearInput"
  />
</template>

<style scoped></style>
