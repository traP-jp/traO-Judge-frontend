<script lang="ts" setup>
import { useQueryParamInt } from '@/composables/useQueryParam'
import ProblemsList from '@/components/ProblemsList.vue'
import MonochromeButton from '@/components/Controls/MonochromeButton.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'

const { username } = defineProps<{ username: string }>()
const page = useQueryParamInt('page', 0, true)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="fontstyle-ui-subtitle flex items-center text-text-primary">
      <span class="mr-1">{{ username }}</span>
      <span class="grow">の問題</span>
      <MonochromeButton small>
        <span class="inline-flex items-center gap-1">
          <span>フィルタ</span>
          <MaterialIcon icon="tune" size="20px" />
        </span>
      </MonochromeButton>
    </div>
    <section class="">
      <ProblemsList v-model:page="page" :username="username" />
    </section>
  </div>
</template>

<style scoped></style>
