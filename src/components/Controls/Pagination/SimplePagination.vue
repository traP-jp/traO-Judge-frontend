<script setup lang="ts">
import PaginationButton from '@/components/Controls/Pagination/PaginationButton.vue'

const { end } = defineProps<{
  end: number
}>()
const current = defineModel<number>({ required: true })
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <PaginationButton v-if="current >= 3" @click="current = 1">1</PaginationButton>
    <span v-if="current >= 4" class="fontstyle-ui-body-strong !font-[family-name:Noto_Sans_JP]">
      …
    </span>
    <PaginationButton v-if="current >= 2" @click="current--">
      {{ current - 1 }}
    </PaginationButton>
    <PaginationButton current>{{ current }}</PaginationButton>
    <PaginationButton v-if="current <= end - 1" @click="current++">
      {{ current + 1 }}
    </PaginationButton>
    <span
      v-if="current <= end - 3"
      class="fontstyle-ui-body-strong !font-[family-name:Noto_Sans_JP]"
    >
      …
    </span>
    <PaginationButton v-if="current <= end - 2" @click="current = end">{{ end }}</PaginationButton>
  </div>
</template>
