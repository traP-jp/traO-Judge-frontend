<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import { usernameValidator, passwordValidator } from '@/utils/validator'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

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
  <div class="flex flex-col items-center bg-background-tertiary" style="height: calc(100vh - 56px)">
    <div class="w-120 space-y-6 rounded-2xl bg-white px-8 py-6">
      <div class="fontstyle-ui-title text-text-primary">新規登録</div>
      <div class="flex flex-col space-y-4">
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
        <div class="flex justify-center">
          <PrimaryButton text="次へ" @click="onSignupRegister" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
