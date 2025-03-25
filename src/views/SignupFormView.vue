<script setup lang="ts">
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import { passwordValidator, usernameValidator } from '@/utils/validator'
import { jwtDecode } from 'jwt-decode'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const usernameErrorMessage = ref('')
const emailAddress = ref('')
const password = ref('')
const passwordErrorMessage = ref('')
const confirmPassword = ref('')
const confirmPasswordErrorMessage = ref('')

onMounted(() => {
  try {
    const token = new URLSearchParams(window.location.search).get('token')
    if (token) {
      const decodedToken = jwtDecode<{ email: string }>(token)
      emailAddress.value = decodedToken.email
    }
  } catch (error) {
    console.error('Signup Register Error:', error)
    alert('Signup Register Error:' + error)
  }
})

const router = useRouter()

async function onSignupRegister() {
  try {
    let error = false
    const [isUsernameValid, usernameError] = usernameValidator(username.value)
    if (!isUsernameValid) {
      usernameErrorMessage.value = usernameError
      error = true
    } else {
      usernameErrorMessage.value = ''
    }
    const [isPasswordValid, passwordError] = passwordValidator(password.value)
    if (!isPasswordValid) {
      passwordErrorMessage.value = passwordError
      error = true
    } else {
      passwordErrorMessage.value = ''
    }
    if (!confirmPassword.value) {
      confirmPasswordErrorMessage.value = '必須項目です。'
      error = true
    } else if (password.value !== confirmPassword.value) {
      confirmPasswordErrorMessage.value = '入力されたパスワードが一致しません。'
      error = true
    } else {
      confirmPasswordErrorMessage.value = ''
    }
    if (error) {
      return
    }
    const token = new URLSearchParams(window.location.search).get('token')
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName: username.value, password: password.value, token: token })
    })
    if (response.status === 201) {
      router.push('/login')
    } else if (response.status === 400) {
      alert('不正なリクエストです')
    } else if (response.status === 401) {
      alert('Unauthorized')
    } else {
      alert(response.status)
    }
  } catch (error) {
    console.error('Signup Register Error:', error)
    alert('Signup Register Error:' + error)
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
