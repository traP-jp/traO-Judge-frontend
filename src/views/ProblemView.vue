<script setup lang="ts">
import SideMenuProblem from '@/components/Navigations/SideMenu/SideMenuProblem.vue'
import { ProblemsApi } from '@/api/generated/apis/ProblemsApi.ts'
import { ResponseError } from '@/api/generated/runtime'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const problemName = ref('')
const problemAuthorId = ref('')

const isAuthor = computed(() => {
  return !!(userStore.userId && problemAuthorId.value && userStore.userId === problemAuthorId.value)
})

onMounted(async () => {
  try {
    const problemsApi = new ProblemsApi()
    const response = await problemsApi.getProblem({
      problemId: useRoute().params.id as string
    })
    problemName.value = response.title
    problemAuthorId.value = response.authorId
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      if (error.response.status === 404) {
        console.error('Not Found 問題が存在しません. (または問題の閲覧権限がありません.)')
      } else {
        console.error('Unknown error: ' + error.response.status)
      }
    } else {
      console.error('Get Problem Info Error', error)
    }
  }
})
</script>

<template>
  <div class="mx-auto flex max-w-300 items-start gap-8 self-stretch">
    <SideMenuProblem :problem-name="problemName" :is-editorial-available="true" :is-admin="isAuthor" />
    <RouterView />
  </div>
</template>

<style scoped></style>
