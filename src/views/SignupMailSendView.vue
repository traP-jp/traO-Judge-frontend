`
<script setup lang="ts">
import { AuthenticationApi } from '@/api/generated'
import { ResponseError } from '@/api/generated/runtime'
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import { useSignupStore } from '@/stores/signup'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const signupStore = useSignupStore()
const router = useRouter()

onMounted(() => {
  // URL直打ち対策
  if (!signupStore.isValid) {
    router.push('/signup')
  }
})

const handleClose = () => {
  router.push('/')
}

const handleResendEmail = async () => {
  if (!signupStore.isValid) {
    router.push('/signup')
    return
  }
  const authApi = new AuthenticationApi()
  try {
    await authApi.postSignupRequest({
      signupRequest: {
        email: signupStore.email
      }
    })
    // TODO: UIに含める？一旦仮置き
    alert('メールを再送信しました。受信ボックスをご確認ください。')
    signupStore.setEmail(signupStore.email)
  } catch (error: unknown) {
    console.error('メール再送信エラー:', error)
    if (error instanceof ResponseError) {
      const status = error.response.status
      if (status === 400) {
        alert('リクエストが不正です。入力内容を確認してください。')
      } else {
        alert('エラーが発生しました。もう一度お試しください。')
      }
    } else {
      alert('予期せぬエラーが発生しました。もう一度お試しください。')
    }
  }
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
        <PrimaryButton class="h-10" @click="handleClose"> この画面を閉じる </PrimaryButton>
        <BorderedButton class="h-10" @click="handleResendEmail">
          メールを再送信する
        </BorderedButton>
      </div>
      <p class="fontstyle-ui-caption text-text-secondary">
        <span>メールアドレスを間違えた場合は、</span>
        <router-link to="/signup" class="underline">新規登録ページ</router-link>
        <span>からメールアドレスを入力し直してください。</span>
      </p>
    </div>
  </div>
</template>
`
