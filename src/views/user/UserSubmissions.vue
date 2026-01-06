<script setup lang="ts">
import { ref } from 'vue'
import { useQueryParamInt } from '@/composables/useQueryParam'
import SubmissionsList from '@/components/SubmissionsList.vue'
import MonochromeButton from '@/components/Controls/MonochromeButton.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'

const { username } = defineProps<{ username: string }>()
const page = useQueryParamInt('page', 0, true)

const filterMenuShown = ref(false)
const toggleFilterMenu = () => {
  filterMenuShown.value = !filterMenuShown.value
}
</script>

<template>
  <div class="flex flex-col gap-6 py-6">
    <div class="relative flex items-center gap-4">
      <h2 class="fontstyle-ui-subtitle flex-1 text-text-primary">
        <span>{{ username }}</span>
        <span>の提出</span>
      </h2>
      <MonochromeButton small @click="toggleFilterMenu">
        <span class="inline-flex items-center gap-1">
          <span>フィルタ</span>
          <MaterialIcon icon="tune" size="20px" />
        </span>
      </MonochromeButton>

      <div v-if="filterMenuShown" class="absolute right-0 top-full z-10 pt-2">
        <div
          class="rounded-lg border border-border-secondary bg-background-primary p-4 text-text-secondary shadow-lg"
        >
          <p class="fontstyle-ui-body text-text-tertiary">実装予定です</p>
        </div>
      </div>
    </div>

    <SubmissionsList v-model:page="page" :username="username" />
  </div>
</template>

<style scoped></style>
