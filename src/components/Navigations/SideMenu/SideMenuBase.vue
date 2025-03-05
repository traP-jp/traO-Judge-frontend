<script setup lang="ts">
import MenuButton from '@/components/Navigations/MenuButton.vue'
import type { Icon } from '@/components/MaterialIcon.vue'
import router from '@/router'

export type SideMenuProps = {
  icon: Icon
  text: string
  href?: string
  onClick?: () => void
}
const { bottomContents = [] } = defineProps<{
  mainContents: SideMenuProps[]
  bottomContents?: SideMenuProps[]
}>()
const currentTab = defineModel<number>({ default: 0 })
</script>

<template>
  <nav class="flex h-full w-62.5 flex-col">
    <div class="py-6">
      <slot></slot>
    </div>
    <div class="flex grow flex-col">
      <ul class="flex flex-col gap-1">
        <component
          :is="content.href == null ? 'span' : 'a'"
          v-for="content in mainContents"
          :key="content.text"
          :href="content.href"
          @click.prevent
        >
          <li>
            <MenuButton
              :icon="content.icon"
              :selected="mainContents.indexOf(content) === currentTab"
              :text="content.text"
              @click="
                () => {
                  currentTab = mainContents.indexOf(content)
                  content.onClick?.()
                  if (content.href != null) router.push(content.href)
                }
              "
            />
          </li>
        </component>
      </ul>
      <ul class="mt-auto flex flex-col gap-1 pb-6">
        <component
          :is="content.href == null ? 'span' : 'a'"
          v-for="content in bottomContents"
          :key="content.text"
          :href="content.href"
          @click.prevent
        >
          <li>
            <MenuButton
              :icon="content.icon"
              :selected="mainContents.length + bottomContents.indexOf(content) === currentTab"
              :text="content.text"
              @click="
                () => {
                  currentTab = mainContents.length + bottomContents.indexOf(content)
                  content.onClick?.()
                  if (content.href != null) router.push(content.href)
                }
              "
            />
          </li>
        </component>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
