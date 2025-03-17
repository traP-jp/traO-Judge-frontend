<script setup lang="ts">
import PagenationButton from '@/components/Controls/Pagenation/PagenationButton.vue'
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <PagenationButton>1</PagenationButton>
    <span class="fontstyle-ui-body-strong !font-[family-name:Noto_Sans_JP]">…</span>
    <PagenationButton>4</PagenationButton>
    <PagenationButton current>5</PagenationButton>
    <PagenationButton>6</PagenationButton>
    <span class="fontstyle-ui-body-strong !font-[family-name:Noto_Sans_JP]">…</span>
    <PagenationButton>10</PagenationButton>
  </div>
</template>

<style scoped></style>
