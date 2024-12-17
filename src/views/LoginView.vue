<script setup lang="ts">
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
</script>

<template>
  <div
    style="height: calc(100vh - 56px)"
    class="flex items-center justify-center bg-background-secondary"
  >
    <div class="w-200 rounded-2xl bg-background-primary px-14 py-10">
      <h1 class="mb-5 h-9 font-primary text-28px font-medium text-[#1E1E1E]">ログイン</h1>
      <div class="flex h-44 items-start">
        <div class="flex w-82 flex-col p-2.5">
          <button class="service_button">
            <img src="@/assets/service_icons/github.svg" class="mr-2.5 h-5" />
            <p class="service_text">GitHub でログイン</p>
          </button>
          <button class="service_button">
            <img src="@/assets/service_icons/google.svg" class="mr-2.5 h-5" />
            <p class="service_text">Google でログイン</p>
          </button>
          <button class="service_button">
            <img src="@/assets/service_icons/traq.svg" class="mr-2.5 h-5" />
            <p class="service_text">traQ でログイン</p>
          </button>
        </div>
        <div class="mx-4 h-full border-r border-border-secondary"></div>
        <div class="flex w-82 flex-col p-2.5">
          <input placeholder="メールアドレス" class="input" />
          <input placeholder="パスワード" class="input" />
          <div class="mb-3 flex h-10">
            <PrimaryButton class="mr-3 h-full w-37 rounded-lg" text="ログイン" />
            <BorderedButton class="h-full w-37 rounded-lg" text="新規登録" />
          </div>
          <router-link to="" class="h-4 text-12px font-normal text-[#3A3A3A] underline">
            パスワードを忘れた場合</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .service_button {
    @apply mb-3 flex h-10 w-full items-center justify-center rounded-lg border border-border-secondary;
  }
  .service_text {
    @apply font-primary text-14px font-medium text-[#3A3A3A];
  }
  .input {
    @apply mb-3 flex h-8 w-full items-center justify-center rounded-sm border border-border-secondary pl-3;
  }
}
</style>
