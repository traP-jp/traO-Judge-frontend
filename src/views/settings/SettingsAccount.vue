<script setup lang="ts">
import { MeApi } from '@/api/generated/apis/MeApi'
import { Oauth2Api } from '@/api/generated/apis/Oauth2Api'
import { ResponseError } from '@/api/generated/runtime'
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import { passwordValidator } from '@/utils/validator'
import isEmail from 'validator/lib/isEmail'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import GitHubIcon from '@/assets/service_icons/github.svg'
import GoogleIcon from '@/assets/service_icons/google.svg'
import traQIcon from '@/assets/service_icons/traq.svg'

import AlertBox from '@/components/AlertBox.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'

const email = ref<string>('')
const username = ref<string>('')

const showPasswordForm = ref(false)
const showEmailForm = ref(false)
const showEmailInfo = ref(false)
const showPasswordInfo = ref(false)
const newEmail = ref<string>('')
const emailError = ref<string>('')
const currentPasswordError = ref<string>('')
const newPasswordError = ref<string>('')
const isLoading = ref<boolean>(false)

const currentPassword = ref<string>('')
const newPassword = ref<string>('')
const confirmPassword = ref<string>('')

interface Service {
  name: string
  linked: boolean
  ID: string
  icon: string
}

const router = useRouter()

const services = ref<Service[]>([
  { name: 'GitHub', linked: false, ID: '', icon: GitHubIcon },
  { name: 'Google', linked: false, ID: '', icon: GoogleIcon },
  { name: 'traQ', linked: false, ID: '', icon: traQIcon }
])

async function toggleLink(service: Service) {
  if (service.name === 'GitHub' || service.name === 'Google') {
    if (service.linked) {
      try {
        const oauth2Api = new Oauth2Api()
        if (service.name === 'GitHub') {
          await oauth2Api.revokeGithubAuth()
        } else {
          await oauth2Api.revokeGoogleAuth()
        }
        service.linked = false
        service.ID = ''
      } catch (error) {
        if (error instanceof ResponseError) {
          const responseJson = await error.response.json()
          switch (error.response.status) {
            case 400:
              throw new Error(`Bad Request: ${responseJson.message}`)
            case 401:
              throw new Error(`Unauthorized: ${responseJson.message}`)
            case 404:
              throw new Error(`Not Found: ${responseJson.message}`)
            case 500:
              throw new Error(`Internal Server Error: ${responseJson.message}`)
            default:
              throw new Error(`Unknown error: ${error.response.status}`)
          }
        }
        console.error(`Revoke ${service.name} OAuth Error:`, error)
      }
    } else {
      try {
        const oauth2Api = new Oauth2Api()
        const response =
          service.name === 'GitHub'
            ? await oauth2Api.getgithubAuthParams({ oauthAction: 'bind' })
            : await oauth2Api.getGoogleAuthParams({ oauthAction: 'bind' })
        router.push(response.url)
      } catch (error: unknown) {
        if (error instanceof ResponseError) {
          if (error.response.status === 500) {
            const responseJson = await error.response.json()
            throw new Error(`Internal Server Error: ${responseJson.message}`)
          }

          throw new Error(`Unknown error: ${error.response.status}`)
        }
        console.error(`Bind ${service.name} OAuth Error:`, error)
      }
    }
  } else {
    console.log(`TODO: ${service.name} との連携を${service.linked ? '解除' : '開始'}する`)
  }
}

function toggleEmailForm() {
  showEmailForm.value = true
  showEmailInfo.value = false
}

async function changeEmail() {
  emailError.value = ''
  if (!newEmail.value || !newEmail.value.trim()) {
    emailError.value = 'メールアドレスを入力してください。'
    return
  }

  if (!isEmail(newEmail.value)) {
    emailError.value = '有効なメールアドレスを入力してください。'
    return
  }

  isLoading.value = true
  try {
    const meApi = new MeApi()
    await meApi.putMeEmail({
      email: {
        email: newEmail.value
      }
    })

    showEmailForm.value = false
    showEmailInfo.value = true
    newEmail.value = ''
  } catch (error) {
    console.error('メールアドレス変更エラー:', error)
    if (error instanceof ResponseError) {
      if (error.response.status === 400) {
        emailError.value = '無効なメールアドレスです。'
      } else if (error.response.status === 401) {
        emailError.value = '認証に失敗しました。'
      } else if (error.response.status === 409) {
        emailError.value = 'このメールアドレスは既に使用されています。別のメールアドレスを使用してください。'
      } else {
        emailError.value = 'メールアドレスの変更に失敗しました。'
      }
    } else {
      emailError.value = 'メールアドレスの変更に失敗しました。'
    }
  } finally {
    isLoading.value = false
  }
}

function cancelEmailChange() {
  showEmailForm.value = false
  showEmailInfo.value = false
  newEmail.value = ''
  emailError.value = ''
}

function togglePasswordForm() {
  showPasswordForm.value = true
  showPasswordInfo.value = false
}

async function changePassword() {
  if (!showPasswordForm.value) {
    showPasswordForm.value = true
    return
  }

  let hasError = false
  currentPasswordError.value = ''
  newPasswordError.value = ''

  if (!currentPassword.value) {
    hasError = true
    currentPasswordError.value = '必須項目です。'
    return
  }

  if (!newPassword.value) {
    hasError = true
    newPasswordError.value = '必須項目です'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    hasError = true
    newPasswordError.value = '新しいパスワードと確認用パスワードが一致しません。'
    return
  }

  const [isValid, errorMessage] = passwordValidator(newPassword.value)
  if (!isValid) {
    hasError = true
    newPasswordError.value = errorMessage
    return
  }

  if (hasError) return

  isLoading.value = true
  try {
    const meApi = new MeApi()
    await meApi.putUsersMePassword({
      putPasswordRequest: {
        oldPassword: currentPassword.value,
        newPassword: newPassword.value
      }
    })

    showPasswordForm.value = false
    showPasswordInfo.value = true

    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    console.error('パスワード変更エラー:', error)
    if (error instanceof ResponseError) {
      switch (error.response.status) {
        case 400:
          newPasswordError.value = 'パスワードの形式が正しくありません。'
          break
        case 401:
          currentPasswordError.value = '現在のパスワードが正しくありません。'
          break
        default:
          newPasswordError.value = 'パスワードの変更に失敗しました。'
          break
      }
    } else {
      newPasswordError.value = 'パスワードの変更に失敗しました。'
    }
  } finally {
    isLoading.value = false
  }
}

function cancelPasswordChange() {
  showPasswordForm.value = false
  showPasswordInfo.value = false
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  currentPasswordError.value = ''
  newPasswordError.value = ''
}

async function fetchUserData() {
  try {
    const meApi = new MeApi()
    const user = await meApi.getMe()
    username.value = user.name
    email.value = user.authentication.emailAuth || ''

    services.value = services.value.map((service) => {
      switch (service.name) {
        case 'GitHub':
          service.linked = user.authentication.githubAuth !== null
          service.ID = user.authentication.githubAuth ?? ''
          break
        case 'traQ':
          service.linked = user.authentication.traqAuth !== null
          service.ID = user.authentication.traqAuth ?? ''
          break
        case 'Google':
          service.linked = user.authentication.googleAuth !== null
          service.ID = user.authentication.googleAuth ?? ''
          break
        default:
          break
      }
      return service
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div class="flex font-primary">
    <div class="flex w-full flex-col gap-6">
      <div class="flex max-w-form-max flex-col gap-4">
        <h2 class="fontstyle-ui-subtitle text-text-primary">メールアドレスの変更</h2>
        <template v-if="!showEmailForm">
          <div class="flex w-full flex-col">
            <div class="fontstyle-ui-caption-strong text-xs text-text-secondary">
              現在のメールアドレス
            </div>
            <span class="fontstyle-ui-body text-text-primary">{{ email || '未設定' }}</span>
          </div>
          <AlertBox
            v-model:show="showEmailInfo"
            text="認証メールを送信しました。60分以内にメールに記載されたアドレスにアクセスして、メールアドレスの変更を完了してください。"
          />
          <div>
            <BorderedButton class="h-10" @click="toggleEmailForm"
              >メール アドレスを変更</BorderedButton
            >
          </div>
        </template>
        <template v-else>
          <div class="w-2/3">
            <EmailTextbox v-model="newEmail" class="h-10" :error-message="emailError" />
          </div>
          <div class="inline-flex items-start justify-start gap-3 self-stretch">
            <PrimaryButton class="h-10 px-3 py-2" :disabled="isLoading" @click="changeEmail">
              認証メールを送信
            </PrimaryButton>
            <BorderedButton class="h-10 px-3 py-2" :disabled="isLoading" @click="cancelEmailChange">
              キャンセル
            </BorderedButton>
          </div>
        </template>
      </div>
      <div class="flex max-w-form-max flex-col gap-4">
        <h2 class="fontstyle-ui-subtitle text-xl text-text-primary">パスワードの変更</h2>
        <template v-if="!showPasswordForm">
          <AlertBox v-model:show="showPasswordInfo" text="パスワードを変更しました。" />
          <div>
            <BorderedButton class="h-10" @click="togglePasswordForm"
              >パスワードを変更</BorderedButton
            >
          </div>
        </template>
        <template v-else>
          <div class="flex w-2/3 flex-col gap-4">
            <PasswordTextbox
              id="current-password"
              v-model="currentPassword"
              label="現在のパスワード"
              autocomplete="current-password"
              class="w-full"
              :error-message="currentPasswordError"
            />
            <PasswordTextbox
              id="new-password"
              v-model="newPassword"
              label="新しいパスワード"
              autocomplete="new-password"
              supporting-text="半角英数字と記号(@, $, !, %, *, ?, &)を用いた8文字以上64文字以下のパスワードが利用できます。
              大文字と小文字の英字をそれぞれ1文字ずつ使用する必要があります。"
              class="w-full"
              :error-message="newPasswordError"
            />
            <PasswordTextbox
              id="confirm-password"
              v-model="confirmPassword"
              label="新しいパスワード（確認）"
              autocomplete="new-password"
              class="w-full"
            />
          </div>
          <div class="inline-flex items-start justify-start gap-3 self-stretch">
            <PrimaryButton class="h-10 px-3 py-2" :disabled="isLoading" @click="changePassword">
              パスワードを変更
            </PrimaryButton>
            <BorderedButton
              class="h-10 px-3 py-2"
              :disabled="isLoading"
              @click="cancelPasswordChange"
            >
              キャンセル
            </BorderedButton>
          </div>
        </template>
      </div>

      <div class="flex flex-col gap-3 py-6">
        <h2 class="text-xl font-medium text-text-primary">外部サービスとの連携</h2>
        <div>
          <div
            v-for="service in services"
            :key="service.name"
            class="border-b-2 border-border-secondary"
          >
            <div class="flex items-center justify-between gap-2.5 px-4 py-2">
              <div class="flex items-center gap-4">
                <div class="flex w-24 items-center gap-2">
                  <img :src="service.icon" alt="" width="20" height="20" />
                  <label>
                    {{ service.name }}
                  </label>
                </div>
                <span class="h-12 content-around text-base font-normal text-text-secondary">
                  {{ '@' + service.ID }}
                </span>
              </div>
              <button
                class="h-8 rounded border border-border-secondary px-4 py-1 text-sm text-text-secondary"
                @click="toggleLink(service)"
              >
                {{ service.linked ? '連携解除' : '連携' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
