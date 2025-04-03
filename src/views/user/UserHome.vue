<script setup lang="ts">
import Link from '@/components/Link.vue'
import { onMounted, ref } from 'vue'
import { UsersApi, type User } from '@/api/generated'

const { username } = defineProps<{ username: string }>()

const traqId = ref<string>('')
const githubId = ref<string>('')
const githubLink = ref<string>('')
const xId = ref<string>('')
const xLink = ref<string>('')
const selfIntroduction = ref<string>('')

const loadUser = async () => {
  try {
    const user: User = await new UsersApi().getUser({ userId: username })
    traqId.value = user.traqId ?? ''
    githubId.value = user.githubId ?? ''
    githubLink.value = user.githubLink ?? ''
    xLink.value = user.xLink ?? ''
    selfIntroduction.value = user.selfIntroduction ?? ''

    const xIdMatch = /\/([0-1a-zA-Z_]+)\/?$/.exec(user.xLink ?? '')
    if (xIdMatch) {
      xId.value = xIdMatch[1]
    } else {
      xId.value = ''
    }
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
  <div class="flex flex-col items-start gap-2 py-4">
    <div v-if="githubId && githubLink" class="flex items-center">
      <span>
        <img src="/src/assets/service_icons/github.svg" class="size-5" />
      </span>
      <span class="px-2">
        <Link :href="githubLink" new-tab>@{{ githubId }}</Link>
      </span>
    </div>
    <div v-if="xId && xLink" class="flex items-center">
      <span>
        <img src="/src/assets/service_icons/x.svg" class="size-5" />
      </span>
      <span class="px-2">
        <Link :href="xLink" new-tab>@{{ xId }}</Link>
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
