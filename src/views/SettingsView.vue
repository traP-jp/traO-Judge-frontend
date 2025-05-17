<script setup lang="ts">
import SideMenuUserSetting from '@/components/Navigations/SideMenu/SideMenuUserSetting.vue'
</script>

<template>
  <div class="flex gap-8 px-container-x">
    <nav class="sticky top-14 h-header-offset">
      <SideMenuUserSetting />
    </nav>
    <main class="flex-auto py-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
