<script setup lang="ts">
import { useRouter } from 'vue-router'
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

const router = useRouter()

function onClose() {
  router.push('/')
}
function onResendEmail() {
  router.push('/signup')
}
</script>

<template>
  <div class="flex flex-col items-center bg-background-tertiary" style="height: calc(100vh - 56px)">
    <div class="w-90 space-y-6 rounded-2xl bg-background-primary px-8 py-6">
      <div class="fontstyle-ui-subtitle text-text-primary">確認メールを送信しました</div>
      <div class="fontstyle-ui-body text-text-primary">
        60分以内に、メールに記載されたリンクから登録フォームにアクセスしてください。
      </div>
      <div class="space-y-2">
        <PrimaryButton class="w-full" @click="onClose">この画面を閉じる</PrimaryButton>
        <BorderedButton text="メールを再送信する" class="w-full" @click="onResendEmail" />
      </div>
      <div class="fontstyle-ui-caption text-text-secondary">
        メールアドレスを間違えた場合は、<a href="/signup" class="fontstyle-ui-caption-link"
          >新規登録ページ</a
        >からメールアドレスを入力しなおしてください。
      </div>
    </div>
  </div>
</template>

<style scoped></style>
