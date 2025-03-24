<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import { passwordValidator, usernameValidator } from '@/utils/validator'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'

const oauth = ref(false)
const username = ref('')
const usernameErrorMessage = ref('')
const emailAddress = ref('')
const password = ref('')
const passwordErrorMessage = ref('')
const confirmPassword = ref('')
const confirmPasswordErrorMessage = ref('')

const route = useRoute()
try {
  if (route.query.oauth !== undefined) {
    oauth.value = route.query.oauth === 'true'
  }
  if (typeof route.query.token !== 'string') {
    throw new Error('Invalid token')
  }
  const token = route.query.token
  if (!oauth.value) {
    const decodedToken = jwtDecode<{ email: string }>(token)
    emailAddress.value = decodedToken.email
  }
} catch (error) {
  console.error('Signup Register Error:', error)
}

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
    if (!oauth.value) {
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
    }
    if (error) {
      return
    }
    const token = route.query.token
    const payload = {
      userName: username.value,
      token: token,
      ...(oauth.value ? {} : { password: password.value })
    }
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (response.status === 201) {
      router.push('/login')
    } else if (response.status === 400) {
      throw new Error('不正なリクエストです')
    } else if (response.status === 401) {
      throw new Error('Unauthorized')
    } else if (response.status === 500) {
      throw new Error('Internal Server Error')
    } else {
      throw new Error('Unknown error: ' + response.status)
    }
  } catch (error) {
    console.error('Signup Register Error:', error)
  }
}
</script>

<template>
  <div class="flex flex-col items-center bg-background-tertiary" style="height: calc(100vh - 56px)">
    <div class="w-120 space-y-6 rounded-2xl bg-background-primary px-8 py-6">
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
          v-if="!oauth"
          id="password"
          v-model="password"
          label="パスワード"
          :required="true"
          supporting-text="半角英数字と記号(@, $, !, %, *, ?, &)を用いた8文字以上64文字以下のパスワードが利用できます。
          大文字と小文字の英字をそれぞれ1文字ずつ使用する必要があります。"
          :error-message="passwordErrorMessage"
        />
        <PasswordTextbox
          v-if="!oauth"
          id="confirmPassword"
          v-model="confirmPassword"
          label="パスワード（確認）"
          :required="true"
          :error-message="confirmPasswordErrorMessage"
        />
        <div class="flex justify-center">
          <PrimaryButton @click="onSignupRegister">次へ</PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
