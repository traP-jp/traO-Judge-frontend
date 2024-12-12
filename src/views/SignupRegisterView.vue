<script setup lang="ts">
import { ref } from 'vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

const username = ref('')
const emailAddress = ref('example@example.com') // TODO: get value of emailAddress
const password = ref('')
const confirmPassword = ref('')
function onSignupRegister() {
  // TODO: Implement email signup
}
</script>

<template>
  <div
    class="flex items-center justify-center bg-background-tertiary px-8 py-6"
    style="height: calc(100vh - 56px)"
  >
    <div class="max-w-3xl space-y-5 rounded-2xl bg-white px-14 py-10">
      <div class="fontstyle-ui-title text-left">新規登録</div>
      <div>
        <span class="fontstyle-ui-body text-status-error">*</span>
        <span class="fontstyle-ui-body text-text-primary">がついた項目は必須です。</span>
      </div>
      <div class="space-y-5 p-2.5">
        <div class="flex gap-6">
          <div class="w-50 text-right">
            <span class="fontstyle-ui-body-strong text-text-primary">ユーザー名</span>
            <span class="fontstyle-ui-body-strong text-status-error">*</span>
          </div>
          <div class="flex-1">
            <PlainTextbox v-model="username" />
            <div class="fontstyle-ui-caption-strong pt-1 text-text-secondary">
              文字数は〇以上〇以下で、半角英数字とアンダースコアのみが使用できます。
            </div>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="w-50 text-right">
            <span class="fontstyle-ui-body-strong text-text-primary">メールアドレス</span>
          </div>
          <div class="flex-1">
            <span class="fontstyle-ui-body w-full px-1 text-text-primary">
              {{ emailAddress }}
            </span>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="w-50 text-right">
            <span class="fontstyle-ui-body-strong text-text-primary">パスワード</span>
            <span class="fontstyle-ui-body-strong text-status-error">*</span>
          </div>
          <div class="flex-1">
            <PasswordTextbox v-model="password" />
            <div class="fontstyle-ui-caption-strong pt-1 text-text-secondary">
              文字数は〇以上〇以下で、半角英数字と記号が使用できます。
            </div>
            <div class="fontstyle-ui-caption-strong pt-1 text-text-secondary">
              英字、数字、記号がそれぞれ1文字以上含まれている必要があります。
            </div>
          </div>
        </div>
        <div class="flex gap-6">
          <div class="w-50 text-right">
            <span class="fontstyle-ui-body-strong text-text-primary">パスワード（確認）</span>
            <span class="fontstyle-ui-body-strong text-status-error">*</span>
          </div>
          <div class="flex-1">
            <PasswordTextbox v-model="confirmPassword" />
          </div>
        </div>
        <div class="flex justify-center">
          <PrimaryButton text="次へ" @click="onSignupRegister" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
