<script setup lang="ts">
import { ref } from 'vue';
import SideMenuUserSetting from '@/components/Navigations/SideMenu/SideMenuUserSetting.vue';
import PrimaryButton from '@/components/Controls/PrimaryButton.vue';
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue';

const words = ref<string>('');

function changeWords() {
  console.log('TODO: ひとことの変更を反映する');
}

</script>

<template>
  <div class="flex gap-12 px-6 py-8" style="font-family: 'Open Sans', 'Noto Sans', sans-serif;">
    <SideMenuUserSetting />
    <div class="flex flex-col gap-3 p-3" style="width: 800px;">
      <h2 class="h-9 border-b-2 pb-2 text-xl font-medium" style="border-color: #D8D8D8B2;">プロフィール</h2>
      <div class="mb-3 flex-col">
        <label class="text-sm font-medium" for="word">ひとこと</label>
        <div class="flex flex-col gap-3">
          <PlainTextbox v-model="words" placeholder="ひとことを入力してください" />
          <PrimaryButton text="保存" @click="changeWords" />
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
