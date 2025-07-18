<script setup lang="ts">
import SideMenuProblem from '@/components/Navigations/SideMenu/SideMenuProblem.vue'
import { ProblemsApi } from '@/api/generated/apis/ProblemsApi.ts'
import { ResponseError } from '@/api/generated/runtime'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const problemName = ref('')

onMounted(async () => {
  try {
    const problemsApi = new ProblemsApi()
    const response = await problemsApi.getProblem({
      problemId: useRoute().params.id as string
    })
    problemName.value = response.title
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
    <SideMenuProblem :problem-name="problemName" :is-editorial-available="true"/>
    <RouterView/>
  </div>
</template>

<style scoped></style>
