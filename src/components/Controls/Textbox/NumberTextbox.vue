<script setup lang="ts">
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import { computed } from 'vue'

const value = defineModel<number>()
const valueString = computed<string>({
  get: () => {
    return value.value?.toFixed()
  },
  set: (newValue: string) => {
    value.value = Number(newValue)
  }
})
</script>

<template>
  <PlainTextbox v-model="valueString" type="number" />
</template>

<style scoped></style>
