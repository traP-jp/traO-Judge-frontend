<script setup lang="ts">
import { AuthenticationApi } from '@/api/generated'
import { ResponseError } from '@/api/generated/runtime'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import { passwordValidator, usernameValidator } from '@/utils/validator'
import { jwtDecode } from 'jwt-decode'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const token = ref('')
const usernameErrorMessage = ref<string | undefined>('')
const emailAddress = ref('')
const password = ref('')
const passwordErrorMessage = ref<string | undefined>('')
const confirmPassword = ref('')
const confirmPasswordErrorMessage = ref<string | undefined>('')
const formError = ref<string | undefined>()
const router = useRouter()

onMounted(() => {
  try {
    token.value = new URLSearchParams(window.location.search).get('token') ?? ''

    const decodedToken = jwtDecode<{ email: string }>(token.value)
    emailAddress.value = decodedToken.email
  } catch (error) {
    console.error('トークン解析エラー:', error)
    formError.value = '無効なリンクです。最初からやり直してください。'
  }
})

async function onSignupRegister() {
  let hasError = false

  const [isUsernameValid, usernameError] = usernameValidator(username.value)
  if (!isUsernameValid) {
    usernameErrorMessage.value = usernameError
    hasError = true
  } else {
    usernameErrorMessage.value = ''
  }

  const [isPasswordValid, passwordError] = passwordValidator(password.value)
  if (!isPasswordValid) {
    passwordErrorMessage.value = passwordError
    hasError = true
  } else {
    passwordErrorMessage.value = ''
  }

  if (!confirmPassword.value) {
    confirmPasswordErrorMessage.value = '必須項目です。'
    hasError = true
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordErrorMessage.value = '入力されたパスワードが一致しません。'
    hasError = true
  } else {
    confirmPasswordErrorMessage.value = ''
  }

  if (hasError) return

  const authApi = new AuthenticationApi()

  try {
    await authApi.postSignup({
      signup: {
        userName: username.value,
        password: password.value,
        token: token.value
      }
    })
    router.push('/login')
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      const status = error.response.status
      if (status === 400) {
        formError.value = '入力内容に問題があります。もう一度確認してください。'
      } else if (status === 401) {
        formError.value = '認証に失敗しました。リンクが無効か期限切れです。'
      } else {
        formError.value = 'エラーが発生しました。もう一度お試しください。'
      }
    } else {
      formError.value = '予期せぬエラーが発生しました。もう一度お試しください。'
      console.error('サインアップエラー:', error)
    }
  }
}
</script>

<template>
  <div class="flex h-header-offset items-start justify-center bg-background-secondary p-6">
    <div class="flex max-w-form-max flex-col gap-6 rounded-15 bg-background-primary px-14 py-10">
      <h1 class="fontstyle-ui-subtitle text-text-primary">新規登録</h1>
      <div class="flex flex-col gap-4">
        <PlainTextbox
          id="username"
          v-model="username"
          label="ユーザー名"
          :required="true"
          :displays-length="true"
          supporting-text="半角英数字とアンダースコア、ハイフンを用いた32文字以下のユーザー名が利用できます。
          アンダースコアまたはハイフンを最初と最後に使うことはできません。"
          :error-message="usernameErrorMessage"
        />
        <PasswordTextbox
          id="password"
          v-model="password"
          label="パスワード"
          :required="true"
          supporting-text="半角英数字と記号(@, $, !, %, *, ?, &)を用いた8文字以上64文字以下のパスワードが利用できます。
          大文字と小文字の英字をそれぞれ1文字ずつ使用する必要があります。"
          :error-message="passwordErrorMessage"
        />
        <PasswordTextbox
          id="confirmPassword"
          v-model="confirmPassword"
          label="パスワード（確認）"
          :required="true"
          :error-message="confirmPasswordErrorMessage"
        />
      </div>

      <!-- TODO: form全体の横幅の扱いが確定したらここの横幅も変える -->
      <form class="flex flex-col items-center" @submit.prevent="onSignupRegister">
        <PrimaryButton class="h-10 w-5/12" @click="onSignupRegister">次へ</PrimaryButton>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
