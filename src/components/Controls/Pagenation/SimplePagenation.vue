<script setup lang="ts">
import PagenationButton from '@/components/Controls/Pagenation/PagenationButton.vue'

const { end } = defineProps<{
  end: number
}>()
const current = defineModel<number>({ required: true })
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <PagenationButton v-if="current >= 3" @click="current = 1">1</PagenationButton>
    <span v-if="current >= 4" class="fontstyle-ui-body-strong !font-[family-name:Noto_Sans_JP]">
      …
    </span>
    <PagenationButton v-if="current >= 2" @click="current--">
      {{ current - 1 }}
    </PagenationButton>
    <PagenationButton current>{{ current }}</PagenationButton>
    <PagenationButton v-if="current <= end - 1" @click="current++">
      {{ current + 1 }}
    </PagenationButton>
    <span
      v-if="current <= end - 3"
      class="fontstyle-ui-body-strong !font-[family-name:Noto_Sans_JP]"
    >
      …
    </span>
    <PagenationButton v-if="current <= end - 2" @click="current = end">{{ end }}</PagenationButton>
  </div>
</template>
