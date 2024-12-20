<script setup lang="ts">
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
</script>

<template>
  <div class="flex h-[calc(100vh-56px)] items-center justify-center bg-background-secondary">
    <div
      class="flex w-[800px] flex-col items-start justify-center gap-5 rounded-[15px] bg-background-primary px-14 py-10"
    >
      <h1 class="fontstyle-ui-title text-[#1E1E1E]">パスワードの再設定</h1>
      <div class="flex flex-col items-start gap-2 self-stretch">
        <p class="fontstyle-ui-body text-right text-[#3A3A3A]">パスワードを再設定します。</p>
      </div>
      <div class="flex flex-col items-start self-stretch p-2.5">
        <div class="flex items-center justify-center gap-6 self-stretch">
          <div class="flex w-50 items-center justify-end gap-2.5">
            <span class="fontstyle-ui-body-strong text-[#3A3A3A]">パスワード</span>
          </div>
          <PasswordTextbox class="grow gap-1" />
        </div>
        <div class="flex items-center justify-center gap-6 self-stretch pb-5">
          <div class="h-4 w-50"></div>
          <div class="flex shrink-0 grow basis-0 flex-col items-start justify-center">
            <p class="fontstyle-ui-caption-strong text-text-secondary">
              文字数は〇以上〇以下で、半角英数字と記号が使用できます。
            </p>
            <p class="fontstyle-ui-caption-strong text-text-secondary">
              英字、数字、記号がそれぞれ1文字以上含まれている必要があります。
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center gap-6 self-stretch pb-5">
          <div class="flex w-50 items-center justify-end gap-2.5">
            <span class="fontstyle-ui-body-strong text-[#3A3A3A]">パスワード (確認)</span>
          </div>
          <PasswordTextbox class="grow gap-1" />
        </div>
        <div class="flex items-center justify-center gap-4 self-stretch">
          <PrimaryButton text="再設定" class="flex items-end justify-center gap-2.5 px-8 py-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
