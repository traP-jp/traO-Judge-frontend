<script setup lang="ts">
import { MeApi } from '@/api/generated/apis/MeApi'
import { Oauth2Api } from '@/api/generated/apis/Oauth2Api'
import { ResponseError } from '@/api/generated/runtime'
import BorderedButton from '@/components/Controls/BorderedButton.vue'
import SideMenuUserSetting from '@/components/Navigations/SideMenu/SideMenuUserSetting.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import GitHubIcon from '@/assets/service_icons/github.svg'
import GoogleIcon from '@/assets/service_icons/google.svg'
import traQIcon from '@/assets/service_icons/traq.svg'

import checkIcon from '@/assets/status_icons/check.svg'

import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'

const email = ref<string>('')
const username = ref<string>('')

const showPasswordForm = ref(false)
const showEmailForm = ref(false)
const newEmail = ref<string>('')

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
          if (error.response.status === 400) {
            throw new Error('Bad Request: ' + responseJson.message)
          } else if (error.response.status === 401) {
            throw new Error('Unauthorized: ' + responseJson.message)
          } else if (error.response.status === 500) {
            throw new Error('Internal Server Error: ' + responseJson.message)
          } else {
            throw new Error('Unknown error: ' + error.response.status)
          }
        } else {
          console.error(`Revoke ${service.name} OAuth Error:`, error)
        }
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
            throw new Error('Internal Server Error: ' + responseJson.message)
          } else {
            throw new Error('Unknown error: ' + error.response.status)
          }
        } else {
          console.error(`Bind ${service.name} OAuth Error:`, error)
        }
      }
    }
  } else {
    console.log(`TODO: ${service.name} との連携を${service.linked ? '解除' : '開始'}する`)
  }
}

async function changeEmail() {
  if (!showEmailForm.value) {
    showEmailForm.value = true
    return
  }
  // TODO: 認証メール送信ロジックをここに実装
  console.log('認証メール送信:', newEmail.value)
}

function cancelEmailChange() {
  showEmailForm.value = false
  newEmail.value = ''
}

async function changePassword() {
  if (!showPasswordForm.value) {
    showPasswordForm.value = true
    return
  }
  // TODO: 実際のパスワード変更ロジックをここに実装
  console.log('パスワード変更:', currentPassword.value, newPassword.value, confirmPassword.value)
}

function togglePasswordForm() {
  showPasswordForm.value = true
}

async function fetchUserData() {
  try {
    const meApi = new MeApi()
    const user = await meApi.getMe()
    username.value = user.name
    email.value = user.email || ''

    services.value = services.value.map((service) => {
      switch (service.name) {
        case 'GitHub':
          console.log(user.githubId)
          service.linked = user.githubId !== null
          service.ID = user.githubId ?? ''
          break
        case 'traQ':
          console.log(user.traqId)
          service.linked = user.traqId !== null
          service.ID = user.traqId ?? ''
          break
        case 'Google':
          console.log('TODO: Google との連携状況を取得する')
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
  <div class="flex gap-12 px-6 py-8 font-primary">
    <SideMenuUserSetting />
    <div class="flex w-[918px] flex-col gap-6 py-6">
      <!-- メールアドレスの変更 -->
      <div v-if="!showEmailForm" class="flex flex-col gap-4">
        <h2 class="text-xl font-medium text-text-primary">メールアドレスの変更</h2>

        <div class="flex w-full max-w-[400px] flex-col">
          <div class="text-xs font-medium text-text-secondary">現在のメールアドレス</div>
          <div class="text-base text-text-primary">{{ email || '未設定' }}</div>
        </div>

        <div>
          <BorderedButton class="h-10" @click="changeEmail">メール アドレスを変更</BorderedButton>
        </div>
      </div>

      <div v-else class="inline-flex flex-col items-start justify-start gap-4 self-stretch">
        <div
          class="text-black justify-center self-stretch font-['Noto_Sans_JP'] text-xl font-medium leading-7"
        >
          メールアドレスの変更
        </div>
        <div
          data-displayserrormessage="false"
          data-displayslabel="true"
          data-displayssupportingtext="false"
          class="flex w-full max-w-[400px] flex-col items-start justify-start gap-2"
        >
          <div class="flex flex-col items-start justify-start gap-1 self-stretch">
            <div
              data-isrequired="true"
              class="inline-flex items-center justify-start gap-2 self-stretch overflow-hidden"
            >
              <div
                class="justify-center font-['Noto_Sans_JP'] text-sm font-normal leading-normal text-text-primary"
              >
                新しいメールアドレス
              </div>
              <div
                class="justify-center font-['Noto_Sans_JP'] text-xs font-medium leading-none text-status-error"
              >
                必須
              </div>
            </div>
            <div
              data-displayslefticon="false"
              data-displayslength="false"
              data-displaysrighticon="false"
              data-status="None"
              data-valuetype="Text"
              class="inline-flex items-center justify-start self-stretch rounded bg-white p-2 outline outline-1 outline-offset-[-1px] outline-border-secondary"
            >
              <div class="flex flex-1 items-center justify-start gap-2 overflow-hidden px-2">
                <EmailTextbox v-model="newEmail" />
              </div>
              <div class="flex items-center justify-start gap-2"></div>
            </div>
          </div>
        </div>
        <div class="inline-flex items-start justify-start gap-3 self-stretch">
          <PrimaryButton @click="changeEmail">認証メールを送信</PrimaryButton>
          <BorderedButton @click="cancelEmailChange">キャンセル</BorderedButton>
        </div>
      </div>

      <!-- パスワードの変更 -->
      <div class="flex flex-col gap-3 pb-3">
        <h2 class="h-9 border-border-secondary pb-2 text-xl font-medium">パスワードの変更</h2>
        <div v-if="!showPasswordForm">
          <BorderedButton class="h-10" @click="togglePasswordForm">パスワードを変更</BorderedButton>
        </div>
        <form v-else class="flex flex-col gap-2" @submit.prevent="changePassword">
          <input v-model="username" type="text" autocomplete="username" hidden />

          <label class="text-sm font-medium" for="current-password">現在のパスワード</label>
          <div class="w-64">
            <PasswordTextbox
              id="current-password"
              v-model="currentPassword"
              autocomplete="current-password"
            />
          </div>

          <label class="text-sm font-medium" for="new-password">新しいパスワード</label>
          <div class="w-64">
            <PasswordTextbox id="new-password" v-model="newPassword" autocomplete="new-password" />
          </div>

          <label class="text-sm font-medium" for="confirm-password">新しいパスワード (確認)</label>
          <div class="w-64">
            <PasswordTextbox
              id="confirm-password"
              v-model="confirmPassword"
              autocomplete="new-password"
            />
          </div>

          <div>
            <PrimaryButton type="submit">変更</PrimaryButton>
          </div>
        </form>
      </div>

      <!-- 外部サービスとの連携 -->
      <div class="flex flex-col gap-3 py-6">
        <h2 class="text-xl font-medium text-text-primary">外部サービスとの連携</h2>
        <div>
          <div
            v-for="service in services"
            :key="service.name"
            class="border-b-2 border-border-secondary"
          >
            <div class="flex h-12 items-center gap-2.5">
              <div class="flex items-center gap-2">
                <img :src="service.icon" alt="" width="20" height="20" />
                <label class="w-32">
                  {{ service.name }}
                </label>
              </div>
              <span
                :class="service.linked ? 'text-[#16B179]' : 'text-text-tertiary'"
                class="flex w-32 gap-1"
              >
                {{ service.linked ? '連携済' : '未連携' }}
                <img v-if="service.linked" :src="checkIcon" alt="" width="16" height="16" />
              </span>
              <span class="h-12 min-w-72 content-around text-base font-normal text-text-secondary">
                {{ service.ID }}
              </span>
              <button
                class="mr-10 h-8 rounded border border-border-secondary px-4 py-1 text-sm text-text-secondary"
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
