<script setup lang="ts">
import type { JudgeStatus } from '@/api/generated'

const props = defineProps<{
  status: JudgeStatus
}>()

const statusConfig: Record<JudgeStatus, { label: string; bgColor: string; textColor: string }> = {
  AC: { label: 'AC', bgColor: 'bg-status-accepted', textColor: 'text-white' },
  WA: { label: 'WA', bgColor: 'bg-status-failed', textColor: 'text-white' },
  CE: { label: 'CE', bgColor: 'bg-status-failed', textColor: 'text-white' },
  TLE: { label: 'TLE', bgColor: 'bg-status-failed', textColor: 'text-white' },
  RE: { label: 'RE', bgColor: 'bg-status-failed', textColor: 'text-white' },
  IE: { label: 'IE', bgColor: 'bg-status-error', textColor: 'text-white' },
  WJ: { label: 'WJ', bgColor: 'bg-status-pending', textColor: 'text-white' },
  MLE: { label: 'MLE', bgColor: 'bg-status-failed', textColor: 'text-white' }
}

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
