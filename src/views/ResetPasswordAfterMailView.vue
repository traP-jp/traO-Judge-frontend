<script setup lang="ts">
import { useRouter } from 'vue-router'
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

const router = useRouter()

function onClose() {
  router.push('/')
}
function onResendEmail() {
  router.push('/reset-password')
}
</script>

<template>
  <div
    class="flex items-center justify-center bg-background-tertiary px-8 py-6"
    style="height: calc(100vh - 56px)"
  >
    <div class="max-w-xl space-y-6 rounded-2xl bg-white px-14 py-10">
      <div class="fontstyle-ui-title text-left">メールを送信しました</div>
      <div class="fontstyle-ui-body space-y-2 text-left text-text-secondary">
        <p>60分以内に、メールに記載されたリンクからパスワードの再設定を行ってください。</p>
        <p>
          入力されたメールアドレスがお使いのアカウントに登録されていない場合、メールは送信されません。
        </p>
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
