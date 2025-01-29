<script setup lang="ts">
import { ref } from 'vue';
import SideMenuUserSetting from '@/components/Navigations/SideMenu/SideMenuUserSetting.vue';
import PrimaryButton from '@/components/Controls/PrimaryButton.vue';

const words = ref<string>('');

function changeWords() {
  console.log('TODO: ひとことの変更を反映する');
}

</script>

<template>
  <div class="flex gap-12 px-6 py-8" style="font-family: 'Open Sans', 'Noto Sans', sans-serif;">
    <SideMenuUserSetting />
    <div class="flex flex-col gap-2.5 p-3" style="width: 800px;">
      <div class="flex flex-col gap-3 p-3">
        <h2 class="h-9 border-b-2 pb-2 text-xl font-medium" style="border-color: #D8D8D8B2;">プロフィール</h2>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-0.5">
            <label class="text-sm font-medium" for="word">ひとこと</label>
            <textarea v-model="words" class="rounded border px-3 py-1" style="height: 256px; width: 600px;"></textarea>
          </div>
          <div>
            <PrimaryButton text="保存" @click="changeWords" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
