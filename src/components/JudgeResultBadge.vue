<script setup lang="ts">
import type { JudgeStatus } from '@/api/generated'
import { statusConfig } from '@/utils/statusConfig'

const props = defineProps<{
  status: JudgeStatus
}>()

const config = statusConfig[props.status] || statusConfig.WJ
</script>

<template>
  <div
    class="fontstyle-ui-control-strong inline-flex items-center justify-center rounded px-2"
    :class="[config.bgColor, config.textColor]"
  >
    {{ config.label }}
  </div>
</template>

<style scoped></style>
