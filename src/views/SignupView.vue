<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import OAuthButton from '@/components/Controls/OAuthButton.vue'

const emailAddress = ref('')
const router = useRouter()
async function onEmailSignup() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signup/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: emailAddress.value })
    })
    if (response.status === 201) {
      router.push('/signup/after-mail')
    } else if (response.status === 400) {
      alert('不正なリクエストです　メールアドレスの形式を確認してください')
    } else {
      alert(response.status)
    }
  } catch (error) {
    console.error('Signup Error:', error)
    alert('Signup Error:' + error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center bg-background-tertiary" style="height: calc(100vh - 56px)">
    <div class="w-90 space-y-6 rounded-2xl bg-white px-8 py-6">
      <div class="fontstyle-ui-subtitle text-text-primary">新規登録</div>
      <div class="divide-y divide-border-primary">
        <div class="space-y-2 pb-6">
          <OAuthButton app="Github" mode="signup" class="w-full" />
          <OAuthButton app="Google" mode="signup" class="w-full" />
          <OAuthButton app="traQ" mode="signup" class="w-full" />
        </div>
        <div class="space-y-4 pt-6">
          <EmailTextbox id="email" v-model="emailAddress" placeholder="メールアドレス" />
          <PrimaryButton text="メールアドレスで新規登録" class="w-full" @click="onEmailSignup" />
        </div>
      </div>
      <div class="fontstyle-ui-caption-link text-text-secondary">
        <a href="login">すでにアカウントをお持ちの場合</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
