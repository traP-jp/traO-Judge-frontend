<script lang="ts" setup>
import { useQueryParamInt } from '@/composables/useQueryParam'
import ProblemsList from '@/components/ProblemsList.vue'

const { username } = defineProps<{ username: string }>()
const page = useQueryParamInt('page', 0, true)
</script>

<template>
  <div class="rounded-lg border border-solid border-border-secondary pt-28 text-center">
    <h2 class="fontstyle-ui-title-large">問題一覧<br />テーブル</h2>
    <section class="p-10">
      <ProblemsList v-model:page="page" :username="username" />
    </section>
  </div>
</template>

<style scoped></style>
