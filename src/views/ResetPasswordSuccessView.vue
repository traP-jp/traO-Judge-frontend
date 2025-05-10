<script setup lang="ts">
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
</script>

<template>
  <div class="flex h-header-offset items-start justify-center bg-background-secondary p-6">
    <div class="flex max-w-form-max flex-col gap-6 rounded-15 bg-background-primary px-14 py-10">
      <h1 class="fontstyle-ui-title text-text-primary">パスワードを再設定しました</h1>
      <PrimaryButton class="h-10 w-full" @click="$router.push('/')"> トップに戻る </PrimaryButton>
    </div>
  </div>
</template>

<style scoped></style>
