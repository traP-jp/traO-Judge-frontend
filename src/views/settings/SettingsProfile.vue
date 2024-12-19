<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedItem = ref<string>(window.location.pathname.split('/').pop() || 'profile');

function selectItem(item: string) {
  selectedItem.value = item;
  router.push(`/settings/${item}`);
}

onMounted(() => {
  window.addEventListener('popstate', () => {
    selectedItem.value = window.location.pathname.split('/').pop() || 'profile';
  });
});

const words = ref<string>('');

function changeWords() {
  console.log('TODO: ひとことの変更を反映する');
}

import profileIcon from '@/assets/status_icons/profile.svg';
import accountIcon from '@/assets/status_icons/account.svg';
</script>

<template>
  <div class="flex gap-12 px-6 py-8" style="font-family: 'Open Sans', 'Noto Sans', sans-serif;">
    <aside class="gap-3 p-3" style="min-width: 250px;">
      <h2 class="pb-3 text-xl font-medium">設定</h2>
      <ul>
        <li class="mb-3">
          <a 
            href="/settings/account" 
            class="flex rounded px-4 py-1"
            style="font-weight: 500; background-color: white; color: #5F5F5F; gap: 5px;"
            @click.prevent="selectItem('account')"
          >
            <img :src="accountIcon" alt="" width="20" height="20" style="filter: invert(33%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(85%);" />
            <p>アカウント</p>
          </a>
        </li>
        <li class="mb-3">
          <a 
            href="/settings/profile" 
            class="flex rounded px-4 py-1"
            style="font-weight: 500; background-color: #FFE5E5; color: #8E3535; gap: 5px;"
            @click.prevent="selectItem('profile')"
          >
            <img :src="profileIcon" alt="" width="20" height="20" />
            <p>プロフィール</p>
          </a>
        </li>
      </ul>
    </aside>
    <div class="flex flex-col gap-3 p-3" style="width: 800px;">
      <h2 class="h-9 border-b-2 pb-2 text-xl font-medium" style="border-color: #D8D8D8B2;">プロフィール</h2>
      <div class="mb-3 flex-col">
        <label class="text-sm font-medium" for="word">ひとこと</label>
        <div class="flex flex-col gap-3">
          <textarea id="word" v-model="words" class="rounded border px-3 py-1" style="height: 256px; width: 600px;"></textarea>
          <button class="h-10 w-20 rounded-lg" style="background-color: #AC004B; color: white;" @click="changeWords">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
hr {
  border-top: 1px solid #D8D8D8;
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
