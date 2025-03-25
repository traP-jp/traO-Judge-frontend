<script setup lang="ts">
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function onClose() {
  router.push('/')
}

function onResendEmail() {
  router.push('/signup')
}
</script>

<template>
  <div class="flex h-header-offset items-start justify-center bg-background-secondary p-6">
    <div
      class="flex max-w-form-max flex-col items-start justify-center gap-6 rounded-15 bg-background-primary px-14 py-10"
    >
      <h1 class="fontstyle-ui-subtitle text-text-primary">確認メールを送信しました</h1>
      <p class="fontstyle-ui-body text-text-primary">
        60分以内に、メールに記載されたリンクから登録フォームにアクセスしてください。
      </p>
      <div class="flex flex-col items-stretch justify-center gap-2 self-stretch">
        <PrimaryButton class="h-10" @click="onClose"> この画面を閉じる </PrimaryButton>
        <BorderedButton class="h-10" @click="onResendEmail"> メールを再送信する </BorderedButton>
      </div>
      <p class="fontstyle-ui-caption text-text-secondary">
        <span>メールアドレスを間違えた場合は、</span>
        <router-link to="/signup" class="underline">新規登録ページ</router-link>
        <span>からメールアドレスを入力し直してください。</span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
