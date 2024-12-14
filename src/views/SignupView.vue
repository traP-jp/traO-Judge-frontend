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
    }
    else {
      alert(response.status)
    }
  } catch (error) {
    console.error('Signup Error:', error)
    alert('Signup Error:' + error)
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center bg-background-tertiary px-8 py-6"
    style="height: calc(100vh - 56px)"
  >
    <div class="max-w-3xl space-y-5 rounded-2xl bg-white px-14 py-10">
      <div class="fontstyle-ui-title text-left">新規登録</div>
      <div class="flex divide-x divide-border-secondary">
        <div class="flex-1 pr-4">
          <div class="space-y-3 p-2.5">
            <OAuthButton app="Github" mode="signup" class="w-full" />
            <OAuthButton app="Google" mode="signup" class="w-full" />
            <OAuthButton app="traQ" mode="signup" class="w-full" />
          </div>
        </div>
        <div class="flex-1 pl-4">
          <div class="space-y-3 p-2.5">
            <div class="fontstyle-ui-body-strong text-left">メールアドレスで新規登録</div>
            <EmailTextbox v-model="emailAddress" placeholder="メールアドレス" />
            <PrimaryButton text="次へ" class="w-full" @click="onEmailSignup" />
            <div class="fontstyle-ui-caption-link text-left">
              <a href="login">すでにアカウントをお持ちの場合</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
