<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedItem = ref<string>(window.location.pathname.split('/').pop() || 'account');

function selectItem(item: string) {
  selectedItem.value = item;
  router.push(`/settings/${item}`);
}

onMounted(() => {
  window.addEventListener('popstate', () => {
    selectedItem.value = window.location.pathname.split('/').pop() || 'account';
  });
});

const username = ref<string>('');
const email = ref<string>('');
const currentPassword = ref<string>('');
const newPassword = ref<string>('');
const confirmPassword = ref<string>('');

interface Service {
  name: string;
  linked: boolean;
  ID: string;
  icon: string;
}

import GitHubIcon from '@/assets/service_icons/github.svg';
import GoogleIcon from '@/assets/service_icons/google.svg';

const services = ref<Service[]>([
  { name: 'GitHub', linked: false, ID: '', icon: GitHubIcon },
  { name: 'Google', linked: false, ID: '', icon: GoogleIcon },
  { name: 'traQ', linked: false, ID: '@test_user', icon: '' }
]);

function toggleLink(service: Service) {
  service.linked = !service.linked;
  console.log(`TODO: ${service.name} との連携を${service.linked ? '開始' : '解除'}する`);
}

function changeUsername() {
  console.log('TODO: ユーザー名の変更を反映する');
}

function changeEmail() {
  console.log('TODO: メールアドレスの変更を反映する');
}

function changePassword() {
  console.log('TODO: パスワードの変更を反映する');
}
</script>

<template>
  <div class="flex gap-12 px-6 py-8">
    <aside class="gap-3 p-3" style="min-width: 250px;">
      <h2 class="h-10 pb-3 text-xl font-medium">設定</h2>
      <ul>
        <li class="mb-3">
          <a 
            href="/settings/account" 
            class="block rounded px-4 py-1"
            style="font-weight: 500; background-color: #FFE5E5; color: #8E3535;"
            @click.prevent="selectItem('account')"
          >
            アカウント
          </a>
        </li>
        <li class="mb-3">
          <a 
            href="/settings/profile" 
            class="block rounded px-4 py-1"
            style="font-weight: 500; background-color: white; color: #5F5F5F;"
            @click.prevent="selectItem('profile')"
          >
            プロフィール
          </a>
        </li>
      </ul>
    </aside>
    <div class="flex flex-col gap-6 p-3" style="width: 800px;">
      <div class="flex-col gap-3 pb-3">
        <h2 class="h-9 border-b-2 pb-2 text-xl font-medium">基本情報</h2>
        <div class="mb-3 flex-col">
          <label class="text-sm font-medium" for="username">ユーザー名</label>
          <div class="flex items-center gap-2">
            <input id="username" v-model="username" type="text" class="h-8 w-48 rounded border" style="border-color: #D8D8D8; padding-left: 10px; color: #3A3A3A;" />
            <button class="h-10 w-20 rounded-lg" style="background-color: #AC004B; color: white;" @click="changeUsername">変更</button>
          </div>
        </div>
        <div class="mb-3 flex-col">
          <label class="text-sm font-medium" for="email">メールアドレス</label>
          <div class="flex items-center gap-2">
            <input id="email" v-model="email" type="email" class="h-8 w-96 rounded border" style="border-color: #D8D8D8; padding-left: 10px; color: #3A3A3A;" />
            <button class="h-10 w-20 rounded-lg" style="background-color: #AC004B; color: white;" @click="changeEmail">変更</button>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3 pb-3">
        <h2 class="h-9 border-b-2 pb-2 text-xl font-medium">パスワードの変更</h2>
        <div class="flex flex-col gap-2">
          <div class="flex-col">
            <label class="text-sm font-medium" for="current-password">現在のパスワード</label>
            <div class="flex items-center ">
              <input id="current-password" v-model="currentPassword" type="password" class="h-8 w-72 rounded border" style="border-color: #D8D8D8; padding-left: 10px; color: #3A3A3A;" />
            </div>
          </div>
          <div class="flex-col">
            <label class="text-sm font-medium" for="new-password">新しいパスワード</label>
            <div class="flex items-center ">
              <input id="new-password" v-model="newPassword" type="password" class="h-8 w-72 rounded border" style="border-color: #D8D8D8; padding-left: 10px; color: #3A3A3A;" />
            </div>
          </div>
          <div class="flex-col">
            <label class="text-sm font-medium" for="confirm-password">新しいパスワード (確認)</label>
            <div class="flex items-center ">
              <input id="confirm-password" v-model="confirmPassword" type="password" class="h-8 w-72 rounded border" style="border-color: #D8D8D8; padding-left: 10px; color: #3A3A3A;" />
            </div>
          </div>
          <div>
            <button class="h-10 w-20 rounded-lg" style="background-color: #AC004B; color: white;" @click="changePassword">
              変更
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col pb-3">
        <h2 class="h-9 border-b-2 pb-2 text-xl font-medium">外部サービスとの連携</h2>
        <div>
          <div v-for="service in services" :key="service.name" class="flex-col">
            <div class="flex h-12 items-center gap-2.5">
              <div class="flex items-center gap-2">
                <img :src="service.icon" alt="" width="20" height="20" />
                <label class="w-32">
                  {{ service.name }}
                </label>
              </div>
              <span :style="[service.linked ? 'color: #16B179;' : 'color: #5F5F5F;']" class="w-32">
                {{ service.linked ? '連携済' : '未連携' }}
                <span v-if="service.linked">✔</span>
              </span>
              <span class="h-12 min-w-72 content-around text-base font-normal" style="color: #5F5F5F;">
                {{ service.ID }}
              </span>
              <button class="mr-10 h-8 rounded border px-4 py-1 text-sm" style="border-color: #D8D8D8; color: #5F5F5F;" @click="toggleLink(service)">
                {{ service.linked ? '連携解除' : '連携' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
