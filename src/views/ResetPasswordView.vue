<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

const emailAddress = ref('')
const router = useRouter()
async function onEmailResetPassword() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reset-password/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: emailAddress.value })
    })
    if (response.status === 201) {
      router.push('/reset-password/after-mail')
    } else if (response.status === 400) {
      alert('不正なリクエストです　メールアドレスの形式を確認してください')
    } else {
      alert(response.status)
    }
  } catch (error) {
    console.error('Reset Password Error:', error)
    alert('Reset Password Error:' + error)
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center bg-background-tertiary px-8 py-6"
    style="height: calc(100vh - 56px)"
  >
    <div class="max-w-3xl space-y-4 rounded-2xl bg-white px-14 py-10">
      <div class="fontstyle-ui-title text-left">パスワードの再設定</div>
      <div class="flex divide-x divide-border-secondary">
        <div class="flex-1 pr-4">
          <div class="fontstyle-ui-body space-y-2 p-2 text-left text-text-secondary">
            <p><span class="text-nowrap">再設定用のリンクをメールで送信します。</span></p>
            <p>60分以内に、メールに記載されたリンクから再設定を行ってください。</p>
          </div>
        </div>
        <div class="flex-1 pl-4">
          <div class="space-y-3 p-2.5">
            <EmailTextbox id="email" v-model="emailAddress" placeholder="メールアドレス" />
            <PrimaryButton text="送信" class="w-full" @click="onEmailResetPassword" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
