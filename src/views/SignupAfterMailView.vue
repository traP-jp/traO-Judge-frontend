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
  <div
    class="flex items-center justify-center bg-background-tertiary px-8 py-6"
    style="height: calc(100vh - 56px)"
  >
    <div class="max-w-xl space-y-5 rounded-2xl bg-white px-14 py-10">
      <div class="fontstyle-ui-title text-left">確認メールを送信しました</div>
      <div class="fontstyle-ui-body text-left text-text-secondary">
        60分以内に、メールに記載されたリンクから登録フォームにアクセスしてください。
      </div>
      <div class="flex gap-3">
        <div class="flex-1">
          <PrimaryButton text="この画面を閉じる" class="w-full" @click="onClose" />
        </div>
        <div class="flex-1">
          <BorderedButton text="メールを再送信する" class="w-full" @click="onResendEmail" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
