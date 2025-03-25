<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SideMenuUserSetting from '@/components/Navigations/SideMenu/SideMenuUserSetting.vue'
import PrimaryButton from '@/components/Controls/PrimaryButton.vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import PasswordTextbox from '@/components/Controls/Textbox/PasswordTextbox.vue'
import EmailTextbox from '@/components/Controls/Textbox/EmailTextbox.vue'

import GitHubIcon from '@/assets/service_icons/github.svg'
import GoogleIcon from '@/assets/service_icons/google.svg'
import traQIcon from '@/assets/service_icons/traq.svg'

import checkIcon from '@/assets/status_icons/check.svg'

const username = ref<string>('')
const email = ref<string>('')
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
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/${service.name.toLowerCase()}-oauth2/revoke`,
          { method: 'POST' }
        )
        if (response.status === 201) {
          service.linked = false
          service.ID = ''
        } else if (response.status === 400) {
          throw new Error(
            'Invalid request: Cannot revoke OAuth account because no other authentication method is available.'
          )
        } else if (response.status === 401) {
          throw new Error('Unauthorized')
        } else if (response.status === 500) {
          throw new Error('Internal Server Error')
        } else {
          throw new Error('Unknown error: ' + response.status)
        }
      } catch (error) {
        console.error(`Revoke ${service.name} OAuth Error:`, error)
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/${service.name.toLowerCase()}-oauth2/bind/params`
        )
        if (response.status === 200) {
          const responseJson = await response.json()
          router.push(responseJson.url)
        } else if (response.status === 500) {
          const responseJson = await response.json()
          throw new Error('Internal Server Error: ' + responseJson.message)
        } else {
          throw new Error('Unknown error: ' + response.status)
        }
      } catch (error) {
        console.error(`Bind ${service.name} OAuth Error:`, error)
      }
    }
  } else {
    console.log(`TODO: ${service.name} との連携を${service.linked ? '解除' : '開始'}する`)
  }
}

function changeUsername() {
  console.log('TODO: ユーザー名の変更を反映する')
}

function changeEmail() {
  console.log('TODO: メールアドレスの変更を反映する')
}

function changePassword() {
  console.log('TODO: パスワードの変更を反映する')
}

async function fetchUserData() {
  try {
    const meApi = new MeApi()
    const user = await meApi.getMe()
    username.value = user.name

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
    <div class="flex flex-col gap-6 p-3" style="width: 800px">
      <div class="flex flex-col pb-3">
        <h2 class="h-9 border-b-2 border-border-secondary pb-2 text-xl font-medium">基本情報</h2>

        <label class="pt-3 text-sm font-medium" for="username">ユーザー名</label>
        <div class="flex items-center gap-2">
          <PlainTextbox id="username" v-model="username" />
          <PrimaryButton @click="changeUsername">変更</PrimaryButton>
        </div>

        <label class="pt-3 text-sm font-medium" for="email">メールアドレス</label>
        <div class="flex items-center gap-2">
          <EmailTextbox id="email" v-model="email" />
          <PrimaryButton @click="changeEmail">変更</PrimaryButton>
        </div>
      </div>

      <div class="flex flex-col gap-3 pb-3">
        <h2 class="h-9 border-b-2 border-border-secondary pb-2 text-xl font-medium">
          パスワードの変更
        </h2>
        <form class="flex flex-col gap-2" @submit.prevent="changePassword">
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

      <div class="flex flex-col gap-3 pb-3">
        <h2 class="h-9 border-b-2 border-border-secondary pb-2 text-xl font-medium">
          外部サービスとの連携
        </h2>
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
                :style="service.linked ? 'color: #16B179;' : 'text-text-tertiary'"
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
