<script setup lang="ts">
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
</script>

<template>
  <div class="flex h-header-offset items-start justify-center bg-background-secondary p-6">
    <div class="flex w-1/3 flex-col gap-6 rounded-15 bg-background-primary px-14 py-10">
      <h1 class="fontstyle-ui-title text-text-primary">パスワードの再設定しました</h1>
      <form class="flex flex-col items-center gap-5 p-2.5">
        <PrimaryButton class="h-10 w-full px-8" @click="$router.push('/')">
          トップに戻る
        </PrimaryButton>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
