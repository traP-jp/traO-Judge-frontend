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
</script>

<template>
  <div class="flex px-24">
    <aside class="w-64 p-3" style="min-width: 250px;">
      <h2 class="pb-3 text-xl font-medium">設定</h2>
      <ul>
        <li class="mb-3">
          <a 
            href="/settings/account" 
            class="block rounded px-4 py-1"
            style="font-weight: 500; background-color: white; color: #5F5F5F;"
            @click.prevent="selectItem('account')"
          >
            アカウント
          </a>
        </li>
        <li class="mb-3">
          <a 
            href="/settings/profile" 
            class="block rounded px-4 py-1"
            style="font-weight: 500; background-color: #FFE5E5; color: #8E3535;"
            @click.prevent="selectItem('profile')"
          >
            プロフィール
          </a>
        </li>
      </ul>
    </aside>
    <div class="flex-col p-3" style="width: 800px;">
      <h2 class="text-xl font-medium">プロフィール</h2>
      <hr>
      <div class="flex-col">
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
