<script setup lang="ts">
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
</script>

<template>
  <div
    style="height: calc(100vh - 56px)"
    class="flex items-center justify-center bg-background-secondary"
  >
    <div class="w-200 rounded-2xl bg-background-primary px-14 py-10">
      <h1 class="fontstyle-ui-title mb-5 text-[#1E1E1E]">ログイン</h1>
      <div class="flex h-44 items-start">
        <div class="flex w-82 flex-col p-2.5">
          <button
            class="mb-3 flex h-10 w-full items-center justify-center rounded-lg border border-border-secondary"
          >
            <img src="@/assets/service_icons/github.svg" class="mr-2.5 h-5" />
            <span class="fontstyle-ui-control-strong text-[#3A3A3A]">GitHub でログイン</span>
          </button>
          <button
            class="mb-3 flex h-10 w-full items-center justify-center rounded-lg border border-border-secondary"
          >
            <img src="@/assets/service_icons/google.svg" class="mr-2.5 h-5" />
            <span class="fontstyle-ui-control-strong text-[#3A3A3A]">Google でログイン</span>
          </button>
          <button
            class="mb-3 flex h-10 w-full items-center justify-center rounded-lg border border-border-secondary"
          >
            <img src="@/assets/service_icons/traq.svg" class="mr-2.5 h-5" />
            <span class="fontstyle-ui-control-strong text-[#3A3A3A]">traQ でログイン</span>
          </button>
        </div>
        <div class="mx-4 h-full border-r border-border-secondary"></div>
        <div class="flex w-82 flex-col p-2.5">
          <EmailTextbox class="mb-3 h-8" />
          <PasswordTextbox class="mb-3 h-8" />
          <div class="mb-3 flex h-10">
            <PrimaryButton class="mr-3 h-full w-37 rounded-lg">ログイン</PrimaryButton>
            <BorderedButton class="h-full w-37 rounded-lg" text="新規登録" />
          </div>
          <router-link to="" class="fontstyle-ui-caption h-4 text-[#3A3A3A] underline">
            パスワードを忘れた場合
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
