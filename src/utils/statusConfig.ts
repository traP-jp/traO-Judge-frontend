import type { JudgeStatus } from '@/api/generated'

export const statusConfig: Record<JudgeStatus, { label: string; bgColor: string; textColor: string }> = {
  AC: { label: 'AC', bgColor: 'bg-status-accepted', textColor: 'text-white' },
  WA: { label: 'WA', bgColor: 'bg-status-failed', textColor: 'text-white' },
  CE: { label: 'CE', bgColor: 'bg-status-failed', textColor: 'text-white' },
  TLE: { label: 'TLE', bgColor: 'bg-status-failed', textColor: 'text-white' },
  RE: { label: 'RE', bgColor: 'bg-status-failed', textColor: 'text-white' },
  IE: { label: 'IE', bgColor: 'bg-status-error', textColor: 'text-white' },
  WJ: { label: 'WJ', bgColor: 'bg-status-pending', textColor: 'text-white' },
  MLE: { label: 'MLE', bgColor: 'bg-status-failed', textColor: 'text-white' }
}

export const statusList = Object.entries(statusConfig).map(([value, config]) => ({
  value: value as JudgeStatus,
  label: config.label,
  color: config.bgColor
}))

export const defaultFilterStatuses = new Set<JudgeStatus>([
  'WJ', 'AC', 'CE', 'MLE', 'RE', 'TLE', 'WA', 'IE'
])