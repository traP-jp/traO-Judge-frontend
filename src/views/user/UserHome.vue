<script setup lang="ts">
import Link from '@/components/Link.vue'
import { onMounted, ref } from 'vue'
import { UsersApi, type User } from '@/api/generated'

const { username } = defineProps<{ username: string }>()

const traqId = ref<string>('')
const githubId = ref<string>('')
const xId = ref<string>('')
const selfIntroduction = ref<string>('')

const loadUser = async () => {
  try {
    const user: User = await new UsersApi().getUser({ userId: username })
    traqId.value = user.traqId ?? ''
    githubId.value = user.githubId ?? ''
    xId.value = user.xId ?? ''
    selfIntroduction.value = user.selfIntroduction ?? ''
  } catch (error) {
    console.error('API Error:', error)
    alert(`API Error: ${error}`)
  }
}

onMounted(() => {
  loadUser()
})
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
        <Link :href="`https://x.com/${xId}`" new-tab>@{{ xId }}</Link>
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
