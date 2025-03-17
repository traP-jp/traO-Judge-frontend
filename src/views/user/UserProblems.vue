<script lang="ts" setup>
import { useQueryParamInt } from '@/composables/useQueryParam'
import ProblemsList from '@/components/ProblemsList.vue'
import MonochromeButton from '@/components/Controls/MonochromeButton.vue'
import MaterialIcon from '@/components/MaterialIcon.vue'
import { computed, ref } from 'vue'
import PlainTextbox from '@/components/Controls/Textbox/PlainTextbox.vue'
import SimplePagenation from '@/components/Controls/Pagenation/SimplePagenation.vue'
import NumberTextbox from '@/components/Controls/Textbox/NumberTextbox.vue'

const { username } = defineProps<{ username: string }>()
const page = useQueryParamInt('page', 0, true)

let filterMenuShown = ref(false)
const toggleFilterMenu = () => {
  filterMenuShown.value = !filterMenuShown.value
}

let filterDifficultyBegin = ref(1)
let filterDifficultyEnd = ref(10)

let filterDifficultyRangeError = computed(
  () =>
    filterDifficultyBegin.value > filterDifficultyEnd.value ||
    filterDifficultyBegin.value < 1 ||
    10 < filterDifficultyBegin.value ||
    filterDifficultyEnd.value < 1 ||
    10 < filterDifficultyEnd.value
)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="fontstyle-ui-subtitle relative flex items-center text-text-primary">
      <span class="mr-1">{{ username }}</span>
      <span class="grow">の問題</span>
      <MonochromeButton small @click="toggleFilterMenu">
        <span class="inline-flex items-center gap-1">
          <span>フィルタ</span>
          <MaterialIcon icon="tune" size="20px" />
        </span>
      </MonochromeButton>
      <div v-if="filterMenuShown" class="absolute right-0 top-full pt-2">
        <div
          class="flex flex-col gap-4 rounded-lg border border-border-secondary bg-background-primary p-4 text-text-secondary shadow-lg"
        >
          <div class="flex flex-col gap-2">
            <span class="fontstyle-ui-control-strong">問題名</span>
            <PlainTextbox left-icon="search" placeholder="キーワードを入力" right-icon="close" />
          </div>
          <div class="flex flex-col gap-2">
            <span class="fontstyle-ui-control-strong">難易度</span>
            <div class="fontstyle-ui-control flex gap-6">
              <span class="flex items-center gap-2">
                <span class="w-16">
                  <NumberTextbox
                    v-model="filterDifficultyBegin"
                    min="1"
                    max="10"
                    :error="filterDifficultyRangeError"
                  />
                </span>
                <span>以上</span>
              </span>
              <span class="flex items-center gap-2">
                <span class="w-16">
                  <NumberTextbox
                    v-model="filterDifficultyEnd"
                    min="1"
                    max="10"
                    :error="filterDifficultyRangeError"
                  />
                </span>
                <span>以下</span>
              </span>
            </div>
            <div v-if="filterDifficultyRangeError" class="flex items-start gap-2 text-status-error">
              <MaterialIcon icon="error" size="1.25rem" is-filled />
              <span class="fontstyle-ui-control min-w-0 break-words">範囲が正しくありません</span>
            </div>
            <span class="fontstyle-ui-caption">難易度は1~10で表されます。</span>
          </div>
        </div>
      </div>
    </div>
    <section class="">
      <ProblemsList v-model:page="page" :username="username" />
    </section>
    <SimplePagenation />
  </div>
</template>

<style scoped></style>
