<template>
  <div>
    <h1>問題詳細</h1>
    <!-- 他の問題詳細情報を表示する部分 -->
    <SubmitForm :problem-id="problemId" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SubmitForm from '@/components/SubmitForm.vue'

const problemId = ref(1) // ここで問題IDを設定します
</script>

<style scoped></style>
