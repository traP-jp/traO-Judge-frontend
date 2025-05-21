<script setup lang="ts">
import Link from '@/components/Link.vue'
import { EditorialsApi } from '@/api/generated/apis/EditorialsApi.ts'
import { ResponseError } from '@/api/generated/runtime'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const editorialId = ref<number>(0)
const editorialAuthroId = ref<string>('')
const editorialUpdatedAt = ref<string>('')
const editorialStatement = ref<string>('')

onMounted(async () => {
  try {
    const editorialsApi = new EditorialsApi()
    const response = await editorialsApi.getEditorial({
      editorialId: useRoute().params.id as string
    })
    editorialId.value = response.id
    editorialAuthroId.value = response.authorId
    editorialUpdatedAt.value =
      response.updatedAt?.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }) || ''
    editorialStatement.value = response.statement
  } catch (error: unknown) {
    if (error instanceof ResponseError) {
      if (error.response.status === 404) {
        console.error('解説が存在しません(または解説の閲覧権限がありません)')
      } else {
        console.error('Unknown error: ' + error.response.status)
      }
    } else {
      console.error('Get Editorial Error', error)
    }
  }
})
</script>

<template>
  <div class="flex flex-[1_0_0] flex-col items-start gap-6 py-6">
    <div class="flex flex-col items-start gap-1 self-stretch">
      <div class="fontstyle-ui-subtitle text-text-primary">解説 {{ editorialId }}</div>
      <div class="flex flex-col items-start">
        <div class="flex items-center justify-center gap-3">
          <div class="fontstyle-ui-body-2 text-text-secondary">著者</div>
          <Link :href="'/users/' + editorialAuthroId" new-tab>
            {{ editorialAuthroId }}
          </Link>
        </div>
        <div class="fontstyle-ui-body-2 flex items-center justify-center gap-3 text-text-secondary">
          <div>最終更新</div>
          <div>{{ editorialUpdatedAt }}</div>
        </div>
      </div>
    </div>
    <div class="fontstyle-document-body flex items-start whitespace-pre-wrap text-[#000000]">
      {{ editorialStatement }}
    </div>
  </div>
</template>

<style scoped></style>
