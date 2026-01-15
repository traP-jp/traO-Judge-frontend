<script setup lang="ts">
import Link from '@/components/Link.vue'
import { computed } from 'vue'
import type { User } from '@/api/generated'

const { user } = defineProps<{ userId: string; user: User | null }>()

const traqId = computed(() => user?.traqId ?? '')
const githubId = computed(() => user?.githubId ?? '')
const xId = computed(() => user?.xId ?? '')
const selfIntroduction = computed(() => user?.selfIntroduction ?? '')
</script>

<template>
  <div>
    <h2 class="fontstyle-ui-subtitle">自己紹介</h2>
  </div>
  <div class="fontstyle-ui-body self-stretch py-4">{{ selfIntroduction }}</div>
  <hr class="w-full border-border-primary" />
  <div class="fontstyle-ui-body flex flex-col items-start gap-2 py-4 text-text-primary">
    <div v-if="githubId" class="flex items-center">
      <span>
        <img src="/src/assets/service_icons/github.svg" class="size-5" />
      </span>
      <span class="px-2">
        <Link :href="`https://github.com/${githubId}`" new-tab>@{{ githubId }}</Link>
      </span>
    </div>
    <div v-if="xId" class="flex items-center">
      <span>
        <img src="/src/assets/service_icons/x.svg" class="size-5" />
      </span>
      <span class="px-2">
        <Link :href="`https://x.com/intent/user?screen_name=${xId}`" new-tab>@{{ xId }}</Link>
      </span>
    </div>
    <div v-if="traqId" class="flex items-center">
      <span>
        <img src="/src/assets/service_icons/traq.svg" class="size-5" />
      </span>
      <span class="px-2"> @{{ traqId }} </span>
    </div>
  </div>
</template>

<style scoped></style>
