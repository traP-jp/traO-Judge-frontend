<script setup lang="ts">
import MenuButton from '@/components/Navigations/MenuButton.vue'
import type { Icon } from '@/components/MaterialIcon.vue'
import { ref } from 'vue'

export type SideMenuProps = {
  icon: Icon
  text: string
  onClick: () => void
}
const { bottomContents = [] } = defineProps<{
  mainContents: SideMenuProps[]
  bottomContents?: SideMenuProps[]
}>()

const currentTab = ref(0)
</script>

<template>
  <nav class="flex h-full w-62.5 flex-col">
    <div class="py-6">
      <slot></slot>
    </div>
    <div class="flex grow flex-col">
      <ul class="flex flex-col gap-1">
        <li v-for="content in mainContents" :key="content.text">
          <MenuButton
            :icon="content.icon"
            :text="content.text"
            :selected="mainContents.indexOf(content) === currentTab"
            @click="
              () => {
                currentTab = mainContents.indexOf(content)
                content.onClick()
              }
            "
          />
        </li>
      </ul>
      <ul class="mt-auto flex flex-col gap-1 pb-6">
        <li v-for="content in bottomContents" :key="content.text">
          <MenuButton
            :icon="content.icon"
            :text="content.text"
            :selected="mainContents.length + bottomContents.indexOf(content) === currentTab"
            @click="
              () => {
                currentTab = mainContents.length + bottomContents.indexOf(content)
                content.onClick()
              }
            "
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
