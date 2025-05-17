<script setup lang="ts">
import closeIcon from '@/assets/close.svg'
import infoIcon from '@/assets/info.svg'

defineProps<{
  text: string
  show: boolean
}>()

const emit = defineEmits(['update:show'])
const handleClose = () => {
  emit('update:show', false)
}
</script>

<template>
  <div
    v-if="show"
    class="relative flex items-start gap-2 rounded border border-border-secondary bg-background-secondary px-4 py-3"
  >
    <img :src="infoIcon" class="py-1" alt="info" />
    <span class="flex flex-1 text-text-primary">{{ text }}</span>
    <button type="button" class="size-6 shrink-0 p-1" aria-label="閉じる" @click="handleClose">
      <img :src="closeIcon" alt="close" />
    </button>
  </div>
</template>
