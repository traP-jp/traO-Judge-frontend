<script setup lang="ts">
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import { computed } from 'vue'

const {
  min = NaN,
  max = NaN,
} = defineProps<{
  min?: number,
  max?: number,
}>()

const value = defineModel<number>()
const valueString = computed<string>({
  get: () => {
    return value.value?.toFixed() ?? ''
  },
  set: (newValue: string) => {
    if(newValue === '') {
      value.value = undefined
    } else {
      value.value = Number(newValue)
    }
  }
})

function onChange() {
  if(value.value === undefined) {
    return
  }
  if(value.value < min) value.value = min
  if(value.value > max) value.value = max
}
</script>

<template>
  <PlainTextbox v-model="valueString" type="number" @change="onChange"/>
</template>

<style scoped></style>
